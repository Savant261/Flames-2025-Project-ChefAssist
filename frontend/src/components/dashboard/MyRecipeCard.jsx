import { useState } from "react";
import {  Link } from "react-router-dom";
import { recipeService } from "../../api/recipeService";
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

const MyRecipeCard = ({ recipe, onRecipeUpdate }) => {
  const isPublished = recipe.visibility === "public";
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle recipe deletion
  const handleDeleteRecipe = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      await recipeService.deleteRecipe(recipe._id);
      
      // Show success message
      showNotification('Recipe deleted successfully!');
      
      // Refresh the parent component
      if (onRecipeUpdate) {
        onRecipeUpdate();
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      showNotification('Failed to delete recipe: ' + error.message, 'error');
    } finally {
      setLoading(false);
      setMenuOpen(false);
    }
  };

  // Handle toggle comments
  const handleToggleComments = async () => {
    try {
      setLoading(true);
      await recipeService.toggleRecipeComments(recipe._id);
      
      // Show success message
      showNotification(`Comments ${recipe.allowComments ? 'disabled' : 'enabled'} successfully!`);
      
      // Refresh the parent component
      if (onRecipeUpdate) {
        onRecipeUpdate();
      }
    } catch (error) {
      console.error('Error toggling comments:', error);
      showNotification('Failed to toggle comments: ' + error.message, 'error');
    } finally {
      setLoading(false);
      setMenuOpen(false);
    }
  };

  // Handle share recipe
  const handleShareRecipe = async () => {
    try {
      let recipeUrl = `${window.location.origin}/recipe/${recipe._id}`;
      
      // If recipe is not public, warn the user
      if (recipe.visibility !== 'public') {
        if (!window.confirm('This recipe is not published yet. Only you can view this link. Do you want to continue?')) {
          return;
        }
      }
      
      // Try to use the modern Clipboard API
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(recipeUrl);
        showNotification('Recipe URL copied to clipboard!');
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = recipeUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Recipe URL copied to clipboard!');
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      // Fallback: show the URL in a prompt
      const recipeUrl = `${window.location.origin}/recipe/${recipe._id}`;
      prompt('Copy this URL to share the recipe:', recipeUrl);
    } finally {
      setMenuOpen(false);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50 flex flex-col md:flex-row">
      <img
        src={recipe.imageUrl || '/api/placeholder/400/300'}
        alt={recipe.title || 'Recipe image'}
        className="w-full md:w-1/3 h-48 md:h-auto object-cover"
        onError={(e) => {
          e.target.src = '/api/placeholder/400/300';
        }}
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
            {recipe.description || 'No description available'}
          </p>
        </div>
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500 dark:text-gray-400">
          <div
            className="flex items-center gap-1"
            title={`${(recipe.views || 0).toLocaleString()} views`}
          >
            <Eye className="w-4 h-4" />
            <span>{(recipe.views || 0).toLocaleString()}</span>
          </div>
          <div
            className="flex items-center gap-1"
            title={`${recipe.likes || 0} likes`}
          >
            <Heart className="w-4 h-4" />
            <span>{recipe.likes || 0}</span>
          </div>
          <div className="flex items-center gap-1" title="Comments are on">
            <MessageSquare
              className={`w-4 h-4 ${
                recipe.allowComments ? "text-green-500" : "text-gray-400"
              }`}
            />
            <span>{recipe.allowComments ? "On" : "Off"}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link
            to={`/recipe/edit/${recipe._id}`}
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
                <button 
                  onClick={handleShareRecipe}
                  disabled={loading}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  <Share2 className="w-4 h-4" /> Share Recipe
                </button>
                <button 
                  onClick={handleToggleComments}
                  disabled={loading}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  <MessageSquare className="w-4 h-4" /> 
                  {recipe.allowComments ? 'Disable Comments' : 'Enable Comments'}
                </button>
                <button 
                  onClick={handleDeleteRecipe}
                  disabled={loading}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" /> {loading ? 'Deleting...' : 'Delete Recipe'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } animate-fade-in`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default MyRecipeCard