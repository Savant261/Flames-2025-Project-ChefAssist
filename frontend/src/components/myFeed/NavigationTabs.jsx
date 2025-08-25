import React from 'react';
import { Utensils, TrendingUp } from 'lucide-react';

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-orange-100 dark:border-gray-700 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center space-x-8">
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex items-center space-x-2 pb-2 border-b-2 transition-all duration-300 ${
              activeTab === 'recipes'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400'
            }`}
          >
            <Utensils size={20} />
            <span className="font-medium">Recipes</span>
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex items-center space-x-2 pb-2 border-b-2 transition-all duration-300 ${
              activeTab === 'activity'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400'
            }`}
          >
            <TrendingUp size={20} />
            <span className="font-medium">Activity Feed</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;
