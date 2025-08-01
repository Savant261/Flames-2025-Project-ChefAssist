import React from 'react';

const ProfileStats = ({ profileData, followerCount, followingCount }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <div className="text-center group cursor-pointer">
          <div className="bg-chef-peach/30 dark:bg-chef-peach/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 dark:group-hover:bg-chef-peach/30 transition-colors">
            <span className="text-3xl font-bold text-chef-orange dark:text-chef-orange-light">
              {profileData.stats.totalRecipes}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Recipes</p>
        </div>

        <div className="text-center group cursor-pointer">
          <div className="bg-chef-peach/30 dark:bg-chef-peach/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 dark:group-hover:bg-chef-peach/30 transition-colors">
            <span className="text-2xl font-bold text-chef-orange dark:text-chef-orange-light">
              {followerCount}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Followers</p>
        </div>

        <div className="text-center group cursor-pointer">
          <div className="bg-chef-peach/30 dark:bg-chef-peach/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 dark:group-hover:bg-chef-peach/30 transition-colors">
            <span className="text-2xl font-bold text-chef-orange dark:text-chef-orange-light">
              {followingCount}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Following</p>
        </div>

        <div className="text-center group cursor-pointer">
          <div className="bg-chef-peach/30 dark:bg-chef-peach/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 dark:group-hover:bg-chef-peach/30 transition-colors">
            <span className="text-3xl font-bold text-chef-orange dark:text-chef-orange-light">
              {profileData.stats.favoriteRecipesCount}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Favorites</p>
        </div>

        <div className="text-center group cursor-pointer">
          <div className="bg-chef-peach/30 dark:bg-chef-peach/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 dark:group-hover:bg-chef-peach/30 transition-colors">
            <span className="text-2xl font-bold text-chef-orange dark:text-chef-orange-light">
              {profileData.stats.averageRating?.toFixed(1) || '0.0'}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Avg Rating</p>
          <div className="flex justify-center mt-2">
            <div className="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
