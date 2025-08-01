import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getRecipe,
  createRecipe,
  updateRecipe,
  editRecipe,
  deleteRecipe,
  toogleRecipe,
  toogleRecipeComment,
  getRecipeAnalytics,
  publishRecipe,
  validateRecipe,
  getUserRecipes,
  getAllPublicRecipes,
  getTrendingRecipes,
  getHighestViewsRecipes,
  getHighestLikesRecipes,
  getHomeRecipes,
  getExploreRecipes,
} from "../controllers/recipe.controller.js";
// Get recipes for Explore page (type: trending, new, easy, chefs-pick, following)
// Get recipes for Home page (optionally by tags)

const router = express.Router();
router.get("/explore", getExploreRecipes);
router.get("/home", getHomeRecipes);
// Get all public recipes (with pagination and search)
router.get("/", getAllPublicRecipes);

// Get user's recipes
router.get("/my-recipes", protectRoute, getUserRecipes);

// Get trending recipes (today, week, month, all-time)
router.get("/trending", getTrendingRecipes);

// Get recipes with highest views
router.get("/highest-views", getHighestViewsRecipes);

// Get recipes with highest likes
router.get("/highest-likes", getHighestLikesRecipes);
// Create recipe (Step 1: Upload image)
router.post("/", protectRoute, createRecipe);

// Update recipe (Steps 2-4: Update recipe details)
router.put("/:recipeId", protectRoute, updateRecipe);

// Edit recipe (Alternative update route)
router.patch("/:recipeId", protectRoute, editRecipe);

// Get specific recipe
router.get("/:recipeId", getRecipe);

// Validate recipe before publishing
router.get("/:recipeId/validate", protectRoute, validateRecipe);

// Publish recipe (Make it public)
router.post("/:recipeId/publish", protectRoute, publishRecipe);

// Delete recipe
router.delete("/:recipeId", protectRoute, deleteRecipe);

// Toggle recipe visibility
router.put("/:recipeId/toggle", protectRoute, toogleRecipe);

// Toggle recipe comments
router.post("/:recipeId/comment", protectRoute, toogleRecipeComment);

// Get recipe analytics
router.get("/:recipeId/analytics", protectRoute, getRecipeAnalytics);

export default router;
