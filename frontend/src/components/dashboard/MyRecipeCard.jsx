import { useState } from "react";
import {  Link } from "react-router-dom";
import {
  Trash2,
  Edit,
  MoreVertical,
  Eye,
  Heart,
  BarChart2,
  Share2,
  MessageSquare,
} from "lucide-react";

const MyRecipeCard = ({ recipe }) => {
  const isPublished = recipe.status === "published";
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50 flex flex-col md:flex-row">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full md:w-1/3 h-48 md:h-auto object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {recipe.title}
            </h3>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                isPublished
                  ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
              }`}
            >
              {isPublished ? "Published" : "Draft"}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {recipe.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500 dark:text-gray-400">
          <div
            className="flex items-center gap-1"
            title={`${recipe.views.toLocaleString()} views`}
          >
            <Eye className="w-4 h-4" />
            <span>{recipe.views.toLocaleString()}</span>
          </div>
          <div
            className="flex items-center gap-1"
            title={`${recipe.likes} likes`}
          >
            <Heart className="w-4 h-4" />
            <span>{recipe.likes}</span>
          </div>
          <div className="flex items-center gap-1" title="Comments are on">
            <MessageSquare
              className={`w-4 h-4 ${
                recipe.commentsEnabled ? "text-green-500" : "text-gray-400"
              }`}
            />
            <span>{recipe.commentsEnabled ? "On" : "Off"}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link
            to={`/recipe/edit/${recipe.id}`}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold"
          >
            <Edit className="w-4 h-4" /> Edit
          </Link>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold">
            <BarChart2 className="w-4 h-4" /> Analytics
          </button>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-xl z-10 border border-gray-200 dark:border-gray-600">
                <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <Share2 className="w-4 h-4" /> Share Recipe
                </button>
                <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <MessageSquare className="w-4 h-4" /> Toggle Comments
                </button>
                <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4" /> Delete Recipe
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecipeCard