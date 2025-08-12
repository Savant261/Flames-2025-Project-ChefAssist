import React, { useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ModeSelector from './ModeSelector';
import IngredientsInput from './IngredientsInput';
import AdaptRecipeInput from './AdaptRecipeInput';
import ChatStatus from './ChatStatus';

const AiInput = ({
  selectedMode,
  setSelectedMode,
  useInventory,
  setUseInventory,
  userInventory,
  availableIngredients,
  setAvailableIngredients,
  recipeId,
  setRecipeId,
  originalRecipe,
  setOriginalRecipe,
  isLoadingChat,
  currentChat,
  activeChats,
  error,
  input,
  handleInputChange,
  isListening,
  handleMicClick,
  handleImageUpload,
  isLoading,
  isStreaming,
  handleSubmit
}) => {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 6 * 24; // Approximately 6 lines
      textareaRef.current.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
  }, [input]);

  const handleTextareaKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isNewChat = !currentChat || activeChats.length === 0;

  return (
    <div className="w-full flex flex-col items-center z-30">
      {/* Main Input Container - Contains everything */}
      <div
        className={`w-full ${isNewChat ? 'max-w-4xl' : 'max-w-5xl'} mx-auto bg-gradient-to-br from-white/80 via-[#FFDCA9]/80 to-[#FF7F3F]/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-lg shadow-2xl p-4 flex flex-col items-center gap-3 rounded-3xl transition-all duration-300 border border-[#FFDCA9] dark:border-orange-400`}
        style={{ boxShadow: "0 8px 32px #FFDCA9AA" }}
      >
        {/* Mode toggle pills */}
        <ModeSelector selectedMode={selectedMode} setSelectedMode={setSelectedMode} />

        {/* Additional Fields - Compact inline versions */}
        {selectedMode === "adapt" && (
          <div className="w-full">
            <AdaptRecipeInput
              recipeId={recipeId}
              setRecipeId={setRecipeId}
              originalRecipe={originalRecipe}
              setOriginalRecipe={setOriginalRecipe}
            />
          </div>
        )}
        {selectedMode === "ingredients" && (
          <div className="w-full">
            <IngredientsInput
              useInventory={useInventory}
              setUseInventory={setUseInventory}
              userInventory={userInventory}
              availableIngredients={availableIngredients}
              setAvailableIngredients={setAvailableIngredients}
            />
          </div>
        )}

        {/* Main input form */}
        <form
          className="w-full flex flex-row items-end gap-4"
          onSubmit={handleSubmit}
        >
          <div className="relative flex-1 flex items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleTextareaKeyDown}
              placeholder={
                selectedMode === "idea"
                  ? "Search for recipes, ideas, or ingredients..."
                  : selectedMode === "ingredients"
                  ? "Describe what kind of recipe you want (e.g. 'make something spicy' or 'quick dinner')"
                  : "How would you like to adapt the recipe?"
              }
              className="w-full rounded-2xl bg-white/90 dark:bg-gray-900 text-[#FF7F3F] dark:text-orange-400 text-lg px-4 py-3 shadow focus:outline-none focus:ring-4 focus:ring-[#FF7F3F] dark:focus:ring-orange-400 placeholder:text-[#FF7F3F] dark:placeholder-orange-200 border-2 border-[#FFDCA9] dark:border-orange-400 transition-all duration-200 font-semibold pr-24 animate-slide-in-section resize-none overflow-hidden"
              style={{
                boxShadow: "0 2px 12px #FFDCA955",
                minWidth: "350px",
                maxWidth: "100%",
                minHeight: "48px",
                maxHeight: "144px",
                lineHeight: "24px"
              }}
              rows={1}
            />
            <div className="absolute right-4 bottom-3 flex items-center gap-3">
              <button
                type="button"
                onClick={handleMicClick}
                className={`bg-white dark:bg-gray-800 shadow-lg border border-[#FFDCA9] dark:border-orange-400 rounded-full p-2 flex items-center justify-center focus:outline-none transition-all duration-200 hover:bg-[#FFF6E9] dark:hover:bg-gray-700 ${
                  isListening ? "animate-pulse" : ""
                }`}
                style={{ boxShadow: "0 2px 8px #FFDCA955" }}
                title="Speak"
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#FF7F3F"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10m0 0a4 4 0 0 0 4-4V7a4 4 0 0 0-8 0v2a4 4 0 0 0 4 4zm0 0v4m-4 0h8" />
                </svg>
              </button>
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex items-center justify-center"
              >
                <span
                  className="bg-white dark:bg-gray-800 shadow-lg border border-[#FFDCA9] dark:border-orange-400 rounded-full p-2 flex items-center justify-center transition-all duration-200 hover:bg-[#FFF6E9] dark:hover:bg-gray-700"
                  title="Upload Image"
                  style={{ boxShadow: "0 2px 8px #FFDCA955" }}
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="#FF7F3F"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
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
            disabled={isLoading || isStreaming || input.trim().length === 0}
            className={`rounded-full px-6 py-3 text-lg font-bold shadow-xl bg-gradient-to-r from-[#A5A6B2] to-[#FFDCA9] dark:from-orange-400 dark:to-orange-200 text-white dark:text-gray-900 transition-all duration-300 ${
              isLoading || isStreaming || input.trim().length === 0
                ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed"
                : "hover:scale-105 hover:bg-[#FF7F3F] dark:hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-[#FF7F3F] dark:focus:ring-orange-400 animate-pulse-on-hover"
            }`}
            style={{
              boxShadow: "0 2px 16px #A5A6B255",
              transition: "transform 0.2s",
            }}
          >
            {isLoading || isStreaming ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
            ) : selectedMode === "idea" ? (
              "Ask ChefAI"
            ) : selectedMode === "ingredients" ? (
              "Cook with Ingredients"
            ) : (
              "Adapt Recipe"
            )}
            {isStreaming && (
              <span className="ml-2 text-sm opacity-80">Generating...</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiInput;
