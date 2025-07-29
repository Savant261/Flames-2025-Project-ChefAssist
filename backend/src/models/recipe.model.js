import mongoose from "mongoose";
const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: {
    type: String,
    trim: true,
    index: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Recipe must have an author."],
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: [true,"Recipe must have an image"]
  },
  cookTime: {
    type: String,
  },
  servings: {
    type: String,
  },
  tags: {
    type: [String],
    index: true,
  },
  ingredients: [{
    name: { type: String, required: true, trim: true },
    quantity: { type: String, required: true },
    unit: { type: String, trim: true },
  }],
  instructions: [{
    step: { type: String, required: true, trim: true },
  }],
  nutrition: {
    calories: { type: String },
    protein: { type: String },
    fat: { type: String },
    carbs: { type: String },
  },
  visibility: {
    type: String,
    enum: ['public', 'draft', 'unlisted'],
    default: 'draft',
    required: true,
  },
  allowComments: {
    type: Boolean,
    default: true,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });


export const Recipe = mongoose.model('Recipe', recipeSchema);

