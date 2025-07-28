import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addRecipe,
  getRecipe,
  editRecipe,
  deleteRecipe,
  toogleRecipe,
  toogleRecipeComment,
  getRecipeAnalytics,
} from "../controllers/recipe.controller.js";
const router = express.Router();

router.post("/recipe/add", protectRoute, addRecipe);
router.get("/recipe/:recipeId", getRecipe);
router.post("/recipe/:recipeId", protectRoute, editRecipe);
router.delete("/recipe/:recipeId", protectRoute, deleteRecipe);
router.put("/recipe/:recipeId", protectRoute, toogleRecipe);
router.post("/recipe/comment/:recipeId", protectRoute, toogleRecipeComment);
router.post("/recipe/analytics/:recipeId", protectRoute, getRecipeAnalytics);

export default router;
