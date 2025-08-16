import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Comment text is required.'],
    trim: true,
    maxlength: 1000
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'A rating between 1 and 5 is required.']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  }
}, {
  timestamps: true
});

// To efficiently query comments by recipe or user
commentSchema.index({ recipe: 1 });
commentSchema.index({ author: 1 });


export const Comment = mongoose.model("Comment", commentSchema);

