import axiosInstance from './axiosInstance.js';

/**
 * User Service for handling user-related API calls including inventory management
 */
class UserService {
  
  // ===================
  // INVENTORY METHODS
  // ===================
  
  /**
   * Get all inventory items for the current user
   */
  async getInventory() {
    try {
      const response = await axiosInstance.get('/auth/inventory');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch inventory' };
    }
  }

  /**
   * Add a new inventory item
   * @param {Object} item - The inventory item to add
   * @param {string} item.name - Name of the ingredient
   * @param {number} item.qty - Quantity
   * @param {string} item.qtyName - Unit of measurement
   * @param {string} item.expiryDate - Expiry date (optional)
   */
  async addInventoryItem(item) {
    try {
      const response = await axiosInstance.post('/auth/inventory', item);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add inventory item' };
    }
  }

  /**
   * Update an existing inventory item
   * @param {string} itemId - The ID of the item to update
   * @param {Object} item - Updated item data
   */
  async updateInventoryItem(itemId, item) {
    try {
      const response = await axiosInstance.put(`/auth/inventory/${itemId}`, item);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update inventory item' };
    }
  }

  /**
   * Delete a specific inventory item
   * @param {string} itemId - The ID of the item to delete
   */
  async deleteInventoryItem(itemId) {
    try {
      const response = await axiosInstance.delete(`/auth/inventory/${itemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete inventory item' };
    }
  }

  /**
   * Clear all inventory items
   */
  async clearInventory() {
    try {
      const response = await axiosInstance.delete('/auth/inventory');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to clear inventory' };
    }
  }

  // ===================
  // USER PROFILE METHODS
  // ===================
  
  /**
   * Get user profile
   */
  async getProfile() {
    try {
      const response = await axiosInstance.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  }

  /**
   * Get public profile by username
   */
  async getPublicProfile(userName) {
    try {
      const response = await axiosInstance.get(`/auth/profile/${userName}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch public profile' };
    }
  }

  /**
   * Get user recipes by username
   */
  async getUserRecipesByUsername(userName, params = {}) {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await axiosInstance.get(`/auth/profile/${userName}/recipes?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user recipes' };
    }
  }

  /**
   * Get public profile by username
   */
  async getPublicProfile(userName) {
    try {
      const response = await axiosInstance.get(`/auth/profile/${userName}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch public profile' };
    }
  }

  /**
   * Get user recipes by username
   */
  async getUserRecipesByUsername(userName, params = {}) {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await axiosInstance.get(`/auth/profile/${userName}/recipes?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user recipes' };
    }
  }

  /**
   * Get user settings profile
   */
  async getSettingsProfile() {
    try {
      const response = await axiosInstance.get('/auth/update-profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch settings profile' };
    }
  }

  /**
   * Get account settings (email, phone, public profile status)
   */
  async getAccountSettings() {
    try {
      const response = await axiosInstance.get('/auth/account-settings');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch account settings' };
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData) {
    try {
      const response = await axiosInstance.post('/auth/update-profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  }

  // ===================
  // SAVED RECIPES METHODS
  // ===================
  
  /**
   * Get saved recipes
   */
  async getSavedRecipes() {
    try {
      const response = await axiosInstance.get('/auth/savedRecipe');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch saved recipes' };
    }
  }

  /**
   * Add a recipe to saved recipes
   */
  async addSavedRecipe(recipe) {
    try {
      const response = await axiosInstance.post('/auth/savedRecipe', recipe);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to save recipe' };
    }
  }

  /**
   * Remove a recipe from saved recipes
   */
  async deleteSavedRecipe(recipeId) {
    try {
      const response = await axiosInstance.delete(`/auth/savedRecipe/${recipeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to remove saved recipe' };
    }
  }

  // ===================
  // THEME & PREFERENCES
  // ===================
  
  /**
   * Toggle user theme
   */
  async toggleTheme() {
    try {
      const response = await axiosInstance.get('/auth/toogle-theme');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to toggle theme' };
    }
  }

  /**
   * Get user preferences
   */
  async getPreferences() {
    try {
      const response = await axiosInstance.get('/auth/update-Preference');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch preferences' };
    }
  }

  /**
   * Update user preferences
   */
  async updatePreferences(preferences) {
    try {
      const response = await axiosInstance.post('/auth/update-Preference', preferences);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update preferences' };
    }
  }
}

// Export a singleton instance
const userService = new UserService();
export default userService;
