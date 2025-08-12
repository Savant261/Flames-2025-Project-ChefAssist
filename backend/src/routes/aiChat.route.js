import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";


import{
  createChat,
  generateRecipe,
  generateRecipeStream,
  generateRecipeWithIngredients,
  generateRecipeWithIngredientsStream,
  adaptExistingRecipe,
  adaptExistingRecipeStream,
  getUserInventory,
  getUserDietaryPreferences,
  updateUserDietaryPreferences,
  getAiChat,
  deleteAiChat,
  getAllUserChats
} from "../controllers/aiChat.controller.js";   
           


const router = express.Router();

router.post("/c/create",protectRoute,createChat);
router.get("/",protectRoute,getAllUserChats);
router.post("/:aiChatId/generate",protectRoute,generateRecipe);
router.post("/:aiChatId/generate-stream",protectRoute,generateRecipeStream);
router.post("/:aiChatId/generate-with-ingredients",protectRoute,generateRecipeWithIngredients);
router.post("/:aiChatId/generate-with-ingredients-stream",protectRoute,generateRecipeWithIngredientsStream);
router.post("/:aiChatId/adapt-recipe",protectRoute,adaptExistingRecipe);
router.post("/:aiChatId/adapt-recipe-stream",protectRoute,adaptExistingRecipeStream);
router.get("/inventory",protectRoute,getUserInventory);
router.get("/dietary-preferences",protectRoute,getUserDietaryPreferences);
router.put("/dietary-preferences",protectRoute,updateUserDietaryPreferences);
router.get("/:aiChatId",protectRoute,getAiChat);
router.delete("/:aiChatId",protectRoute,deleteAiChat);


export default router;
