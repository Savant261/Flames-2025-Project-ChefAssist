import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, Clock, Bookmark as BookmarkIcon, Eye } from "lucide-react";
import { toast } from "react-toastify";
import userService from "../api/userService.js";

const RecipeCard2 = ({ recipe, onRemoveFromSaved, initialSaved = false }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [checkedSaveStatus, setCheckedSaveStatus] = useState(initialSaved);

  // Check if recipe is already saved when component mounts (only if not already marked as saved)
  useEffect(() => {
    if (initialSaved) {
      setIsSaved(true);
      setCheckedSaveStatus(true);
      return;
    }

    const checkIfSaved = async () => {
      try {
        const response = await userService.checkRecipeSaved(recipe._id);
        setIsSaved(response.isSaved);
        setCheckedSaveStatus(true);
      } catch (error) {
        console.error('Error checking saved status:', error);
        setCheckedSaveStatus(true); // Set to true to prevent infinite loading
      }
    };
    
    if (recipe._id && !checkedSaveStatus) {
      checkIfSaved();
    }
  }, [recipe._id, initialSaved, checkedSaveStatus]);

  // Check save status on hover if not already checked
  const handleMouseEnter = async () => {
    setIsHovered(true);
    
    if (!checkedSaveStatus && !initialSaved && recipe._id) {
      try {
        const response = await userService.checkRecipeSaved(recipe._id);
        setIsSaved(response.isSaved);
        setCheckedSaveStatus(true);
      } catch (error) {
        console.error('Error checking saved status on hover:', error);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handle save/unsave recipe with toggle
  const handleSaveRecipe = async (e) => {
    e.stopPropagation(); // Prevent card click navigation
    setIsLoading(true);
    
    try {
      const recipeData = {
        recipeId: recipe._id,
        title: recipe.title,
        imageUrl: recipe.imageUrl || recipe.image,
        author: recipe.author,
        rating: recipe.rating,
        cookTime: recipe.cookTime,
        views: recipe.views
      };
      
      const response = await userService.toggleSavedRecipe(recipeData);
      
      setIsSaved(response.isSaved);
      
      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
      });
      
      // Call the callback to remove from parent component's list if recipe was unsaved
      if (!response.isSaved && onRemoveFromSaved) {
        onRemoveFromSaved(recipe._id);
      }
      
    } catch (error) {
      console.error('Error toggling recipe save status:', error);
      toast.error(error.message || 'Failed to save recipe. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle author profile click
  const handleAuthorClick = (e) => {
    e.stopPropagation(); // Prevent card click navigation
    if (recipe.author?.username || recipe.author?.name) {
      const username = recipe.author.username || recipe.author.name;
      navigate(`/profile/${username}`);
    }
  };
  return (
    <div
      className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border border-transparent hover:border-[var(--color-chef-peach)]"
      onClick={() => navigate(`/recipe/${recipe._id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <img
          src={recipe.imageUrl || recipe.image || 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={recipe.title || 'Recipe'}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {(recipe.badges || recipe.tags || []).map((badge, index) => (
            <span
              key={`${recipe._id}-${badge}-${index}`}
              className="bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm"
            >
              {badge}
            </span>
          ))}
        </div>
        <button 
          onClick={handleSaveRecipe}
          disabled={isLoading}
          className={`absolute top-2 left-2 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isHovered || isSaved ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          } ${
            isSaved 
              ? 'bg-[var(--color-chef-peach)]/90 text-white' 
              : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200'
          } ${isLoading || !checkedSaveStatus ? 'cursor-not-allowed opacity-50' : 'hover:scale-110'}`}
          title={
            !checkedSaveStatus 
              ? 'Checking save status...' 
              : isSaved 
                ? 'Remove from saved recipes' 
                : 'Save recipe'
          }
        >
          {!checkedSaveStatus ? (
            <div className="w-5 h-5 animate-spin">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-[var(--color-chef-peach)] rounded-full"></div>
            </div>
          ) : (
            <BookmarkIcon 
              className={`w-5 h-5 transition-all duration-200 ${
                isSaved ? 'fill-current' : ''
              }`} 
            />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <div 
            onClick={handleAuthorClick}
            className="flex items-center gap-3 cursor-pointer hover:text-[var(--color-chef-peach)] transition-colors duration-200"
            title="View author profile"
          >
            <img
              src={recipe.author?.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'}
              alt={recipe.author?.username || recipe.author?.name || 'Chef'}
              className="w-8 h-8 rounded-full hover:ring-2 hover:ring-[var(--color-chef-peach)] transition-all duration-200"
            />
            <div>
              <span className="font-semibold hover:underline">
                {recipe.author?.username || recipe.author?.name || 'Anonymous Chef'}
              </span>
              <div className="text-xs">
                {(recipe.author?.followers || 0).toLocaleString()} Followers
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
          <div
            className="flex items-center gap-1"
            title={`${recipe.rating || 'Not rated'}`}
          >
            <Star className="w-4 h-4 text-[var(--color-chef-orange-light)]" />
            <span className="font-bold">{recipe.rating || '4.5'}</span>
            <span className="text-gray-400 text-xs">({recipe.reviews || 0})</span>
          </div>
          <div
            className="flex items-center gap-1"
            title={`${(recipe.views || 0).toLocaleString()} views`}
          >
            <Eye className="w-4 h-4 text-gray-400" />
            <span>{(recipe.views || 0).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1" title={recipe.cookTime || 'Cook time not specified'}>
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{recipe.cookTime || '30 min'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard2;
