import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe, isMyRecipe = false }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '⭐';
    }
    if (hasHalfStar) {
      stars += '⭐';
    }

    return stars;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getMealTypeIcon = (mealType) => {
    switch (mealType?.toLowerCase()) {
      case 'breakfast':
        return '🌅';
      case 'lunch':
        return '🌞';
      case 'dinner':
        return '🌙';
      case 'snack':
        return '🍪';
      case 'dessert':
        return '🍰';
      case 'appetizer':
        return '🥗';
      default:
        return '🍽️';
    }
  };

  const defaultImage = "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

  const handleImageError = () => {
    setImageError(true);
  };

  const handleViewRecipe = () => {
    if (recipe._id) {
      navigate(`/recipe/${recipe._id}`);
    } else {
      navigate("/recipe");
    }
  };

  return (
    <div className="recipe-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-chef-peach/20 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden">
        {/* Status Badge */}
        {recipe.status && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
            {recipe.status.toUpperCase()}
          </span>
        )}

        {/* Recipe Image */}
        <img 
          src={imageError ? defaultImage : (recipe.image || recipe.imageUrl || defaultImage)}
          alt={recipe.title || 'Recipe'}
          onError={handleImageError}
          className="recipe-image w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>

        {/* Favorite Button */}
        <button className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700">
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {/* Bottom Tags */}
        <div className="absolute bottom-2 left-2 flex space-x-1">
          {recipe.cuisine && (
            <span className="px-2 py-1 text-xs font-medium bg-chef-orange/90 text-white rounded-full">
              {recipe.cuisine}
            </span>
          )}
          {recipe.difficulty && (
            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          )}
        </div>

        {/* Meal Type Icon */}
        {recipe.mealType && (
          <div className="absolute bottom-2 right-2">
            <span className="text-lg" title={recipe.mealType}>
              {getMealTypeIcon(recipe.mealType)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-chef-orange dark:group-hover:text-chef-orange-light transition-colors">
          {recipe.title || 'Untitled Recipe'}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {recipe.description || 'No description available'}
        </p>

        {/* Author Info */}
        {recipe.author && (
          <div className="flex items-center mb-3">
            <img
              src={recipe.author.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"}
              alt={recipe.author.username}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              by {recipe.author.fullName || recipe.author.username}
            </span>
          </div>
        )}

        {/* Rating and Time */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <span className="rating-stars text-yellow-400 text-sm">
              {generateStars(recipe.rating || recipe.averageRating || 0)}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {(recipe.rating || recipe.averageRating || 0).toFixed(1)}
            </span>
            <span className="text-sm text-gray-400 dark:text-gray-500">
              ({recipe.reviews || recipe.reviewCount || 0})
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.cookTime || recipe.totalTime || 'N/A'}
          </div>
        </div>

        {/* Additional Recipe Info */}
        <div className="flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-3">
            {recipe.servings && (
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {recipe.servings} servings
              </span>
            )}
            {recipe.prepTime && (
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {recipe.prepTime} prep
              </span>
            )}
          </div>
          {recipe.calories && (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              {recipe.calories} cal
            </span>
          )}
        </div>

        {/* My Recipe Stats */}
        {isMyRecipe && (
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Views: {(recipe.views || 0).toLocaleString()}
            </span>
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Saves: {recipe.saves || 0}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-3">
          <button 
            onClick={handleViewRecipe}
            className="flex-1 bg-chef-orange text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-chef-orange-dark transition-colors"
          >
            {isMyRecipe ? 'Edit Recipe' : 'View Recipe'}
          </button>

          <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-chef-orange dark:hover:border-chef-orange-light hover:text-chef-orange dark:hover:text-chef-orange-light transition-colors text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
