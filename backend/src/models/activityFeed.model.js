import mongoose from "mongoose";
const { Schema } = mongoose;

const activityFeedSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Activity post must have an author."],
  },
  content: {
    type: String,
    required: [true, "Activity post must have content."],
    trim: true,
    maxlength: [1000, "Content cannot exceed 1000 characters"]
  },
  images: [{
    type: String, // URLs to images
  }],
  type: {
    type: String,
    enum: ['post', 'recipe_share', 'cooking_tip', 'achievement'],
    default: 'post'
  },
  relatedRecipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
    required: function() {
      return this.type === 'recipe_share';
    }
  },
  likes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, "Comment cannot exceed 500 characters"]
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  visibility: {
    type: String,
    enum: ['public', 'followers', 'private'],
    default: 'public'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for likes count
activityFeedSchema.virtual('likesCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Virtual for comments count
activityFeedSchema.virtual('commentsCount').get(function() {
  return this.comments ? this.comments.length : 0;
});

// Index for better query performance
activityFeedSchema.index({ author: 1, createdAt: -1 });
activityFeedSchema.index({ visibility: 1, isActive: 1, createdAt: -1 });

export const ActivityFeed = mongoose.model('ActivityFeed', activityFeedSchema);
