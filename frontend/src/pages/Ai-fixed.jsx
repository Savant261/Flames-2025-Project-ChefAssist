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
import { StreamingRecipeFormatter } from '../components/ai/streamingFormatter.js';

const Ai = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { userData } = useUser();

  // Main state
  const [activeChats, setActiveChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [userInventory, setUserInventory] = useState([]);
  const [userDietaryPreferences, setUserDietaryPreferences] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState("");
  const [error, setError] = useState("");
  const [useInventory, setUseInventory] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const [originalRecipe, setOriginalRecipe] = useState({
    title: "",
    ingredients: [],
    instructions: [],
    cookTime: "",
    servings: ""
  });
  const [isListening, setIsListening] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);

  // Create a ref to store the streaming formatter instance
  const streamingFormatterRef = useRef(null);

  // Initialize formatter when streaming starts
  const initializeStreamingFormatter = () => {
    streamingFormatterRef.current = new StreamingRecipeFormatter();
  };

  // Helper function to process streaming chunk with formatter
  const processStreamingChunk = (chunk) => {
    if (!streamingFormatterRef.current) {
      initializeStreamingFormatter();
    }
    
    streamingFormatterRef.current.addChunk(chunk);
    return streamingFormatterRef.current.getFormattedOutput();
  };

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
  
  // Streaming state
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingOutput, setStreamingOutput] = useState("");
  const [streamingBuffer, setStreamingBuffer] = useState("");
  const [currentEventSource, setCurrentEventSource] = useState(null);

  // Chat history
  const [chatHistory, setChatHistory] = useState([]);

  // Load chat history
  const loadChatHistory = useCallback(async () => {
    try {
      setIsLoadingChat(true);
      const chats = await aiService.getAllChats();
      setChatHistory(chats);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    } finally {
      setIsLoadingChat(false);
    }
  }, []);

  // Load specific chat
  const loadSpecificChat = useCallback(async (chatId) => {
    try {
      setIsLoadingChat(true);
      const chat = await aiService.getChat(chatId);
      setCurrentChat(chat);
      setMessages(chat.messages || []);
      setOutput("");
      setError("");
    } catch (error) {
      console.error("Failed to load chat:", error);
      setError("Failed to load chat");
    } finally {
      setIsLoadingChat(false);
    }
  }, []);

  // Load user preferences
  const loadUserPreferences = useCallback(async () => {
    try {
      const [inventory, dietary] = await Promise.all([
        aiService.getUserInventory(),
        aiService.getUserDietaryPreferences()
      ]);
      
      setUserInventory(inventory.ingredients || []);
      setUserDietaryPreferences(dietary.dietaryPreferences || []);
    } catch (error) {
      console.error("Failed to load user preferences:", error);
    }
  }, []);

  // Effects
  useEffect(() => {
    loadChatHistory();
    loadUserPreferences();
  }, [loadChatHistory, loadUserPreferences]);

  useEffect(() => {
    if (chatId) {
      loadSpecificChat(chatId);
    } else {
      setCurrentChat(null);
      setMessages([]);
      setOutput("");
      setError("");
    }
  }, [chatId, loadSpecificChat]);

  const createNewChat = async (userInput) => {
    try {
      // Create a dynamic title based on first message or use default
      const chatTitle = userInput && userInput.trim() 
        ? `Recipe: ${userInput.trim().substring(0, 30)}${userInput.trim().length > 30 ? '...' : ''}`
        : "New Recipe Chat";
        
      const chat = await aiService.createChat(chatTitle);
      setCurrentChat(chat);
      
      // Clear the current state
      setMessages([]);
      setOutput("");
      setError("");
      setStreamingOutput("");
      
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
      // Clear all chat-related state
      setCurrentChat(null);
      setActiveChats([]);
      setMessages([]);
      setOutput("");
      setError("");
      setInput("");
      setStreamingOutput("");
      setHistory([]);
      
      // Reset streaming formatter
      if (streamingFormatterRef.current) {
        streamingFormatterRef.current.reset();
      }
      
      // Navigate to clean AI page
      navigate("/ai");
    } catch (error) {
      console.error("Failed to start new chat:", error);
      setError("Failed to start new chat session");
    }
  };

  // Simple handleSubmit function that works
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isStreaming) return;

    const userInput = input.trim();
    setInput(""); // Clear input immediately
    setError("");

    try {
      let currentChatId = chatId;

      // Create new chat if none exists
      if (!currentChatId) {
        setIsLoading(true);
        try {
          const newChat = await createNewChat(userInput);
          currentChatId = newChat._id;
          setIsLoading(false);
        } catch (chatError) {
          setError("Failed to create chat session. Please try again.");
          setIsLoading(false);
          return;
        }
      }

      // Add user message to chat
      const userMessage = {
        id: Date.now(),
        role: 'user',
        content: userInput,
        timestamp: new Date().toISOString(),
        mode: selectedMode,
        restrictions: selectedRestrictions
      };

      setMessages(prev => [...prev, userMessage]);

      if (selectedMode === "idea") {
        // Streaming mode
        setIsStreaming(true);
        initializeStreamingFormatter();
        
        const aiMessageId = Date.now() + 1;
        const aiMessage = {
          id: aiMessageId,
          role: 'assistant',
          content: '',
          timestamp: new Date().toISOString(),
          isStreaming: true
        };
        
        setMessages(prev => [...prev, aiMessage]);

        try {
          await aiService.generateRecipeStream(
            currentChatId,
            userInput,
            "generate_recipe",
            // onChunk
            (chunkData) => {
              if (chunkData.chunk) {
                const formatted = processStreamingChunk(chunkData.chunk);
                setStreamingOutput(formatted);
                
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: formatted }
                    : msg
                ));
              }
            },
            // onComplete
            (completeData) => {
              setIsStreaming(false);
              
              let formattedOutput = "";
              if (streamingFormatterRef.current) {
                formattedOutput = streamingFormatterRef.current.getFormattedOutput();
              }
              
              if (!formattedOutput && completeData.data) {
                formattedOutput = formatRecipeDisplay(completeData.data, selectedMode);
              }
              
              if (!formattedOutput) {
                formattedOutput = completeData.fullText || "Recipe generated successfully!";
              }

              setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId 
                  ? { 
                      ...msg, 
                      content: formattedOutput, 
                      isStreaming: false,
                      recipeData: completeData.data 
                    }
                  : msg
              ));
              
              setStreamingOutput("");
              loadChatHistory();
            },
            // onError
            (error) => {
              setIsStreaming(false);
              console.error("Streaming error:", error);
              
              setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId 
                  ? { 
                      ...msg, 
                      content: "Sorry, I encountered an error while generating the recipe. Please try again.",
                      isStreaming: false,
                      isError: true
                    }
                  : msg
              ));
              
              setError("Failed to generate recipe: " + error.message);
              setStreamingOutput("");
            }
          );

        } catch (streamingError) {
          setIsStreaming(false);
          setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
          setError("Failed to start recipe generation. Please try again.");
          setStreamingOutput("");
        }

      } else {
        // Non-streaming modes
        setIsLoading(true);
        
        try {
          let response;
          
          if (selectedMode === "ingredients") {
            const ingredients = availableIngredients
              ? availableIngredients.split(",").map((i) => i.trim()).filter((i) => i)
              : [];
            response = await aiService.generateRecipeWithIngredients(
              currentChatId,
              userInput,
              ingredients,
              useInventory
            );
          } else if (selectedMode === "adapt") {
            if (recipeId) {
              response = await aiService.adaptExistingRecipe(currentChatId, null, userInput, recipeId);
            } else if (originalRecipe.title) {
              response = await aiService.adaptExistingRecipe(currentChatId, originalRecipe, userInput);
            } else {
              throw new Error("Please provide either a recipe ID or original recipe details to adapt");
            }
          }

          const recipeData = response.response?.recipeData;
          let formattedOutput = "";

          if (recipeData && typeof recipeData === "object") {
            formattedOutput = formatRecipeDisplay(recipeData, selectedMode);
          } else {
            formattedOutput = response.response?.content || "Recipe generated successfully!";
          }

          const aiMessage = {
            id: Date.now() + 1,
            role: 'assistant',
            content: formattedOutput,
            timestamp: new Date().toISOString(),
            recipeData: recipeData,
            mode: selectedMode
          };

          setMessages(prev => [...prev, aiMessage]);
          setIsLoading(false);
          loadChatHistory();

        } catch (apiError) {
          setIsLoading(false);
          console.error("API Error:", apiError);
          setError(apiError.message || "Failed to generate recipe. Please try again.");
        }
      }

    } catch (error) {
      console.error("General error in handleSubmit:", error);
      setIsLoading(false);
      setIsStreaming(false);
      setStreamingOutput("");
      setError(error.message || "An unexpected error occurred. Please try again.");
    }
  };

  // Get user name
  const userName = userData.fullName || "User";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <AiStyles />
      
      <div className="flex h-screen">
        {/* History Panel */}
        <HistoryPanel
          chatHistory={chatHistory}
          isLoadingChat={isLoadingChat}
          currentChat={currentChat}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          navigate={navigate}
          startNewChat={startNewChat}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative">
          {/* Header */}
          <AiHeader
            showHistory={showHistory}
            setShowHistory={setShowHistory}
            startNewChat={startNewChat}
            currentChat={currentChat}
          />

          {/* Main Chat Area */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {messages.length === 0 ? (
              <AiGreeting userName={userName} />
            ) : (
              <ChatMessages
                messages={messages}
                isStreaming={isStreaming}
                streamingOutput={streamingOutput}
                copiedIdx={copiedIdx}
                setCopiedIdx={setCopiedIdx}
              />
            )}

            {/* Loading indicator for non-streaming modes */}
            {isLoading && !isStreaming && <LoadingIndicator />}

            {/* Error display */}
            {error && (
              <div className="mx-4 mb-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {/* Input Section */}
            <AiInput
              input={input}
              setInput={setInput}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              selectedRestrictions={selectedRestrictions}
              setSelectedRestrictions={setSelectedRestrictions}
              availableIngredients={availableIngredients}
              setAvailableIngredients={setAvailableIngredients}
              useInventory={useInventory}
              setUseInventory={setUseInventory}
              userInventory={userInventory}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              isStreaming={isStreaming}
              recipeId={recipeId}
              setRecipeId={setRecipeId}
              originalRecipe={originalRecipe}
              setOriginalRecipe={setOriginalRecipe}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;
