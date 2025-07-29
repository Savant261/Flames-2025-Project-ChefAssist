import mongoose, { mongo } from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required."],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Recipe description is required."],
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Recipe must have an author."],
    },
    imageUrl: {
      type: String,
      required: [true, "Recipe image URL is required."],
    },
    cookTime: {
      type: String,
      required: [true, "Cook time is required."],
    },
    servings: {
      type: String,
      required: [true, "Serving information is required."],
    },
    tags: {
      type: [String],
      index: true,
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        quantity: {
          type: String,
          required: true,
        },
        unit: {
          type: String,
          trim: true,
        },
      },
    ],
    instructions: [
      {
        step: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    nutrition: {
      calories: { type: String },
      protein: { type: String },
      fat: { type: String },
      carbs: { type: String },
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
