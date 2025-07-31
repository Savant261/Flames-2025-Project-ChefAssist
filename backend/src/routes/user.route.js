import express from "express";
import {
  logout,
  signup,
  signin,
  chechAuth,
  updateProfile,
  updatePreference,
  getSettingsProfile,
  getAccountSettings,
  getPreference,
  changePassword,
  updateEmail,
  updatePhoneNumber,
  tooglePublicProfile,
  deleteAccount,
  getProfile,
  getPublicProfile,
  getUserRecipesByUsername,
  getSavedRecipe,
  addSavedRecipe,
  deleteSavedRecipe,
  updateProfilePhoto,
  toogleTheme,
  getInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  clearInventory
} from "../controllers/user.controller.js";
import { protectRoute, optionalAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);

router.get("/profile", protectRoute, getProfile);
router.get("/check", protectRoute, chechAuth);
router.get("/toogle-theme", protectRoute, toogleTheme);

// Public profile routes (optional auth for follow data)
router.get("/profile/:userName", optionalAuth, getPublicProfile);
router.get("/profile/:userName/recipes", optionalAuth, getUserRecipesByUsername);

router.get("/savedRecipe", protectRoute, getSavedRecipe);
router.post("/savedRecipe", protectRoute, addSavedRecipe);
router.delete("/savedRecipe/:recipeId", protectRoute, deleteSavedRecipe);

//settings
router.post("/update-profile-photo", protectRoute, updateProfilePhoto);
router.post("/update-profile", protectRoute, updateProfile);
router.get("/update-profile", protectRoute, getSettingsProfile);
router.get("/account-settings", protectRoute, getAccountSettings);
router.post("/update-Preference", protectRoute, updatePreference);
router.get("/update-Preference", protectRoute, getPreference);

router.post("/change-Password", protectRoute, changePassword);
router.post("/update-Email", protectRoute, updateEmail);
router.post("/update-PhoneNumber", protectRoute, updatePhoneNumber);
router.post("/public-Profile-toogle", protectRoute, tooglePublicProfile);
router.delete("/delete-Account", protectRoute, deleteAccount);

// Inventory routes
router.get("/inventory", protectRoute, getInventory);
router.post("/inventory", protectRoute, addInventoryItem);
router.put("/inventory/:itemId", protectRoute, updateInventoryItem);
router.delete("/inventory/:itemId", protectRoute, deleteInventoryItem);
router.delete("/inventory", protectRoute, clearInventory);

// notificaton & subscription
export default router;
