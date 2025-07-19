import { useNavigate } from "react-router-dom";
import { Star, Clock, Zap, Eye, Bookmark as BookmarkIcon } from "lucide-react";

const SearchResultCard = ({ recipe }) => {
  const navigate = useNavigate();
  return (
    // The fix is here: sm:h-64 enforces a consistent height on desktop.
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row group hover:shadow-xl transition-shadow duration-300 sm:h-64"
      onClick={() => navigate("/recipe")}
    >
      {/* Image container now takes up 1/3 of the width on desktop */}
      <div className="relative w-full sm:w-1/3 flex-shrink-0">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 sm:h-full object-cover"
        />
        <button
          className="absolute top-3 right-3 p-2 bg-white/70 dark:bg-gray-800/70 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          title="Save Recipe"
        >
          <BookmarkIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div>
          <span className="text-xs font-semibold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-peach)] uppercase">
            {recipe.cuisine}
          </span>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-1 truncate">
            {recipe.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
            {recipe.description}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 text-sm text-gray-500 dark:text-gray-400">
          <img
            src={recipe.author.avatar}
            alt={recipe.author.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <span className="font-semibold">{recipe.author.name}</span>
            <div className="text-xs">
              {recipe.author.followers.toLocaleString()} Followers
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
          <div
            className="flex items-center gap-1"
            title={`${recipe.rating} stars`}
          >
            <Star className="w-4 h-4 text-[var(--color-chef-orange-light)]" />
            <span className="font-bold">{recipe.rating}</span>
            <span className="text-gray-400 text-xs">({recipe.reviews})</span>
          </div>
          <div
            className="flex items-center gap-1"
            title={`${recipe.views.toLocaleString()} views`}
          >
            <Eye className="w-4 h-4 text-gray-400" />
            <span>{recipe.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1" title={recipe.cookTime}>
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-1" title={recipe.difficulty}>
            <Zap className="w-4 h-4 text-gray-400" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
