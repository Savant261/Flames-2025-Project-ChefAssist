import React from 'react';

const IngredientsInput = ({
  useInventory,
  setUseInventory,
  userInventory,
  availableIngredients,
  setAvailableIngredients
}) => {
  return (
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
          {useInventory
            ? "Will use ingredients from your inventory"
            : "Will use only manually entered ingredients"}
        </p>
      </div>

      <label className="block text-sm font-semibold text-[#FF7F3F] dark:text-orange-400 mb-2">
        {useInventory
          ? "Additional Ingredients (optional):"
          : "Available Ingredients (comma separated):"}
      </label>
      <textarea
        value={availableIngredients}
        onChange={(e) => setAvailableIngredients(e.target.value)}
        className="w-full p-3 border border-[#FFDCA9] dark:border-orange-400 rounded-lg resize-none bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400"
        rows={3}
        placeholder={
          useInventory
            ? "Additional ingredients to use beyond your inventory..."
            : "e.g., tomatoes, onions, garlic, chicken breast, olive oil..."
        }
      />
      <p className="text-xs text-[#FF7F3F] dark:text-orange-400 mt-1 opacity-70">
        {useInventory
          ? `Your inventory: ${
              userInventory.map((item) => item.name).join(", ") ||
              "No items"
            }`
          : userInventory.length > 0
          ? `Available in inventory: ${userInventory.length} items`
          : "No inventory items found"}
      </p>
    </div>
  );
};

export default IngredientsInput;
