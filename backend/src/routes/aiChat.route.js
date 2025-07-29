import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/aiChat/create",createChat);
router.post("/aiChat/:aiChatId",generateRecipe);
router.get("/aiChat/:aiChatId",getAiChat);
router.delete("/aiChat/:aiChatId",deleteAiChat);
router.get("/aiChat/:userId",getUserAiChat);



export default router;
