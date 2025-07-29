

import { AiChat } from "../models/aiChat.model.js";

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

// Generate a recipe (mock AI response)
const generateRecipe = async (req, res) => {
  try {
    const { aiChatId } = req.params;
    const { prompt } = req.body;
    const chat = await AiChat.findById(aiChatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    // Add user message
    chat.messages.push({ role: "user", content: prompt });

    // Mock AI response (replace with real AI integration)
    const aiResponse = {
      role: "ai",
      content: `Here is a recipe for: ${prompt}`,
      recipeData: {
        title: prompt,
        ingredients: ["ingredient 1", "ingredient 2"],
        steps: ["Step 1", "Step 2"]
      }
    };
    chat.messages.push(aiResponse);
    await chat.save();
    res.status(200).json(aiResponse);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate recipe", error: error.message });
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


export {createChat,generateRecipe,getAiChat,deleteAiChat,getUserAiChat}