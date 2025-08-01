import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { ChefHat } from 'lucide-react';
import RecipeCard2 from '../components/RecipeCard2';

const SavedRecipes = ({ onViewRecipe }) => {
  const [visibleRecipes, setVisibleRecipes] = useState(8);
  const [recipes, setRecipes] = useState([]);

  // Fetch saved recipes from backend on mount
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await api.get('/auth/savedRecipe');
        console.log('Full API response:', res.data);
        
        // Handle both response formats (array or object with savedRecipes)
        let savedRecipesData = [];
        if (Array.isArray(res.data)) {
          savedRecipesData = res.data;
        } else if (res.data.savedRecipes && Array.isArray(res.data.savedRecipes)) {
          savedRecipesData = res.data.savedRecipes;
        }
        
        console.log('Processed saved recipes:', savedRecipesData);
        setRecipes(savedRecipesData);
      } catch (error) {
        console.error('Failed to load saved recipes:', error);
        console.error('Error response:', error.response?.data);
      }
    };
    fetchSavedRecipes();
  }, []);

  // Handle recipe removal from the list
  const handleRemoveFromSaved = (recipeId) => {
    setRecipes(prev => prev.filter(recipe => recipe.recipeId !== recipeId));
  };

  const loadMoreRecipes = () => {
    setVisibleRecipes(recipes.length);
  };

  return (
    <div className="min-h-screen bg-[#FEF3E2] dark:bg-gray-900 transition-colors duration-300"> {/* Main background */}
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#D97706] via-[#F59E0B] to-[#FED7AA] dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 transition-colors duration-300">
        <div className="absolute inset-0 bg-opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <ChefHat className="w-12 h-12 text-white dark:text-orange-400 mr-4" />
              <h1 className="text-5xl font-bold text-white dark:text-orange-200">ChefAssist</h1>
            </div>
            <h2 className="text-3xl font-semibold text-white dark:text-orange-200 mb-4">Your Saved Recipes</h2>
            <p className="text-xl text-white dark:text-orange-100 opacity-90 max-w-2xl mx-auto">
              Discover and revisit your favorite AI-generated recipes. From quick weeknight dinners to elaborate weekend feasts.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 bg-chef-orange-light dark:bg-gray-700/50"> {/* Added dark mode bg */}
                <span className="text-white dark:text-orange-200 font-medium">{recipes.length} Saved Recipes</span>
              </div>
            </div>
          </div>
        </div>
      
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute top-1/2 -left-8 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        </div>
      </div>

      {/* Recipe Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg">
              No saved recipes found. Start saving your favorite recipes!
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {recipes.slice(0, visibleRecipes).map((recipe) => {
              console.log('Rendering recipe:', recipe); // Debug log
              return (
                <RecipeCard2
                  key={recipe.recipeId || recipe._id}
                  recipe={{
                    _id: recipe.recipeId,
                    title: recipe.title,
                    imageUrl: recipe.imageUrl || recipe.image,
                    author: recipe.author,
                    rating: recipe.rating,
                    cookTime: recipe.cookTime,
                    views: recipe.views,
                    reviews: recipe.reviews
                  }}
                  initialSaved={true}
                  onRemoveFromSaved={handleRemoveFromSaved}
                />
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {visibleRecipes < recipes.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreRecipes}
              className="px-8 py-4 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] rounded-xl text-white font-semibold text-lg shadow-lg transition-all duration-300 hover:-translate-y-1 dark:from-orange-600 dark:to-orange-500 dark:hover:from-orange-700 dark:hover:to-orange-600"
            >
              Load More Recipes ({recipes.length - visibleRecipes} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;