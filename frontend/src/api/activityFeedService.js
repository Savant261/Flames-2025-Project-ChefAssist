import axiosInstance from './axiosInstance';

/**
 * Activity Feed Service for handling activity feed related API calls
 */
class ActivityFeedService {
  /**
   * Get public activity feed
   */
  async getPublicActivityFeed(params = {}) {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await axiosInstance.get(`/activity?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch activity feed' };
    }
  }

  /**
   * Get user's activity feed
   */
  async getUserActivityFeed(userName, params = {}) {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await axiosInstance.get(`/activity/user/${userName}?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user activity feed' };
    }
  }

  /**
   * Create new activity post
   */
  async createActivityPost(postData) {
    try {
      const response = await axiosInstance.post('/activity', postData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create activity post' };
    }
  }

  /**
   * Toggle like on activity post
   */
  async toggleLikeActivityPost(postId) {
    try {
      const response = await axiosInstance.post(`/activity/${postId}/like`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to toggle like' };
    }
  }

  /**
   * Add comment to activity post
   */
  async addCommentToActivityPost(postId, commentData) {
    try {
      const response = await axiosInstance.post(`/activity/${postId}/comment`, commentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add comment' };
    }
  }

  /**
   * Delete activity post
   */
  async deleteActivityPost(postId) {
    try {
      const response = await axiosInstance.delete(`/activity/${postId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete post' };
    }
  }
}

export default new ActivityFeedService();
