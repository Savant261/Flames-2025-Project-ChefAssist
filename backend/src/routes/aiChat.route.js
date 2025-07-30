import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";


import{
  createChat,
  generateRecipe,
  generateRecipeWithIngredients,
  adaptExistingRecipe,
  getUserInventory,
  getAiChat,
  deleteAiChat,
  getUserAiChat
} from "../controllers/aiChat.controller.js";   
           


const router = express.Router();

router.post("/c/create",protectRoute,createChat);
router.post("/:aiChatId/generate",protectRoute,generateRecipe);
router.post("/:aiChatId/generate-with-ingredients",protectRoute,generateRecipeWithIngredients);
router.post("/:aiChatId/adapt-recipe",protectRoute,adaptExistingRecipe);
router.get("/inventory",protectRoute,getUserInventory);
router.get("/:aiChatId",protectRoute,getAiChat);
router.delete("/:aiChatId",protectRoute,deleteAiChat);
router.get("/u/:userId",protectRoute,getUserAiChat);


export default router;
