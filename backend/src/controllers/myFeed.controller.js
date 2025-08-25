import { Recipe } from "../models/recipe.model.js";
import { Follow } from "../models/follow.model.js";
import { User } from "../models/user.model.js";
import { ActivityFeed } from "../models/activityFeed.model.js";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";

// Get My Feed - recipes from followed chefs and activity feed
const getMyFeed = async (req, res) => {
  console.log('🚀 MYFEED FUNCTION CALLED');
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10, type = 'all' } = req.query;

    console.log(`MyFeed request - User: ${userId}, Page: ${page}, Limit: ${limit}, Type: ${type}`);

    // Get users that current user follows
    const followedUsers = await Follow.find({ follower: userId })
      .populate('following', '_id username fullName avatar')
      .select('following');

    const followedUserIds = followedUsers.map(follow => follow.following._id);
    console.log(`User follows ${followedUserIds.length} chefs:`, followedUserIds);

    let feedItems = [];

    if (type === 'all' || type === 'recipes') {
      console.log('🔥 ENTERING RECIPES SECTION');
      // Get recipes from followed chefs
      const recipes = await Recipe.find({
        author: { $in: followedUserIds },
        visibility: 'public'
      })
        .populate('author', 'username fullName avatar')
        .sort({ createdAt: -1 })
        .limit(parseInt(limit) * 2); // Get more to mix with activities

      console.log(`Found ${recipes.length} recipes from followed chefs`);

      // Debug first recipe - FORCE OUTPUT
      if (recipes.length > 0) {
        console.log('🐛 RECIPE DEBUG START');
        const first = recipes[0];
        console.log('🐛 Title:', first.title);
        console.log('🐛 Views:', first.views);
        console.log('🐛 Likes:', first.likes);
        console.log('🐛 Views type:', typeof first.views);
        console.log('🐛 Likes type:', typeof first.likes);
        console.log('🐛 Raw object:', JSON.stringify(first.toObject(), null, 2));
        console.log('🐛 RECIPE DEBUG END');
      } else {
        console.log('❌ NO RECIPES FOUND');
      }

      // Convert recipes to feed items
      const recipeItems = recipes.map(recipe => {
        console.log(`Processing: ${recipe.title} - views: ${recipe.views}, likes: ${recipe.likes}`);
        
        return {
          ...recipe.toObject(),
          type: 'recipe',
          chef: {
            id: recipe.author._id,
            name: recipe.author.fullName || recipe.author.username,
            username: recipe.author.username,
            avatar: recipe.author.avatar
          },
          image: recipe.imageUrl,
          cookingTime: recipe.cookTime,
          difficulty: recipe.tags?.find(tag => ['Easy', 'Medium', 'Hard', 'Expert'].includes(tag)) || 'Medium',
          timeAgo: recipe.createdAt,
          isLiked: false,
          isSaved: false,
          comments: 0
        };
      });

      feedItems.push(...recipeItems);
    }

    if (type === 'all' || type === 'activities') {
      // Get activities from followed users
      const activities = await ActivityFeed.find({
        author: { $in: followedUserIds }
      })
        .populate('author', 'username fullName avatar')
        .populate('relatedRecipe', 'title imageUrl')
        .sort({ createdAt: -1 })
        .limit(parseInt(limit));

      console.log(`Found ${activities.length} activities from followed chefs`);

      // Add type and format for feed
      const activityItems = activities.map(activity => ({
        _id: activity._id,
        type: 'activity',
        chef: {
          id: activity.author._id,
          name: activity.author.fullName || activity.author.username,
          username: activity.author.username,
          avatar: activity.author.avatar
        },
        content: activity.content,
        images: activity.images || [],
        activityType: activity.type,
        relatedRecipe: activity.relatedRecipe,
        likes: activity.likes || 0,
        comments: activity.comments?.length || 0,
        timeAgo: activity.createdAt,
        isLiked: false, // Will be updated below
        createdAt: activity.createdAt
      }));

      feedItems.push(...activityItems);
    }

    // Sort all items by creation date
    feedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    console.log(`Total feed items before pagination: ${feedItems.length}`);

    // Paginate
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const paginatedItems = feedItems.slice(startIndex, startIndex + parseInt(limit));

    console.log(`Returning ${paginatedItems.length} items for page ${page}`);

    // Update like status, comment counts for recipes
    for (let item of paginatedItems) {
      if (item.type === 'recipe') {
        // Check if liked - use correct field names from Like model
        const like = await Like.findOne({ userId: userId, recipeId: item._id });
        item.isLiked = !!like;

        // Get comment count
        const commentCount = await Comment.countDocuments({ recipe: item._id });
        item.comments = commentCount;

        // Check if saved
        const user = await User.findById(userId);
        item.isSaved = user.savedRecipes.some(saved => saved.recipeId === item._id.toString());
      }
    }

    // Log what we're sending to frontend
    console.log("Final feed items being sent to frontend:");
    paginatedItems.forEach(item => {
      if (item.type === 'recipe') {
        console.log(`- ${item.title}: views=${item.views}, likes=${item.likes}, comments=${item.comments}`);
      }
    });

    return res.status(200).json({
      feedItems: paginatedItems,
      hasMore: feedItems.length > startIndex + parseInt(limit),
      page: parseInt(page),
      totalItems: feedItems.length
    });

  } catch (error) {
    console.log("Error in getMyFeed controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get recipes by specific chef
const getChefRecipes = async (req, res) => {
  try {
    const { chefId } = req.params;
    const { page = 1, limit = 12 } = req.query;
    const userId = req.user._id;

    // Check if chef exists
    const chef = await User.findById(chefId).select('username fullName avatar publicProfile');
    if (!chef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    if (!chef.publicProfile) {
      return res.status(403).json({ message: "This chef's profile is private" });
    }

    // Get recipes by this chef
    const recipes = await Recipe.find({
      author: chefId,
      visibility: 'public'
    })
      .populate('author', 'username fullName avatar')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Recipe.countDocuments({
      author: chefId,
      visibility: 'public'
    });

    // Add like status and comment counts
    const recipesWithDetails = await Promise.all(
      recipes.map(async (recipe) => {
        const like = await Like.findOne({ userId: userId, recipeId: recipe._id });
        const commentCount = await Comment.countDocuments({ recipe: recipe._id });
        const user = await User.findById(userId);
        const isSaved = user.savedRecipes.some(saved => saved.recipeId === recipe._id.toString());

        // Use toObject() to get current database values including views and likes
        const recipeObj = recipe.toObject();
        
        return {
          ...recipeObj,
          type: 'recipe',
          chef: {
            id: recipe.author._id,
            name: recipe.author.fullName || recipe.author.username,
            username: recipe.author.username,
            avatar: recipe.author.avatar
          },
          image: recipe.imageUrl,
          cookingTime: recipe.cookTime,
          difficulty: recipe.tags?.find(tag => ['Easy', 'Medium', 'Hard', 'Expert'].includes(tag)) || 'Medium',
          comments: commentCount,
          timeAgo: recipe.createdAt,
          isLiked: !!like,
          isSaved: isSaved
        };
      })
    );

    // Get chef's follower count
    const followerCount = await Follow.countDocuments({ following: chefId });

    return res.status(200).json({
      chef: {
        ...chef.toObject(),
        followersCount: followerCount
      },
      recipes: recipesWithDetails,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });

  } catch (error) {
    console.log("Error in getChefRecipes controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get followed chefs list
const getFollowedChefs = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log(`Getting followed chefs for user: ${userId}`);

    const followedUsers = await Follow.find({ follower: userId })
      .populate('following', 'username fullName avatar')
      .sort({ createdAt: -1 });

    console.log(`Found ${followedUsers.length} followed users`);

    // Get recipe counts and follower counts for each chef
    const chefsWithDetails = await Promise.all(
      followedUsers.map(async (follow) => {
        const chef = follow.following;
        const recipeCount = await Recipe.countDocuments({
          author: chef._id,
          visibility: 'public'
        });
        const followerCount = await Follow.countDocuments({ following: chef._id });

        return {
          id: chef._id,
          _id: chef._id, // Add _id field for profile navigation
          name: chef.fullName || chef.username,
          username: chef.username,
          avatar: chef.avatar,
          followers: followerCount,
          recipes: recipeCount,
          isActive: false // You can implement online status later
        };
      })
    );

    console.log(`Returning ${chefsWithDetails.length} chefs with details`);

    return res.status(200).json({
      chefs: chefsWithDetails,
      total: chefsWithDetails.length
    });

  } catch (error) {
    console.log("Error in getFollowedChefs controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get activity feed from followed users
const getFollowedActivities = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    // Get users that current user follows
    const followedUsers = await Follow.find({ follower: userId })
      .select('following');

    const followedUserIds = followedUsers.map(follow => follow.following);

    // Get activities from followed users
    const activities = await ActivityFeed.find({
      author: { $in: followedUserIds }
    })
      .populate('author', 'username fullName avatar')
      .populate('relatedRecipe', 'title imageUrl')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await ActivityFeed.countDocuments({
      author: { $in: followedUserIds }
    });

    // Format activities for feed
    const formattedActivities = activities.map(activity => ({
      _id: activity._id,
      type: 'activity',
      chef: {
        id: activity.author._id,
        name: activity.author.fullName || activity.author.username,
        username: activity.author.username,
        avatar: activity.author.avatar
      },
      content: activity.content,
      images: activity.images || [],
      activityType: activity.type,
      relatedRecipe: activity.relatedRecipe,
      likes: activity.likes || 0,
      comments: activity.comments?.length || 0,
      timeAgo: activity.createdAt
    }));

    return res.status(200).json({
      activities: formattedActivities,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });

  } catch (error) {
    console.log("Error in getFollowedActivities controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getMyFeed,
  getChefRecipes,
  getFollowedChefs,
  getFollowedActivities
};
