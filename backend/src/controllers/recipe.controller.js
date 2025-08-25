import { Recipe } from "../models/recipe.model.js";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import cloudinary from "../utils/cloudinary.js";

// Get recipes for Explore page, supporting various filters
const getExploreRecipes = async (req, res) => {
  try {
    const { type, limit = 12, following = '' } = req.query;
    let filter = { visibility: 'public' };

    // Filter by type
    if (type === 'trending') {
      // Trending: most views in last 7 days
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      filter.createdAt = { $gte: weekAgo };
      // Will sort by views below
    } else if (type === 'new') {
      // Newest: just sort by createdAt
    } else if (type === 'easy') {
      filter.tags = { $in: ["easy", "Easy"] };
    } else if (type === 'chefs-pick') {
      filter.tags = { $in: ["Chef's Pick"] };
    } else if (type === 'following' && following) {
      // Recipes from authors the user follows (expects comma-separated user IDs)
      const ids = following.split(',').map(id => id.trim()).filter(Boolean);
      if (ids.length > 0) filter.author = { $in: ids };
    }

    let query = Recipe.find(filter).populate('author', 'username avatar followers');
    if (type === 'trending') {
      query = query.sort({ views: -1 });
    } else if (type === 'new') {
      query = query.sort({ createdAt: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }
    query = query.limit(Number(limit));
    const recipes = await query;

    // Add follower count to each recipe
    const { Follow } = await import("../models/follow.model.js");
    const recipesWithFollowerCount = await Promise.all(
      recipes.map(async (recipe) => {
        const followerCount = await Follow.countDocuments({ following: recipe.author._id });
        return {
          ...recipe.toObject(),
          author: {
            ...recipe.author.toObject(),
            followersCount: followerCount
          }
        };
      })
    );

    return res.status(200).json({ recipes: recipesWithFollowerCount });
  } catch (error) {
    console.log('Error in getExploreRecipes controller', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Get recipes for Home page, optionally filtered by tags and limited in number
const getHomeRecipes = async (req, res) => {
  try {
    const { tags = '', limit = 8 } = req.query;
    let filter = { visibility: 'public' };
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      if (tagArray.length > 0) {
        filter.tags = { $in: tagArray };
      }
    }
    const recipes = await Recipe.find(filter)
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    // Add follower count to each recipe
    const { Follow } = await import("../models/follow.model.js");
    const recipesWithFollowerCount = await Promise.all(
      recipes.map(async (recipe) => {
        const followerCount = await Follow.countDocuments({ following: recipe.author._id });
        return {
          ...recipe.toObject(),
          author: {
            ...recipe.author.toObject(),
            followersCount: followerCount
          }
        };
      })
    );

    return res.status(200).json({ recipes: recipesWithFollowerCount });
  } catch (error) {
    console.log('Error in getHomeRecipes controller', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
const createRecipe = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }
    
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "recipe_pictures",
      resource_type: "image",
    });
    
    const recipe = await Recipe.create({
      imageUrl: uploadResponse.secure_url,
      author: req.user._id,
      visibility: 'draft' // Always start as draft
    }); 
    
    return res.status(201).json({ 
      recipeId: recipe._id, 
      imageUrl: recipe.imageUrl,
      message: "Recipe created successfully. Please complete the details." 
    });
  } catch (error) {
    console.log("Error in createRecipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const updateRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { title, description, cookTime, servings, ingredients, instructions, tags, allowComments } = req.body;

    // Find the recipe and verify ownership
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update recipe fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (cookTime !== undefined) updateData.cookTime = cookTime;
    if (servings !== undefined) updateData.servings = servings;
    if (ingredients !== undefined) updateData.ingredients = ingredients;
    if (instructions !== undefined) updateData.instructions = instructions;
    if (tags !== undefined) updateData.tags = tags;
    if (allowComments !== undefined) updateData.allowComments = allowComments;

    // Always keep as draft during updates - can only be published via publishRecipe
    updateData.visibility = 'draft';

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId, 
      updateData, 
      { new: true, runValidators: true }
    );

    return res.status(200).json({ 
      message: "Recipe updated successfully", 
      recipe: updatedRecipe 
    });
  } catch (error) {
    console.log("Error in updateRecipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId).populate("author", "username avatar fullName");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    
    // Update view count
    console.log(`Incrementing view count for recipe ${recipeId}. Current views: ${recipe.views}`);
    recipe.views += 1;
    await recipe.save();
    console.log(`View count updated to: ${recipe.views}`);
    
    // Get comment count and calculate rating if not set
    const commentCount = await Comment.countDocuments({ recipe: recipeId });
    if (commentCount > 0 && !recipe.rating) {
      const comments = await Comment.find({ recipe: recipeId });
      const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
      const averageRating = totalRating / comments.length;
      recipe.rating = Math.round(averageRating * 10) / 10;
      await recipe.save();
    }
    
    // Get author's follower count
    const { Follow } = await import("../models/follow.model.js");
    const followerCount = await Follow.countDocuments({ following: recipe.author._id });
    
    // Add follower count to author object
    const recipeWithFollowerCount = {
      ...recipe.toObject(),
      commentCount,
      author: {
        ...recipe.author.toObject(),
        followersCount: followerCount
      }
    };
    
    return res.status(200).json(recipeWithFollowerCount);
  } catch (error) {
    console.log("Error in get Recipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const editRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const update = req.body;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    Object.assign(recipe, update);
    await recipe.save();
    return res.status(200).json({ message: "Recipe updated", recipe });
  } catch (error) {
    console.log("Error in edit Recipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Recipe.findByIdAndDelete(recipeId);
    return res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    console.log("Error in delete Recipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const toogleRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    recipe.visibility = recipe.visibility === "public" ? "draft" : "public";
    await recipe.save();
    return res.status(200).json({ message: "Recipe visibility toggled", visibility: recipe.visibility });
  } catch (error) {
    console.log("Error in toogle Recipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const toogleRecipeComment = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    recipe.allowComments = !recipe.allowComments;
    await recipe.save();
    return res.status(200).json({ message: "Recipe comments toggled", allowComments: recipe.allowComments });
  } catch (error) {
    console.log("Error in toogle Recipe comment controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 
const getRecipeAnalytics = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    // Example analytics: views, comments allowed, created/updated
    return res.status(200).json({
      views: recipe.views,
      allowComments: recipe.allowComments,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
      visibility: recipe.visibility
    });
  } catch (error) {
    console.log("Error in get Recipe Analytics controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Validation function to check if recipe is ready for publishing
const validateRecipeForPublishing = (recipe) => {
  const errors = [];
  
  // Check title (minimum 3 words)
  if (!recipe.title || recipe.title.trim().split(/\s+/).length < 3) {
    errors.push("Title must contain at least 3 words");
  }
  
  // Check description (minimum 10 characters)
  if (!recipe.description || recipe.description.trim().length < 10) {
    errors.push("Description must be at least 10 characters long");
  }
  
  // Check ingredients (minimum 3 ingredients)
  if (!recipe.ingredients || recipe.ingredients.length < 3) {
    errors.push("Recipe must have at least 3 ingredients");
  }
  
  // Check instructions (minimum 3 steps)
  if (!recipe.instructions || recipe.instructions.length < 3) {
    errors.push("Recipe must have at least 3 instruction steps");
  }
  
  // Check if all instruction steps have content
  if (recipe.instructions) {
    const emptySteps = recipe.instructions.filter(inst => !inst.step || inst.step.trim().length === 0);
    if (emptySteps.length > 0) {
      errors.push("All instruction steps must have content");
    }
  }
  
  // Check if all ingredients have required fields
  if (recipe.ingredients) {
    const invalidIngredients = recipe.ingredients.filter(ing => 
      !ing.name || !ing.quantity || ing.name.trim().length === 0 || ing.quantity.trim().length === 0
    );
    if (invalidIngredients.length > 0) {
      errors.push("All ingredients must have name and quantity");
    }
  }
  
  // Check cook time
  if (!recipe.cookTime || recipe.cookTime.trim().length === 0) {
    errors.push("Cook time is required");
  }
  
  // Check servings
  if (!recipe.servings || recipe.servings.trim().length === 0) {
    errors.push("Number of servings is required");
  }
  
  return errors;
};

const publishRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    // Validate recipe before publishing
    const validationErrors = validateRecipeForPublishing(recipe);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: "Recipe cannot be published. Please fix the following issues:", 
        errors: validationErrors 
      });
    }
    
    // If validation passes, publish the recipe
    recipe.visibility = 'public';
    await recipe.save();
    
    return res.status(200).json({ 
      message: "Recipe published successfully!", 
      recipe: recipe 
    });
  } catch (error) {
    console.log("Error in publishRecipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const validateRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    const validationErrors = validateRecipeForPublishing(recipe);
    
    return res.status(200).json({ 
      isValid: validationErrors.length === 0,
      errors: validationErrors,
      canPublish: validationErrors.length === 0
    });
  } catch (error) {
    console.log("Error in validateRecipe controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserRecipes = async (req, res) => {
  try {
    const { status } = req.query; // 'draft', 'public', or 'all'
    
    let filter = { author: req.user._id };
    
    if (status && status !== 'all') {
      filter.visibility = status;
    }
    
    const recipes = await Recipe.find(filter)
      .populate("author", "username avatar")
      .sort({ updatedAt: -1 });
    
    return res.status(200).json({
      recipes,
      total: recipes.length
    });
  } catch (error) {
    console.log("Error in getUserRecipes controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllPublicRecipes = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', tags = '' } = req.query;
    
    let filter = { visibility: 'public' };
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tagArray };
    }
    
    const recipes = await Recipe.find(filter)
      .populate("author", "username avatar")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Recipe.countDocuments(filter);
    
    return res.status(200).json({
      recipes,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.log("Error in getAllPublicRecipes controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Enhanced search controller for comprehensive recipe search
const searchRecipes = async (req, res) => {
  try {
    console.log('Search request received:', req.query);
    
    const { 
      page = 1, 
      limit = 10, 
      q = '', 
      tags = '', 
      difficulty = '', 
      cookTime = '', 
      sortBy = 'relevance' 
    } = req.query;
    
    let filter = { visibility: 'public' };
    let sort = {};
    
    // Enhanced search across multiple fields
    if (q && q.trim()) {
      const searchRegex = { $regex: q.trim(), $options: 'i' };
      filter.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { tags: searchRegex },
        { 'ingredients.name': searchRegex },
        { 'instructions.step': searchRegex }
      ];
    }
    
    // Filter by tags
    if (tags && tags.trim()) {
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      if (tagArray.length > 0) {
        if (filter.tags) {
          // If tags filter already exists from search, combine with AND logic
          filter.tags = { $in: tagArray };
        } else {
          filter.tags = { $in: tagArray };
        }
      }
    }
    
    // Filter by difficulty
    if (difficulty && difficulty.trim()) {
      filter.difficulty = difficulty.trim();
    }
    
    // Filter by cook time range
    if (cookTime && cookTime.trim()) {
      switch (cookTime) {
        case '0-30':
          filter.cookTime = { $regex: '^([0-2]?[0-9]|30) min', $options: 'i' };
          break;
        case '30-60':
          filter.cookTime = { $regex: '^([3-5][0-9]|60) min', $options: 'i' };
          break;
        case '60+':
          filter.cookTime = { $regex: '^([6-9][0-9]|[1-9][0-9]{2,}) min|hour', $options: 'i' };
          break;
      }
    }
    
    // Sorting options
    switch (sortBy) {
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'oldest':
        sort = { createdAt: 1 };
        break;
      case 'popular':
        sort = { views: -1, createdAt: -1 };
        break;
      case 'rating':
        sort = { rating: -1, createdAt: -1 };
        break;
      case 'relevance':
      default:
        sort = { views: -1, createdAt: -1 };
        break;
    }
    
    console.log('MongoDB filter:', JSON.stringify(filter, null, 2));
    console.log('MongoDB sort:', sort);
    
    const recipes = await Recipe.find(filter)
      .populate("author", "username avatar")
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .lean();
    
    const total = await Recipe.countDocuments(filter);
    
    console.log(`Found ${recipes.length} recipes out of ${total} total`);
    
    // Add follower count to each recipe
    const { Follow } = await import("../models/follow.model.js");
    const recipesWithFollowerCount = await Promise.all(
      recipes.map(async (recipe) => {
        const followerCount = await Follow.countDocuments({ following: recipe.author._id });
        return {
          ...recipe,
          author: {
            ...recipe.author,
            followersCount: followerCount
          }
        };
      })
    );
    
    // Add calculated fields for better search results
    const enrichedRecipes = recipesWithFollowerCount.map(recipe => ({
      ...recipe,
      relevanceScore: calculateRelevanceScore(recipe, q),
    }));
    
    return res.status(200).json({
      recipes: enrichedRecipes,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      searchQuery: q,
      filters: {
        tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        difficulty,
        cookTime,
        sortBy
      }
    });
  } catch (error) {
    console.error("Error in searchRecipes controller:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Helper function to calculate relevance score
const calculateRelevanceScore = (recipe, searchQuery) => {
  if (!searchQuery) return 0;
  
  let score = 0;
  const query = searchQuery.toLowerCase();
  
  // Title match (highest priority)
  if (recipe.title?.toLowerCase().includes(query)) {
    score += 10;
  }
  
  // Description match
  if (recipe.description?.toLowerCase().includes(query)) {
    score += 5;
  }
  
  // Tags match
  if (recipe.tags?.some(tag => tag.toLowerCase().includes(query))) {
    score += 7;
  }
  
  // Ingredients match
  if (recipe.ingredients?.some(ing => ing.name?.toLowerCase().includes(query))) {
    score += 8;
  }
  
  // Instructions match
  if (recipe.instructions?.some(inst => inst.step?.toLowerCase().includes(query))) {
    score += 3;
  }
  
  // Boost for popular recipes
  score += Math.log(recipe.views + 1) * 0.1;
  
  return score;
};

// Add comment to recipe
const addComment = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { text, rating } = req.body;

    if (!text || !rating) {
      return res.status(400).json({ message: "Comment text and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (!recipe.allowComments) {
      return res.status(403).json({ message: "Comments are disabled for this recipe" });
    }

    // Create the comment
    const comment = await Comment.create({
      text,
      rating,
      author: req.user._id,
      recipe: recipeId
    });

    await comment.populate('author', 'username avatar');

    // Calculate new average rating
    const allComments = await Comment.find({ recipe: recipeId });
    const totalRating = allComments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRating / allComments.length;
    
    // Update recipe with new average rating
    recipe.rating = Math.round(averageRating * 10) / 10; // Round to 1 decimal place
    await recipe.save();

    return res.status(201).json({
      message: "Comment added successfully",
      comment: {
        id: comment._id,
        text: comment.text,
        rating: comment.rating,
        author: {
          username: comment.author.username,
          avatar: comment.author.avatar
        },
        createdAt: comment.createdAt
      },
      newRecipeRating: recipe.rating
    });
  } catch (error) {
    console.log("Error in addComment controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get comments for recipe
const getComments = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const comments = await Comment.find({ recipe: recipeId })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Comment.countDocuments({ recipe: recipeId });

    const formattedComments = comments.map(comment => ({
      id: comment._id,
      text: comment.text,
      rating: comment.rating,
      author: {
        username: comment.author.username,
        avatar: comment.author.avatar
      },
      createdAt: comment.createdAt
    }));

    return res.status(200).json({
      comments: formattedComments,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.log("Error in getComments controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Toggle recipe like (SIMPLIFIED VERSION)
const toggleLike = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user._id;

    console.log('🚀 SIMPLE toggleLike called:', { recipeId, userId });

    // Find the recipe
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Use correct field names that match database index: userId and recipeId
    const deleteResult = await Like.deleteOne({ 
      userId: userId, 
      recipeId: recipeId 
    });

    if (deleteResult.deletedCount > 0) {
      // Unlike: like was deleted
      recipe.likes = Math.max(0, recipe.likes - 1);
      await recipe.save();
      
      return res.status(200).json({
        message: "Recipe unliked",
        isLiked: false,
        likeCount: recipe.likes
      });
    } else {
      // Like: create new like
      await Like.create({
        userId: userId,
        recipeId: recipeId
      });
      recipe.likes += 1;
      await recipe.save();
      
      return res.status(200).json({
        message: "Recipe liked",
        isLiked: true,
        likeCount: recipe.likes
      });
    }
    
  } catch (error) {
    console.log("Error in toggleLike:", error);
    return res.status(500).json({ 
      message: "Failed to toggle like"
    });
  }
};

// Check if user liked recipe
const checkLikeStatus = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user._id;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const existingLike = await Like.findOne({ 
      userId: userId, 
      recipeId: recipeId 
    });

    return res.status(200).json({
      isLiked: !!existingLike,  // ✅ FIXED: Convert to boolean correctly
      likeCount: recipe.likes
    });
  } catch (error) {
    console.log("Error in checkLikeStatus controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Export all controllers

// Get trending recipes (recent, most viewed, most liked)
// Returns trendingToday, trendingWeek, trendingMonth, allTimeFavorites
const getTrendingRecipes = async (req, res) => {
  try {
    // Trending Today: last 24h, sorted by views
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const trendingToday = await Recipe.find({
      visibility: 'public',
      createdAt: { $gte: today }
    })
      .sort({ views: -1 })
      .limit(5)
      .populate('author', 'username avatar');

    // Trending This Week: last 7 days, sorted by views
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const trendingWeek = await Recipe.find({
      visibility: 'public',
      createdAt: { $gte: weekAgo }
    })
      .sort({ views: -1 })
      .limit(5)
      .populate('author', 'username avatar');

    // Trending This Month: last 30 days, sorted by views
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const trendingMonth = await Recipe.find({
      visibility: 'public',
      createdAt: { $gte: monthAgo }
    })
      .sort({ views: -1 })
      .limit(5)
      .populate('author', 'username avatar');

    // All-Time Favorites: highest likes
    const allTimeFavorites = await Recipe.find({ visibility: 'public' })
      .sort({ likes: -1 })
      .limit(5)
      .populate('author', 'username avatar');

    return res.status(200).json({
      trendingToday,
      trendingWeek,
      trendingMonth,
      allTimeFavorites
    });
  } catch (error) {
    console.log('Error in getTrendingRecipes controller', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get recipes with highest views
const getHighestViewsRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ visibility: 'public' })
      .sort({ views: -1 })
      .limit(10)
      .populate('author', 'username avatar');
    return res.status(200).json({ recipes });
  } catch (error) {
    console.log('Error in getHighestViewsRecipes controller', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get recipes with highest likes
const getHighestLikesRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ visibility: 'public' })
      .sort({ likes: -1 })
      .limit(10)
      .populate('author', 'username avatar');
    return res.status(200).json({ recipes });
  } catch (error) {
    console.log('Error in getHighestLikesRecipes controller', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
export {
  createRecipe,
  updateRecipe,
  getRecipe,
  editRecipe,
  deleteRecipe,
  toogleRecipe,
  toogleRecipeComment,
  getRecipeAnalytics,
  publishRecipe,
  validateRecipe,
  getUserRecipes,
  getAllPublicRecipes,
  searchRecipes,
  getTrendingRecipes,
  getHighestViewsRecipes,
  getHighestLikesRecipes,
  getHomeRecipes,
  getExploreRecipes,
  addComment,
  getComments,
  toggleLike,
  checkLikeStatus,
};