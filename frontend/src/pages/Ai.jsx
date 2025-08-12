import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import aiService from '../api/aiService.js';
import { useUser } from '../store';

// Import all AI components
import AiHeader from '../components/ai/AiHeader';
import AiGreeting from '../components/ai/AiGreeting';
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
  const { userData, isAuthenticated, loading } = useUser();
  
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

  // Helper function to format streaming JSON into readable recipe
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
  const [currentEventSource, setCurrentEventSource] = useState(null);
  const [streamingBuffer, setStreamingBuffer] = useState(""); // Buffer for incomplete JSON

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

  // Helper function to sync messages to activeChats format
  const syncMessagesToActiveChats = useCallback((messagesArray) => {
    const convertedChats = [];
    
    for (let i = 0; i < messagesArray.length; i += 2) {
      const userMessage = messagesArray[i];
      const aiMessage = messagesArray[i + 1];
      
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
          restrictions: aiMessage.dietaryRestrictions?.join(', ') || 'None',
          mode: aiMessage.type || 'idea',
          timestamp: aiMessage.createdAt || aiMessage.timestamp || new Date().toLocaleString()
        };
        convertedChats.push(chatEntry);
      }
    }
    
    return convertedChats;
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
        const convertedChats = syncMessagesToActiveChats(messages);
        
        setActiveChats(convertedChats);
        setMessages(messages);
        
        // Set output to the last AI response for consistency
        if (convertedChats.length > 0) {
          setOutput(convertedChats[convertedChats.length - 1].output);
        }
      }
    } catch (error) {
      console.error("Failed to load specific chat:", error);
    } finally {
      setIsLoadingChat(false);
    }
  }, [syncMessagesToActiveChats]);

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

  // Authentication check
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      console.warn('User not authenticated, redirecting to home');
      navigate('/');
    }
  }, [loading, isAuthenticated, navigate]);

  // Load chat based on URL parameter
  useEffect(() => {
    if (chatId) {
      // Only load specific chat if we're not currently streaming
      // This prevents clearing activeChats during new chat creation
      if (!isStreaming) {
        loadSpecificChat(chatId);
      }
    } else {
      // Clear current chat when no chatId is present (only if not streaming)
      if (!isStreaming) {
        setCurrentChat(null);
        setActiveChats([]);
        setMessages([]);
        setOutput("");
        setError("");
      }
    }
  }, [chatId, loadSpecificChat, isStreaming]);

  // Handle URL parameters for recipe adaptation
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const action = urlParams.get('action');
    
    // Check if this is a recipe adaptation request
    if (mode === 'adapt' && action === 'adapt-recipe') {
      const adaptData = sessionStorage.getItem('adaptRecipeData');
      
      if (adaptData) {
        try {
          const { originalRecipe, prompt } = JSON.parse(adaptData);
          
          // Set the mode to adapt
          setSelectedMode('adapt');
          
          // Pre-fill the original recipe data
          setOriginalRecipe({
            title: originalRecipe.title || '',
            ingredients: originalRecipe.ingredients || [],
            instructions: originalRecipe.instructions || []
          });
          
          // Pre-fill the input with the adaptation prompt
          setInput(prompt || '');
          
          // Clear the stored data after using it
          sessionStorage.removeItem('adaptRecipeData');
          
          // Clear URL parameters to clean up the URL
          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
          
        } catch (error) {
          console.error('Error parsing recipe adaptation data:', error);
        }
      }
    }
  }, []); // Run only once on component mount

  // Simplified chat creation function - only creates chat, no state changes
  const createNewChat = async (userInput = "") => {
    try {
      // Create a dynamic title based on user input
      const chatTitle = userInput 
        ? `Recipe: ${userInput.substring(0, 30)}${userInput.length > 30 ? '...' : ''}`
        : "New Recipe Chat";
        
      const chat = await aiService.createChat(chatTitle);
      
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
    
      navigate(`/ai/${item.chatId}`);
      setShowHistory(false);
      return;
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

  // Generate recipe with backend integration and streaming
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isStreaming) return;

    // Check authentication before making API calls
    if (!isAuthenticated || !userData) {
      setError("Please log in to generate recipes.");
      return;
    }

    const userInput = input.trim();
    setInput(""); // Clear input immediately
    setError("");

    try {
      let currentChatId = chatId; // Use chatId from URL params

      // Create new chat if none exists
      if (!currentChatId) {
        try {
          setIsLoading(true);
          const newChat = await createNewChat(userInput); // Pass user input for title
          currentChatId = newChat._id;
          
          // Set the current chat immediately
          setCurrentChat(newChat);
          
          // Don't navigate immediately - let the streaming complete first
          // We'll navigate after the message is added to activeChats
          
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

      // For "idea" mode, use streaming
      if (selectedMode === "idea") {
        setIsStreaming(true);
        
        // Initialize the streaming formatter
        initializeStreamingFormatter();
        
        // Add user message to activeChats immediately for display
        const userChatEntry = {
          input: userInput,
          output: "", // Will be filled during streaming
          restrictions: selectedRestrictions
            .map((r) => restrictionsList.find((x) => x.id === r)?.label)
            .join(", ") || "None",
          mode: selectedMode,
          timestamp: new Date().toLocaleString(),
          isStreaming: true
        };
        
        setActiveChats(prev => [...prev, userChatEntry]);
        
        // Navigate to the new chat URL after adding the user message (for new chats only)
        if (!chatId) {
          navigate(`/ai/${currentChatId}`, { replace: true });
        }
        
        // Add AI message placeholder for streaming
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
            // onChunk callback
            (chunkData) => {
              if (chunkData.chunk) {
                // Use the new streaming formatter for real-time formatting
                const formatted = processStreamingChunk(chunkData.chunk);
                setStreamingOutput(formatted);
                
                // Update the AI message in real-time
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: formatted }
                    : msg
                ));
                
                // Update activeChats with streaming content
                setActiveChats(prev => prev.map((chat, index) => 
                  index === prev.length - 1 && chat.isStreaming
                    ? { ...chat, output: formatted }
                    : chat
                ));
              }
            },
            // onComplete callback
            (completeData) => {
              setIsStreaming(false);
              
              // Get final formatted output from the formatter
              let formattedOutput = "";
              if (streamingFormatterRef.current) {
                formattedOutput = streamingFormatterRef.current.getFormattedOutput();
              }
              
              // If no formatted output, try to use the complete data
              if (!formattedOutput && completeData.data) {
                formattedOutput = formatRecipeDisplay(completeData.data, selectedMode);
              }
              
              if (!formattedOutput) {
                formattedOutput = completeData.fullText || "Recipe generated successfully!";
              }

              // Update the final AI message
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
              
              // Finalize the activeChats entry AND ensure it persists
              setActiveChats(prev => prev.map((chat, index) => 
                index === prev.length - 1 && chat.isStreaming
                  ? { 
                      ...chat, 
                      output: formattedOutput,
                      recipeData: completeData.data,
                      isStreaming: false
                    }
                  : chat
              ));
              
              // Also update the legacy output state for consistency and persistence
              setOutput(formattedOutput);
              
              // Add to history for additional persistence
              const completedChatEntry = {
                input: userInput,
                output: formattedOutput,
                recipeData: completeData.data,
                restrictions: selectedRestrictions
                  .map((r) => restrictionsList.find((x) => x.id === r)?.label)
                  .join(", ") || "None",
                mode: selectedMode,
                timestamp: new Date().toLocaleString()
              };
              setHistory(prev => [completedChatEntry, ...prev]);
              
              // Clear streaming output
              setStreamingOutput("");
              
              // Refresh chat history to include the updated chat
              loadChatHistory();
              
              // Ensure we're on the correct URL for the chat
              if (window.location.pathname !== `/ai/${currentChatId}`) {
                navigate(`/ai/${currentChatId}`, { replace: true });
              }
            },
            // onError callback
            (error) => {
              setIsStreaming(false);
              console.error("Streaming error:", error);
              
              const errorMessage = "Sorry, I encountered an error while generating the recipe. Please try again.";
              
              // Update AI message with error
              setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId 
                  ? { 
                      ...msg, 
                      content: errorMessage,
                      isStreaming: false,
                      isError: true
                    }
                  : msg
              ));
              
              // Update activeChats with error message
              setActiveChats(prev => prev.map((chat, index) => 
                index === prev.length - 1 && chat.isStreaming
                  ? { 
                      ...chat, 
                      output: errorMessage,
                      isStreaming: false,
                      isError: true
                    }
                  : chat
              ));
              
              setError("Failed to generate recipe: " + error.message);
              setStreamingOutput("");
            }
          );

        } catch (streamingError) {
          setIsStreaming(false);
          console.error("Streaming setup error:", streamingError);
          
          // Remove the AI message and show error
          setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
          setError("Failed to start recipe generation. Please try again.");
          setStreamingOutput("");
        }

      } else if (selectedMode === "ingredients") {
        // For "ingredients" mode, use streaming
        setIsStreaming(true);
        
        // Initialize the streaming formatter
        initializeStreamingFormatter();
        
        // Prepare ingredients - either from availableIngredients field or empty array
        const ingredientsList = availableIngredients
          ? availableIngredients.split(",").map((i) => i.trim()).filter((i) => i)
          : [];
        
        // Check if we have any ingredients (from inventory or manual input)
        if (!useInventory && ingredientsList.length === 0) {
          setError("Please provide ingredients or enable inventory usage");
          setIsStreaming(false);
          return;
        }
        
        // Add user message to activeChats immediately for display
        const userChatEntry = {
          input: userInput,
          output: "", // Will be filled during streaming
          restrictions: selectedRestrictions
            .map((r) => restrictionsList.find((x) => x.id === r)?.label)
            .join(", ") || "None",
          mode: selectedMode,
          timestamp: new Date().toLocaleString(),
          isStreaming: true
        };
        
        setActiveChats(prev => [...prev, userChatEntry]);
        
        // Navigate to the new chat URL after adding the user message (for new chats only)
        if (!chatId) {
          navigate(`/ai/${currentChatId}`, { replace: true });
        }
        
        // Add AI message placeholder for streaming
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
          await aiService.generateRecipeWithIngredientsStream(
            currentChatId,
            userInput,
            ingredientsList,
            useInventory,
            // onChunk callback
            (chunkData) => {
              if (chunkData.chunk) {
                // Use the new streaming formatter for real-time formatting
                const formatted = processStreamingChunk(chunkData.chunk);
                setStreamingOutput(formatted);
                
                // Update the AI message in real-time
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: formatted }
                    : msg
                ));
                
                // Update activeChats with streaming content
                setActiveChats(prev => prev.map((chat, index) => 
                  index === prev.length - 1 && chat.isStreaming
                    ? { ...chat, output: formatted }
                    : chat
                ));
              }
            },
            // onComplete callback
            (completeData) => {
              setIsStreaming(false);
              
              // Get final formatted output from the formatter
              let formattedOutput = "";
              if (streamingFormatterRef.current) {
                formattedOutput = streamingFormatterRef.current.getFormattedOutput();
              }
              
              // If no formatted output, try to use the complete data
              if (!formattedOutput && completeData.data) {
                formattedOutput = formatRecipeDisplay(completeData.data, selectedMode);
              }
              
              if (!formattedOutput) {
                formattedOutput = completeData.fullText || "Recipe generated successfully!";
              }

              // Update the final AI message
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
              
              // Finalize the activeChats entry
              setActiveChats(prev => prev.map((chat, index) => 
                index === prev.length - 1 && chat.isStreaming
                  ? { 
                      ...chat, 
                      output: formattedOutput,
                      recipeData: completeData.data,
                      isStreaming: false
                    }
                  : chat
              ));
              
              // Also update the legacy output state for consistency
              setOutput(formattedOutput);
              
              // Add to history for additional persistence
              const completedChatEntry = {
                input: userInput,
                output: formattedOutput,
                recipeData: completeData.data,
                restrictions: selectedRestrictions
                  .map((r) => restrictionsList.find((x) => x.id === r)?.label)
                  .join(", ") || "None",
                mode: selectedMode,
                timestamp: new Date().toLocaleString()
              };
              setHistory(prev => [completedChatEntry, ...prev]);
              
              // Clear streaming output
              setStreamingOutput("");
              
              // Refresh chat history to include the updated chat
              loadChatHistory();
              
              // Ensure we're on the correct URL for the chat
              if (window.location.pathname !== `/ai/${currentChatId}`) {
                navigate(`/ai/${currentChatId}`, { replace: true });
              }
            },
            // onError callback
            (error) => {
              setIsStreaming(false);
              console.error("Ingredients streaming error:", error);
              
              const errorMessage = "Sorry, I encountered an error while generating the recipe with ingredients. Please try again.";
              
              // Update AI message with error
              setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId 
                  ? { 
                      ...msg, 
                      content: errorMessage,
                      isStreaming: false,
                      isError: true
                    }
                  : msg
              ));
              
              // Update activeChats with error message
              setActiveChats(prev => prev.map((chat, index) => 
                index === prev.length - 1 && chat.isStreaming
                  ? { 
                      ...chat, 
                      output: errorMessage,
                      isStreaming: false,
                      isError: true
                    }
                  : chat
              ));
              
              setError("Failed to generate recipe with ingredients: " + error.message);
              setStreamingOutput("");
            }
          );

        } catch (streamingError) {
          setIsStreaming(false);
          console.error("Ingredients streaming setup error:", streamingError);
          
          // Remove the AI message and show error
          setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
          setError("Failed to start recipe generation with ingredients. Please try again.");
          setStreamingOutput("");
        }

      } else if (selectedMode === "adapt") {
        // For "adapt" mode, use streaming
        setIsStreaming(true);
        
        // Initialize the streaming formatter
        initializeStreamingFormatter();
        
        // Validate adaptation requirements
        if (!originalRecipe.title) {
          setError("Please provide recipe details to adapt");
          setIsStreaming(false);
          return;
        }
        
        // Add user message to activeChats immediately for display
        const userChatEntry = {
          input: userInput,
          output: "", // Will be filled during streaming
          restrictions: selectedRestrictions
            .map((r) => restrictionsList.find((x) => x.id === r)?.label)
            .join(", ") || "None",
          mode: selectedMode,
          timestamp: new Date().toLocaleString(),
          isStreaming: true
        };
        
        setActiveChats(prev => [...prev, userChatEntry]);
        
        // Navigate to the new chat URL after adding the user message (for new chats only)
        if (!chatId) {
          navigate(`/ai/${currentChatId}`, { replace: true });
        }
        
        // Add AI message placeholder for streaming
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
          await aiService.adaptExistingRecipeStream(
            currentChatId,
            originalRecipe,
            userInput,
            // onChunk callback
            (chunkData) => {
              if (chunkData.chunk) {
                // Use the new streaming formatter for real-time formatting
                const formatted = processStreamingChunk(chunkData.chunk);
                setStreamingOutput(formatted);
                
                // Update the AI message in real-time
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: formatted }
                    : msg
                ));
                
                // Update activeChats with streaming content
                setActiveChats(prev => prev.map((chat, index) => 
                  index === prev.length - 1 && chat.isStreaming
                    ? { ...chat, output: formatted }
                    : chat
                ));
              }
            },
            // onComplete callback
            (completeData) => {
              setIsStreaming(false);
              
              // Get final formatted output from the formatter
              let formattedOutput = "";
              if (streamingFormatterRef.current) {
                formattedOutput = streamingFormatterRef.current.getFormattedOutput();
              }
              
              // If no formatted output, try to use the complete data
              if (!formattedOutput && completeData.data) {
                formattedOutput = formatRecipeDisplay(completeData.data, selectedMode);
              }
              
              if (!formattedOutput) {
                formattedOutput = completeData.fullText || "Recipe adaptation completed successfully!";
              }

              // Update the final AI message
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
              
              // Finalize the activeChats entry
              setActiveChats(prev => prev.map((chat, index) => 
                index === prev.length - 1 && chat.isStreaming
                  ? { 
                      ...chat, 
                      output: formattedOutput,
                      recipeData: completeData.data,
                      isStreaming: false
                    }
                  : chat
              ));
              
              // Also update the legacy output state for consistency
              setOutput(formattedOutput);
              
              // Add to history for additional persistence
              const completedChatEntry = {
                input: userInput,
                output: formattedOutput,
                recipeData: completeData.data,
                restrictions: selectedRestrictions
                  .map((r) => restrictionsList.find((x) => x.id === r)?.label)
                  .join(", ") || "None",
                mode: selectedMode,
                timestamp: new Date().toLocaleString()
              };
              setHistory(prev => [completedChatEntry, ...prev]);
              
              // Clear streaming output
              setStreamingOutput("");
              
              // Refresh chat history to include the updated chat
              loadChatHistory();
              
              // Ensure we're on the correct URL for the chat
              if (window.location.pathname !== `/ai/${currentChatId}`) {
                navigate(`/ai/${currentChatId}`, { replace: true });
              }
            },
            // onError callback
            (error) => {
              setIsStreaming(false);
              console.error("Adapt streaming error:", error);
              
              const errorMessage = "Sorry, I encountered an error while adapting the recipe. Please try again.";
              
              // Update AI message with error
              setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId 
                  ? { 
                      ...msg, 
                      content: errorMessage,
                      isStreaming: false,
                      isError: true
                    }
                  : msg
              ));
              
              // Update activeChats with error message
              setActiveChats(prev => prev.map((chat, index) => 
                index === prev.length - 1 && chat.isStreaming
                  ? { 
                      ...chat, 
                      output: errorMessage,
                      isStreaming: false,
                      isError: true
                    }
                  : chat
              ));
              
              setError("Failed to adapt recipe: " + error.message);
              setStreamingOutput("");
            }
          );

        } catch (streamingError) {
          setIsStreaming(false);
          console.error("Adapt streaming setup error:", streamingError);
          
          // Remove the AI message and show error
          setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
          setError("Failed to start recipe adaptation. Please try again.");
          setStreamingOutput("");
        }
      }

    } catch (error) {
      console.error("Failed to generate recipe:", error);
      
      setIsStreaming(false);
      setStreamingOutput("");
      
      // Handle different error types
      let errorMessage = "Failed to generate recipe. Please try again.";
      
      // Check for authentication errors
      if (error.message?.includes('Authentication') || error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        errorMessage = "Authentication required. Please log in and try again.";
        // Optionally redirect to login
        setTimeout(() => navigate('/'), 2000);
      } else if (error.code === 'TIMEOUT') {
        errorMessage = "⏱️ " + error.message;
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);

      // Fallback response with better error messaging
      let fallbackOutput;
      if (error.code === 'TIMEOUT') {
        fallbackOutput = `⏱️ Recipe Generation Timeout\n\nThe AI is taking longer than expected to generate your recipe. This usually happens with complex requests.\n\nTry:\n• Simplifying your request\n• Being more specific\n• Trying again in a moment\n\nRequest: "${userInput}"\nMode: ${selectedMode}`;
      } else {
        fallbackOutput = selectedMode === "idea"
          ? `✨ Recipe Idea for: ${userInput || "..."}\nRestrictions: ${
              selectedRestrictions
                .map((r) => restrictionsList.find((x) => x.id === r)?.label)
                .join(", ") || "None"
            }\n\n[API Error: ${error.message}]`
          : `🍳 Recipe based on ingredients: ${userInput || "..."}\nRestrictions: ${
              selectedRestrictions
                .map((r) => restrictionsList.find((x) => x.id === r)?.label)
                .join(", ") || "None"
            }\n\n[API Error: ${error.message}]`;
      }

      const fallbackChat = {
        input: userInput,
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
    } finally {
      setIsLoading(false);
    }
  };

  // Get user name
  const userName = userData?.fullName || "User";

  // Show loading while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF6E9] via-[#FFDCA9] to-[#FF7F3F]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF7F3F] mx-auto mb-4"></div>
          <p className="text-[#FF7F3F] font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated (this should be handled by useEffect, but just in case)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF6E9] via-[#FFDCA9] to-[#FF7F3F]">
        <div className="text-center">
          <p className="text-[#FF7F3F] font-semibold mb-4">Please log in to access ChefAI</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-[#FF7F3F] text-white rounded-lg hover:bg-[#E6692E] transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FFF6E9] via-[#FFDCA9] to-[#FF7F3F] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Header section */}
      <div className="w-full flex flex-col items-center px-4 py-8">
        <AiHeader
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          selectedRestrictions={selectedRestrictions}
          handleRestrictionToggle={handleRestrictionToggle}
          currentChat={currentChat}
          startNewChat={startNewChat}
          setShowHistory={setShowHistory}
        />

        <AiGreeting
          userName={userName}
          output={output}
          isLoadingChat={isLoadingChat}
          activeChats={activeChats}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 pb-4">
        {/* Chat Messages */}
        {(activeChats.length > 0 || output || isStreaming) && (
          <div className="mb-4">
            <ChatMessages 
              activeChats={activeChats} 
              output={output} 
              input={input}
              isStreaming={isStreaming}
              streamingOutput={streamingOutput}
            />
          </div>
        )}
        
        {/* Input section */}
        <div className="sticky bottom-4">
          <AiInput
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            useInventory={useInventory}
            setUseInventory={setUseInventory}
            userInventory={userInventory}
            availableIngredients={availableIngredients}
            setAvailableIngredients={setAvailableIngredients}
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
            isStreaming={isStreaming}
            handleSubmit={handleSubmit}
          />
        </div>
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
