import { useNavigate } from "react-router-dom";
import { Star, Clock, Bookmark as BookmarkIcon, Eye } from "lucide-react";

const RecipeCard2 = ({ recipe }) => {

  const navigate = useNavigate();
  return (
    <div
      className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border border-transparent hover:border-[var(--color-chef-peach)]"
      onClick={() => navigate(`/recipe/${recipe._id}`)}
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
            src={recipe.author?.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'}
            alt={recipe.author?.username || recipe.author?.name || 'Chef'}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <span className="font-semibold">{recipe.author?.username || recipe.author?.name || 'Anonymous Chef'}</span>
            <div className="text-xs">
              {(recipe.author?.followers || 0).toLocaleString()} Followers
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
