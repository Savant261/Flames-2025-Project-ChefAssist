import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please provide a valid email",
      ],
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "UserName is required"],
    },
    password: {
      type: String,
      trim: true,
      required: function() {
        return !this.googleId; // Password not required if Google OAuth user
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    avatar: {
      type: String,
      trim: true,
      default: "default-avatar.png",
    },
    refreshToken: {
      type: String,
    },
    phoneNo: {
      type: String,
      unique: true,
      trim: true,
      sparse: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    socialLinks: {
      x: { type: String, trim: true },
      instagram: { type: String, trim: true },
      youtube: { type: String, trim: true },
    },
    theme: {
      type: String,
      default: "light",
    },
    publicProfile: {
      type: Boolean,
      default: true,
    },
    cookingLevel: {
      type: String,
      default: "Beginner",
    },
    gender: {
      type: String,
      default: "prefer not to say",
    },
    currentPlanDetail: {
      name: { type: String },
      price: { type: Number },
      time: { type: String },
    },
    inventoryIngredient: [
      {
        name: { type: String, required: true, trim: true },
        qty: { type: Number, required: true },
        qtyName: { type: String, required: true, trim: true },
        expiryDate: { type: Date },
        status: { 
          type: String, 
          enum: ['fresh', 'expiring', 'expired'], 
          default: 'fresh' 
        },
      },
    ],
    dietaryPreferences: {
      type: [String],
      default: []
    },
    savedRecipes: [
      {
        recipeId: { type: String, required: true },
        title: { type: String },
        image: { type: String },
        cuisine: { type: String },
        difficulty: { type: String },
        rating: { type: Number },
        reviews: { type: Number },
        cookTime: { type: String }
      }
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
