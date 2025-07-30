import axiosInstance from './axiosInstance';

class AiService {
  // Create a new AI chat session
  async createChat(title = "New Recipe Chat") {
    try {
      const response = await axiosInstance.post('/aichats/create', { title });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create chat' };
    }
  }

  // Generate a recipe idea
  async generateRecipe(chatId, prompt, type = 'generate_recipe') {
    try {
      const response = await axiosInstance.post(`/aichats/${chatId}/generate`, {
        prompt,
        type
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to generate recipe' };
    }
  }

  // Generate recipe with available ingredients
  async generateRecipeWithIngredients(chatId, prompt, ingredients, useInventory = false) {
    try {
      const response = await axiosInstance.post(`/aichats/${chatId}/generate-with-ingredients`, {
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

      const response = await axiosInstance.post(`/aichats/${chatId}/adapt-recipe`, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to adapt recipe' };
    }
  }

  // Get a single chat
  async getChat(chatId) {
    try {
      const response = await axiosInstance.get(`/aichats/${chatId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get chat' };
    }
  }

  // Get all user chats
  async getUserChats(userId) {
    try {
      const response = await axiosInstance.get(`/aichats/u/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user chats' };
    }
  }

  // Get user inventory and dietary preferences
  async getUserInventory() {
    try {
      const response = await axiosInstance.get('/aichats/inventory');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user inventory' };
    }
  }

  // Delete a chat
  async deleteChat(chatId) {
    try {
      const response = await axiosInstance.delete(`/aichats/${chatId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete chat' };
    }
  }
}

export default new AiService();
