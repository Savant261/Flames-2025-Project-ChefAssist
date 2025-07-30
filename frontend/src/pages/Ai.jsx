import React, { useState, useEffect, useRef } from 'react';
import { ChefHat, Leaf, WheatOff, Nut, MilkOff, Droplets, FishOff, EggOff, Shell, Ban, Carrot, Scale, HeartPulse, Lightbulb, Loader2 } from 'lucide-react';
import aiService from '../api/aiService.js';

const restrictionsList = [
  { id: 'vegan', label: 'Vegan', icon: Leaf },
  { id: 'gluten-free', label: 'Gluten-Free', icon: WheatOff },
  { id: 'nut-allergy', label: 'Nut-Allergy', icon: Nut },
  { id: 'lactose-free', label: 'Lactose-Free', icon: MilkOff },
  { id: 'diabetic-safe', label: 'Diabetic-Safe', icon: Droplets },
  { id: 'pescatarian', label: 'Pescatarian', icon: FishOff },
  { id: 'egg-free', label: 'Egg-Free', icon: EggOff },
  { id: 'soy-free', label: 'Soy-Free', icon: Ban },
  { id: 'shellfish-free', label: 'Shellfish-Free', icon: Shell },
  { id: 'low-carb', label: 'Low-Carb', icon: Carrot },
  { id: 'low-sodium', label: 'Low-Sodium', icon: Scale },
  { id: 'heart-healthy', label: 'Heart-Healthy', icon: HeartPulse },
];

const modes = [
  { id: 'idea', label: 'Generate Recipe Idea', icon: 'lightbulb' },
  { id: 'ingredients', label: 'Generate Recipe Based on Ingredients', icon: 'chefhat' },
  { id: 'adapt', label: 'Adapt Existing Recipe', icon: 'star' },
];

const Ai = () => {
  // Store all selected chats for scrollable middle section
  const [activeChats, setActiveChats] = useState([]);

  // Backend integration state
  const [currentChat, setCurrentChat] = useState(null);
  const [userInventory, setUserInventory] = useState([]);
  const [userDietaryPreferences, setUserDietaryPreferences] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState('');
  const [error, setError] = useState('');

  // Additional options
  const [useInventory, setUseInventory] = useState(false);
  const [recipeId, setRecipeId] = useState('');

  // Recipe adaptation state
  const [originalRecipe, setOriginalRecipe] = useState({
    title: '',
    ingredients: [],
    instructions: []
  });

  // When a history chat is selected, add it to activeChats
  const handleSelectHistory = (idx) => {
    const item = history[idx];
    if (!item) return;
    setInput(item.input);
    setSelectedMode(item.mode);
    setOutput(item.output);
    setSelectedHistoryIdx(idx);
    setShowHistory(false);
    // Restrictions: convert label string back to ids
    const restrictionLabels = item.restrictions.split(',').map(l => l.trim());
    const restrictionIds = restrictionsList.filter(r => restrictionLabels.includes(r.label)).map(r => r.id);
    setSelectedRestrictions(restrictionIds);
    setActiveChats((prev) => {
      // Avoid duplicates
      if (prev.find(c => c.timestamp === item.timestamp)) return prev;
      return [...prev, item];
    });
  };
  // Helper to group history by day
  const getHistoryByDay = () => {
    const groups = {};
    history.forEach((item, idx) => {
      const date = new Date(item.timestamp);
      const day = date.toLocaleDateString();
      if (!groups[day]) groups[day] = [];
      groups[day].push({ ...item, idx });
    });
    // Sort days descending (most recent first)
    return Object.entries(groups).sort((a, b) => new Date(b[0]) - new Date(a[0]));
  };
  // Speech recognition state
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = React.useRef(null);
  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    if (!recognitionRef.current) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
      };
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
  // Image upload state
  const [uploadedImage, setUploadedImage] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      // You can add preview or upload logic here
    }
  };
  // Copy to clipboard for history
  const [copiedIdx, setCopiedIdx] = useState(null);
  const handleCopyHistory = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };
  const [input, setInput] = useState('');
  const [selectedMode, setSelectedMode] = useState('idea');
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Show/hide history side panel
  const [showHistory, setShowHistory] = useState(false);
  // Track selected history index for Gemini-style display
  const [selectedHistoryIdx, setSelectedHistoryIdx] = useState(null);


  // Dropdown for restrictions
  const [showDropdown, setShowDropdown] = useState(false);

  // Load user data and create chat session on component mount
  useEffect(() => {
    loadUserData();
    createNewChat();
  }, []);

  const loadUserData = async () => {
    try {
      const inventoryData = await aiService.getUserInventory();
      setUserInventory(inventoryData.ingredients || []);
      setUserDietaryPreferences(inventoryData.dietaryPreferences || []);
      
      // Convert inventory to ingredient names for easy use
      const ingredientNames = inventoryData.ingredients.map(item => item.name).join(', ');
      setAvailableIngredients(ingredientNames);
    } catch (error) {
      console.error('Failed to load user data:', error);
      // Continue without user data if failed
    }
  };

  const createNewChat = async () => {
    try {
      const chat = await aiService.createChat('Recipe Generation Chat');
      setCurrentChat(chat);
    } catch (error) {
      console.error('Failed to create chat:', error);
      setError('Failed to create new chat session');
    }
  };

  // Handle input change (do not clear output when input is cleared)
  const handleInputChange = (e) => {
    setInput(e.target.value);
    // Do NOT clear output here
  };

  // Handle mode toggle
  const handleModeChange = (e) => {
    setSelectedMode(e.target.value);
    setOutput('');
  };

  // Handle restriction selection
  const handleRestrictionToggle = (id) => {
    setSelectedRestrictions((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  // Generate recipe with backend integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      let response;
      let chatId = currentChat?._id;

      // Create new chat if none exists
      if (!chatId) {
        const newChat = await aiService.createChat('Recipe Generation Chat');
        setCurrentChat(newChat);
        chatId = newChat._id;
      }

      // Call different backend endpoints based on mode
      if (selectedMode === 'idea') {
        response = await aiService.generateRecipe(chatId, input, 'generate_recipe');
      } else if (selectedMode === 'ingredients') {
        // Use available ingredients from user inventory or manual input
        const ingredients = availableIngredients ? 
          availableIngredients.split(',').map(i => i.trim()).filter(i => i) : 
          [];
        response = await aiService.generateRecipeWithIngredients(chatId, input, ingredients, useInventory);
      } else if (selectedMode === 'adapt') {
        // For adapt mode, support both platform recipes (by ID) and user-provided recipes
        if (recipeId) {
          // Adapt platform recipe by ID
          response = await aiService.adaptExistingRecipe(chatId, null, input, recipeId);
        } else if (originalRecipe.title) {
          // Adapt user-provided recipe
          response = await aiService.adaptExistingRecipe(chatId, originalRecipe, input);
        } else {
          setError('Please provide either a recipe ID or original recipe details to adapt');
          setIsLoading(false);
          return;
        }
      }

      // Format response for display
      const recipeData = response.response?.recipeData;
      let formattedOutput = '';
      
      if (recipeData && typeof recipeData === 'object') {
        formattedOutput = formatRecipeDisplay(recipeData, selectedMode);
      } else {
        formattedOutput = response.response?.content || 'Recipe generated successfully!';
      }

      const newChat = {
        input,
        restrictions: selectedRestrictions.map(r => restrictionsList.find(x => x.id === r)?.label).join(', ') || 'None',
        mode: selectedMode,
        output: formattedOutput,
        recipeData: recipeData,
        timestamp: new Date().toLocaleString()
      };

      setOutput(formattedOutput);
      setHistory((prev) => [newChat, ...prev]);
      setActiveChats((prev) => [...prev, newChat]);
      setInput(''); // Reset input after output

    } catch (error) {
      console.error('Failed to generate recipe:', error);
      setError(error.message || 'Failed to generate recipe. Please try again.');
      
      // Fallback to mock response if API fails
      const fallbackOutput = selectedMode === 'idea'
        ? `✨ Recipe Idea for: ${input || '...'}\nRestrictions: ${selectedRestrictions.map(r => restrictionsList.find(x => x.id === r)?.label).join(', ') || 'None'}\n\n[API Error: ${error.message}]`
        : `🍳 Recipe based on ingredients: ${input || '...'}\nRestrictions: ${selectedRestrictions.map(r => restrictionsList.find(x => x.id === r)?.label).join(', ') || 'None'}\n\n[API Error: ${error.message}]`;
      
      const fallbackChat = {
        input,
        restrictions: selectedRestrictions.map(r => restrictionsList.find(x => x.id === r)?.label).join(', ') || 'None',
        mode: selectedMode,
        output: fallbackOutput,
        timestamp: new Date().toLocaleString()
      };
      
      setOutput(fallbackOutput);
      setHistory((prev) => [fallbackChat, ...prev]);
      setActiveChats((prev) => [...prev, fallbackChat]);
      setInput('');
    } finally {
      setIsLoading(false);
    }
  };

  // Format recipe data for display
  const formatRecipeDisplay = (recipeData, mode) => {
    if (!recipeData) return 'Recipe generated successfully!';

    let formatted = '';
    
    if (mode === 'idea') {
      formatted += `✨ Recipe Idea: ${recipeData.title || 'Delicious Recipe'}\n\n`;
    } else if (mode === 'ingredients') {
      formatted += `🍳 Recipe with Your Ingredients: ${recipeData.title || 'Delicious Recipe'}\n\n`;
    } else if (mode === 'adapt') {
      formatted += `🔄 Adapted Recipe: ${recipeData.title || 'Improved Recipe'}\n\n`;
    }

    if (recipeData.description) {
      formatted += `📝 Description: ${recipeData.description}\n\n`;
    }

    if (recipeData.prepTime) {
      formatted += `⏱️ Time: Prep ${recipeData.prepTime} | Cook ${recipeData.cookTime} | Total ${recipeData.totalTime}\n`;
    }

    if (recipeData.servings) {
      formatted += `👥 Serves: ${recipeData.servings}\n`;
    }

    if (recipeData.difficulty) {
      formatted += `📊 Difficulty: ${recipeData.difficulty}\n\n`;
    }

    if (recipeData.ingredients && recipeData.ingredients.length > 0) {
      formatted += `🛒 Ingredients:\n`;
      recipeData.ingredients.forEach((ingredient, index) => {
        formatted += `${index + 1}. ${ingredient}\n`;
      });
      formatted += '\n';
    }

    if (recipeData.instructions && recipeData.instructions.length > 0) {
      formatted += `👨‍🍳 Instructions:\n`;
      recipeData.instructions.forEach((step, index) => {
        formatted += `${index + 1}. ${step}\n`;
      });
      formatted += '\n';
    }

    if (recipeData.tips && recipeData.tips.length > 0) {
      formatted += `💡 Tips:\n`;
      recipeData.tips.forEach((tip, index) => {
        formatted += `• ${tip}\n`;
      });
      formatted += '\n';
    }

    if (recipeData.nutritionalBenefits) {
      formatted += `🌱 Nutritional Benefits: ${recipeData.nutritionalBenefits}\n\n`;
    }

    // Add special indicators for ingredients mode
    if (mode === 'ingredients') {
      if (recipeData.usedIngredients && recipeData.usedIngredients.length > 0) {
        formatted += `✅ Used Your Ingredients: ${recipeData.usedIngredients.join(', ')}\n`;
      }
      if (recipeData.additionalIngredients && recipeData.additionalIngredients.length > 0) {
        formatted += `➕ Additional Ingredients Needed: ${recipeData.additionalIngredients.join(', ')}\n`;
      }
    }

    // Add special indicators for adapt mode
    if (mode === 'adapt') {
      if (recipeData.adaptations && recipeData.adaptations.length > 0) {
        formatted += `🔧 Adaptations Made:\n`;
        recipeData.adaptations.forEach((adaptation, index) => {
          formatted += `• ${adaptation}\n`;
        });
        formatted += '\n';
      }
      if (recipeData.originalVsAdapted) {
        formatted += `📊 Original vs Adapted: ${recipeData.originalVsAdapted}\n`;
      }
    }

    return formatted;
  };

  // Simulate user name from props or context (replace with actual user logic)
  const userName = window.localStorage.getItem('userName') || 'User';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF6E9] via-[#FFDCA9] to-[#FF7F3F] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 pt-10 pb-40 relative">
      {/* Top left and right buttons */}
      <div className="w-full flex flex-row items-center justify-between absolute top-6 left-0 right-0 px-8 z-40">
        {/* Restrictions Button - Top Left */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400 font-bold shadow border border-[#FFDCA9] dark:border-orange-400 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 transition-all duration-200 animate-fade-in-item"
            style={{ boxShadow: '0 2px 12px #FFDCA955' }}
            onClick={() => setShowDropdown((prev) => !prev)}
            title="Select Restrictions"
          >
            <svg width="20" height="20" fill="none" stroke="#FF7F3F" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            Restrictions
          </button>
          {/* Dropdown for restrictions - appears below the button */}
          {showDropdown && (
            <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-900 border border-[#FFDCA9] dark:border-orange-400 rounded-2xl shadow-xl p-4 flex flex-col gap-2 animate-dropdown-fade-in-scale min-w-[220px]" style={{ boxShadow: '0 4px 24px #FFDCA9AA' }}>
              <span className="text-[#FF7F3F] dark:text-orange-400 font-bold mb-2">Dietary Restrictions</span>
              {restrictionsList.map(({ id, label, icon: Icon }) => (
                <label key={id} className="flex items-center gap-3 cursor-pointer px-2 py-1 rounded-lg hover:bg-[#FFF6E9] dark:hover:bg-gray-800 transition-all">
                  <input
                    type="checkbox"
                    checked={selectedRestrictions.includes(id)}
                    onChange={() => handleRestrictionToggle(id)}
                    className="form-checkbox h-5 w-5 text-[#FF7F3F] dark:text-orange-400 border-[#FFDCA9] dark:border-orange-400 rounded focus:ring-2 focus:ring-[#FFDCA9] dark:focus:ring-orange-400 bg-white dark:bg-gray-900"
                  />
                  <Icon className="w-5 h-5 text-[#FF7F3F] dark:text-orange-400" />
                  <span className="text-[#181A1B] dark:text-orange-200 font-semibold">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        {/* History Button - Top Right */}
        <button
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400 font-bold shadow border border-[#FFDCA9] dark:border-orange-400 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 transition-all duration-200 animate-fade-in-item"
          style={{ boxShadow: '0 2px 12px #FFDCA955' }}
          onClick={() => setShowHistory(true)}
          title="Show History"
        >
          <svg width="22" height="22" fill="none" stroke="#FF7F3F" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9"/><path d="M12 7v5l3 3"/></svg>
          History
        </button>
      </div>
      {/* Greeting hidden when output is shown */}
      {!output && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1
            className="text-5xl font-extrabold mb-2 animate-slide-in-top animate-fade-in-scale flex items-center justify-center w-full text-center dark:text-orange-400"
            style={{
              color: '#C75C1F',
              textShadow: '0 2px 8px #FFDCA9',
              letterSpacing: '2px',
              background: 'none',
              marginTop: '56px',
            }}
          >
            <span
              className="inline-block animate-bounce-slow"
              style={{
                fontSize: '3.5rem',
                marginRight: '12px',
                textShadow: '0 2px 6px rgba(0,0,0,0.18)',
                verticalAlign: 'middle',
                transition: 'transform 0.3s',
                color: '#C75C1F',
              }}
            >
              👨‍🍳
            </span>
            Hello, {userName}
          </h1>
        </div>
      )}

      {/* Output Area above Input Bar */}
      <div className="w-full flex flex-col items-center justify-end flex-1" style={{ minHeight: 'calc(100vh - 220px)' }}>
        {/* Output Area - Gemini style: centered, visually distinct - larger for 2+ outputs */}
        <div className="w-full max-w-xl mx-auto flex flex-col gap-8 justify-end" style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', paddingBottom: '12px', minHeight: '320px', maxHeight: '420px', overflowY: 'auto' }}>
          <div className="flex-1 flex flex-col gap-8 custom-scrollbar" style={{ maxHeight: '380px' }}>
            {/* Render all active chats in scrollable middle section */}
            {activeChats.map((chat, idx) => (
              <div key={chat.timestamp} className="flex flex-col items-center w-full animate-fade-in-scale animate-expand-card">
                {/* User query pill on the right */}
                <div className="w-full flex justify-end mb-4">
                <div className="bg-[#A5A6B2] dark:bg-orange-400 text-white dark:text-gray-900 px-6 py-3 rounded-full text-lg font-semibold shadow-lg max-w-xs text-right animate-fade-in-item" style={{ boxShadow: '0 2px 12px #A5A6B255' }}>
                    {chat.input}
                  </div>
                </div>
                {/* AI response card centered */}
                <div className={`bg-white/90 dark:bg-gray-900 rounded-3xl shadow-2xl p-10 border border-[#FFDCA9] dark:border-orange-400 w-full backdrop-blur-lg`} style={{ boxShadow: '0 8px 32px #FFDCA9AA', transition: 'transform 0.2s' }}>
                  <div className="text-[#181A1B] dark:text-orange-200 whitespace-pre-line text-xl font-semibold tracking-wide mb-2">
                    {chat.output}
                  </div>
                  {/* Action buttons row (like Gemini) */}
                  <div className="flex gap-6 mt-8">
                    <button className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-4 py-2 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110" style={{ transition: 'transform 0.2s' }}>👍</button>
                    <button className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-4 py-2 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110" style={{ transition: 'transform 0.2s' }}>👎</button>
                    <button className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-4 py-2 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110" style={{ transition: 'transform 0.2s' }}>🔗</button>
                    <button className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-4 py-2 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110" style={{ transition: 'transform 0.2s' }}>📋</button>
                  </div>
                </div>
              </div>
            ))}
            {/* If no active chats, show current output as default */}
            {activeChats.length === 0 && output && (
              <div className="flex flex-col items-center w-full animate-fade-in-scale animate-expand-card">
                <div className="w-full flex justify-end mb-4">
                <div className="bg-[#A5A6B2] dark:bg-orange-400 text-white dark:text-gray-900 px-6 py-3 rounded-full text-lg font-semibold shadow-lg max-w-xs text-right animate-fade-in-item" style={{ boxShadow: '0 2px 12px #A5A6B255' }}>
                    {input}
                  </div>
                </div>
                <div className={`bg-white/90 dark:bg-gray-900 rounded-3xl shadow-2xl p-10 border border-[#FFDCA9] dark:border-orange-400 w-full backdrop-blur-lg`} style={{ boxShadow: '0 8px 32px #FFDCA9AA', transition: 'transform 0.2s' }}>
                  <div className="text-[#181A1B] dark:text-orange-200 whitespace-pre-line text-xl font-semibold tracking-wide mb-2">
                    {output}
                  </div>
                  <div className="flex gap-6 mt-8">
                    <button className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-4 py-2 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110" style={{ transition: 'transform 0.2s' }}>👍</button>
                    <button className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-4 py-2 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110" style={{ transition: 'transform 0.2s' }}>👎</button>
                    <button className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-4 py-2 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110" style={{ transition: 'transform 0.2s' }}>🔗</button>
                    <button className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-4 py-2 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110" style={{ transition: 'transform 0.2s' }}>📋</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Input Bar at the bottom of the main content */}
        <div className="w-full flex flex-col items-center justify-center z-30 mt-4 mb-0" style={{ paddingBottom: '0' }}>
        <div className="w-full max-w-3xl mx-auto bg-gradient-to-br from-white/80 via-[#FFDCA9]/80 to-[#FF7F3F]/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-lg shadow-2xl p-6 flex flex-col items-center gap-6 rounded-3xl transition-all duration-300 border border-[#FFDCA9] dark:border-orange-400" style={{ boxShadow: '0 8px 32px #FFDCA9AA' }}>
          {/* Mode toggle pills */}
          <div className="flex flex-row gap-4 mb-2">
            {modes.map(({ id, label }, idx) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedMode(id)}
                className={`px-6 py-3 rounded-full font-semibold text-lg shadow border-2 transition-all duration-200
                  ${selectedMode === id
                    ? 'bg-gradient-to-r from-[#FF7F3F] to-[#FFDCA9] text-white border-[#FFDCA9] scale-105 dark:bg-gradient-to-r dark:from-orange-400 dark:to-orange-200 dark:text-gray-900 dark:border-orange-400'
                    : 'bg-white/80 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400 border-[#FFDCA9] dark:border-orange-400 hover:bg-[#FFF6E9] dark:hover:bg-gray-700'}
                animate-fade-in-item`}
                style={{ animationDelay: `${idx * 0.05}s`, boxShadow: selectedMode === id ? '0 4px 16px #FF7F3F55' : '0 2px 8px #FFDCA955' }}
              >
                {label}
              </button>
            ))}
          </div>
          
          {/* Ingredients input section for ingredients mode */}
          {selectedMode === 'ingredients' && (
            <div className="w-full mb-4 bg-white/20 dark:bg-gray-800/20 rounded-2xl p-4 border border-[#FFDCA9] dark:border-orange-400">
              
              {/* Use Inventory Option */}
              <div className="mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useInventory}
                    onChange={(e) => setUseInventory(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-[#FF7F3F] dark:text-orange-400 border-[#FFDCA9] dark:border-orange-400 rounded focus:ring-2 focus:ring-[#FFDCA9] dark:focus:ring-orange-400 bg-white dark:bg-gray-900"
                  />
                  <span className="text-sm font-semibold text-[#FF7F3F] dark:text-orange-400">
                    Use My Inventory ({userInventory.length} items)
                  </span>
                </label>
                <p className="text-xs text-[#FF7F3F] dark:text-orange-400 mt-1 opacity-70 ml-8">
                  {useInventory ? 'Will use ingredients from your inventory' : 'Will use only manually entered ingredients'}
                </p>
              </div>

              <label className="block text-sm font-semibold text-[#FF7F3F] dark:text-orange-400 mb-2">
                {useInventory ? 'Additional Ingredients (optional):' : 'Available Ingredients (comma separated):'}
              </label>
              <textarea
                value={availableIngredients}
                onChange={(e) => setAvailableIngredients(e.target.value)}
                className="w-full p-3 border border-[#FFDCA9] dark:border-orange-400 rounded-lg resize-none bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400"
                rows={3}
                placeholder={useInventory 
                  ? "Additional ingredients to use beyond your inventory..."
                  : "e.g., tomatoes, onions, garlic, chicken breast, olive oil..."
                }
              />
              <p className="text-xs text-[#FF7F3F] dark:text-orange-400 mt-1 opacity-70">
                {useInventory 
                  ? `Your inventory: ${userInventory.map(item => item.name).join(', ') || 'No items'}`
                  : userInventory.length > 0 
                    ? `Available in inventory: ${userInventory.length} items`
                    : 'No inventory items found'
                }
              </p>
            </div>
          )}

          {/* Original recipe input section for adapt mode */}
          {selectedMode === 'adapt' && (
            <div className="w-full mb-4 bg-white/20 dark:bg-gray-800/20 rounded-2xl p-4 border border-[#FFDCA9] dark:border-orange-400">
              <h3 className="text-lg font-semibold text-[#FF7F3F] dark:text-orange-400 mb-4">
                Recipe to Adapt
              </h3>
              
              {/* Platform Recipe ID Option */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#FF7F3F] dark:text-orange-400 mb-2">
                  Platform Recipe ID (optional):
                </label>
                <input
                  type="text"
                  value={recipeId}
                  onChange={(e) => setRecipeId(e.target.value)}
                  className="w-full p-3 border border-[#FFDCA9] dark:border-orange-400 rounded-lg bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400"
                  placeholder="Enter recipe ID from our platform..."
                />
                <p className="text-xs text-[#FF7F3F] dark:text-orange-400 mt-1 opacity-70">
                  Leave empty to provide your own recipe details below
                </p>
              </div>

              {/* Manual Recipe Input - Only show if no recipe ID */}
              {!recipeId && (
                <>
                  <div className="mb-3">
                    <label className="block text-sm font-semibold text-[#FF7F3F] dark:text-orange-400 mb-2">
                      OR Enter Recipe Details Manually:
                    </label>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={originalRecipe.title}
                      onChange={(e) => setOriginalRecipe(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 border border-[#FFDCA9] dark:border-orange-400 rounded-lg bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400"
                      placeholder="Recipe title..."
                    />
                    <textarea
                      value={originalRecipe.ingredients.join(', ')}
                      onChange={(e) => setOriginalRecipe(prev => ({ 
                        ...prev, 
                        ingredients: e.target.value.split(',').map(i => i.trim()).filter(i => i)
                      }))}
                      className="w-full p-3 border border-[#FFDCA9] dark:border-orange-400 rounded-lg resize-none bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400"
                      rows={3}
                      placeholder="Ingredients (comma separated)..."
                    />
                    <textarea
                      value={originalRecipe.instructions.join('. ')}
                      onChange={(e) => setOriginalRecipe(prev => ({ 
                        ...prev, 
                        instructions: e.target.value.split('.').map(i => i.trim()).filter(i => i)
                      }))}
                      className="w-full p-3 border border-[#FFDCA9] dark:border-orange-400 rounded-lg resize-none bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400"
                      rows={4}
                      placeholder="Instructions (separate with periods)..."
                    />
                  </div>
                </>
              )}

              {recipeId && (
                <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded">
                  Will adapt recipe from platform (ID: {recipeId})
                </div>
              )}
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="w-full mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form className="w-full flex flex-row items-center gap-4" onSubmit={handleSubmit}>
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder={
                  selectedMode === 'idea' 
                    ? 'Search for recipes, ideas, or ingredients...' 
                    : selectedMode === 'ingredients'
                    ? 'Enter ingredients (e.g. chicken, tomato, cheese)'
                    : 'How would you like to adapt the recipe?'
                }
                className="w-full rounded-full bg-white/90 dark:bg-gray-900 text-[#FF7F3F] dark:text-orange-400 text-xl px-12 py-3 shadow focus:outline-none focus:ring-4 focus:ring-[#FF7F3F] dark:focus:ring-orange-400 placeholder:text-[#FF7F3F] dark:placeholder-orange-200 border-2 border-[#FFDCA9] dark:border-orange-400 transition-all duration-200 font-semibold pr-24 animate-slide-in-section"
                style={{ boxShadow: '0 2px 12px #FFDCA955', minWidth: '350px', maxWidth: '100%' }}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleMicClick}
                  className={`bg-white dark:bg-gray-800 shadow-lg border border-[#FFDCA9] dark:border-orange-400 rounded-full p-2 flex items-center justify-center focus:outline-none transition-all duration-200 hover:bg-[#FFF6E9] dark:hover:bg-gray-700 ${isListening ? 'animate-pulse' : ''}`}
                  style={{ boxShadow: '0 2px 8px #FFDCA955' }}
                  title="Speak"
                >
                  <svg width="22" height="22" fill="none" stroke="#FF7F3F" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v10m0 0a4 4 0 0 0 4-4V7a4 4 0 0 0-8 0v2a4 4 0 0 0 4 4zm0 0v4m-4 0h8"/></svg>
                </button>
                <label htmlFor="image-upload" className="cursor-pointer flex items-center justify-center">
                  <span className="bg-white dark:bg-gray-800 shadow-lg border border-[#FFDCA9] dark:border-orange-400 rounded-full p-2 flex items-center justify-center transition-all duration-200 hover:bg-[#FFF6E9] dark:hover:bg-gray-700" title="Upload Image" style={{ boxShadow: '0 2px 8px #FFDCA955' }}>
                    <svg width="24" height="24" fill="none" stroke="#FF7F3F" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                  </span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || input.trim().length === 0}
              className={`rounded-full px-8 py-3 text-xl font-bold shadow-xl bg-gradient-to-r from-[#A5A6B2] to-[#FFDCA9] dark:from-orange-400 dark:to-orange-200 text-white dark:text-gray-900 transition-all duration-300 ${isLoading || input.trim().length === 0 ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed' : 'hover:scale-105 hover:bg-[#FF7F3F] dark:hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-[#FF7F3F] dark:focus:ring-orange-400 animate-pulse-on-hover'}`}
              style={{ boxShadow: '0 2px 16px #A5A6B255', transition: 'transform 0.2s' }}
            >
              {isLoading ? <Loader2 className="w-6 h-6 mr-2 animate-spin inline" /> : 
                selectedMode === 'idea' ? 'Ask ChefAI' :
                selectedMode === 'ingredients' ? 'Generate Recipe' :
                'Adapt Recipe'}
            </button>
          </form>
        </div>
        </div>
      </div>



      {isLoading && (
        <div className="fixed left-0 right-0 bottom-0 flex items-end justify-center z-50 pointer-events-none">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 mb-12 max-w-xl w-full animate-fade-in-scale border border-[#FFDCA9] dark:border-orange-400 pointer-events-auto flex items-center justify-center transition-all duration-300">
            <Loader2 className="w-6 h-6 mr-2 animate-spin text-[#FF7F3F] dark:text-orange-400" /> <span className="text-[#FF7F3F] dark:text-orange-400 text-lg font-semibold">Generating...</span>
          </div>
        </div>
      )}
      {/* History Side Panel */}
      {showHistory && (
        <div className="fixed top-0 right-0 h-full w-[420px] bg-white dark:bg-gray-900 shadow-2xl border-l border-[#FFDCA9] dark:border-orange-400 z-[100] animate-slide-in-right flex flex-col" style={{ boxShadow: '0 0 32px #FFDCA9AA', transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s cubic-bezier(0.4,0,0.2,1)' }}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#FFDCA9] dark:border-orange-400 bg-gradient-to-r from-[#FFDCA9] to-[#FFF6E9] dark:from-gray-800 dark:to-gray-900">
            <span className="text-2xl font-bold text-[#FF7F3F] dark:text-orange-400">History</span>
            <button
              className="text-[#FF7F3F] dark:text-orange-400 bg-white dark:bg-gray-800 rounded-full p-2 shadow hover:bg-[#FFDCA9] dark:hover:bg-gray-700 transition"
              title="Close"
              onClick={() => setShowHistory(false)}
            >
              <svg width="24" height="24" fill="none" stroke="#FF7F3F" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6"/></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
            {history.length === 0 ? (
              <div className="text-[#A5A6B2] dark:text-orange-200 text-lg font-semibold mt-12 text-center">No history yet.</div>
            ) : (
              <div className="flex flex-col gap-8">
                {getHistoryByDay().map(([day, items]) => (
                  <div key={day}>
                    <div className="text-lg font-bold text-[#A5A6B2] dark:text-orange-400 mb-2">{day === new Date().toLocaleDateString() ? 'Today' : day}</div>
                    <div className="flex flex-col gap-4">
                      {items.map((item, i) => (
                        <div
                          key={item.idx}
                          className={`bg-[#FFF6E9] dark:bg-gray-800 border border-[#FFDCA9] dark:border-orange-400 rounded-2xl shadow p-4 animate-fade-in-item cursor-pointer ${selectedHistoryIdx === item.idx ? 'ring-4 ring-[#FF7F3F] dark:ring-orange-400 scale-105' : ''}`}
                          style={{ animationDelay: `${i * 0.03}s` }}
                          onClick={() => handleSelectHistory(item.idx)}
                          title="Show this chat"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[#FF7F3F] dark:text-orange-400 font-bold">{item.mode === 'idea' ? 'Recipe Idea' : 'Recipe'}</span>
                            <span className="text-xs text-[#A5A6B2] dark:text-orange-200">{item.timestamp}</span>
                          </div>
                          <div className="text-[#181A1B] dark:text-orange-200 font-semibold mb-1">{item.input}</div>
                          <div className="text-sm text-[#A5A6B2] dark:text-orange-200 mb-2">Restrictions: {item.restrictions}</div>
                          <div className="bg-white dark:bg-gray-900 rounded-xl p-3 text-[#181A1B] dark:text-orange-200 whitespace-pre-line text-base mb-2 border border-[#FFDCA9] dark:border-orange-400">{item.output}</div>
                          <div className="flex gap-2">
                            <button
                              className={`text-[#FF7F3F] dark:text-orange-400 bg-white dark:bg-gray-900 rounded-full px-3 py-1 font-semibold shadow hover:bg-[#FFDCA9] dark:hover:bg-gray-700 transition ${copiedIdx === item.idx ? 'animate-pulse' : ''}`}
                              onClick={(e) => { e.stopPropagation(); handleCopyHistory(item.output, item.idx); }}
                              title="Copy to clipboard"
                            >
                              {copiedIdx === item.idx ? 'Copied!' : '📋 Copy'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <style>{`
        /* Slide-in animation for history side panel */
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        /* Background Blob Animations */
        @keyframes blob-animation-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(50px, -30px) scale(1.1); }
          60% { transform: translate(-20px, 40px) scale(0.9); }
        }
        @keyframes blob-animation-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-40px, 60px) scale(1.05); }
          70% { transform: translate(30px, -20px) scale(0.95); }
        }
        @keyframes blob-animation-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, 50px) scale(0.9); }
          75% { transform: translate(-50px, -30px) scale(1.1); }
        }
        @keyframes blob-animation-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35% { transform: translate(-60px, -10px) scale(1.08); }
          65% { transform: translate(10px, 50px) scale(0.92); }
        }

        .animate-blob-1 { animation: blob-animation-1 12s infinite ease-in-out alternate; }
        .animate-blob-2 { animation: blob-animation-2 15s infinite ease-in-out alternate; animation-delay: 2s; }
        .animate-blob-3 { animation: blob-animation-3 10s infinite ease-in-out alternate; animation-delay: 4s; }
        .animate-blob-4 { animation: blob-animation-4 13s infinite ease-in-out alternate; animation-delay: 1s; }

        /* Header Entrance */
        @keyframes slideInFromTop {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in-top { animation: slideInFromTop 0.8s ease-out forwards; }

        /* Main Content Entrance */
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fadeInScale 1.1s cubic-bezier(0.4,0,0.2,1) forwards; animation-delay: 0.1s; }
        .animate-dropdown-fade-in-scale {
          animation: dropdownFadeInScale 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        /* Section Entrance */
        @keyframes slideInSection {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-section { animation: slideInSection 0.6s ease-out forwards; opacity: 0; }

        /* Item Fade In (for checkboxes and history items) */
        @keyframes fadeInItem {
          0% { opacity: 0; transform: translateY(18px); }
          60% { opacity: 0.7; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-item { animation: fadeInItem 0.7s cubic-bezier(0.4,0,0.2,1) forwards; opacity: 0; }

        /* Footer Entrance */
        @keyframes slideInFromBottom {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in-bottom { animation: slideInFromBottom 0.8s ease-out forwards; animation-delay: 1.5s; }

        /* Bounce for Chef Hat */
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow { animation: bounceSlow 2s infinite ease-in-out; }

        /* Pulse on Hover for Buttons */
        .animate-pulse-on-hover:hover {
          animation: pulseEffect 0.5s forwards;
        }
        @keyframes pulseEffect {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }

        /* Custom Checkbox Styling for the checkmark */
        input[type="checkbox"].form-checkbox:checked {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        }

        /* Custom Scrollbar for History */
        .custom-scrollbar {
          scroll-behavior: smooth;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e0e0e0; /* Light track */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #bdbdbd; /* Lighter thumb */
          border-radius: 10px;
          transition: background 0.3s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9e9e9e; /* Darker thumb on hover */
        }

        /* Animated background blob */
        body::before {
          content: '';
          position: fixed;
          top: 10%;
          left: 60%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle at 50% 50%, #ffd6e0 0%, #b3e0ff 100%);
          opacity: 0.3;
          z-index: 0;
          border-radius: 50%;
          filter: blur(60px);
          animation: blob-float 18s infinite alternate ease-in-out;
        }
        @keyframes blob-float {
          0% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.1) translateY(40px); }
          100% { transform: scale(1) translateY(0); }
        }

        /* Animations for card expand/collapse */
        .animate-expand-card { animation: expandCard 0.4s ease-in; }
        .animate-collapse-card { animation: collapseCard 0.4s ease-out; }
        @keyframes expandCard {
          0% { transform: scale(0.98) translateY(20px); opacity: 0.7; }
          60% { transform: scale(1.01) translateY(0); opacity: 0.95; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes collapseCard {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.98); opacity: 0.7; }
        }

        /* Favorite/Share button click animation */
        .animate-favorite-btn:active, .animate-share-btn:active {
          animation: btnPop 0.3s;
        }
        @keyframes btnPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        `}
            </style>
        </div>
    );
}
export default Ai;
