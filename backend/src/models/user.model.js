import { json } from "express";
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
      unique: true,
      trim: true,
      required: [true, "Password is required"],
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
      type: Object,
      fields: {
        x: { type: "string" },
        instagram: { type: "string" },
        youtube: { type: "string" },
      },
    },
    theme: {
      type: String,
      default: "light",
    },
    publicProfile: {
      type: Boolean,
      default: false,
    },
    cookingLevel: {
      type: String,
      default: "Beginner",
    },
    gender: {
      type: String,
      default: "",
    },
    currentPlanDetail: {
      type: Object,
      fields: {
        name: { type: String },
        price: { type: Number },
        time: { type: String },
      },
    },
    InventoryIngredient: [
      {
        name: { type: String, required: true, trim: true },
        qty: { type: Number, required: true },
        qtyName: { type: String, required: true, trim: true },
        value: { type: Number, required: true },
      },
    ],
    DietaryPreferences: [
      {
        name: { type: String, required: true },
        value: {type: Boolean, required: true, default:false}
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
