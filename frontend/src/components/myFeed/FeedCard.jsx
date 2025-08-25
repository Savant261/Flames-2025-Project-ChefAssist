import React from 'react';
import { Clock, Heart, Bookmark, MessageCircle, Eye, ChefHat } from 'lucide-react';

const FeedCard = ({ item, handleSave, handleLike, onRecipeClick, onChefClick }) => {
  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMs = now - time;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
  };
  if (!item) {
    return <div>No item data</div>;
  }
  if (item.type === 'recipe') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
        <div 
          className="relative overflow-hidden cursor-pointer"
          onClick={() => onRecipeClick && onRecipeClick(item)}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          <div className="absolute top-3 right-3 flex space-x-2">
            {/* Like button */}
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike && handleLike(item._id || item.id, item.type);
              }}
              className={`p-2 rounded-full transition-all duration-300 ${
                item.isLiked
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart size={16} fill={item.isLiked ? 'white' : 'none'} />
            </button> */}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSave && handleSave(item._id || item.id, item.type);
              }}
              className={`p-2 rounded-full transition-all duration-300 ${
                item.isSaved
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <Bookmark size={16} fill={item.isSaved ? 'white' : 'none'} />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={item.author?.avatar}
              alt={item.author?.name}
              className="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-orange-500 transition-all"
              onClick={() => onChefClick && onChefClick(item.author)}
            />
            <div className="flex-1">
              <p 
                className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer hover:text-orange-500 transition-colors"
                onClick={() => onChefClick && onChefClick(item.author)}
              >
                {item.author?.name}
              </p>
              <p 
                className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer hover:text-orange-500 transition-colors"
                onClick={() => onChefClick && onChefClick(item.author)}
              >
                @{item.author?.username}
              </p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
              <Clock size={12} />
              <span>{formatTime(item.createdAt)}</span>
            </span>
          </div>
          
          <h3 
            className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 cursor-pointer hover:text-orange-500 transition-colors"
            onClick={() => onRecipeClick && onRecipeClick(item)}
          >
            {item.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Heart size={14} />
                <span>{item.likes || 0}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MessageCircle size={14} />
                <span>{item.comments || 0}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye size={14} />
                <span>{item.views || 0}</span>
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                {item.difficulty || 'Medium'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{item.cookTime || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Activity card
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden p-4">
      <div className="flex items-start space-x-3">
        <img
          src={item.user?.avatar}
          alt={item.user?.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-gray-900 dark:text-white">{item.user?.name}</span>
            <span className="text-gray-500 dark:text-gray-400">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{formatTime(item.timestamp)}</span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            {item.action}
          </p>
          
          {item.recipe && (
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 flex items-center space-x-3">
              <img
                src={item.recipe.image}
                alt={item.recipe.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {item.recipe.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  by {item.recipe.author}
                </p>
              </div>
              <ChefHat size={16} className="text-orange-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
 