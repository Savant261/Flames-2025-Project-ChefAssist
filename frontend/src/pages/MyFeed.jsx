import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Bookmark, Clock, Users, Star, ChefHat, TrendingUp, Play, Activity, Grid3X3, Filter } from 'lucide-react';
import { getMyFeed, getChefRecipes, getFollowedChefs } from '../api/myFeedService';
import { recipeService } from '../api/recipeService';
import userService from '../api/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ChefCards from '../components/myFeed/ChefCards';
import NavigationTabs from '../components/myFeed/NavigationTabs';
import FeedCard from '../components/myFeed/FeedCard';
import LoadingState from '../components/myFeed/LoadingState';
import EmptyState from '../components/myFeed/EmptyState';

const MyFeed = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recipes');
  const [selectedChef, setSelectedChef] = useState(null);
  const [chefs, setChefs] = useState([]);
  const [feedContent, setFeedContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chefsLoading, setChefsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Load followed chefs on component mount
  useEffect(() => {
    loadFollowedChefs();
  }, []);

  // Load feed content when tab or chef changes
  useEffect(() => {
    loadFeedContent(1);
  }, [activeTab, selectedChef]);

  const loadFollowedChefs = async () => {
    try {
      setChefsLoading(true);
      const response = await getFollowedChefs();
      
      if (response.chefs) {
        // Format backend data to match expected structure
        const formattedChefs = response.chefs.map(chef => ({
          id: chef.id,
          _id: chef._id, // Add _id for profile navigation
          name: chef.name,
          username: chef.username,
          avatar: chef.avatar || '/Images/chef-placeholder.png',
          followers: chef.followers > 1000 ? `${(chef.followers / 1000).toFixed(1)}K` : chef.followers.toString(),
          recipes: chef.recipes,
          isFollowing: true
        }));
        
        setChefs(formattedChefs);
      } else {
        setChefs([]);
      }
    } catch (error) {
      console.error('Error loading followed chefs:', error);
      setChefs([]);
    } finally {
      setChefsLoading(false);
    }
  };

  const loadFeedContent = async (pageNum = 1) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
        setFeedContent([]);
      } else {
        setLoadingMore(true);
      }

      let response;
      let formattedContent = [];

      if (selectedChef && selectedChef.id) {
        // Load chef-specific content
        response = await getChefRecipes(selectedChef.id, pageNum, 9);
        if (response.recipes) {
          formattedContent = response.recipes.map(recipe => ({
            id: recipe._id,
            _id: recipe._id, // Ensure both id and _id are set
            type: 'recipe',
            title: recipe.title,
            image: recipe.image,
            author: {
              id: recipe.chef.id,
              _id: recipe.chef._id, // Add _id for profile navigation
              name: recipe.chef.name,
              username: recipe.chef.username,
              avatar: recipe.chef.avatar || '/Images/chef-placeholder.png'
            },
            category: recipe.category || 'General',
            cookTime: recipe.cookingTime || '30 mins',
            difficulty: recipe.difficulty || 'Medium',
            likes: recipe.likes || 0,
            comments: recipe.comments || 0,
            views: recipe.views || 0,
            description: recipe.description,
            createdAt: recipe.timeAgo,
            isLiked: recipe.isLiked || false,
            isSaved: recipe.isSaved || false
          }));
        }
        
        setHasMore(response?.page < response?.pages);
      } else {
        // Load general feed based on active tab
        const feedType = activeTab === 'recipes' ? 'recipes' : activeTab === 'activity' ? 'activities' : 'all';
        response = await getMyFeed(pageNum, 9, feedType);
        
        formattedContent = response.feedItems?.map(item => {
          const baseItem = {
            id: item._id,
            type: item.type,
            author: {
              id: item.chef.id,
              _id: item.chef._id, // Add _id for profile navigation
              name: item.chef.name,
              username: item.chef.username,
              avatar: item.chef.avatar || '/Images/chef-placeholder.png'
            },
            likes: item.likes || 0,
            comments: item.comments || 0,
            createdAt: item.timeAgo,
            isLiked: item.isLiked || false,
            isSaved: item.isSaved || false
          };

          if (item.type === 'recipe') {
            return {
              ...baseItem,
              title: item.title,
              image: item.image,
              cookTime: item.cookingTime || '30 mins',
              difficulty: item.difficulty || 'Medium',
              description: item.description,
              category: item.category || 'General',
              views: item.views || 0
            };
          } else {
            return {
              ...baseItem,
              user: item.chef,
              action: item.action,
              timestamp: item.timestamp,
              recipe: item.recipe ? {
                title: item.recipe.title,
                image: item.recipe.image,
                author: item.recipe.author
              } : null
            };
          }
        }) || [];
        
        setHasMore(response?.page < response?.pages);
      }

      if (pageNum === 1) {
        setFeedContent(formattedContent);
        setVisibleCount(formattedContent.length);
      } else {
        setFeedContent(prev => [...prev, ...formattedContent]);
        setVisibleCount(prev => prev + formattedContent.length);
      }
      
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading feed:', error);
      if (pageNum === 1) {
        setFeedContent([]);
        setVisibleCount(0);
      }
      toast.error('Error loading feed. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVisibleCount(9);
    setPage(1);
  };

  // Handle recipe click - navigate to recipe detail page
  const handleRecipeClick = (recipe) => {
    const recipeId = recipe._id || recipe.id;
    if (recipeId) {
      navigate(`/recipe/${recipeId}`);
    }
  };

  // Handle chef click - navigate to chef profile
  const handleChefClick = (chef) => {
    const username = chef.username; // Use _id first, then fallback to id
    if (username) {
      navigate(`/profile/${username}`);
    } else {
      console.error('No valid user ID found in chef object:', chef);
    }
  };

  // Handle save functionality
  const handleSave = async (contentId, type) => {
    try {
      const response = await recipeService.toggleSave(contentId);
      
      // Update the feed content with new save status
      setFeedContent(prev => prev.map(item => {
        if ((item._id || item.id) === contentId) {
          return {
            ...item,
            isSaved: !item.isSaved
          };
        }
        return item;
      }));

      toast.success(response.isSaved ? 'Recipe saved!' : 'Recipe unsaved!');
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast.error('Error updating save. Please try again.');
    }
  };

  // Handle like functionality
  const handleLike = async (contentId, type) => {
    // Store previous state for potential rollback
    let previousState = null;
    
    try {
      // Prevent multiple simultaneous like requests for the same item
      if (handleLike.processing && handleLike.processing.has(contentId)) {
        return;
      }
      
      // Initialize processing set if it doesn't exist
      if (!handleLike.processing) {
        handleLike.processing = new Set();
      }
      handleLike.processing.add(contentId);

      
      // Store previous state for rollback
      previousState = feedContent.find(item => (item._id || item.id) === contentId);
      
      // Optimistic update
      setFeedContent(prev => prev.map(item => {
        if ((item._id || item.id) === contentId) {
          return {
            ...item,
            isLiked: !item.isLiked,
            likes: !item.isLiked ? (item.likes || 0) + 1 : Math.max(0, (item.likes || 0) - 1)
          };
        }
        return item;
      }));
      
      const response = await recipeService.toggleLike(contentId);
      
      // Update with server response
      setFeedContent(prev => prev.map(item => {
        if ((item._id || item.id) === contentId) {
          return {
            ...item,
            isLiked: response.isLiked,
            likes: response.likeCount
          };
        }
        return item;
      }));

      toast.success(response.isLiked ? 'Recipe liked!' : 'Recipe unliked!');
    } catch (error) {
      console.error('Error liking recipe:', error);
      
      // Revert optimistic update on error
      if (previousState) {
        setFeedContent(prev => prev.map(item => {
          if ((item._id || item.id) === contentId) {
            return {
              ...item,
              isLiked: previousState.isLiked,
              likes: previousState.likes
            };
          }
          return item;
        }));
      }
      
      // Handle specific errors
      if (error.response?.status === 409) {
        toast.error('Duplicate action detected. Please refresh the page.');
      } else {
        toast.error('Error updating like. Please try again.');
      }
    } finally {
      // Remove from processing set
      if (handleLike.processing) {
        handleLike.processing.delete(contentId);
      }
    }
  };

  const getCurrentContent = () => {
    return feedContent.slice(0, visibleCount);
  };

  const getTotalContent = () => {
    return feedContent;
  };

  const loadMoreContent = () => {
    if (hasMore && !loadingMore) {
      loadFeedContent(page + 1);
    }
  };

  const renderFeedCard = (item, index) => {
    return <FeedCard 
      key={item.id} 
      item={item} 
      handleSave={handleSave} 
      handleLike={handleLike}
      onRecipeClick={handleRecipeClick}
      onChefClick={handleChefClick}
    />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Chef Cards */}
      <ChefCards
        chefs={chefs}
        selectedChef={selectedChef}
        setSelectedChef={setSelectedChef}
        loading={chefsLoading}
      />

      {/* Navigation Tabs */}
      <NavigationTabs
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      {/* Feed Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <LoadingState />
          ) : getCurrentContent().length === 0 ? (
            <EmptyState
              title={selectedChef ? `No ${activeTab} from ${selectedChef.name}` : `No ${activeTab} available`}
              message={selectedChef ? `${selectedChef.name} hasn't shared any ${activeTab} yet.` : `Your followed chefs haven't shared any ${activeTab} yet.`}
            />
          ) : (
            getCurrentContent().map((item, index) => renderFeedCard(item, index))
          )}
        </div>

        {/* Load More Button */}
        {!loading && getCurrentContent().length > 0 && hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreContent}
              disabled={loadingMore}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              {loadingMore ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Load More</span>
                  <TrendingUp size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFeed;
