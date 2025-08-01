import React from 'react';

const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCuisine,
  selectedDifficulty,
  selectedMealType,
  handleSearch,
  resetFilters,
  handleCuisineChange,
  handleDifficultyChange,
  handleMealTypeChange,
  cuisineOptions,
  difficultyOptions,
  mealTypeOptions
}) => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search recipes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-l-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-chef-orange text-white rounded-r-lg hover:bg-chef-orange-dark transition-colors flex items-center"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
        </div>
        
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Reset All</span>
        </button>
        
        <select 
          value={selectedCuisine}
          onChange={(e) => handleCuisineChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
        >
          {cuisineOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
        <select 
          value={selectedDifficulty}
          onChange={(e) => handleDifficultyChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
        >
          {difficultyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
        <select 
          value={selectedMealType}
          onChange={(e) => handleMealTypeChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
        >
          {mealTypeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilters;
