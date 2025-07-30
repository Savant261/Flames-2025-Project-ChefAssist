import axiosInstance from './axiosInstance';

// Recipe API Service
export const recipeService = {
  // Step 1: Create recipe with image
  createRecipe: async (imageData) => {
    try {
      const response = await axiosInstance.post('/recipes/', {
        image: imageData
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create recipe');
    }
  },

  // Steps 2-4: Update recipe details
  updateRecipe: async (recipeId, recipeData) => {
    try {
      const response = await axiosInstance.put(`/recipes/${recipeId}`, recipeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update recipe');
    }
  },

  // Get recipe by ID
  getRecipe: async (recipeId) => {
    try {
      const response = await axiosInstance.get(`/recipes/${recipeId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch recipe');
    }
  },

  // Validate recipe before publishing
  validateRecipe: async (recipeId) => {
    try {
      const response = await axiosInstance.get(`/recipes/${recipeId}/validate`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to validate recipe');
    }
  },

  // Publish recipe
  publishRecipe: async (recipeId) => {
    try {
      const response = await axiosInstance.post(`/recipes/${recipeId}/publish`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to publish recipe');
    }
  },

  // Get user's recipes
  getUserRecipes: async (status = 'all') => {
    try {
      const response = await axiosInstance.get(`/recipes/my-recipes?status=${status}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user recipes');
    }
  },

  // Get all public recipes
  getAllPublicRecipes: async (page = 1, limit = 10, search = '', tags = '') => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(tags && { tags })
      });
      
      const response = await axiosInstance.get(`/recipes?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch recipes');
    }
  },

  // Delete recipe
  deleteRecipe: async (recipeId) => {
    try {
      const response = await axiosInstance.delete(`/recipes/${recipeId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete recipe');
    }
  }
};

// Utility function to convert file to base64
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
