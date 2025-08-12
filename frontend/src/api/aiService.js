import axiosInstance from './axiosInstance';

class AiService {
  // Helper method to get streaming URL
  _getStreamingUrl(endpoint) {
    return axiosInstance.defaults.baseURL + endpoint;
  }

  // Helper method to handle streaming responses
  async _handleStreamResponse(response, onChunk, onComplete, onError) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'connected') {
                console.log('Stream connected');
              } else if (data.type === 'start') {
                console.log('Recipe generation started');
              } else if (data.type === 'chunk') {
                onChunk && onChunk(data);
              } else if (data.type === 'complete') {
                onComplete && onComplete(data);
                return;
              } else if (data.type === 'error') {
                onError && onError(new Error(data.message));
                return;
              }
            } catch (parseError) {
              console.error('Error parsing stream data:', parseError, 'Line:', line);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  // Create a new AI chat session
  async createChat(title = "New Recipe Chat") {
    try {
      const response = await axiosInstance.post('/aiChats/c/create', { title });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create chat' };
    }
  }

  // Generate a recipe idea with streaming
  async generateRecipeStream(chatId, prompt, type = 'generate_recipe', onChunk, onComplete, onError) {
    try {
      const response = await fetch(this._getStreamingUrl(`/aiChats/${chatId}/generate-stream`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        credentials: 'include',
        body: JSON.stringify({
          prompt,
          type
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return this._handleStreamResponse(response, onChunk, onComplete, onError);

    } catch (error) {
      console.error('Error in recipe stream:', error);
      onError && onError(error);
      throw error;
    }
  }

  // Generate a recipe idea (non-streaming fallback)
  async generateRecipe(chatId, prompt, type = 'generate_recipe') {
    try {
      const response = await axiosInstance.post(`/aiChats/${chatId}/generate`, {
        prompt,
        type
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to generate recipe' };
    }
  }

  // Generate recipe with available ingredients (STREAMING VERSION)
  async generateRecipeWithIngredientsStream(chatId, prompt, ingredients, useInventory = false, onChunk, onComplete, onError) {
    try {
      const response = await fetch(this._getStreamingUrl(`/aiChats/${chatId}/generate-with-ingredients-stream`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        credentials: 'include',
        body: JSON.stringify({
          prompt,
          ingredients,
          useInventory
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return this._handleStreamResponse(response, onChunk, onComplete, onError);

    } catch (error) {
      console.error('Error in ingredients recipe stream:', error);
      onError && onError(error);
      throw error;
    }
  }

  // Generate recipe with available ingredients (non-streaming)
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

  // Adapt an existing recipe (STREAMING VERSION)
  async adaptExistingRecipeStream(chatId, originalRecipe, adaptationRequest, recipeId = null, onChunk, onComplete, onError) {
    try {
      const payload = {
        adaptationRequest
      };
      
      if (recipeId) {
        payload.recipeId = recipeId;
      } else {
        payload.originalRecipe = originalRecipe;
      }

      const response = await fetch(this._getStreamingUrl(`/aiChats/${chatId}/adapt-recipe-stream`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return this._handleStreamResponse(response, onChunk, onComplete, onError);

    } catch (error) {
      console.error('Error in adapt recipe stream:', error);
      onError && onError(error);
      throw error;
    }
  }

  // Adapt an existing recipe (non-streaming)
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
