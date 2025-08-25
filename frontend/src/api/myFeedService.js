import axiosInstance from './axiosInstance';

// Get personalized feed
export const getMyFeed = async (page = 1, limit = 10, type = 'all') => {
  try {
    const response = await axiosInstance.get('/myfeed', {
      params: { page, limit, type }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get followed chefs
export const getFollowedChefs = async () => {
  try {
    const response = await axiosInstance.get('/myfeed/chefs');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get recipes by specific chef
export const getChefRecipes = async (chefId, page = 1, limit = 12) => {
  try {
    const response = await axiosInstance.get(`/myfeed/chef/${chefId}/recipes`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get activities from followed users
export const getFollowedActivities = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get('/myfeed/activities', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
