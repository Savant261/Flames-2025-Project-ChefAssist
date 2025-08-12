import React from 'react';

const IngredientsInput = ({
  useInventory,
  setUseInventory,
  userInventory,
  availableIngredients,
  setAvailableIngredients
}) => {
  // Get dynamic placeholder and label text based on inventory usage
  const getPlaceholderText = () => {
    if (useInventory && userInventory.length > 0) {
      return "Add extra ingredients (optional) or leave empty to use only inventory...";
    } else if (useInventory && userInventory.length === 0) {
      return "Your inventory is empty. Please add ingredients manually...";
    } else {
      return "e.g., tomatoes, onions, garlic, chicken breast, olive oil...";
    }
  };

  const getLabelText = () => {
    if (useInventory && userInventory.length > 0) {
      return `Your Inventory + Additional Ingredients (${userInventory.length} inventory items loaded):`;
    } else if (useInventory && userInventory.length === 0) {
      return "Available Ingredients (inventory is empty):";
    } else {
      return "Available Ingredients (comma separated):";
    }
  };

  const getHelpText = () => {
    if (useInventory && userInventory.length > 0) {
      const inventoryItems = userInventory.slice(0, 3).map(item => item.name).join(", ");
      const extraCount = userInventory.length > 3 ? ` and ${userInventory.length - 3} more` : "";
      return `Using from inventory: ${inventoryItems}${extraCount}`;
    } else if (useInventory && userInventory.length === 0) {
      return "Inventory is empty. Add ingredients manually or uncheck 'Use My Inventory'.";
    } else {
      return "Enter ingredients separated by commas. ChefAI will create a recipe using these.";
    }
  };

  return (
    <div className="w-full mb-4 bg-white/20 dark:bg-gray-800/20 rounded-2xl p-4 border border-[#FFDCA9] dark:border-orange-400">
      {/* Use Inventory Option */}
      <div className="mb-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={useInventory}
            onChange={(e) => setUseInventory(e.target.checked)}
            className="form-checkbox h-4 w-4 text-[#FF7F3F] dark:text-orange-400 border-[#FFDCA9] dark:border-orange-400 rounded focus:ring-2 focus:ring-[#FFDCA9] dark:focus:ring-orange-400 bg-white dark:bg-gray-900"
          />
          <span className="text-sm font-semibold text-[#FF7F3F] dark:text-orange-400">
            Use My Inventory ({userInventory.length} items)
          </span>
        </label>
      </div>

      <label className="block text-sm font-semibold text-[#FF7F3F] dark:text-orange-400 mb-2">
        {getLabelText()}
      </label>
      
      <input
        type="text"
        value={availableIngredients}
        onChange={(e) => setAvailableIngredients(e.target.value)}
        className="w-full p-3 border border-[#FFDCA9] dark:border-orange-400 rounded-lg bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400 focus:outline-none focus:ring-2 focus:ring-[#FF7F3F] dark:focus:ring-orange-400"
        placeholder={getPlaceholderText()}
      />
      
      {/* Help text */}
      <p className="text-xs text-[#FF7F3F]/70 dark:text-orange-400/70 mt-2">
        {getHelpText()}
      </p>
    </div>
  );
};

export default IngredientsInput;
