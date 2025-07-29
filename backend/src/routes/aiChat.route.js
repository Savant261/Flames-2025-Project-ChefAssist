import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";


import{
  createChat,
  generateRecipe,
  getAiChat,
  deleteAiChat,
  getUserAiChat
} from "../controllers/aiChat.controller.js";   
          


const router = express.Router();

router.post("/create",protectRoute,createChat);
router.post("/:aiChatId",protectRoute,generateRecipe);
router.get("/:aiChatId",protectRoute,getAiChat);
router.delete("/:aiChatId",protectRoute,deleteAiChat);
router.get("/u/:userId",protectRoute,getUserAiChat);


export default router;
