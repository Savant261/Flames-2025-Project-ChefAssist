import React from 'react';

const IngredientsInput = ({
  useInventory,
  setUseInventory,
  userInventory,
  availableIngredients,
  setAvailableIngredients
}) => {
  // Get dynamic placeholder text based on inventory usage
  const getPlaceholderText = () => {
    if (useInventory && userInventory.length > 0) {
      return "Add extra ingredients (optional)...";
    } else if (useInventory && userInventory.length === 0) {
      return "Your inventory is empty. Add ingredients manually...";
    } else {
      return "e.g., tomatoes, onions, garlic, chicken breast...";
    }
  };

  const getHelpText = () => {
    if (useInventory && userInventory.length > 0) {
      const inventoryItems = userInventory.slice(0, 2).map(item => item.name).join(", ");
      const extraCount = userInventory.length > 2 ? ` +${userInventory.length - 2} more` : "";
      return `Using: ${inventoryItems}${extraCount}`;
    } else if (useInventory && userInventory.length === 0) {
      return "Inventory empty - add ingredients manually";
    } else {
      return "Enter ingredients separated by commas";
    }
  };

  return (
    <div className="w-full bg-white/20 dark:bg-gray-800/20 rounded-xl p-3 border border-[#FFDCA9] dark:border-orange-400">
      <div className="flex items-center justify-between gap-4">
        {/* Use Inventory Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useInventory}
            onChange={(e) => setUseInventory(e.target.checked)}
            className="form-checkbox h-4 w-4 text-[#FF7F3F] dark:text-orange-400 border-[#FFDCA9] dark:border-orange-400 rounded focus:ring-1 focus:ring-[#FFDCA9] dark:focus:ring-orange-400 bg-white dark:bg-gray-900"
          />
          <span className="text-sm font-semibold text-[#FF7F3F] dark:text-orange-400">
            Use Inventory ({userInventory.length})
          </span>
        </label>

        {/* Ingredients Input */}
        <div className="flex-1">
          <input
            type="text"
            value={availableIngredients}
            onChange={(e) => setAvailableIngredients(e.target.value)}
            className="w-full p-2 border border-[#FFDCA9] dark:border-orange-400 rounded-lg bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400 focus:outline-none focus:ring-1 focus:ring-[#FF7F3F] dark:focus:ring-orange-400 text-sm"
            placeholder={getPlaceholderText()}
          />
        </div>
      </div>
      
      {/* Compact help text */}
      <p className="text-xs text-[#FF7F3F]/70 dark:text-orange-400/70 mt-1">
        {getHelpText()}
      </p>
    </div>
  );
};

export default IngredientsInput;
