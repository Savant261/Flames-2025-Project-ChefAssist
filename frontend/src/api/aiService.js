import axiosInstance from './axiosInstance';

class AiService {
  // Create a new AI chat session
  async createChat(title = "New Recipe Chat") {
    try {
      const response = await axiosInstance.post('/aiChats/c/create', { title });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create chat' };
    }
  }

  // Generate a recipe idea
  async generateRecipe(chatId, prompt, type = 'generate_recipe') {
    try {
        console.log(chatId,prompt,type)
      const response = await axiosInstance.post(`/aiChats/${chatId}/generate`, {
        prompt,
        type
      });
      console.log(response)
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to generate recipe' };
    }
  }

  // Generate recipe with available ingredients
  async generateRecipeWithIngredients(chatId, prompt, ingredients, useInventory = false) {
    try {
      const response = await axiosInstance.post(`/aiChats/${chatId}/generate-with-ingredients`, {
        prompt,
        ingredients,
        useInventory
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to generate recipe with ingredients' };
    }
  }

  // Adapt an existing recipe
  async adaptExistingRecipe(chatId, originalRecipe, adaptationRequest, recipeId = null) {
    try {
      const payload = {
        adaptationRequest
      };
      
      if (recipeId) {
        payload.recipeId = recipeId;
      } else {
        payload.originalRecipe = originalRecipe;
      }

      const response = await axiosInstance.post(`/aiChats/${chatId}/adapt-recipe`, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to adapt recipe' };
    }
  }

  // Get a single chat
  async getChat(chatId) {
    try {
      const response = await axiosInstance.get(`/aiChats/${chatId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get chat' };
    }
  }

  // Get all user chats
  async getUserChats(userId) {
    try {
      const response = await axiosInstance.get(`/aiChats/u/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user chats' };
    }
  }

  // Get all chats for current user (simpler method)
  async getAllChats() {
    try {
      const response = await axiosInstance.get('/aiChats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get all chats' };
    }
  }

  // Get user inventory and dietary preferences
  async getUserInventory() {
    try {
      const response = await axiosInstance.get('/aiChats/inventory');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user inventory' };
    }
  }

  // Get user dietary preferences only
  async getUserDietaryPreferences() {
    try {
      const response = await axiosInstance.get('/aiChats/dietary-preferences');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user dietary preferences' };
    }
  }

  // Update user dietary preferences
  async updateUserDietaryPreferences(dietaryPreferences) {
    try {
      const response = await axiosInstance.put('/aiChats/dietary-preferences', {
        dietaryPreferences
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user dietary preferences' };
    }
  }

  // Delete a chat
  async deleteChat(chatId) {
    try {
      const response = await axiosInstance.delete(`/aiChats/${chatId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete chat' };
    }
  }
}

export default new AiService();
