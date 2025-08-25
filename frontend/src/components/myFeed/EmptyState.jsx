import React from 'react';
import { ChefHat } from 'lucide-react';

const EmptyState = ({ selectedChef, setSelectedChef }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <ChefHat size={64} className="text-gray-400 dark:text-gray-600 mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No content yet</h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
        {selectedChef 
          ? `${selectedChef.name} hasn't shared any recipes yet.`
          : 'Start following some chefs to see their latest recipes and updates in your feed.'
        }
      </p>
      <button 
        onClick={() => setSelectedChef(null)}
        className="mt-6 px-6 py-3 rounded-full font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 bg-[#D97706] dark:bg-orange-700"
      >
        {selectedChef ? 'Back to All Chefs' : 'Discover Chefs'}
      </button>
    </div>
  );
};

export default EmptyState;
