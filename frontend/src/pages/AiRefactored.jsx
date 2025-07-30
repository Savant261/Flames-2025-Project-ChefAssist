import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import aiService from '../api/aiService.js';

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

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
    loadExistingChat();
    loadChatHistory();
  }, []);

  // Load chat based on URL parameter
  useEffect(() => {
    if (chatId) {
      loadSpecificChat(chatId);
    }
  }, [chatId]);

  const loadUserData = async () => {
    try {
      const inventoryData = await aiService.getUserInventory();
      setUserInventory(inventoryData.ingredients || []);
      setUserDietaryPreferences(inventoryData.dietaryPreferences || []);

      const ingredientNames = inventoryData.ingredients
        .map((item) => item.name)
        .join(", ");
      setAvailableIngredients(ingredientNames);

      // Load dietary restrictions from backend and set them
      const dietaryRestrictions = inventoryData.dietaryPreferences || [];
      const restrictionIds = restrictionsList
        .filter((r) => dietaryRestrictions.includes(r.label))
        .map((r) => r.id);
      setSelectedRestrictions(restrictionIds);
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };

  const loadExistingChat = async () => {
    try {
      setIsLoadingChat(true);
      const urlParams = new URLSearchParams(window.location.search);
      const chatIdFromUrl = urlParams.get("chatId");
      const savedChatId = localStorage.getItem("currentChatId");

      const chatIdToLoad = chatIdFromUrl || savedChatId;

      if (chatIdToLoad) {
        const chatData = await aiService.getChat(chatIdToLoad);
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
          localStorage.setItem("currentChatId", chatData._id);
        }
      }
    } catch (error) {
      console.error("Failed to load existing chat:", error);
    } finally {
      setIsLoadingChat(false);
    }
  };

  // Load specific chat by ID (for URL navigation)
  const loadSpecificChat = async (chatId) => {
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
        localStorage.setItem("currentChatId", chatData._id);
      }
    } catch (error) {
      console.error("Failed to load specific chat:", error);
    } finally {
      setIsLoadingChat(false);
    }
  };

  // Load chat history from backend
  const loadChatHistory = async () => {
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
  };

  const createNewChat = async () => {
    try {
      const chat = await aiService.createChat("Recipe Generation Chat");
      setCurrentChat(chat);
      localStorage.setItem("currentChatId", chat._id);
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
      localStorage.removeItem("currentChatId");
      navigate("/ai");
    } catch (error) {
      console.error("Failed to start new chat:", error);
      setError("Failed to start new chat session");
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle restriction selection
  const handleRestrictionToggle = (id) => {
    setSelectedRestrictions((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
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
      let chatId = currentChat?._id;

      // Create new chat if none exists
      if (!chatId) {
        try {
          const newChat = await createNewChat();
          chatId = newChat._id;
        } catch (chatError) {
          setError("Failed to create chat session. Please try again.");
          setIsLoading(false);
          return;
        }
      }

      // Call different backend endpoints based on mode
      if (selectedMode === "idea") {
        response = await aiService.generateRecipe(chatId, input, "generate_recipe");
      } else if (selectedMode === "ingredients") {
        const ingredients = availableIngredients
          ? availableIngredients.split(",").map((i) => i.trim()).filter((i) => i)
          : [];
        response = await aiService.generateRecipeWithIngredients(
          chatId,
          input,
          ingredients,
          useInventory
        );
      } else if (selectedMode === "adapt") {
        if (recipeId) {
          response = await aiService.adaptExistingRecipe(chatId, null, input, recipeId);
        } else if (originalRecipe.title) {
          response = await aiService.adaptExistingRecipe(chatId, originalRecipe, input);
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
      setError(error.message || "Failed to generate recipe. Please try again.");

      // Fallback response
      const fallbackOutput =
        selectedMode === "idea"
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
  const userName = window.localStorage.getItem("userName") || "User";

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
      />

      {/* Styles */}
      <AiStyles />
    </div>
  );
};

export default Ai;
