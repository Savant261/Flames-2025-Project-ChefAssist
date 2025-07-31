import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bookmark, Share2, Clock, Star, ChefHat, Sun, Moon } from 'lucide-react'; // Import Sun and Moon icons

const SavedRecipes = ({ onViewRecipe }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [visibleRecipes, setVisibleRecipes] = useState(5);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const [recipes, setRecipes] = useState([]);

  // Effect to apply/remove 'dark' class on the body or html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Fetch saved recipes from backend on mount
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get('/api/savedRecipe');
        setRecipes(res.data);
      } catch (error) {
        setShowToast(true);
        setToastMessage('Failed to load saved recipes');
      }
    };
    fetchSavedRecipes();
  }, []);

  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const removeRecipe = async (recipeId, recipeName) => {
    try {
      await axios.delete(`/api/savedRecipe/${recipeId}`);
      setRecipes(prev => prev.filter(recipe => recipe.recipeId !== recipeId));
      showToastNotification(`"${recipeName}" removed from saved recipes`);
    } catch (error) {
      showToastNotification('Failed to remove recipe');
    }
  };

  const loadMoreRecipes = () => {
    setVisibleRecipes(recipes.length);
  };

  const shareRecipe = (recipeName) => {
    if (navigator.share) {
      navigator.share({
        title: recipeName,
        text: `Check out this amazing recipe: ${recipeName}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToastNotification('Recipe link copied to clipboard!');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" /> // Dark mode text color
        );
      }
    }
    return stars;
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
        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 dark:bg-gray-700/60 text-white dark:text-orange-200 hover:bg-white/30 dark:hover:bg-gray-700 transition-colors duration-200 z-10"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute top-1/2 -left-8 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
        </div>
      </div>

      {/* Recipe Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.slice(0, visibleRecipes).map((recipe, index) => (
            <div
              key={recipe.recipeId || recipe.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-gray-700/50 ${
                index >= 5 ? 'animate-fade-in' : ''
              }`}
            >
              {/* Recipe Image */}
              <div className="relative">
                <img
                  src={recipe.image || recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />

                {/* Cuisine and Difficulty Badges - Top */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-[#D97706] text-white text-xs font-medium px-2 py-1 rounded dark:bg-orange-600">
                    {recipe.cuisine}
                  </span>
                  <span className="bg-[#F59E0B] text-white text-xs font-medium px-2 py-1 rounded dark:bg-orange-500">
                    {recipe.difficulty}
                  </span>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => removeRecipe(recipe.recipeId || recipe.id, recipe.title)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-[#D97706] transition-transform duration-200 hover:scale-110 dark:bg-orange-600 dark:hover:bg-orange-700"
                >
                  <Bookmark className="w-5 h-5 text-white fill-white" />
                </button>
              </div>

              {/* Recipe Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {recipe.description}
                </p>

                {/* Rating and Time */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {renderStars(recipe.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white ml-1">
                      {recipe.rating}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({recipe.reviews})
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{recipe.cookTime}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => onViewRecipe(recipe)}
                    className="flex-1 py-2 px-4 bg-[#D97706] hover:bg-[#B45309] rounded-lg font-medium text-white transition-colors duration-200 dark:bg-orange-600 dark:hover:bg-orange-700"
                  >
                    View Recipe
                  </button>
                  <button
                    onClick={() => shareRecipe(recipe.title)}
                    className="p-2 border-2 border-[#D97706] rounded-lg transition-colors duration-200 hover:bg-[#FEF3E2] dark:border-orange-600 dark:text-orange-600 dark:hover:bg-gray-700"
                  >
                    <Share2 className="w-5 h-5 text-[#D97706] dark:text-orange-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

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

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white dark:bg-gray-700 border-l-4 border-[#D97706] dark:border-orange-600 rounded-lg shadow-lg p-4 max-w-sm animate-slide-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-[#D97706] dark:bg-orange-600 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {toastMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;