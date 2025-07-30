import React from 'react';
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
  handleSubmit
}) => {
  return (
    <div
      className="w-full flex flex-col items-center justify-center z-30 mt-4 mb-0"
      style={{ paddingBottom: "0" }}
    >
      <div
        className="w-full max-w-3xl mx-auto bg-gradient-to-br from-white/80 via-[#FFDCA9]/80 to-[#FF7F3F]/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-lg shadow-2xl p-6 flex flex-col items-center gap-6 rounded-3xl transition-all duration-300 border border-[#FFDCA9] dark:border-orange-400"
        style={{ boxShadow: "0 8px 32px #FFDCA9AA" }}
      >
        {/* Mode toggle pills */}
        <ModeSelector selectedMode={selectedMode} setSelectedMode={setSelectedMode} />

        {/* Ingredients input section for ingredients mode */}
        {selectedMode === "ingredients" && (
          <IngredientsInput
            useInventory={useInventory}
            setUseInventory={setUseInventory}
            userInventory={userInventory}
            availableIngredients={availableIngredients}
            setAvailableIngredients={setAvailableIngredients}
          />
        )}

        {/* Original recipe input section for adapt mode */}
        {selectedMode === "adapt" && (
          <AdaptRecipeInput
            recipeId={recipeId}
            setRecipeId={setRecipeId}
            originalRecipe={originalRecipe}
            setOriginalRecipe={setOriginalRecipe}
          />
        )}

        {/* Chat Status Display */}
        <ChatStatus
          isLoadingChat={isLoadingChat}
          currentChat={currentChat}
          activeChats={activeChats}
          error={error}
        />

        <form
          className="w-full flex flex-row items-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder={
                selectedMode === "idea"
                  ? "Search for recipes, ideas, or ingredients..."
                  : selectedMode === "ingredients"
                  ? "Enter ingredients (e.g. chicken, tomato, cheese)"
                  : "How would you like to adapt the recipe?"
              }
              className="w-full rounded-full bg-white/90 dark:bg-gray-900 text-[#FF7F3F] dark:text-orange-400 text-xl px-12 py-3 shadow focus:outline-none focus:ring-4 focus:ring-[#FF7F3F] dark:focus:ring-orange-400 placeholder:text-[#FF7F3F] dark:placeholder-orange-200 border-2 border-[#FFDCA9] dark:border-orange-400 transition-all duration-200 font-semibold pr-24 animate-slide-in-section"
              style={{
                boxShadow: "0 2px 12px #FFDCA955",
                minWidth: "350px",
                maxWidth: "100%",
              }}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
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
                  width="22"
                  height="22"
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
                    width="24"
                    height="24"
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
            disabled={isLoading || input.trim().length === 0}
            className={`rounded-full px-8 py-3 text-xl font-bold shadow-xl bg-gradient-to-r from-[#A5A6B2] to-[#FFDCA9] dark:from-orange-400 dark:to-orange-200 text-white dark:text-gray-900 transition-all duration-300 ${
              isLoading || input.trim().length === 0
                ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed"
                : "hover:scale-105 hover:bg-[#FF7F3F] dark:hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-[#FF7F3F] dark:focus:ring-orange-400 animate-pulse-on-hover"
            }`}
            style={{
              boxShadow: "0 2px 16px #A5A6B255",
              transition: "transform 0.2s",
            }}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 mr-2 animate-spin inline" />
            ) : selectedMode === "idea" ? (
              "Ask ChefAI"
            ) : selectedMode === "ingredients" ? (
              "Generate Recipe"
            ) : (
              "Adapt Recipe"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiInput;
