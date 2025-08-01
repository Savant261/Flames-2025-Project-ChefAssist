import React from 'react';

const ProfileTabs = ({ activeTab, handleTabChange, profileData }) => {
  return (
    <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
      <button
        className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
          activeTab === 'reviews' 
            ? 'border-chef-orange text-chef-orange dark:text-chef-orange-light' 
            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-chef-orange dark:hover:text-chef-orange-light hover:border-chef-orange/50'
        }`}
        onClick={() => handleTabChange('reviews')}
      >
        All Recipes ({profileData.stats.totalRecipes})
      </button>
      <button
        className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
          activeTab === 'favorites' 
            ? 'border-chef-orange text-chef-orange dark:text-chef-orange-light' 
            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-chef-orange dark:hover:text-chef-orange-light hover:border-chef-orange/50'
        }`}
        onClick={() => handleTabChange('favorites')}
      >
        Favorite Recipes ({profileData.stats.favoriteRecipesCount})
      </button>
      <button
        className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
          activeTab === 'activity' 
            ? 'border-chef-orange text-chef-orange dark:text-chef-orange-light' 
            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-chef-orange dark:hover:text-chef-orange-light hover:border-chef-orange/50'
        }`}
        onClick={() => handleTabChange('activity')}
      >
        Activity Feed
      </button>
    </div>
  );
};

export default ProfileTabs;
