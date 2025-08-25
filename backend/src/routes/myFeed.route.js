import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMyFeed,
  getChefRecipes,
  getFollowedChefs,
  getFollowedActivities
} from "../controllers/myFeed.controller.js";

const router = express.Router();

// Get personalized feed with recipes from followed chefs and activities
router.get("/", protectRoute, getMyFeed);

// Get all followed chefs
router.get("/chefs", protectRoute, getFollowedChefs);

// Get recipes by specific chef
router.get("/chef/:chefId/recipes", protectRoute, getChefRecipes);

// Get activities from followed users
router.get("/activities", protectRoute, getFollowedActivities);

export default router;
