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
  changePassword,
  updateEmail,
  updatePhoneNumber,
  tooglePublicProfile,
  deleteAccount
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

router.get("/change-Password", protectRoute, changePassword); 
router.get("/update-Email", protectRoute, updateEmail); 
router.get("/update-PhoneNumber", protectRoute, updatePhoneNumber); 
router.get("/public-Profile-toogle", protectRoute, tooglePublicProfile); 
router.get("/delete-Account", protectRoute, deleteAccount); 

// notificaton & subscription 
export default router;
