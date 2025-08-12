import { AiChat } from "../models/aiChat.model.js";
import { User } from "../models/user.model.js";
import { Recipe } from "../models/recipe.model.js";
import { generateRecipeWithGemini, generateRecipeStreamWithGemini } from "../utils/gemini.js";

// Create a new AI chat session
const createChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title } = req.body;
    const chat = await AiChat.create({
      user: userId,
      title: title || "New Recipe Chat",
      messages: [],
    });
    return res.status(201).json(chat);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create chat", error: error.message });
  }
};

// Generate a recipe using Gemini AI with streaming
const generateRecipeStream = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const { prompt, type } = req.body;

    // Set up Server-Sent Events headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Cache-Control, Content-Type, Authorization'
    });

    // Send initial connection confirmation
    res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);

    // Parallel operations for better performance
    const [chat, user] = await Promise.all([
      AiChat.findById(aiChatId).populate("user"),
      User.findById(req.user._id).select("dietaryPreferences")
    ]);

    if (!chat) {
      res.write(`data: ${JSON.stringify({ type: 'error', message: "Chat not found" })}\n\n`);
      res.end();
      return;
    }

    // Get user's dietary restrictions from the parallel query
    const dietaryRestrictions = user?.dietaryPreferences || [];

    // Add user message first (optimistic update)
    chat.messages.push({ role: "user", content: prompt });
    await chat.save();

    // Send start message
    res.write(`data: ${JSON.stringify({ 
      type: 'start', 
      message: 'Starting recipe generation...',
      chatId: aiChatId 
    })}\n\n`);

    // Prepare data for Gemini AI
    const aiData = { recipeName: prompt };
    const recipeType = "generate_recipe";

    let fullResponse = '';
    let finalRecipeData = null;

    // Generate recipe with streaming
    const streamResult = await generateRecipeStreamWithGemini(
      recipeType, 
      aiData, 
      dietaryRestrictions,
      (streamData) => {
        if (streamData.error) {
          res.write(`data: ${JSON.stringify({ 
            type: 'error', 
            message: streamData.message 
          })}\n\n`);
          return;
        }

        if (streamData.isComplete) {
          // Final response
          finalRecipeData = streamData.finalData;
          fullResponse = streamData.fullText;
          
          res.write(`data: ${JSON.stringify({ 
            type: 'complete',
            data: finalRecipeData,
            fullText: fullResponse
          })}\n\n`);
        } else {
          // Streaming chunk
          res.write(`data: ${JSON.stringify({ 
            type: 'chunk',
            chunk: streamData.chunk,
            fullText: streamData.fullText,
            isFirstChunk: streamData.isFirstChunk
          })}\n\n`);
        }
      }
    );

    // Save the final AI response to chat
    if (streamResult.success && streamResult.data) {
      const aiResponse = {
        role: "ai",
        content: streamResult.data.content || `Here's your recipe:`,
        recipeData: streamResult.data,
        type: recipeType,
        dietaryRestrictions: dietaryRestrictions,
        timestamp: new Date(),
      };

      chat.messages.push(aiResponse);
      await chat.save();
    }

    res.end();

  } catch (error) {
    console.error("Generate Recipe Stream Error:", error);
    try {
      res.write(`data: ${JSON.stringify({ 
        type: 'error', 
        message: error.message || 'Failed to generate recipe' 
      })}\n\n`);
      res.end();
    } catch (writeError) {
      console.error("Error writing to response:", writeError);
    }
  }
};

// Generate a recipe using Gemini AI (non-streaming fallback)
const generateRecipe = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const { prompt } = req.body;

    // Get the chat and user details
    const chat = await AiChat.findById(aiChatId).populate("user");
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    // Get user's dietary restrictions
    const user = await User.findById(chat.user._id);
    const dietaryRestrictions = user?.dietaryPreferences || [];

    // Add user message
    chat.messages.push({ role: "user", content: prompt });

    // Prepare data for Gemini AI based on type
    let aiData = {};
    let recipeType = "generate_recipe";

    aiData = { recipeName: prompt };
    // Generate recipe using Gemini AI
    const geminiResponse = await generateRecipeWithGemini(
      recipeType,
      aiData,
      dietaryRestrictions
    );

    if (!geminiResponse.success) {
      return res.status(500).json({
        message: "Failed to generate recipe with AI",
        error: geminiResponse.error,
      });
    }

    // Create AI response message
    const aiResponse = {
      role: "ai",
      content:
        geminiResponse.data.content ||
        `Here's your ${recipeType.replace("_", " ")} recipe:`,
      recipeData: geminiResponse.data,
      type: recipeType,
      dietaryRestrictions: dietaryRestrictions,
      timestamp: new Date(),
    };

    chat.messages.push(aiResponse);
    await chat.save();

    return res.status(200).json({
      message: "Recipe generated successfully",
      response: aiResponse,
      chatId: aiChatId,
    });
  } catch (error) {
    console.error("Generate Recipe Error:", error);
    return res.status(500).json({
      message: "Failed to generate recipe",
      error: error.message,
    });
  }
};

// Get a single AI chat by ID
const getAiChat = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const chat = await AiChat.findById(aiChatId).populate("user", "name email");
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    return res.status(200).json(chat);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get chat", error: error.message });
  }
};

// Delete an AI chat by ID
const deleteAiChat = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const chat = await AiChat.findByIdAndDelete(aiChatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    return res.status(200).json({ message: "Chat deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete chat", error: error.message });
  }
};

// Get all AI chats for current user (from auth middleware)
const getAllUserChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await AiChat.find({ user: userId }).sort({ updatedAt: -1 });
    return res.status(200).json(chats);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get all user chats", error: error.message });
  }
};

// Generate recipe with user's available ingredients
const generateRecipeWithIngredients = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const { prompt, ingredients, useInventory = false } = req.body;

    const chat = await AiChat.findById(aiChatId).populate("user");
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const user = await User.findById(chat.user._id);
    const dietaryRestrictions = user?.dietaryPreferences || [];

    let finalIngredients = [];

    // Determine which ingredients to use
    if (useInventory) {
      // Use ingredients from user's inventory
      const inventoryIngredients = user?.inventoryIngredient || [];
      finalIngredients = inventoryIngredients.map((item) => item.name);

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
        message: "Please provide ingredients list or enable inventory usage",
      });
    }

    // Add user message
    const userMessage = `Generate a recipe using these ingredients: ${finalIngredients.join(
      ", "
    )}. ${prompt ? `Additional request: ${prompt}` : ""}`;
    chat.messages.push({ role: "user", content: userMessage });

    const aiData = {
      ingredients: finalIngredients,
      recipeName: prompt || "Recipe with available ingredients",
    };

    const geminiResponse = await generateRecipeWithGemini(
      "generate_with_ingredients",
      aiData,
      dietaryRestrictions
    );

    if (!geminiResponse.success) {
      return res.status(500).json({
        message: "Failed to generate recipe with AI",
        error: geminiResponse.error,
      });
    }

    const aiResponse = {
      role: "ai",
      content: useInventory
        ? "Here's a recipe I created using ingredients from your inventory:"
        : "Here's a recipe I created using your provided ingredients:",
      recipeData: geminiResponse.data,
      type: "generate_with_ingredients",
      usedInventory: useInventory,
      totalIngredients: finalIngredients.length,
      dietaryRestrictions: dietaryRestrictions,
      timestamp: new Date(),
    };

    chat.messages.push(aiResponse);
    await chat.save();

    return res.status(200).json({
      message: "Recipe generated successfully with your ingredients",
      response: aiResponse,
      chatId: aiChatId,
    });
  } catch (error) {
    console.error("Generate Recipe with Ingredients Error:", error);
    return res.status(500).json({
      message: "Failed to generate recipe with ingredients",
      error: error.message,
    });
  }
};

// Adapt an existing recipe
const adaptExistingRecipe = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const { originalRecipe, recipeId, adaptationRequest } = req.body;

    const chat = await AiChat.findById(aiChatId).populate("user");
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const user = await User.findById(chat.user._id);
    const dietaryRestrictions = user?.dietaryPreferences || [];

    let recipeToAdapt;

    // Determine the source of the original recipe
    if (recipeId) {
      // Fetch recipe from platform by ID
      const platformRecipe = await Recipe.findById(recipeId).populate(
        "author",
        "username"
      );
      if (!platformRecipe) {
        return res
          .status(404)
          .json({ message: "Recipe not found on platform" });
      }

      // Convert platform recipe to adaptation format
      recipeToAdapt = {
        title: platformRecipe.title,
        description: platformRecipe.description,
        ingredients: platformRecipe.ingredients.map((ing) =>
          `${ing.quantity} ${ing.unit || ""} ${ing.name}`.trim()
        ),
        instructions: platformRecipe.instructions.map((inst) => inst.step),
        cookTime: platformRecipe.cookTime,
        servings: platformRecipe.servings,
        author: platformRecipe.author?.username || "Unknown",
        source: "platform",
        originalId: recipeId,
      };
    } else if (originalRecipe) {
      // Use user-provided recipe
      if (!originalRecipe.title && !originalRecipe.ingredients) {
        return res.status(400).json({
          message:
            "Please provide a valid original recipe with at least title and ingredients",
        });
      }

      recipeToAdapt = {
        title: originalRecipe.title || "User Recipe",
        description: originalRecipe.description || "",
        ingredients: Array.isArray(originalRecipe.ingredients)
          ? originalRecipe.ingredients
          : [],
        instructions: Array.isArray(originalRecipe.instructions)
          ? originalRecipe.instructions
          : [],
        cookTime: originalRecipe.cookTime || "",
        servings: originalRecipe.servings || "",
        source: "user-provided",
      };
    } else {
      return res.status(400).json({
        message:
          "Please provide either a recipe ID (for platform recipes) or original recipe details",
      });
    }

    // Add user message
    const userMessage = `Adapt this recipe: "${recipeToAdapt.title}" ${
      recipeToAdapt.source === "platform" ? "(from platform)" : "(user recipe)"
    }. ${
      adaptationRequest
        ? `Adaptation request: ${adaptationRequest}`
        : "Please make it healthier and suitable for my dietary preferences."
    }`;
    chat.messages.push({ role: "user", content: userMessage });

    const aiData = {
      originalRecipe: recipeToAdapt,
      adaptationRequest:
        adaptationRequest ||
        "Make this recipe healthier and suitable for dietary restrictions",
    };

    const geminiResponse = await generateRecipeWithGemini(
      "adapt_recipe",
      aiData,
      dietaryRestrictions
    );

    if (!geminiResponse.success) {
      return res.status(500).json({
        message: "Failed to adapt recipe with AI",
        error: geminiResponse.error,
      });
    }

    const aiResponse = {
      role: "ai",
      content:
        recipeToAdapt.source === "platform"
          ? `Here's your adapted version of "${recipeToAdapt.title}" from our platform:`
          : "Here's your adapted recipe with improvements:",
      recipeData: geminiResponse.data,
      type: "adapt_recipe",
      originalRecipe: recipeToAdapt,
      adaptationSource: recipeToAdapt.source,
      originalRecipeId: recipeToAdapt.originalId || null,
      dietaryRestrictions: dietaryRestrictions,
      timestamp: new Date(),
    };

    chat.messages.push(aiResponse);
    await chat.save();

    return res.status(200).json({
      message: `Recipe adapted successfully from ${recipeToAdapt.source}`,
      response: aiResponse,
      chatId: aiChatId,
    });
  } catch (error) {
    console.error("Adapt Recipe Error:", error);
    return res.status(500).json({
      message: "Failed to adapt recipe",
      error: error.message,
    });
  }
};

// Generate recipe with user's available ingredients (STREAMING VERSION)
const generateRecipeWithIngredientsStream = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const { prompt, ingredients, useInventory = false } = req.body;

    // Set up Server-Sent Events headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Cache-Control, Content-Type, Authorization'
    });

    // Send initial connection confirmation
    res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);

    // Parallel operations for better performance
    const [chat, user] = await Promise.all([
      AiChat.findById(aiChatId).populate("user"),
      User.findById(req.user._id).select("dietaryPreferences inventoryIngredient")
    ]);

    if (!chat) {
      res.write(`data: ${JSON.stringify({ type: 'error', message: "Chat not found" })}\n\n`);
      res.end();
      return;
    }

    // Get user's dietary restrictions
    const dietaryRestrictions = user?.dietaryPreferences || [];

    let finalIngredients = [];

    // Determine which ingredients to use
    if (useInventory) {
      // Use ingredients from user's inventory
      const inventoryIngredients = user?.inventoryIngredient || [];
      finalIngredients = inventoryIngredients.map((item) => item.name);

      // If additional ingredients are provided, merge them
      if (ingredients && ingredients.length > 0) {
        finalIngredients = [...new Set([...finalIngredients, ...ingredients])]; // Remove duplicates
      }
    } else {
      // Use only provided ingredients
      finalIngredients = ingredients || [];
    }

    if (finalIngredients.length === 0) {
      res.write(`data: ${JSON.stringify({ 
        type: 'error', 
        message: "Please provide ingredients list or enable inventory usage" 
      })}\n\n`);
      res.end();
      return;
    }

    // Add user message first (optimistic update)
    const userMessage = `Generate a recipe using these ingredients: ${finalIngredients.join(
      ", "
    )}. ${prompt ? `Additional request: ${prompt}` : ""}`;
    chat.messages.push({ role: "user", content: userMessage });
    await chat.save();

    // Send start message
    res.write(`data: ${JSON.stringify({ 
      type: 'start', 
      message: 'Starting recipe generation with ingredients...',
      chatId: aiChatId 
    })}\n\n`);

    // Prepare data for Gemini AI
    const aiData = {
      ingredients: finalIngredients,
      recipeName: prompt || "Recipe with available ingredients",
    };
    const recipeType = "generate_with_ingredients";

    let fullResponse = '';
    let finalRecipeData = null;

    // Generate recipe with streaming
    const streamResult = await generateRecipeStreamWithGemini(
      recipeType, 
      aiData, 
      dietaryRestrictions,
      (streamData) => {
        if (streamData.error) {
          res.write(`data: ${JSON.stringify({ 
            type: 'error', 
            message: streamData.message 
          })}\n\n`);
          return;
        }

        if (streamData.isComplete) {
          // Final response
          finalRecipeData = streamData.finalData;
          fullResponse = streamData.fullText;
          
          res.write(`data: ${JSON.stringify({ 
            type: 'complete',
            data: finalRecipeData,
            fullText: fullResponse
          })}\n\n`);
        } else {
          // Streaming chunk
          res.write(`data: ${JSON.stringify({ 
            type: 'chunk',
            chunk: streamData.chunk,
            fullText: streamData.fullText,
            isFirstChunk: streamData.isFirstChunk
          })}\n\n`);
        }
      }
    );

    // Save the final AI response to chat
    if (streamResult.success && streamResult.data) {
      const aiResponse = {
        role: "ai",
        content: useInventory
          ? "Here's a recipe I created using ingredients from your inventory:"
          : "Here's a recipe I created using your provided ingredients:",
        recipeData: streamResult.data,
        type: recipeType,
        usedInventory: useInventory,
        totalIngredients: finalIngredients.length,
        dietaryRestrictions: dietaryRestrictions,
        timestamp: new Date(),
      };

      chat.messages.push(aiResponse);
      await chat.save();
    }

    res.end();

  } catch (error) {
    console.error("Generate Recipe with Ingredients Stream Error:", error);
    try {
      res.write(`data: ${JSON.stringify({ 
        type: 'error', 
        message: error.message || 'Failed to generate recipe with ingredients' 
      })}\n\n`);
      res.end();
    } catch (writeError) {
      console.error("Error writing to response:", writeError);
    }
  }
};

// Adapt an existing recipe (STREAMING VERSION)
const adaptExistingRecipeStream = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const { originalRecipe, recipeId, adaptationRequest } = req.body;

    console.log('=== ADAPT RECIPE STREAM START ===');
    console.log('Chat ID:', aiChatId);
    console.log('Recipe ID:', recipeId);
    console.log('Has originalRecipe:', !!originalRecipe);
    console.log('Adaptation Request:', adaptationRequest?.substring(0, 100) + '...');
    console.log('=== ADAPT RECIPE STREAM START ===');

    // Set up Server-Sent Events headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Cache-Control, Content-Type, Authorization'
    });

    // Send initial connection confirmation
    res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);

    // Parallel operations for better performance
    const [chat, user] = await Promise.all([
      AiChat.findById(aiChatId).populate("user"),
      User.findById(req.user._id).select("dietaryPreferences")
    ]);

    if (!chat) {
      res.write(`data: ${JSON.stringify({ type: 'error', message: "Chat not found" })}\n\n`);
      res.end();
      return;
    }

    // Get user's dietary restrictions
    const dietaryRestrictions = user?.dietaryPreferences || [];

    let recipeToAdapt;

    // Determine the source of the original recipe
    if (recipeId) {
      // Fetch recipe from platform by ID
      const platformRecipe = await Recipe.findById(recipeId).populate(
        "author",
        "username"
      );
      if (!platformRecipe) {
        res.write(`data: ${JSON.stringify({ 
          type: 'error', 
          message: "Recipe not found on platform" 
        })}\n\n`);
        res.end();
        return;
      }

      // Convert platform recipe to adaptation format
      recipeToAdapt = {
        title: platformRecipe.title,
        description: platformRecipe.description,
        ingredients: platformRecipe.ingredients.map((ing) =>
          `${ing.quantity} ${ing.unit || ""} ${ing.name}`.trim()
        ),
        instructions: platformRecipe.instructions.map((inst) => inst.step),
        cookTime: platformRecipe.cookTime,
        servings: platformRecipe.servings,
        author: platformRecipe.author?.username || "Unknown",
        source: "platform",
        originalId: recipeId,
      };
    } else if (originalRecipe) {
      // Use user-provided recipe
      if (!originalRecipe.title && (!originalRecipe.ingredients || originalRecipe.ingredients.length === 0)) {
        res.write(`data: ${JSON.stringify({ 
          type: 'error', 
          message: "Please provide a valid original recipe with at least title and ingredients" 
        })}\n\n`);
        res.end();
        return;
      }

      // Ensure ingredients and instructions are properly formatted
      let ingredients = [];
      let instructions = [];

      if (Array.isArray(originalRecipe.ingredients)) {
        ingredients = originalRecipe.ingredients.filter(ing => ing && ing.trim());
      } else if (typeof originalRecipe.ingredients === 'string') {
        ingredients = [originalRecipe.ingredients];
      }

      if (Array.isArray(originalRecipe.instructions)) {
        instructions = originalRecipe.instructions.filter(inst => inst && inst.trim());
      } else if (typeof originalRecipe.instructions === 'string') {
        instructions = [originalRecipe.instructions];
      }

      recipeToAdapt = {
        title: originalRecipe.title || "User Recipe",
        description: originalRecipe.description || "",
        ingredients: ingredients,
        instructions: instructions,
        cookTime: originalRecipe.cookTime || "",
        servings: originalRecipe.servings || "",
        cuisine: originalRecipe.cuisine || "",
        difficulty: originalRecipe.difficulty || "",
        source: "user-provided",
      };
    } else {
      res.write(`data: ${JSON.stringify({ 
        type: 'error', 
        message: "Please provide either a recipe ID (for platform recipes) or original recipe details" 
      })}\n\n`);
      res.end();
      return;
    }

    // Add user message first (optimistic update)
    const userMessage = `Adapt this recipe: "${recipeToAdapt.title}" ${
      recipeToAdapt.source === "platform" ? "(from platform)" : "(user recipe)"
    }. ${
      adaptationRequest
        ? `Adaptation request: ${adaptationRequest}`
        : "Please make it healthier and suitable for my dietary preferences."
    }`;
    
    console.log('Adding user message to chat:', userMessage);
    chat.messages.push({ role: "user", content: userMessage });
    await chat.save();

    // Send start message
    res.write(`data: ${JSON.stringify({ 
      type: 'start', 
      message: 'Starting recipe adaptation...',
      chatId: aiChatId 
    })}\n\n`);

    // Prepare data for Gemini AI
    const aiData = {
      originalRecipe: recipeToAdapt,
      adaptationRequest:
        adaptationRequest ||
        "Make this recipe healthier and suitable for dietary restrictions",
    };
    const recipeType = "adapt_recipe";

    console.log('Starting recipe adaptation with data:', { 
      recipeTitle: recipeToAdapt.title, 
      ingredientsCount: recipeToAdapt.ingredients.length,
      adaptationRequest 
    });

    let fullResponse = '';
    let finalRecipeData = null;

    // Generate recipe with streaming
    const streamResult = await generateRecipeStreamWithGemini(
      recipeType, 
      aiData, 
      dietaryRestrictions,
      (streamData) => {
        try {
          if (streamData.error) {
            console.error('Adapt Recipe Streaming error:', streamData.message);
            res.write(`data: ${JSON.stringify({ 
              type: 'error', 
              message: streamData.message 
            })}\n\n`);
            return;
          }

          if (streamData.isComplete) {
            // Final response
            finalRecipeData = streamData.finalData;
            fullResponse = streamData.fullText;
            
            console.log('Recipe adaptation completed, data:', { 
              hasData: !!finalRecipeData, 
              dataKeys: finalRecipeData ? Object.keys(finalRecipeData) : [],
              textLength: fullResponse ? fullResponse.length : 0
            });
            
            res.write(`data: ${JSON.stringify({ 
              type: 'complete',
              data: finalRecipeData,
              fullText: fullResponse
            })}\n\n`);
          } else {
            // Streaming chunk
            console.log('Adapt Recipe - Sending chunk, length:', streamData.chunk ? streamData.chunk.length : 0);
            res.write(`data: ${JSON.stringify({ 
              type: 'chunk',
              chunk: streamData.chunk,
              fullText: streamData.fullText,
              isFirstChunk: streamData.isFirstChunk
            })}\n\n`);
          }
        } catch (streamError) {
          console.error('Error processing adapt recipe stream data:', streamError);
          res.write(`data: ${JSON.stringify({ 
            type: 'error', 
            message: 'Error processing stream data: ' + streamError.message 
          })}\n\n`);
        }
      }
    );

    // Save the final AI response to chat
    if (streamResult.success && streamResult.data) {
      const aiResponse = {
        role: "ai",
        content:
          recipeToAdapt.source === "platform"
            ? `Here's your adapted version of "${recipeToAdapt.title}" from our platform:`
            : "Here's your adapted recipe with improvements:",
        recipeData: streamResult.data,
        type: recipeType,
        originalRecipe: recipeToAdapt,
        adaptationSource: recipeToAdapt.source,
        originalRecipeId: recipeToAdapt.originalId || null,
        dietaryRestrictions: dietaryRestrictions,
        timestamp: new Date(),
      };

      chat.messages.push(aiResponse);
      await chat.save();
      
      console.log('Adapt recipe response saved to chat:', { 
        chatId: aiChatId, 
        responseType: aiResponse.type 
      });
    } else {
      console.error('Adapt recipe stream failed:', streamResult.error);
    }

    res.end();

  } catch (error) {
    console.error("Adapt Recipe Stream Error:", error);
    try {
      res.write(`data: ${JSON.stringify({ 
        type: 'error', 
        message: error.message || 'Failed to adapt recipe' 
      })}\n\n`);
      res.end();
    } catch (writeError) {
      console.error("Error writing adapt recipe error response:", writeError);
    }
  }
};
const getUserInventory = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select(
      "inventoryIngredient dietaryPreferences"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      ingredients: user.inventoryIngredient || [],
      dietaryPreferences: user.dietaryPreferences || [],
      message: "User inventory retrieved successfully",
    });
  } catch (error) {
    console.error("Get User Inventory Error:", error);
    return res.status(500).json({
      message: "Failed to get user inventory",
      error: error.message,
    });
  }
};

// Get user's dietary preferences only
const getUserDietaryPreferences = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("dietaryPreferences");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      dietaryPreferences: user.dietaryPreferences || [],
      message: "User dietary preferences retrieved successfully",
    });
  } catch (error) {
    console.error("Get User Dietary Preferences Error:", error);
    res.status(500).json({
      message: "Failed to get user dietary preferences",
      error: error.message,
    });
  }
};

// Update user's dietary preferences
const updateUserDietaryPreferences = async (req, res) => {
  try {
    const userId = req.user._id;
    const { dietaryPreferences } = req.body;

    if (!Array.isArray(dietaryPreferences)) {
      return res.status(400).json({ 
        message: "Dietary preferences must be an array" 
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { dietaryPreferences },
      { new: true, select: "dietaryPreferences" }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      dietaryPreferences: user.dietaryPreferences,
      message: "User dietary preferences updated successfully",
    });
  } catch (error) {
    console.error("Update User Dietary Preferences Error:", error);
    res.status(500).json({
      message: "Failed to update user dietary preferences",
      error: error.message,
    });
  }
};

export {
  createChat,
  generateRecipe,
  generateRecipeStream,
  generateRecipeWithIngredients,
  generateRecipeWithIngredientsStream,
  adaptExistingRecipe,
  adaptExistingRecipeStream,
  getUserInventory,
  getUserDietaryPreferences,
  updateUserDietaryPreferences,
  getAiChat,
  deleteAiChat,
  getAllUserChats,
};
