import React from 'react';

const AdaptRecipeInput = ({
  recipeId,
  setRecipeId,
  originalRecipe,
  setOriginalRecipe
}) => {
  return (
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
              onChange={(e) =>
                setOriginalRecipe((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="w-full p-3 border border-[#FFDCA9] dark:border-orange-400 rounded-lg bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400"
              placeholder="Recipe title..."
            />
            <textarea
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
              className="w-full p-3 border border-[#FFDCA9] dark:border-orange-400 rounded-lg resize-none bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400"
              rows={3}
              placeholder="Ingredients (comma separated)..."
            />
            <textarea
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
  );
};

export default AdaptRecipeInput;
