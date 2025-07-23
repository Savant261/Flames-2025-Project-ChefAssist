import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, Star, Bookmark, Share2, Play, Pause, ChefHat, Timer, Utensils, Heart, MessageCircle, Download, Printer as Print, Sun, Moon, CheckCircle2 } from 'lucide-react'; // Added Sun and Moon icons

const ViewRecipe = ({ recipe, onBack }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [checkedSteps, setCheckedSteps] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for dark mode

  // Effect to apply/remove 'dark' class on the HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Define comprehensive default recipe data
  const defaultRecipeData = {
    id: 'default-recipe',
    title: 'Delicious Default Recipe',
    description: 'This is a placeholder recipe. No specific recipe data was provided.',
    image: 'https://images.unsplash.com/photo-1543339396-1807d9b5443a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTkyOXwwfDF8c2VhcmNofDE4fHxyZWNpcGUlMjBwbGFjZWhvbGRlcnxlbnwwfHx8fDE3MDY2ODc5MDJ8MA&ixlib=rb-4.0.3&q=80&w=1080',
    rating: 4.0,
    cuisine: "Global",
    difficulty: "Easy",
    cookTime: "30 min",
    servings: 2,
    prepTime: "10 min",
    calories: 350,
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    ingredients: [
      { id: 1, item: "1 cup flour", category: "Pantry" },
      { id: 2, item: "1/2 cup sugar", category: "Pantry" },
      { id: 3, item: "2 eggs", category: "Dairy" },
      { id: 4, item: "1/4 cup milk", category: "Dairy" },
      { id: 5, item: "1 tsp baking powder", category: "Pantry" },
      { id: 6, item: "Pinch of salt", category: "Spices" }
    ],
    instructions: [
      { id: 1, step: "Preheat oven to 180°C (350°F).", time: "5 min" },
      { id: 2, step: "Mix dry ingredients in a bowl.", time: "2 min" },
      { id: 3, step: "Whisk wet ingredients, then combine with dry.", time: "3 min" },
      { id: 4, step: "Pour into a greased pan and bake.", time: "20 min" },
      { id: 5, step: "Enjoy your default recipe!", time: "1 min" }
    ],
    nutrition: {
      calories: 350,
      protein: "10g",
      carbs: "50g",
      fat: "15g",
      fiber: "2g"
    },
    tags: ["Basic", "Quick", "Placeholder"],
    reviews: [
      { id: 1, name: "Gemini AI", rating: 5, comment: "Works perfectly as a default!", date: "Today" }
    ]
  };

  const detailedRecipe = {
    ...defaultRecipeData,
    ...recipe,
    ingredients: recipe?.ingredients || defaultRecipeData.ingredients,
    instructions: recipe?.instructions || defaultRecipeData.instructions,
    nutrition: recipe?.nutrition ? { ...defaultRecipeData.nutrition, ...recipe.nutrition } : defaultRecipeData.nutrition,
    tags: recipe?.tags || defaultRecipeData.tags,
    reviews: recipe?.reviews || defaultRecipeData.reviews,
  };


  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleIngredient = (id) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleStep = (id) => {
    setCheckedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} // Dark mode for inactive stars
        />
      );
    }
    return stars;
  };

  const groupedIngredients = detailedRecipe.ingredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {});

  return (
    // Main container with base background and dark mode background
    <div className="min-h-screen bg-[#FEF3E2] dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#FED7AA] dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-[#D97706] hover:text-[#B45309] transition-colors duration-200 dark:text-[#F59E0B] dark:hover:text-[#FBAD5E]"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
            </button>
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle Button */}
              <button
                onClick={() => setIsDarkMode(prev => !prev)}
                className="p-2 rounded-full bg-[#FED7AA] hover:bg-[#D97706] hover:text-white transition-all duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => showToastNotification('Recipe saved to favorites!')}
                className="p-2 rounded-full bg-[#FED7AA] hover:bg-[#D97706] hover:text-white transition-all duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                <Heart className="w-5 h-5" />
              </button>
              <button
                onClick={() => showToastNotification('Recipe shared!')}
                className="p-2 rounded-full bg-[#FED7AA] hover:bg-[#D97706] hover:text-white transition-all duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => showToastNotification('Recipe downloaded!')}
                className="p-2 rounded-full bg-[#FED7AA] hover:bg-[#D97706] hover:text-white transition-all duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => showToastNotification('Recipe sent to printer!')}
                className="p-2 rounded-full bg-[#FED7AA] hover:bg-[#D97706] hover:text-white transition-all duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                <Print className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recipe Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipe Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-[#D97706] text-white text-xs font-medium px-2 py-1 rounded dark:bg-[#F59E0B]">
                  {detailedRecipe.cuisine}
                </span>
                <span className="bg-[#F59E0B] text-white text-xs font-medium px-2 py-1 rounded dark:bg-[#D97706]">
                  {detailedRecipe.difficulty}
                </span>
                {detailedRecipe.tags.map((tag, index) => (
                  <span key={index} className="bg-[#FED7AA] text-[#B45309] text-xs font-medium px-2 py-1 rounded dark:bg-gray-700 dark:text-[#FED7AA]">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4 dark:text-gray-100">{detailedRecipe.title}</h1>
              <p className="text-gray-600 text-lg mb-6 dark:text-gray-300">{detailedRecipe.description}</p>

              {/* Recipe Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-[#FEF3E2] rounded-lg dark:bg-gray-700">
                  <Clock className="w-6 h-6 text-[#D97706] mx-auto mb-1 dark:text-[#FBAD5E]" />
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{detailedRecipe.totalTime}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Total Time</div>
                </div>
                <div className="text-center p-3 bg-[#FEF3E2] rounded-lg dark:bg-gray-700">
                  <Users className="w-6 h-6 text-[#D97706] mx-auto mb-1 dark:text-[#FBAD5E]" />
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{detailedRecipe.servings}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Servings</div>
                </div>
                <div className="text-center p-3 bg-[#FEF3E2] rounded-lg dark:bg-gray-700">
                  <Utensils className="w-6 h-6 text-[#D97706] mx-auto mb-1 dark:text-[#FBAD5E]" />
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{detailedRecipe.calories}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Calories</div>
                </div>
                <div className="text-center p-3 bg-[#FEF3E2] rounded-lg dark:bg-gray-700">
                  <Star className="w-6 h-6 text-[#D97706] mx-auto mb-1 dark:text-[#FBAD5E]" />
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{detailedRecipe.rating}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center dark:text-gray-100">
                <Play className="w-5 h-5 mr-2 text-[#D97706] dark:text-[#FBAD5E]" />
                Recipe Video
              </h2>
              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-[#D97706] to-[#F59E0B] flex items-center justify-center">
                  {isVideoPlaying && detailedRecipe.videoUrl ? (
                      <video
                        src={detailedRecipe.videoUrl}
                        controls
                        autoPlay
                        className="absolute inset-0 w-full h-full object-cover"
                        onEnded={() => setIsVideoPlaying(false)}
                      >
                        Your browser does not support the video tag.
                      </video>
                  ) : (
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-30 transition-all duration-200"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black bg-opacity-50 rounded-lg p-3">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span>Watch how to make {detailedRecipe.title}</span>
                      <span>5:32</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 px-6">
                  {['ingredients', 'instructions', 'nutrition'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                        activeTab === tab
                          ? 'border-[#D97706] text-[#D97706] dark:border-[#FBAD5E] dark:text-[#FBAD5E]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Ingredients Tab */}
                {activeTab === 'ingredients' && (
                  <div className="space-y-6">
                    {Object.entries(groupedIngredients).map(([category, ingredients]) => (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center dark:text-gray-100">
                          <ChefHat className="w-5 h-5 mr-2 text-[#D97706] dark:text-[#FBAD5E]" />
                          {category}
                        </h3>
                        <div className="space-y-2">
                          {ingredients.map((ingredient) => (
                            <label
                              key={ingredient.id}
                              className="flex items-center p-3 rounded-lg hover:bg-[#FEF3E2] transition-colors duration-200 cursor-pointer dark:hover:bg-gray-700"
                            >
                              <input
                                type="checkbox"
                                checked={checkedIngredients[ingredient.id] || false}
                                onChange={() => toggleIngredient(ingredient.id)}
                                className="w-5 h-5 text-[#D97706] rounded focus:ring-[#D97706] focus:ring-2 dark:text-[#FBAD5E] dark:focus:ring-[#FBAD5E]"
                              />
                              <span className={`ml-3 ${checkedIngredients[ingredient.id] ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-200'}`}>
                                {ingredient.item}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Instructions Tab */}
                {activeTab === 'instructions' && (
                  <div className="space-y-4">
                    {detailedRecipe.instructions.map((instruction, index) => (
                      <div
                        key={instruction.id}
                        className="flex items-start p-4 rounded-lg hover:bg-[#FEF3E2] transition-colors duration-200 dark:hover:bg-gray-700"
                      >
                        <button
                          onClick={() => toggleStep(instruction.id)}
                          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-200 ${
                            checkedSteps[instruction.id]
                              ? 'bg-[#D97706] border-[#D97706] dark:bg-[#FBAD5E] dark:border-[#FBAD5E]'
                              : 'border-[#D97706] hover:bg-[#FED7AA] dark:border-[#FBAD5E] dark:hover:bg-gray-600 dark:text-[#FBAD5E]'
                          }`}
                        >
                          {checkedSteps[instruction.id] ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-[#D97706] font-bold text-sm dark:text-[#FBAD5E]">{index + 1}</span>
                          )}
                        </button>
                        <div className="flex-1">
                          <p className={`text-gray-900 mb-2 ${checkedSteps[instruction.id] ? 'line-through text-gray-500 dark:text-gray-400' : 'dark:text-gray-200'}`}>
                            {instruction.step}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Timer className="w-4 h-4 mr-1" />
                            {instruction.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Nutrition Tab */}
                {activeTab === 'nutrition' && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(detailedRecipe.nutrition).map(([key, value]) => (
                      <div key={key} className="text-center p-4 bg-[#FEF3E2] rounded-lg dark:bg-gray-700">
                        <div className="text-2xl font-bold text-[#D97706] mb-1 dark:text-[#FBAD5E]">{value}</div>
                        <div className="text-sm text-gray-600 capitalize dark:text-gray-400">{key}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Reviews & Related */}
          <div className="space-y-6">
            {/* Recipe Image */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
              <img
                src={detailedRecipe.image}
                alt={detailedRecipe.title}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center dark:text-gray-100">
                <MessageCircle className="w-5 h-5 mr-2 text-[#D97706] dark:text-[#FBAD5E]" />
                Reviews ({detailedRecipe.reviews.length})
              </h3>
              <div className="space-y-4">
                {detailedRecipe.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-gray-200">{review.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 px-4 border-2 border-[#D97706] text-[#D97706] rounded-lg hover:bg-[#FED7AA] transition-colors duration-200 dark:border-[#FBAD5E] dark:text-[#FBAD5E] dark:hover:bg-gray-700 dark:hover:text-gray-100">
                Write a Review
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 mb-4 dark:text-gray-100">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => showToastNotification('Added to meal plan!')}
                  className="w-full py-3 px-4 bg-[#D97706] hover:bg-[#B45309] text-white rounded-lg transition-colors duration-200 dark:bg-[#F59E0B] dark:hover:bg-[#D97706]"
                >
                  Add to Meal Plan
                </button>
                <button
                  onClick={() => showToastNotification('Shopping list created!')}
                  className="w-full py-3 px-4 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-lg transition-colors duration-200 dark:bg-[#D97706] dark:hover:bg-[#B45309]"
                >
                  Create Shopping List
                </button>
                <button
                  onClick={() => showToastNotification('Recipe scaled!')}
                  className="w-full py-3 px-4 border-2 border-[#D97706] text-[#D97706] hover:bg-[#FED7AA] rounded-lg transition-colors duration-200 dark:border-[#FBAD5E] dark:text-[#FBAD5E] dark:hover:bg-gray-700 dark:hover:text-gray-100"
                >
                  Scale Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white border-l-4 border-[#D97706] rounded-lg shadow-lg p-4 max-w-sm animate-slide-in dark:bg-gray-800 dark:border-[#FBAD5E]">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-[#D97706] rounded-full dark:bg-[#FBAD5E]"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
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

export default ViewRecipe;