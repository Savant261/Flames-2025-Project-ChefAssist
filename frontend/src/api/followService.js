import axiosInstance from './axiosInstance';

// Follow a user
export const followUser = async (userIdToFollow) => {
  try {
    const response = await axiosInstance.post(`/follow/follow/${userIdToFollow}`);
    return response.data;
  } catch (error) {
    console.error('Error following user:', error);
    throw error.response?.data || error;
  }
};

// Unfollow a user
export const unfollowUser = async (userIdToUnfollow) => {
  try {
    const response = await axiosInstance.delete(`/follow/unfollow/${userIdToUnfollow}`);
    return response.data;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error.response?.data || error;
  }
};

// Get follow status
export const getFollowStatus = async (userId) => {
  try {
    const response = await axiosInstance.get(`/follow/status/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting follow status:', error);
    throw error.response?.data || error;
  }
};

// Get followers list
export const getFollowers = async (userId, page = 1, limit = 20) => {
  try {
    const response = await axiosInstance.get(`/follow/followers/${userId}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error getting followers:', error);
    throw error.response?.data || error;
  }
};

// Get following list
export const getFollowing = async (userId, page = 1, limit = 20) => {
  try {
    const response = await axiosInstance.get(`/follow/following/${userId}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error getting following:', error);
    throw error.response?.data || error;
  }
};

// Get mutual followers
export const getMutualFollowers = async (userId) => {
  try {
    const response = await axiosInstance.get(`/follow/mutual/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting mutual followers:', error);
    throw error.response?.data || error;
  }
};

const followService = {
  followUser,
  unfollowUser,
  getFollowStatus,
  getFollowers,
  getFollowing,
  getMutualFollowers
};

export default followService;
