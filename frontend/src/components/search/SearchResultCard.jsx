import { useNavigate } from "react-router-dom";
import { Star, Clock, Zap, Eye, Bookmark as BookmarkIcon } from "lucide-react";

const SearchResultCard = ({ recipe }) => {
  const navigate = useNavigate();
  
  // Handle both backend format and sample data format
  const recipeData = {
    id: recipe._id || recipe.id,
    title: recipe.title,
    image: recipe.imageUrl || recipe.image,
    description: recipe.description,
    cuisine: recipe.cuisine || recipe.tags?.[0] || "General",
    rating: recipe.rating || 4.5,
    reviews: recipe.reviews || Math.floor(Math.random() * 200) + 10,
    cookTime: recipe.cookTime,
    difficulty: recipe.difficulty || "Medium",
    views: recipe.views || 0,
    author: {
      name: recipe.author?.username || recipe.author?.name || "Chef",
      avatar: recipe.author?.avatar || "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
      followers: recipe.author?.followers || 1000
    }
  };

  return (
    // The fix is here: sm:h-64 enforces a consistent height on desktop.
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row group hover:shadow-xl transition-shadow duration-300 sm:h-64"
      onClick={() => navigate(`/recipe/${recipeData.id}`)}
    >
      {/* Image container now takes up 1/3 of the width on desktop */}
      <div className="relative w-full sm:w-1/3 flex-shrink-0">
        <img
          src={recipeData.image}
          alt={recipeData.title}
          className="w-full h-48 sm:h-full object-cover"
        />
        <button
          className="absolute top-3 right-3 p-2 bg-white/70 dark:bg-gray-800/70 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          title="Save Recipe"
          onClick={(e) => e.stopPropagation()}
        >
          <BookmarkIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div>
          <span className="text-xs font-semibold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-peach)] uppercase">
            {recipeData.cuisine}
          </span>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-1 truncate">
            {recipeData.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
            {recipeData.description}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 text-sm text-gray-500 dark:text-gray-400">
          <img
            src={recipeData.author.avatar}
            alt={recipeData.author.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <span className="font-semibold">{recipeData.author.name}</span>
            <div className="text-xs">
              {recipeData.author.followers.toLocaleString()} Followers
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
          <div
            className="flex items-center gap-1"
            title={`${recipeData.rating} stars`}
          >
            <Star className="w-4 h-4 text-[var(--color-chef-orange-light)]" />
            <span className="font-bold">{recipeData.rating}</span>
            <span className="text-gray-400 text-xs">({recipeData.reviews})</span>
          </div>
          <div
            className="flex items-center gap-1"
            title={`${recipeData.views.toLocaleString()} views`}
          >
            <Eye className="w-4 h-4 text-gray-400" />
            <span>{recipeData.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1" title={recipeData.cookTime}>
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{recipeData.cookTime}</span>
          </div>
          <div className="flex items-center gap-1" title={recipeData.difficulty}>
            <Zap className="w-4 h-4 text-gray-400" />
            <span>{recipeData.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
