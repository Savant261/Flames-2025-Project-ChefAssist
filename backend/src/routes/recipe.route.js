import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  toogleRecipe,
  toogleRecipeComment,
  getRecipeAnalytics,
} from "../controllers/recipe.controller.js";
const router = express.Router();

router.post("/", protectRoute, createRecipe);
router.put("/:recipeId", protectRoute, updateRecipe);
router.get("/:recipeId", getRecipe);

router.delete("/:recipeId", protectRoute, deleteRecipe);
router.put("/:recipeId", protectRoute, toogleRecipe);
router.post("/comment/:recipeId", protectRoute, toogleRecipeComment);
router.post("/analytics/:recipeId", protectRoute, getRecipeAnalytics);

export default router;
