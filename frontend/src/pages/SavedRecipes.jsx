import React, { useState, useEffect } from 'react';
import { Bookmark, Share2, Clock, Star, ChefHat, Sun, Moon } from 'lucide-react'; // Import Sun and Moon icons

const SavedRecipes = ({ onViewRecipe }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [visibleRecipes, setVisibleRecipes] = useState(5);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  // Effect to apply/remove 'dark' class on the body or html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Spicy Pasta Arrabbiata",
      description: "Fiery pasta with tomatoes, garlic, and red chilies",
      image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Italian",
      difficulty: "Easy",
      rating: 4.8,
      reviews: 67,
      cookTime: "20 min"
    },
    {
      id: 2,
      title: "Butter Chicken Curry",
      description: "Creamy and rich Indian curry with tender chicken",
      image: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Indian",
      difficulty: "Medium",
      rating: 4.9,
      reviews: 89,
      cookTime: "40 min"
    },
    {
      id: 3,
      title: "Mediterranean Quinoa Bowl",
      description: "Healthy quinoa bowl with fresh vegetables and feta",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Mediterranean",
      difficulty: "Easy",
      rating: 4.5,
      reviews: 45,
      cookTime: "25 min"
    },
    {
      id: 4,
      title: "Classic Caesar Salad",
      description: "Fresh romaine lettuce with homemade Caesar dressing",
      image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "American",
      difficulty: "Easy",
      rating: 4.3,
      reviews: 32,
      cookTime: "15 min"
    },
    {
      id: 5,
      title: "Thai Green Curry",
      description: "Aromatic Thai curry with coconut milk and vegetables",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Thai",
      difficulty: "Medium",
      rating: 4.7,
      reviews: 78,
      cookTime: "35 min"
    },
    {
      id: 6,
      title: "Margherita Pizza",
      description: "Classic Italian pizza with fresh mozzarella and basil",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Italian",
      difficulty: "Medium",
      rating: 4.6,
      reviews: 54,
      cookTime: "30 min"
    },
    {
      id: 7,
      title: "Beef Tacos",
      description: "Seasoned ground beef in soft tortillas with fresh toppings",
      image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Mexican",
      difficulty: "Easy",
      rating: 4.4,
      reviews: 63,
      cookTime: "20 min"
    },
    {
      id: 8,
      title: "Chicken Teriyaki",
      description: "Glazed chicken with sweet and savory teriyaki sauce",
      image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Japanese",
      difficulty: "Medium",
      rating: 4.5,
      reviews: 41,
      cookTime: "25 min"
    },
    {
      id: 9,
      title: "Greek Moussaka",
      description: "Layered eggplant casserole with meat sauce and béchamel",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Greek",
      difficulty: "Hard",
      rating: 4.8,
      reviews: 29,
      cookTime: "90 min"
    },
    {
      id: 10,
      title: "Pad Thai Noodles",
      description: "Stir-fried rice noodles with shrimp and peanuts",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Thai",
      difficulty: "Medium",
      rating: 4.6,
      reviews: 72,
      cookTime: "30 min"
    },
    {
      id: 11,
      title: "French Ratatouille",
      description: "Traditional Provençal vegetable stew with herbs",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "French",
      difficulty: "Medium",
      rating: 4.4,
      reviews: 38,
      cookTime: "45 min"
    },
    {
      id: 12,
      title: "Korean Bibimbap",
      description: "Mixed rice bowl with vegetables and gochujang sauce",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Korean",
      difficulty: "Medium",
      rating: 4.7,
      reviews: 56,
      cookTime: "35 min"
    },
    {
      id: 13,
      title: "Spanish Paella",
      description: "Saffron rice with seafood and vegetables",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Spanish",
      difficulty: "Hard",
      rating: 4.9,
      reviews: 84,
      cookTime: "60 min"
    },
    {
      id: 14,
      title: "Moroccan Tagine",
      description: "Slow-cooked stew with apricots and warm spices",
      image: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Moroccan",
      difficulty: "Medium",
      rating: 4.5,
      reviews: 47,
      cookTime: "75 min"
    },
    {
      id: 15,
      title: "Brazilian Feijoada",
      description: "Traditional black bean stew with pork and sausage",
      image: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Brazilian",
      difficulty: "Hard",
      rating: 4.6,
      reviews: 31,
      cookTime: "120 min"
    }
  ]);

  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const removeRecipe = (recipeId, recipeName) => {
    setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    showToastNotification(`"${recipeName}" removed from saved recipes`);
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
              <ChefHat className="w-12 h-12 text-white mr-4" />
              <h1 className="text-5xl font-bold text-white">ChefAssist</h1>
            </div>
            <h2 className="text-3xl font-semibold text-white mb-4">Your Saved Recipes</h2>
            <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
              Discover and revisit your favorite AI-generated recipes. From quick weeknight dinners to elaborate weekend feasts.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 bg-chef-orange-light dark:bg-gray-700/50"> {/* Added dark mode bg */}
                <span className="text-white font-medium">{recipes.length} Saved Recipes</span>
              </div>
            </div>
          </div>
        </div>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-200 z-10"
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
              key={recipe.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-gray-700/50 ${
                index >= 5 ? 'animate-fade-in' : ''
              }`}
            >
              {/* Recipe Image */}
              <div className="relative">
                <img
                  src={recipe.image}
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
                  onClick={() => removeRecipe(recipe.id, recipe.title)}
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