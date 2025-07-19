import { useNavigate } from "react-router-dom";
import { Star, Clock, Bookmark as BookmarkIcon, Eye } from "lucide-react";

const RecipeCard2 = ({ recipe }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border border-transparent hover:border-[var(--color-chef-peach)]"
      onClick={() => navigate("/recipe")}
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {recipe.badges.map((badge) => (
            <span
              key={badge}
              className="bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm"
            >
              {badge}
            </span>
          ))}
        </div>
        <button className="absolute top-2 left-2 p-2 bg-white/70 dark:bg-gray-800/70 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <BookmarkIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
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
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
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
        </div>
      </div>
    </div>
  );
};

export default RecipeCard2;
