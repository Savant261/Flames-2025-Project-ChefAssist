import { ActivityFeed } from "../models/activityFeed.model.js";
import { User } from "../models/user.model.js";

// Create a new activity post
const createActivityPost = async (req, res) => {
  try {
    const { content, images, type, relatedRecipe } = req.body;
    const userId = req.user._id;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const activityPost = new ActivityFeed({
      author: userId,
      content,
      images: images || [],
      type: type || 'post',
      relatedRecipe: relatedRecipe || null
    });

    await activityPost.save();
    
    // Populate author information
    await activityPost.populate('author', 'username fullName avatar');
    
    return res.status(201).json({
      message: "Activity post created successfully",
      post: activityPost
    });
  } catch (error) {
    console.log("Error in createActivityPost controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get activity feed for a user (their posts)
const getUserActivityFeed = async (req, res) => {
  try {
    const { userName } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Find user by username
    const user = await User.findOne({ username: userName }).select('_id publicProfile');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.publicProfile) {
      return res.status(403).json({ message: "This profile is private" });
    }

    const posts = await ActivityFeed.find({ 
      author: user._id, 
      isActive: true,
      visibility: { $in: ['public', 'followers'] }
    })
      .populate('author', 'username fullName avatar')
      .populate('relatedRecipe', 'title imageUrl cookTime')
      .populate('comments.user', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ActivityFeed.countDocuments({ 
      author: user._id, 
      isActive: true,
      visibility: { $in: ['public', 'followers'] }
    });

    return res.status(200).json({
      posts,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.log("Error in getUserActivityFeed controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Like/Unlike activity post
const toggleLikeActivityPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await ActivityFeed.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingLikeIndex = post.likes.findIndex(
      like => like.user.toString() === userId.toString()
    );

    let message;
    if (existingLikeIndex > -1) {
      // Unlike the post
      post.likes.splice(existingLikeIndex, 1);
      message = "Post unliked";
    } else {
      // Like the post
      post.likes.push({ user: userId });
      message = "Post liked";
    }

    await post.save();

    return res.status(200).json({
      message,
      likesCount: post.likes.length,
      isLiked: existingLikeIndex === -1
    });
  } catch (error) {
    console.log("Error in toggleLikeActivityPost controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add comment to activity post
const addCommentToActivityPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const post = await ActivityFeed.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      user: userId,
      content: content.trim()
    };

    post.comments.push(newComment);
    await post.save();

    // Populate the new comment with user data
    await post.populate('comments.user', 'username avatar');
    
    const addedComment = post.comments[post.comments.length - 1];

    return res.status(201).json({
      message: "Comment added successfully",
      comment: addedComment,
      commentsCount: post.comments.length
    });
  } catch (error) {
    console.log("Error in addCommentToActivityPost controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete activity post
const deleteActivityPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await ActivityFeed.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user is the author
    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this post" });
    }

    await ActivityFeed.findByIdAndDelete(postId);

    return res.status(200).json({
      message: "Post deleted successfully"
    });
  } catch (error) {
    console.log("Error in deleteActivityPost controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all public activity feed (for explore/home page)
const getPublicActivityFeed = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const posts = await ActivityFeed.find({ 
      visibility: 'public',
      isActive: true
    })
      .populate('author', 'username fullName avatar')
      .populate('relatedRecipe', 'title imageUrl cookTime')
      .populate('comments.user', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ActivityFeed.countDocuments({ 
      visibility: 'public',
      isActive: true
    });

    return res.status(200).json({
      posts,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.log("Error in getPublicActivityFeed controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createActivityPost,
  getUserActivityFeed,
  toggleLikeActivityPost,
  addCommentToActivityPost,
  deleteActivityPost,
  getPublicActivityFeed
};
