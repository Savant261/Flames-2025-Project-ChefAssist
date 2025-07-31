import { Follow } from "../models/follow.model.js";
import { User } from "../models/user.model.js";

// Follow a user
const followUser = async (req, res) => {
  try {
    const { userIdToFollow } = req.params;
    const currentUserId = req.user._id;

    // Check if trying to follow themselves
    if (currentUserId.toString() === userIdToFollow) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Check if user to follow exists
    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
      follower: currentUserId,
      following: userIdToFollow
    });

    if (existingFollow) {
      return res.status(400).json({ message: "Already following this user" });
    }

    // Create follow relationship
    const follow = new Follow({
      follower: currentUserId,
      following: userIdToFollow
    });

    await follow.save();

    // Get updated follower/following counts
    const followerCount = await Follow.countDocuments({ following: userIdToFollow });
    const followingCount = await Follow.countDocuments({ follower: userIdToFollow });

    return res.status(201).json({
      message: "Successfully followed user",
      isFollowing: true,
      followerCount,
      followingCount
    });
  } catch (error) {
    console.log("Error in followUser controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  try {
    const { userIdToUnfollow } = req.params;
    const currentUserId = req.user._id;

    // Find and delete the follow relationship
    const follow = await Follow.findOneAndDelete({
      follower: currentUserId,
      following: userIdToUnfollow
    });

    if (!follow) {
      return res.status(404).json({ message: "You are not following this user" });
    }

    // Get updated follower/following counts
    const followerCount = await Follow.countDocuments({ following: userIdToUnfollow });
    const followingCount = await Follow.countDocuments({ follower: userIdToUnfollow });

    return res.status(200).json({
      message: "Successfully unfollowed user",
      isFollowing: false,
      followerCount,
      followingCount
    });
  } catch (error) {
    console.log("Error in unfollowUser controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Check if current user is following a specific user
const getFollowStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    const isFollowing = await Follow.findOne({
      follower: currentUserId,
      following: userId
    });

    // Get follower/following counts for the user
    const followerCount = await Follow.countDocuments({ following: userId });
    const followingCount = await Follow.countDocuments({ follower: userId });

    return res.status(200).json({
      isFollowing: !!isFollowing,
      followerCount,
      followingCount
    });
  } catch (error) {
    console.log("Error in getFollowStatus controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get followers of a user
const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const followers = await Follow.find({ following: userId })
      .populate("follower", "username fullName avatar")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Follow.countDocuments({ following: userId });

    return res.status(200).json({
      followers: followers.map(f => f.follower),
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.log("Error in getFollowers controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get users that a user is following
const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const following = await Follow.find({ follower: userId })
      .populate("following", "username fullName avatar")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Follow.countDocuments({ follower: userId });

    return res.status(200).json({
      following: following.map(f => f.following),
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.log("Error in getFollowing controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get mutual followers
const getMutualFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    // Get current user's following list
    const currentUserFollowing = await Follow.find({ follower: currentUserId }).select('following');
    const currentUserFollowingIds = currentUserFollowing.map(f => f.following);

    // Get target user's followers
    const targetUserFollowers = await Follow.find({ following: userId }).select('follower');
    const targetUserFollowerIds = targetUserFollowers.map(f => f.follower);

    // Find mutual followers (people current user follows who also follow the target user)
    const mutualFollowerIds = currentUserFollowingIds.filter(id =>
      targetUserFollowerIds.some(targetId => targetId.toString() === id.toString())
    );

    // Get user details for mutual followers
    const mutualFollowers = await User.find({
      _id: { $in: mutualFollowerIds }
    }).select('username fullName avatar');

    return res.status(200).json({
      mutualFollowers,
      count: mutualFollowers.length
    });
  } catch (error) {
    console.log("Error in getMutualFollowers controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  followUser,
  unfollowUser,
  getFollowStatus,
  getFollowers,
  getFollowing,
  getMutualFollowers
};
