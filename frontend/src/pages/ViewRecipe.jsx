import React, { useState } from 'react';
import { ArrowLeft, Clock, Users, Star, Bookmark, Share2, Play, Pause, ChefHat, Timer, Utensils, Heart, MessageCircle, Download, Printer as Print, CheckCircle2 } from 'lucide-react';

const ViewRecipe = ({ recipe, onBack }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [checkedSteps, setCheckedSteps] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Mock recipe data with detailed information
  const detailedRecipe = {
    ...recipe,
    servings: 4,
    prepTime: "15 min",
    totalTime: recipe.cookTime,
    calories: 450,
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    ingredients: [
      { id: 1, item: "400g spaghetti pasta", category: "Pantry" },
      { id: 2, item: "4 cloves garlic, minced", category: "Fresh" },
      { id: 3, item: "2-3 dried red chilies", category: "Spices" },
      { id: 4, item: "400g canned tomatoes", category: "Pantry" },
      { id: 5, item: "1/4 cup olive oil", category: "Pantry" },
      { id: 6, item: "Fresh parsley, chopped", category: "Fresh" },
      { id: 7, item: "Parmesan cheese, grated", category: "Dairy" },
      { id: 8, item: "Salt and pepper to taste", category: "Spices" }
    ],
    instructions: [
      {
        id: 1,
        step: "Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente.",
        time: "10-12 min"
      },
      {
        id: 2,
        step: "While pasta cooks, heat olive oil in a large skillet over medium heat. Add minced garlic and red chilies.",
        time: "2 min"
      },
      {
        id: 3,
        step: "Add canned tomatoes, breaking them up with a spoon. Season with salt and pepper. Simmer until sauce thickens.",
        time: "8-10 min"
      },
      {
        id: 4,
        step: "Drain pasta and add to the sauce. Toss well to combine. Remove from heat.",
        time: "1 min"
      },
      {
        id: 5,
        step: "Serve immediately, garnished with fresh parsley and grated Parmesan cheese.",
        time: "1 min"
      }
    ],
    nutrition: {
      calories: 450,
      protein: "16g",
      carbs: "68g",
      fat: "14g",
      fiber: "4g"
    },
    tags: ["Spicy", "Italian", "Vegetarian", "Quick", "Comfort Food"],
    reviews: [
      {
        id: 1,
        name: "Sarah M.",
        rating: 5,
        comment: "Absolutely delicious! The perfect amount of heat.",
        date: "2 days ago"
      },
      {
        id: 2,
        name: "Mike R.",
        rating: 4,
        comment: "Great recipe, I added some extra garlic.",
        date: "1 week ago"
      }
    ]
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
          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
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
    <div className="min-h-screen bg-[#FEF3E2]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#FED7AA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-[#D97706] hover:text-[#B45309] transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Saved Recipes
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => showToastNotification('Recipe saved to favorites!')}
                className="p-2 rounded-full bg-[#FED7AA] hover:bg-[#D97706] hover:text-white transition-all duration-200"
              >
                <Heart className="w-5 h-5" />
              </button>
              <button
                onClick={() => showToastNotification('Recipe shared!')}
                className="p-2 rounded-full bg-[#FED7AA] hover:bg-[#D97706] hover:text-white transition-all duration-200"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => showToastNotification('Recipe downloaded!')}
                className="p-2 rounded-full bg-[#FED7AA] hover:bg-[#D97706] hover:text-white transition-all duration-200"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => showToastNotification('Recipe sent to printer!')}
                className="p-2 rounded-full bg-[#FED7AA] hover:bg-[#D97706] hover:text-white transition-all duration-200"
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
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-[#D97706] text-white text-xs font-medium px-2 py-1 rounded">
                  {detailedRecipe.cuisine}
                </span>
                <span className="bg-[#F59E0B] text-white text-xs font-medium px-2 py-1 rounded">
                  {detailedRecipe.difficulty}
                </span>
                {detailedRecipe.tags.map((tag, index) => (
                  <span key={index} className="bg-[#FED7AA] text-[#B45309] text-xs font-medium px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{detailedRecipe.title}</h1>
              <p className="text-gray-600 text-lg mb-6">{detailedRecipe.description}</p>
              
              {/* Recipe Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-[#FEF3E2] rounded-lg">
                  <Clock className="w-6 h-6 text-[#D97706] mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">{detailedRecipe.totalTime}</div>
                  <div className="text-xs text-gray-500">Total Time</div>
                </div>
                <div className="text-center p-3 bg-[#FEF3E2] rounded-lg">
                  <Users className="w-6 h-6 text-[#D97706] mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">{detailedRecipe.servings}</div>
                  <div className="text-xs text-gray-500">Servings</div>
                </div>
                <div className="text-center p-3 bg-[#FEF3E2] rounded-lg">
                  <Utensils className="w-6 h-6 text-[#D97706] mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">{detailedRecipe.calories}</div>
                  <div className="text-xs text-gray-500">Calories</div>
                </div>
                <div className="text-center p-3 bg-[#FEF3E2] rounded-lg">
                  <Star className="w-6 h-6 text-[#D97706] mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">{detailedRecipe.rating}</div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Play className="w-5 h-5 mr-2 text-[#D97706]" />
                Recipe Video
              </h2>
              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-[#D97706] to-[#F59E0B] flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-30 transition-all duration-200"
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
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
            <div className="bg-white rounded-xl shadow-lg">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {['ingredients', 'instructions', 'nutrition'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                        activeTab === tab
                          ? 'border-[#D97706] text-[#D97706]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <ChefHat className="w-5 h-5 mr-2 text-[#D97706]" />
                          {category}
                        </h3>
                        <div className="space-y-2">
                          {ingredients.map((ingredient) => (
                            <label
                              key={ingredient.id}
                              className="flex items-center p-3 rounded-lg hover:bg-[#FEF3E2] transition-colors duration-200 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={checkedIngredients[ingredient.id] || false}
                                onChange={() => toggleIngredient(ingredient.id)}
                                className="w-5 h-5 text-[#D97706] rounded focus:ring-[#D97706] focus:ring-2"
                              />
                              <span className={`ml-3 ${checkedIngredients[ingredient.id] ? 'line-through text-gray-500' : 'text-gray-900'}`}>
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
                        className="flex items-start p-4 rounded-lg hover:bg-[#FEF3E2] transition-colors duration-200"
                      >
                        <button
                          onClick={() => toggleStep(instruction.id)}
                          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-200 ${
                            checkedSteps[instruction.id]
                              ? 'bg-[#D97706] border-[#D97706]'
                              : 'border-[#D97706] hover:bg-[#FED7AA]'
                          }`}
                        >
                          {checkedSteps[instruction.id] ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-[#D97706] font-bold text-sm">{index + 1}</span>
                          )}
                        </button>
                        <div className="flex-1">
                          <p className={`text-gray-900 mb-2 ${checkedSteps[instruction.id] ? 'line-through text-gray-500' : ''}`}>
                            {instruction.step}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
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
                      <div key={key} className="text-center p-4 bg-[#FEF3E2] rounded-lg">
                        <div className="text-2xl font-bold text-[#D97706] mb-1">{value}</div>
                        <div className="text-sm text-gray-600 capitalize">{key}</div>
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
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={detailedRecipe.image}
                alt={detailedRecipe.title}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-[#D97706]" />
                Reviews ({detailedRecipe.reviews})
              </h3>
              <div className="space-y-4">
                {detailedRecipe.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{review.name}</span>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 px-4 border-2 border-[#D97706] text-[#D97706] rounded-lg hover:bg-[#FED7AA] transition-colors duration-200">
                Write a Review
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => showToastNotification('Added to meal plan!')}
                  className="w-full py-3 px-4 bg-[#D97706] hover:bg-[#B45309] text-white rounded-lg transition-colors duration-200"
                >
                  Add to Meal Plan
                </button>
                <button
                  onClick={() => showToastNotification('Shopping list created!')}
                  className="w-full py-3 px-4 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-lg transition-colors duration-200"
                >
                  Create Shopping List
                </button>
                <button
                  onClick={() => showToastNotification('Recipe scaled!')}
                  className="w-full py-3 px-4 border-2 border-[#D97706] text-[#D97706] hover:bg-[#FED7AA] rounded-lg transition-colors duration-200"
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
          <div className="bg-white border-l-4 border-[#D97706] rounded-lg shadow-lg p-4 max-w-sm animate-slide-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-[#D97706] rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
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