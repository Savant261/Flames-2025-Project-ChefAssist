import { AiChat } from "../models/aiChat.model.js";
import { User } from "../models/user.model.js";
import { Recipe } from "../models/recipe.model.js";
import { generateRecipeWithGemini } from "../utils/gemini.js";

// Create a new AI chat session
const createChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title } = req.body;
    const chat = await AiChat.create({
      user: userId,
      title: title || "New Recipe Chat",
      messages: []
    });
    return res.status(201).json(chat);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create chat", error: error.message });
  }
};

// Generate a recipe using Gemini AI
const generateRecipe = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const { prompt } = req.body;
    
    // Get the chat and user details
    const chat = await AiChat.findById(aiChatId).populate('user');
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    // Get user's dietary restrictions
    const user = await User.findById(chat.user._id);
    const dietaryRestrictions = user?.dietaryPreferences || [];

    // Add user message
    chat.messages.push({ role: "user", content: prompt });

    // Prepare data for Gemini AI based on type
    let aiData = {};
    let recipeType = 'generate_recipe';
    
    aiData = { recipeName: prompt };
    // Generate recipe using Gemini AI
    const geminiResponse = await generateRecipeWithGemini(recipeType, aiData, dietaryRestrictions);

    if (!geminiResponse.success) {
      return res.status(500).json({ 
        message: "Failed to generate recipe with AI", 
        error: geminiResponse.error 
      });
    }

    // Create AI response message
    const aiResponse = {
      role: "ai",
      content: geminiResponse.data.content || `Here's your ${recipeType.replace('_', ' ')} recipe:`,
      recipeData: geminiResponse.data,
      type: recipeType,
      dietaryRestrictions: dietaryRestrictions,
      timestamp: new Date()
    };

    chat.messages.push(aiResponse);
    await chat.save();

    res.status(200).json({
      message: "Recipe generated successfully",
      response: aiResponse,
      chatId: aiChatId
    });
  } catch (error) {
    console.error('Generate Recipe Error:', error);
    res.status(500).json({ 
      message: "Failed to generate recipe", 
      error: error.message 
    });
  }
};

// Get a single AI chat by ID
const getAiChat = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const chat = await AiChat.findById(aiChatId).populate("user", "name email");
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to get chat", error: error.message });
  }
};

// Delete an AI chat by ID
const deleteAiChat = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const chat = await AiChat.findByIdAndDelete(aiChatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json({ message: "Chat deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete chat", error: error.message });
  }
};

// Get all AI chats for a user
const getUserAiChat = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await AiChat.find({ user: userId }).sort({ updatedAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user chats", error: error.message });
  }
};


// Generate recipe with user's available ingredients
const generateRecipeWithIngredients = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const { prompt, ingredients, useInventory = false } = req.body;
    
    const chat = await AiChat.findById(aiChatId).populate('user');
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const user = await User.findById(chat.user._id);
    const dietaryRestrictions = user?.dietaryPreferences || [];

    let finalIngredients = [];

    // Determine which ingredients to use
    if (useInventory) {
      // Use ingredients from user's inventory
      const inventoryIngredients = user?.inventoryIngredient || [];
      finalIngredients = inventoryIngredients.map(item => item.name);
      
      // If additional ingredients are provided, merge them
      if (ingredients && ingredients.length > 0) {
        finalIngredients = [...new Set([...finalIngredients, ...ingredients])]; // Remove duplicates
      }
    } else {
      // Use only provided ingredients
      finalIngredients = ingredients || [];
    }

    if (finalIngredients.length === 0) {
      return res.status(400).json({ 
        message: "Please provide ingredients list or enable inventory usage" 
      });
    }

    // Add user message
    const userMessage = `Generate a recipe using these ingredients: ${finalIngredients.join(', ')}. ${prompt ? `Additional request: ${prompt}` : ''}`;
    chat.messages.push({ role: "user", content: userMessage });

    const aiData = { 
      ingredients: finalIngredients,
      recipeName: prompt || "Recipe with available ingredients"
    };

    const geminiResponse = await generateRecipeWithGemini('generate_with_ingredients', aiData, dietaryRestrictions);

    if (!geminiResponse.success) {
      return res.status(500).json({ 
        message: "Failed to generate recipe with AI", 
        error: geminiResponse.error 
      });
    }

    const aiResponse = {
      role: "ai",
      content: useInventory 
        ? "Here's a recipe I created using ingredients from your inventory:" 
        : "Here's a recipe I created using your provided ingredients:",
      recipeData: geminiResponse.data,
      type: 'generate_with_ingredients',
      usedInventory: useInventory,
      totalIngredients: finalIngredients.length,
      dietaryRestrictions: dietaryRestrictions,
      timestamp: new Date()
    };

    chat.messages.push(aiResponse);
    await chat.save();

    res.status(200).json({
      message: "Recipe generated successfully with your ingredients",
      response: aiResponse,
      chatId: aiChatId
    });
  } catch (error) {
    console.error('Generate Recipe with Ingredients Error:', error);
    res.status(500).json({ 
      message: "Failed to generate recipe with ingredients", 
      error: error.message 
    });
  }
};

// Adapt an existing recipe
const adaptExistingRecipe = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const { originalRecipe, recipeId, adaptationRequest } = req.body;
    
    const chat = await AiChat.findById(aiChatId).populate('user');
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const user = await User.findById(chat.user._id);
    const dietaryRestrictions = user?.dietaryPreferences || [];

    let recipeToAdapt;

    // Determine the source of the original recipe
    if (recipeId) {
      // Fetch recipe from platform by ID
      const platformRecipe = await Recipe.findById(recipeId).populate('author', 'username');
      if (!platformRecipe) {
        return res.status(404).json({ message: "Recipe not found on platform" });
      }

      // Convert platform recipe to adaptation format
      recipeToAdapt = {
        title: platformRecipe.title,
        description: platformRecipe.description,
        ingredients: platformRecipe.ingredients.map(ing => `${ing.quantity} ${ing.unit || ''} ${ing.name}`.trim()),
        instructions: platformRecipe.instructions.map(inst => inst.step),
        cookTime: platformRecipe.cookTime,
        servings: platformRecipe.servings,
        author: platformRecipe.author?.username || 'Unknown',
        source: 'platform',
        originalId: recipeId
      };
    } else if (originalRecipe) {
      // Use user-provided recipe
      if (!originalRecipe.title && !originalRecipe.ingredients) {
        return res.status(400).json({ 
          message: "Please provide a valid original recipe with at least title and ingredients" 
        });
      }

      recipeToAdapt = {
        title: originalRecipe.title || 'User Recipe',
        description: originalRecipe.description || '',
        ingredients: Array.isArray(originalRecipe.ingredients) ? originalRecipe.ingredients : [],
        instructions: Array.isArray(originalRecipe.instructions) ? originalRecipe.instructions : [],
        cookTime: originalRecipe.cookTime || '',
        servings: originalRecipe.servings || '',
        source: 'user-provided'
      };
    } else {
      return res.status(400).json({ 
        message: "Please provide either a recipe ID (for platform recipes) or original recipe details" 
      });
    }

    // Add user message
    const userMessage = `Adapt this recipe: "${recipeToAdapt.title}" ${recipeToAdapt.source === 'platform' ? '(from platform)' : '(user recipe)'}. ${adaptationRequest ? `Adaptation request: ${adaptationRequest}` : 'Please make it healthier and suitable for my dietary preferences.'}`;
    chat.messages.push({ role: "user", content: userMessage });

    const aiData = { 
      originalRecipe: recipeToAdapt,
      adaptationRequest: adaptationRequest || "Make this recipe healthier and suitable for dietary restrictions"
    };

    const geminiResponse = await generateRecipeWithGemini('adapt_recipe', aiData, dietaryRestrictions);

    if (!geminiResponse.success) {
      return res.status(500).json({ 
        message: "Failed to adapt recipe with AI", 
        error: geminiResponse.error 
      });
    }

    const aiResponse = {
      role: "ai",
      content: recipeToAdapt.source === 'platform' 
        ? `Here's your adapted version of "${recipeToAdapt.title}" from our platform:`
        : "Here's your adapted recipe with improvements:",
      recipeData: geminiResponse.data,
      type: 'adapt_recipe',
      originalRecipe: recipeToAdapt,
      adaptationSource: recipeToAdapt.source,
      originalRecipeId: recipeToAdapt.originalId || null,
      dietaryRestrictions: dietaryRestrictions,
      timestamp: new Date()
    };

    chat.messages.push(aiResponse);
    await chat.save();

    res.status(200).json({
      message: `Recipe adapted successfully from ${recipeToAdapt.source}`,
      response: aiResponse,
      chatId: aiChatId
    });
  } catch (error) {
    console.error('Adapt Recipe Error:', error);
    res.status(500).json({ 
      message: "Failed to adapt recipe", 
      error: error.message 
    });
  }
};

// Get user's inventory ingredients for recipe generation
const getUserInventory = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('inventoryIngredient dietaryPreferences');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      ingredients: user.inventoryIngredient || [],
      dietaryPreferences: user.dietaryPreferences || [],
      message: "User inventory retrieved successfully"
    });
  } catch (error) {
    console.error('Get User Inventory Error:', error);
    res.status(500).json({ 
      message: "Failed to get user inventory", 
      error: error.message 
    });
  }
};

export {createChat,generateRecipe,generateRecipeWithIngredients,adaptExistingRecipe,getUserInventory,getAiChat,deleteAiChat,getUserAiChat}