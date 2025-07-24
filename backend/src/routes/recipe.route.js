import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/recipe/:recipeId");

export default router;
