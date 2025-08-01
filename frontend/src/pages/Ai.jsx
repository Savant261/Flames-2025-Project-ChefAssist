import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import aiService from '../api/aiService.js';
import { useUser } from '../store';

// Import all AI components
import AiHeader from '../components/ai/AiHeader';
import AiGreeting, { LoadingChatMessage } from '../components/ai/AiGreeting';
import ChatMessages from '../components/ai/ChatMessages';
import AiInput from '../components/ai/AiInput';
import HistoryPanel from '../components/ai/HistoryPanel';
import LoadingIndicator from '../components/ai/LoadingIndicator';
import AiStyles from '../components/ai/AiStyles';

// Import constants and utilities
import { restrictionsList } from '../components/ai/constants';
import { formatRecipeDisplay } from '../components/ai/utils';

const Ai = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { userData } = useUser();
  
  // Store all selected chats for scrollable middle section
  const [activeChats, setActiveChats] = useState([]);
  const [messages, setMessages] = useState([]);

  // Backend integration state
  const [currentChat, setCurrentChat] = useState(null);
  const [userInventory, setUserInventory] = useState([]);
  const [userDietaryPreferences, setUserDietaryPreferences] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState("");
  const [error, setError] = useState("");

  // Additional options
  const [useInventory, setUseInventory] = useState(false);
  const [recipeId, setRecipeId] = useState("");

  // Recipe adaptation state
  const [originalRecipe, setOriginalRecipe] = useState({
    title: "",
    ingredients: [],
    instructions: [],
  });

  // Speech recognition state
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Image upload state
  const [uploadedImage, setUploadedImage] = useState(null);

  // Copy to clipboard for history
  const [copiedIdx, setCopiedIdx] = useState(null);

  // UI state
  const [input, setInput] = useState("");
  const [selectedMode, setSelectedMode] = useState("idea");
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistoryIdx, setSelectedHistoryIdx] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const loadUserData = useCallback(async () => {
    try {
      const inventoryData = await aiService.getUserInventory();
      setUserInventory(inventoryData.ingredients || []);
      
      // Get dietary preferences from the backend using the new endpoint
      const dietaryData = await aiService.getUserDietaryPreferences();
      console.log("Dietary preferences fetched:", dietaryData);
      setUserDietaryPreferences(dietaryData.dietaryPreferences || []);

      const ingredientNames = inventoryData.ingredients
        .map((item) => item.name)
        .join(", ");
      setAvailableIngredients(ingredientNames);

      // Load dietary restrictions from backend and set them for UI display
      const dietaryRestrictions = dietaryData.dietaryPreferences || [];
      const restrictionIds = restrictionsList
        .filter((r) => dietaryRestrictions.includes(r.label))
        .map((r) => r.id);
      setSelectedRestrictions(restrictionIds);
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  }, []);

  // Load specific chat by ID (for URL navigation)
  const loadSpecificChat = useCallback(async (chatId) => {
    try {
      setIsLoadingChat(true);
      const chatData = await aiService.getChat(chatId);
      if (chatData) {
        setCurrentChat(chatData);
        
        // Load previous messages and convert them to activeChats format
        const messages = chatData.messages || [];
        const convertedChats = [];
        
        for (let i = 0; i < messages.length; i += 2) {
          const userMessage = messages[i];
          const aiMessage = messages[i + 1];
          
          if (userMessage && aiMessage && userMessage.role === 'user' && aiMessage.role === 'ai') {
            // Format the output using the same logic as new responses
            let formattedOutput = aiMessage.content;
            if (aiMessage.recipeData && typeof aiMessage.recipeData === 'object') {
              formattedOutput = formatRecipeDisplay(aiMessage.recipeData, aiMessage.type || 'idea');
            }
            
            const chatEntry = {
              input: userMessage.content,
              output: formattedOutput,
              recipeData: aiMessage.recipeData,
              restrictions: aiMessage.dietaryRestrictions?.join(', ') || 'Previous Chat',
              mode: aiMessage.type || 'idea',
              timestamp: aiMessage.createdAt || aiMessage.timestamp || new Date().toLocaleString()
            };
            convertedChats.push(chatEntry);
          }
        }
        
        setActiveChats(convertedChats);
        setMessages(messages);
      }
    } catch (error) {
      console.error("Failed to load specific chat:", error);
    } finally {
      setIsLoadingChat(false);
    }
  }, []);

  // Load chat history from backend
  const loadChatHistory = useCallback(async () => {
    try {
      const chats = await aiService.getAllChats();
      if (chats && chats.length > 0) {
        // Convert backend chats to history format
        const historyItems = chats.map(chat => {
          const lastMessage = chat.messages[chat.messages.length - 1];
          const firstUserMessage = chat.messages.find(msg => msg.role === 'user');
          
          return {
            input: firstUserMessage?.content || 'Chat Session',
            output: lastMessage?.content || 'No messages',
            restrictions: lastMessage?.dietaryRestrictions?.join(', ') || 'None',
            mode: lastMessage?.type || 'idea',
            timestamp: chat.updatedAt || chat.createdAt || new Date().toLocaleString(),
            chatId: chat._id,
            title: chat.title || 'Recipe Chat'
          };
        });
        
        setHistory(historyItems);
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  }, []);

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
    loadChatHistory();
  }, [loadUserData, loadChatHistory]);

  // Load chat based on URL parameter
  useEffect(() => {
    if (chatId) {
      loadSpecificChat(chatId);
    } else {
      // Clear current chat when no chatId is present
      setCurrentChat(null);
      setActiveChats([]);
      setMessages([]);
      setOutput("");
      setError("");
    }
  }, [chatId, loadSpecificChat]);

  const createNewChat = async () => {
    try {
      const chat = await aiService.createChat("Recipe Generation Chat");
      setCurrentChat(chat);
      // Navigate to the new chat URL
      navigate(`/ai/${chat._id}`);
      // Refresh chat history to include new chat
      loadChatHistory();
      return chat;
    } catch (error) {
      console.error("Failed to create chat:", error);
      throw new Error("Failed to create new chat session");
    }
  };

  const startNewChat = async () => {
    try {
      setCurrentChat(null);
      setActiveChats([]);
      setMessages([]);
      setOutput("");
      setError("");
      setInput("");
      navigate("/ai");
    } catch (error) {
      console.error("Failed to start new chat:", error);
      setError("Failed to start new chat session");
    }
  };

  // Handle chat deletion
  const handleDeleteChat = async (chatIdToDelete) => {
    try {
      await aiService.deleteChat(chatIdToDelete);
      
      // If the deleted chat is the current chat, navigate to main AI page
      if (chatId === chatIdToDelete) {
        navigate("/ai");
      }
      
      // Refresh chat history to remove deleted chat
      loadChatHistory();
    } catch (error) {
      console.error("Failed to delete chat:", error);
      setError("Failed to delete chat. Please try again.");
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle restriction selection with backend update
  const handleRestrictionToggle = async (id) => {
    try {
      const newSelectedRestrictions = selectedRestrictions.includes(id) 
        ? selectedRestrictions.filter((r) => r !== id) 
        : [...selectedRestrictions, id];
      
      // Update UI immediately for better UX
      setSelectedRestrictions(newSelectedRestrictions);
      
      // Convert restriction IDs back to labels for backend
      const restrictionLabels = newSelectedRestrictions
        .map((restrictionId) => restrictionsList.find((r) => r.id === restrictionId)?.label)
        .filter(Boolean);
      
      // Update backend
      await aiService.updateUserDietaryPreferences(restrictionLabels);
      
      // Update local state
      setUserDietaryPreferences(restrictionLabels);
      
      console.log("Dietary preferences updated:", restrictionLabels);
    } catch (error) {
      console.error("Failed to update dietary preferences:", error);
      // Revert UI change on error
      setSelectedRestrictions(selectedRestrictions);
      setError("Failed to update dietary preferences. Please try again.");
    }
  };

  // Handle history selection - navigate to specific chat
  const handleSelectHistory = (idx) => {
    const item = history[idx];
    if (!item) return;
    
    // If item has chatId, navigate to that chat
    if (item.chatId) {
      navigate(`/ai/${item.chatId}`);
      setShowHistory(false);
      return;
    }
    
    // Fallback for old history items without chatId
    setInput(item.input);
    setSelectedMode(item.mode);
    setOutput(item.output);
    setSelectedHistoryIdx(idx);
    setShowHistory(false);
    
    const restrictionLabels = item.restrictions.split(",").map((l) => l.trim());
    const restrictionIds = restrictionsList
      .filter((r) => restrictionLabels.includes(r.label))
      .map((r) => r.id);
    setSelectedRestrictions(restrictionIds);
    setActiveChats((prev) => {
      if (prev.find((c) => c.timestamp === item.timestamp)) return prev;
      return [...prev, item];
    });
  };

  // Handle copy to clipboard
  const handleCopyHistory = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  // Handle microphone click
  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    if (!recognitionRef.current) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
    if (!isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  // Generate recipe with backend integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      let response;
      let currentChatId = chatId; // Use chatId from URL params

      // Create new chat if none exists
      if (!currentChatId) {
        try {
          const newChat = await createNewChat();
          currentChatId = newChat._id;
        } catch (chatError) {
          setError("Failed to create chat session. Please try again.");
          setIsLoading(false);
          return;
        }
      }

      // Call different backend endpoints based on mode
      if (selectedMode === "idea") {
        response = await aiService.generateRecipe(currentChatId, input, "generate_recipe");
      } else if (selectedMode === "ingredients") {
        const ingredients = availableIngredients
          ? availableIngredients.split(",").map((i) => i.trim()).filter((i) => i)
          : [];
        response = await aiService.generateRecipeWithIngredients(
          currentChatId,
          input,
          ingredients,
          useInventory
        );
      } else if (selectedMode === "adapt") {
        if (recipeId) {
          response = await aiService.adaptExistingRecipe(currentChatId, null, input, recipeId);
        } else if (originalRecipe.title) {
          response = await aiService.adaptExistingRecipe(currentChatId, originalRecipe, input);
        } else {
          setError("Please provide either a recipe ID or original recipe details to adapt");
          setIsLoading(false);
          return;
        }
      }

      // Format response for display
      const recipeData = response.response?.recipeData;
      let formattedOutput = "";

      if (recipeData && typeof recipeData === "object") {
        formattedOutput = formatRecipeDisplay(recipeData, selectedMode);
      } else {
        formattedOutput = response.response?.content || "Recipe generated successfully!";
      }

      const newChat = {
        input,
        restrictions:
          selectedRestrictions
            .map((r) => restrictionsList.find((x) => x.id === r)?.label)
            .join(", ") || "None",
        mode: selectedMode,
        output: formattedOutput,
        recipeData: recipeData,
        timestamp: new Date().toLocaleString(),
      };

      setOutput(formattedOutput);
      setHistory((prev) => [newChat, ...prev]);
      setActiveChats((prev) => [...prev, newChat]);
      setInput("");
      
      // Refresh chat history to include the updated chat
      loadChatHistory();
    } catch (error) {
      console.error("Failed to generate recipe:", error);
      
      // Handle different error types
      let errorMessage = "Failed to generate recipe. Please try again.";
      if (error.code === 'TIMEOUT') {
        errorMessage = "⏱️ " + error.message;
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);

      // Fallback response with better timeout messaging
      let fallbackOutput;
      if (error.code === 'TIMEOUT') {
        fallbackOutput = `⏱️ Recipe Generation Timeout\n\nThe AI is taking longer than expected to generate your recipe. This usually happens with complex requests.\n\nTry:\n• Simplifying your request\n• Being more specific\n• Trying again in a moment\n\nRequest: "${input}"\nMode: ${selectedMode}`;
      } else {
        fallbackOutput = selectedMode === "idea"
          ? `✨ Recipe Idea for: ${input || "..."}\nRestrictions: ${
              selectedRestrictions
                .map((r) => restrictionsList.find((x) => x.id === r)?.label)
                .join(", ") || "None"
            }\n\n[API Error: ${error.message}]`
          : `🍳 Recipe based on ingredients: ${input || "..."}\nRestrictions: ${
              selectedRestrictions
                .map((r) => restrictionsList.find((x) => x.id === r)?.label)
                .join(", ") || "None"
            }\n\n[API Error: ${error.message}]`;
      }

      const fallbackChat = {
        input,
        restrictions:
          selectedRestrictions
            .map((r) => restrictionsList.find((x) => x.id === r)?.label)
            .join(", ") || "None",
        mode: selectedMode,
        output: fallbackOutput,
        timestamp: new Date().toLocaleString(),
      };

      setOutput(fallbackOutput);
      setHistory((prev) => [fallbackChat, ...prev]);
      setActiveChats((prev) => [...prev, fallbackChat]);
      setInput("");
    } finally {
      setIsLoading(false);
    }
  };

  // Get user name
  const userName = userData.fullName || "User";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF6E9] via-[#FFDCA9] to-[#FF7F3F] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 pt-10 pb-40 relative">
      {/* Header */}
      <AiHeader
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        selectedRestrictions={selectedRestrictions}
        handleRestrictionToggle={handleRestrictionToggle}
        currentChat={currentChat}
        startNewChat={startNewChat}
        setShowHistory={setShowHistory}
      />

      {/* Greeting */}
      <AiGreeting
        userName={userName}
        output={output}
        isLoadingChat={isLoadingChat}
        activeChats={activeChats}
      />

      {/* Loading previous chat message */}
      <LoadingChatMessage isLoadingChat={isLoadingChat} />

      {/* Output Area above Input Bar */}
      <div
        className="w-full flex flex-col items-center justify-end flex-1"
        style={{ minHeight: "calc(100vh - 220px)" }}
      >
        <ChatMessages activeChats={activeChats} output={output} input={input} />
        
        {/* Input Bar */}
        <AiInput
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          useInventory={useInventory}
          setUseInventory={setUseInventory}
          userInventory={userInventory}
          availableIngredients={availableIngredients}
          setAvailableIngredients={setAvailableIngredients}
          recipeId={recipeId}
          setRecipeId={setRecipeId}
          originalRecipe={originalRecipe}
          setOriginalRecipe={setOriginalRecipe}
          isLoadingChat={isLoadingChat}
          currentChat={currentChat}
          activeChats={activeChats}
          error={error}
          input={input}
          handleInputChange={handleInputChange}
          isListening={isListening}
          handleMicClick={handleMicClick}
          handleImageUpload={handleImageUpload}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
      </div>

      {/* Loading Indicator */}
      <LoadingIndicator isLoading={isLoading} />

      {/* History Panel */}
      <HistoryPanel
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        history={history}
        handleSelectHistory={handleSelectHistory}
        selectedHistoryIdx={selectedHistoryIdx}
        copiedIdx={copiedIdx}
        handleCopyHistory={handleCopyHistory}
        handleDeleteChat={handleDeleteChat}
      />

      {/* Styles */}
      <AiStyles />
    </div>
  );
};

export default Ai;
