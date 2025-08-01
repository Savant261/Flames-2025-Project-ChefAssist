import React from 'react';
import RecipeCard from './RecipeCard';

const FavoritesTab = ({ favoriteRecipes }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-chef-orange dark:text-chef-orange-light">
          Favorite Recipes
        </h2>
      </div>

      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🍳</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No favorite recipes yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Start exploring recipes to build your favorites collection!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRecipes.map((recipe, index) => (
            <div key={recipe._id || index} className="h-full">
              <RecipeCard recipe={recipe} isMyRecipe={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesTab;
