import React from 'react';

const ChefCards = ({ 
  chefs, 
  chefsLoading, 
  selectedChef, 
  setSelectedChef 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-orange-100 dark:border-gray-700 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-center space-x-4 flex-wrap">
          {/* All Chefs Card */}
          <button
            onClick={() => setSelectedChef(null)}
            className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              selectedChef === null
                ? 'bg-orange-100 dark:bg-orange-900 shadow-md'
                : 'hover:bg-orange-50 dark:hover:bg-orange-900'
            }`}
          >
            <img
              src="/Images/all-chefs.png"
              alt="All Chefs"
              className={`w-16 h-16 rounded-full object-cover ${
                selectedChef === null ? 'ring-4 ring-orange-300 dark:ring-orange-700' : ''
              }`}
            />
            <span className={`text-sm font-medium ${
              selectedChef === null ? 'text-orange-700 dark:text-orange-300' : 'text-gray-600 dark:text-gray-300'
            }`}>
              All Chefs
            </span>
          </button>

          {/* Individual Chef Cards */}
          {chefsLoading ? (
            // Loading skeletons for chefs
            [...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 p-3">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="w-12 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))
          ) : chefs.length === 0 ? (
            // No chefs message
            <div className="flex flex-col items-center space-y-2 p-3 text-gray-500 dark:text-gray-400">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-center">No chefs followed</span>
            </div>
          ) : (
            // Actual chef cards
            chefs.map((chef) => (
              <button
                key={chef.id}
                onClick={() => setSelectedChef(chef)}
                className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedChef?.id === chef.id
                    ? 'bg-orange-100 dark:bg-orange-900 shadow-md'
                    : 'hover:bg-orange-50 dark:hover:bg-orange-900'
                }`}
              >
                <div className="relative">
                  <img
                    src={chef.avatar}
                    alt={chef.name}
                    className={`w-16 h-16 rounded-full object-cover ${
                      selectedChef?.id === chef.id ? 'ring-4 ring-orange-300 dark:ring-orange-700' : ''
                    }`}
                  />
                  {chef.isActive && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <span className={`text-sm font-medium text-center ${
                  selectedChef?.id === chef.id ? 'text-orange-700 dark:text-orange-300' : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {chef.name.split(' ')[0]}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChefCards;
