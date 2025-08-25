import React from 'react';
import { Grid3X3, Activity, ChefHat, Filter } from 'lucide-react';

const FeedFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All', icon: Grid3X3 },
    { id: 'recipes', label: 'Recipes', icon: ChefHat },
    { id: 'activities', label: 'Activities', icon: Activity }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-5 h-5 text-gray-500" />
        <span className="font-medium text-gray-700">Filter Feed</span>
      </div>
      
      <div className="flex gap-2">
        {filters.map((filter) => {
          const IconComponent = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span className="font-medium">{filter.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FeedFilter;
