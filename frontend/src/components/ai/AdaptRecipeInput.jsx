import React from 'react';

const AdaptRecipeInput = ({
  originalRecipe,
  setOriginalRecipe,
  recipeId, // Add recipeId prop
  setRecipeId // Add setRecipeId prop
}) => {
  
  // If we have a recipe ID, show a simpler read-only display
  if (recipeId) {
    return (
      <div className="w-full bg-white/20 dark:bg-gray-800/20 rounded-xl p-3 border border-[#FFDCA9] dark:border-orange-400">
        <h3 className="text-sm font-semibold text-[#FF7F3F] dark:text-orange-400 mb-2">
          Recipe to Adapt
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex-1 p-2 border border-[#FFDCA9] dark:border-orange-400 rounded-lg bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400 text-sm">
            {originalRecipe.title || 'Loading recipe...'}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            📝 Recipe details will be fetched automatically
          </div>
        </div>
      </div>
    );
  }

  // For manual recipe input (when no recipe ID)
  return (
    <div className="w-full bg-white/20 dark:bg-gray-800/20 rounded-xl p-3 border border-[#FFDCA9] dark:border-orange-400">
      <h3 className="text-sm font-semibold text-[#FF7F3F] dark:text-orange-400 mb-2">
        Recipe to Adapt
      </h3>

      {/* Compact Recipe Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input
          type="text"
          value={originalRecipe.title}
          onChange={(e) =>
            setOriginalRecipe((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          className="w-full p-2 border border-[#FFDCA9] dark:border-orange-400 rounded-lg bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400 text-sm"
          placeholder="Recipe title..."
        />
        <input
          type="text"
          value={originalRecipe.ingredients.join(", ")}
          onChange={(e) =>
            setOriginalRecipe((prev) => ({
              ...prev,
              ingredients: e.target.value
                .split(",")
                .map((i) => i.trim())
                .filter((i) => i),
            }))
          }
          className="w-full p-2 border border-[#FFDCA9] dark:border-orange-400 rounded-lg bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400 text-sm"
          placeholder="Ingredients (comma separated)..."
        />
        <input
          type="text"
          value={originalRecipe.instructions.join(". ")}
          onChange={(e) =>
            setOriginalRecipe((prev) => ({
              ...prev,
              instructions: e.target.value
                .split(".")
                .map((i) => i.trim())
                .filter((i) => i),
            }))
          }
          className="w-full p-2 border border-[#FFDCA9] dark:border-orange-400 rounded-lg bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400 text-sm"
          placeholder="Instructions (separate with periods)..."
        />
      </div>
    </div>
  );
};

export default AdaptRecipeInput;
