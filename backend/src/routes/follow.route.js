import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  followUser,
  unfollowUser,
  getFollowStatus,
  getFollowers,
  getFollowing,
  getMutualFollowers
} from "../controllers/follow.controller.js";

const router = Router();

// Follow/Unfollow routes
router.post("/follow/:userIdToFollow", protectRoute, followUser);
router.delete("/unfollow/:userIdToUnfollow", protectRoute, unfollowUser);

// Get follow status
router.get("/status/:userId", protectRoute, getFollowStatus);

// Get followers and following
router.get("/followers/:userId", protectRoute, getFollowers);
router.get("/following/:userId", protectRoute, getFollowing);
router.get("/mutual/:userId", protectRoute, getMutualFollowers);

export default router;
