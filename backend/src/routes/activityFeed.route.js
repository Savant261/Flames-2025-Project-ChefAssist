import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createActivityPost,
  getUserActivityFeed,
  toggleLikeActivityPost,
  addCommentToActivityPost,
  deleteActivityPost,
  getPublicActivityFeed
} from "../controllers/activityFeed.controller.js";

const router = express.Router();

// Get public activity feed
router.get("/", getPublicActivityFeed);

// Get user's activity feed
router.get("/user/:userName", getUserActivityFeed);

// Create new activity post (protected)
router.post("/", protectRoute, createActivityPost);

// Toggle like on activity post (protected)
router.post("/:postId/like", protectRoute, toggleLikeActivityPost);

// Add comment to activity post (protected) 
router.post("/:postId/comment", protectRoute, addCommentToActivityPost);

// Delete activity post (protected)
router.delete("/:postId", protectRoute, deleteActivityPost);

export default router;
