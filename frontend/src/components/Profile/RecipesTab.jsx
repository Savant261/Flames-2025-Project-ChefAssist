import React from 'react';
import RecipeCard from './RecipeCard';

const RecipesTab = ({ 
  userRecipes, 
  profileData, 
  hasMoreRecipes, 
  loadUserRecipes 
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-chef-orange dark:text-chef-orange-light">
          All Recipes by {profileData.user.username}
        </h2>
      </div>

      {userRecipes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No recipes found</h3>
          <p className="text-gray-500 dark:text-gray-400">This user hasn't shared any public recipes yet.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRecipes.map((recipe, index) => (
              <div key={recipe._id || index} className="h-full">
                <RecipeCard recipe={recipe} isMyRecipe={false} />
              </div>
            ))}
          </div>
          
          {hasMoreRecipes && (
            <div className="text-center mt-8">
              <button
                onClick={() => loadUserRecipes()}
                className="bg-chef-orange text-white px-6 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors inline-flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Load More Recipes</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecipesTab;
