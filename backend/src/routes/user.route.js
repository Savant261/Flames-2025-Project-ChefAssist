import express from "express";
import {
  logout,
  signup,
  signin,
  chechAuth,
  updateProfile,
  updatePreference,
  getProfile,
  getPreference,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/check", protectRoute, chechAuth);
router.post("/update-profile", protectRoute, updateProfile);
router.get("/update-profile", protectRoute, getProfile);
router.post("/update-Preference", protectRoute, updatePreference);
router.get("/update-Preference", protectRoute, getPreference); 

export default router;
