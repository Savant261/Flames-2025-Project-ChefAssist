import express from "express";
import {
  logout,
  signup,
  signin,
  chechAuth,
  updateProfile,
  updatePreference
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/check", protectRoute, chechAuth);
router.post("/update-profile",protectRoute,updateProfile);
router.post("/update-Preference",protectRoute,updatePreference);

export default router;
