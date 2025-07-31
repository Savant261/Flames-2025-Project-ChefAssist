import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import userService from "../api/userService";
import activityFeedService from "../api/activityFeedService";
import followService from "../api/followService";

const Profile = ({ userData }) => {
  const navigate = useNavigate();
  const { userName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState('reviews');
  
  // Recipe states
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [activityPosts, setActivityPosts] = useState([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All Cuisines');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulty');
  const [selectedMealType, setSelectedMealType] = useState('All Meal Types');
  
  // Activity feed states
  const [newPost, setNewPost] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  
  // Pagination states
  const [recipePage, setRecipePage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);
  const [hasMoreRecipes, setHasMoreRecipes] = useState(true);
  const [hasMoreActivity, setHasMoreActivity] = useState(true);

  // Follow states
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // Check if current user is the profile owner
  const isOwner = userData && userData.username === userName;

  // Filter options
  const cuisineOptions = [
    'All Cuisines', 'Italian', 'Asian', 'Mexican', 'Indian', 'American', 
    'French', 'Mediterranean', 'Thai', 'Chinese', 'Japanese', 'Korean'
  ];
  
  const difficultyOptions = [
    'All Difficulty', 'Easy', 'Medium', 'Hard'
  ];
  
  const mealTypeOptions = [
    'All Meal Types', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Appetizer'
  ];

  // Load profile data
  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!userName) {
        setError("Username is required");
        return;
      }

      const data = await userService.getPublicProfile(userName);
      setProfileData(data);
      setFavoriteRecipes(data.favoriteRecipes || []);
      
      // Set follow data
      if (data.followData) {
        setIsFollowing(data.followData.isFollowing);
      }
      if (data.stats) {
        setFollowerCount(data.stats.followers || 0);
        setFollowingCount(data.stats.following || 0);
      }
    } catch (err) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // Load user recipes
  const loadUserRecipes = async (reset = false) => {
    try {
      const page = reset ? 1 : recipePage;
      const params = {
        page,
        limit: 10,
        search: searchTerm,
        difficulty: selectedDifficulty !== 'All Difficulty' ? selectedDifficulty : '',
        cuisine: selectedCuisine !== 'All Cuisines' ? selectedCuisine : '',
        mealType: selectedMealType !== 'All Meal Types' ? selectedMealType : ''
      };

      const data = await userService.getUserRecipesByUsername(userName, params);
      
      if (reset) {
        setUserRecipes(data.recipes);
        setRecipePage(2);
      } else {
        setUserRecipes(prev => [...prev, ...data.recipes]);
        setRecipePage(prev => prev + 1);
      }
      
      setHasMoreRecipes(data.page < data.pages);
    } catch (err) {
      console.error("Failed to load user recipes:", err);
    }
  };

  // Load activity feed
  const loadActivityFeed = async (reset = false) => {
    try {
      const page = reset ? 1 : activityPage;
      const data = await activityFeedService.getUserActivityFeed(userName, { page, limit: 10 });
      
      if (reset) {
        setActivityPosts(data.posts);
        setActivityPage(2);
      } else {
        setActivityPosts(prev => [...prev, ...data.posts]);
        setActivityPage(prev => prev + 1);
      }
      
      setHasMoreActivity(data.page < data.pages);
    } catch (err) {
      console.error("Failed to load activity feed:", err);
    }
  };

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (activeTab === 'reviews') {
      loadUserRecipes(true);
    }
  };

  // Filter change handlers
  const handleFilterChange = () => {
    if (activeTab === 'reviews') {
      loadUserRecipes(true);
    }
  };

  // Reset filters to default
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCuisine('All Cuisines');
    setSelectedDifficulty('All Difficulty');
    setSelectedMealType('All Meal Types');
    // Reload recipes with default filters
    setTimeout(() => {
      loadUserRecipes(true);
    }, 100);
  };

  // Handle cuisine filter change
  const handleCuisineChange = (value) => {
    if (value === 'All Cuisines') {
      resetFilters();
    } else {
      setSelectedCuisine(value);
      handleFilterChange();
    }
  };

  // Handle difficulty filter change
  const handleDifficultyChange = (value) => {
    if (value === 'All Difficulty') {
      resetFilters();
    } else {
      setSelectedDifficulty(value);
      handleFilterChange();
    }
  };

  // Handle meal type filter change
  const handleMealTypeChange = (value) => {
    if (value === 'All Meal Types') {
      resetFilters();
    } else {
      setSelectedMealType(value);
      handleFilterChange();
    }
  };

  // Create activity post
  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    
    try {
      const postData = {
        content: newPost.trim()
      };
      
      await activityFeedService.createActivityPost(postData);
      setNewPost('');
      setShowPostForm(false);
      // Reload activity feed
      loadActivityFeed(true);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  // Handle follow/unfollow
  const handleFollowToggle = async () => {
    if (followLoading || !profileData?.user?._id) return;
    
    try {
      setFollowLoading(true);
      
      if (isFollowing) {
        const result = await followService.unfollowUser(profileData.user._id);
        setIsFollowing(false);
        setFollowerCount(result.followerCount);
      } else {
        const result = await followService.followUser(profileData.user._id);
        setIsFollowing(true);
        setFollowerCount(result.followerCount);
      }
    } catch (error) {
      console.error('Failed to toggle follow:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  // Tab change handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'reviews' && userRecipes.length === 0) {
      loadUserRecipes(true);
    } else if (tab === 'activity' && activityPosts.length === 0) {
      loadActivityFeed(true);
    }
  };

  useEffect(() => {
    if (userName) {
      loadProfile();
      // Load user recipes by default since 'reviews' is the default tab
      loadUserRecipes(true);
    }
  }, [userName]);

  useEffect(() => {
    document.title = `${userName ? `${userName} - ` : ''}Profile / ChefAssist`;
  }, [userName]);

  useEffect(() => {
    handleFilterChange();
  }, [selectedCuisine, selectedDifficulty, selectedMealType]);

  if (loading) {
    return (
      <div className="flex flex-col bg-chef-cream dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 h-64"></div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="bg-gray-300 dark:bg-gray-700 rounded-full w-20 h-20 mx-auto mb-3"></div>
                    <div className="bg-gray-300 dark:bg-gray-700 h-4 w-16 mx-auto rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col bg-chef-cream dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-8 text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Profile Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <button 
              onClick={() => navigate('/explore')}
              className="bg-chef-orange text-white px-6 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors"
            >
              Back to Explore
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) return null;

  return (
    <>
      <div className="flex flex-col bg-chef-cream dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-chef-orange to-chef-orange-light dark:from-chef-orange-dark dark:to-chef-orange p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative group">
                  <img
                    src={profileData.user.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"}
                    alt={profileData.user.fullName || profileData.user.username}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                    <h1 className="text-3xl font-bold text-white mb-2 md:mb-0">
                      {profileData.user.fullName || profileData.user.username}
                    </h1>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      @{profileData.user.username}
                    </span>
                  </div>
                  <p className="text-white/90 text-lg mb-4 max-w-2xl">
                    {profileData.user.bio || `Passionate home chef sharing delicious recipes and culinary adventures!`}
                  </p>

                  {/* Achievement Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                      🏆 {profileData.user.cookingLevel || 'Home Chef'}
                    </span>
                    {profileData.stats.totalRecipes > 10 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                        🔥 Recipe Creator
                      </span>
                    )}
                    {profileData.stats.averageRating >= 4.5 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                        ⭐ 5-Star Chef
                      </span>
                    )}
                  </div>

                  {/* Social Links */}
                  {profileData.user.socialLinks && (
                    <div className="flex flex-wrap gap-2">
                      {profileData.user.socialLinks.instagram && (
                        <a href={profileData.user.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                           className="px-3 py-1 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors">
                          📷 Instagram
                        </a>
                      )}
                      {profileData.user.socialLinks.youtube && (
                        <a href={profileData.user.socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                           className="px-3 py-1 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors">
                          📹 YouTube
                        </a>
                      )}
                      {profileData.user.socialLinks.x && (
                        <a href={profileData.user.socialLinks.x} target="_blank" rel="noopener noreferrer"
                           className="px-3 py-1 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors">
                          🐦 X
                        </a>
                      )}
                    </div>
                  )}

                  {/* Follow Button - Only visible to other users */}
                  {userData && !isOwner && (
                    <div className="mt-4">
                      <button
                        onClick={handleFollowToggle}
                        disabled={followLoading}
                        className={`inline-flex items-center px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                          isFollowing
                            ? 'bg-white/20 text-white border border-white hover:bg-white/30'
                            : 'bg-white text-chef-orange hover:bg-gray-100'
                        } ${followLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {followLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : isFollowing ? (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Following
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Follow
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white dark:bg-gray-800 p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center group cursor-pointer">
                  <div className="bg-chef-peach/30 dark:bg-chef-peach/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 dark:group-hover:bg-chef-peach/30 transition-colors">
                    <span className="text-3xl font-bold text-chef-orange dark:text-chef-orange-light">
                      {profileData.stats.totalRecipes}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">Recipes</p>
                </div>

                <div className="text-center group cursor-pointer">
                  <div className="bg-chef-peach/30 dark:bg-chef-peach/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 dark:group-hover:bg-chef-peach/30 transition-colors">
                    <span className="text-2xl font-bold text-chef-orange dark:text-chef-orange-light">
                      {followerCount}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">Followers</p>
                </div>

                <div className="text-center group cursor-pointer">
                  <div className="bg-chef-peach/30 dark:bg-chef-peach/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 dark:group-hover:bg-chef-peach/30 transition-colors">
                    <span className="text-2xl font-bold text-chef-orange dark:text-chef-orange-light">
                      {followingCount}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">Following</p>
                </div>

                <div className="text-center group cursor-pointer">
                  <div className="bg-chef-peach/30 dark:bg-chef-peach/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 dark:group-hover:bg-chef-peach/30 transition-colors">
                    <span className="text-3xl font-bold text-chef-orange dark:text-chef-orange-light">
                      {profileData.stats.favoriteRecipesCount}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">Favorites</p>
                </div>

                <div className="text-center group cursor-pointer">
                  <div className="bg-chef-peach/30 dark:bg-chef-peach/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 dark:group-hover:bg-chef-peach/30 transition-colors">
                    <span className="text-2xl font-bold text-chef-orange dark:text-chef-orange-light">
                      {profileData.stats.averageRating?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">Avg Rating</p>
                  <div className="flex justify-center mt-2">
                    <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6 border border-chef-peach/30 dark:border-gray-700">
            <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
              <button
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'reviews' 
                    ? 'border-chef-orange text-chef-orange dark:text-chef-orange-light' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-chef-orange dark:hover:text-chef-orange-light hover:border-chef-orange/50'
                }`}
                onClick={() => handleTabChange('reviews')}
              >
                All Recipes ({profileData.stats.totalRecipes})
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'favorites' 
                    ? 'border-chef-orange text-chef-orange dark:text-chef-orange-light' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-chef-orange dark:hover:text-chef-orange-light hover:border-chef-orange/50'
                }`}
                onClick={() => handleTabChange('favorites')}
              >
                Favorite Recipes
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'activity' 
                    ? 'border-chef-orange text-chef-orange dark:text-chef-orange-light' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-chef-orange dark:hover:text-chef-orange-light hover:border-chef-orange/50'
                }`}
                onClick={() => handleTabChange('activity')}
              >
                Activity Feed
              </button>
            </div>

            {/* Search and Filter */}
            {(activeTab === 'reviews') && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <form onSubmit={handleSearch} className="flex">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search recipes..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-l-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-chef-orange text-white rounded-r-lg hover:bg-chef-orange-dark transition-colors flex items-center"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </button>
                      <svg
                        className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </form>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Reset All
                  </button>
                  <select 
                    value={selectedCuisine}
                    onChange={(e) => handleCuisineChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                  >
                    {cuisineOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <select 
                    value={selectedDifficulty}
                    onChange={(e) => handleDifficultyChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                  >
                    {difficultyOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <select 
                    value={selectedMealType}
                    onChange={(e) => handleMealTypeChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                  >
                    {mealTypeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Tab Content */}
            <div className="p-6">
              {/* All Recipes Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-chef-orange dark:text-chef-orange-light">
                      All Recipes by {profileData.user.username}
                    </h2>
                  </div>

                  {userRecipes.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📝</div>
                      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No recipes found</h3>
                      <p className="text-gray-500 dark:text-gray-400">This user hasn't shared any public recipes yet.</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userRecipes.map((recipe, index) => (
                          <div key={index} className="h-full">
                            <RecipeCard recipe={recipe} isMyRecipe={false} />
                          </div>
                        ))}
                      </div>
                      
                      {hasMoreRecipes && (
                        <div className="text-center mt-8">
                          <button
                            onClick={() => loadUserRecipes()}
                            className="bg-chef-orange text-white px-6 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors"
                          >
                            Load More Recipes
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-chef-orange dark:text-chef-orange-light">
                      Favorite Recipes
                    </h2>
                  </div>

                  {favoriteRecipes.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🍳</div>
                      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No favorite recipes yet</h3>
                      <p className="text-gray-500 dark:text-gray-400">Start exploring recipes to build your favorites collection!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteRecipes.map((recipe, index) => (
                        <div key={index} className="h-full">
                          <RecipeCard recipe={recipe} isMyRecipe={false} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Activity Feed Tab */}
              {activeTab === 'activity' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-chef-orange dark:text-chef-orange-light">
                      Activity Feed
                    </h2>
                    {isOwner && (
                      <button
                        onClick={() => setShowPostForm(!showPostForm)}
                        className="bg-chef-orange text-white px-4 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors flex items-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Create Post</span>
                      </button>
                    )}
                  </div>

                  {/* Post Creation Form */}
                  {isOwner && showPostForm && (
                    <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Create a New Post</h3>
                      <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Share something with your followers..."
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent resize-none"
                        rows="4"
                      />
                      <div className="flex justify-end space-x-3 mt-4">
                        <button
                          onClick={() => {
                            setShowPostForm(false);
                            setNewPost('');
                          }}
                          className="px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleCreatePost}
                          disabled={!newPost.trim()}
                          className="px-6 py-2 bg-chef-orange text-white rounded-lg hover:bg-chef-orange-dark disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}

                  {activityPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📢</div>
                      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No activity yet</h3>
                      <p className="text-gray-500 dark:text-gray-400">This user hasn't shared any posts yet.</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 gap-6">
                        {activityPosts.map((post, index) => (
                          <div key={post._id || index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 h-full">
                            <div className="flex items-start space-x-4">
                              <img
                                src={post.author.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"}
                                alt={post.author.username}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                    {post.author.fullName || post.author.username}
                                  </h4>
                                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>
                                
                                {post.images && post.images.length > 0 && (
                                  <div className="grid grid-cols-2 gap-2 mb-4">
                                    {post.images.map((image, imgIndex) => (
                                      <img
                                        key={imgIndex}
                                        src={image}
                                        alt="Post content"
                                        className="w-full h-48 object-cover rounded-lg"
                                      />
                                    ))}
                                  </div>
                                )}
                                
                                <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
                                  <span className="flex items-center space-x-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span>{post.likesCount || 0}</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <span>{post.commentsCount || 0}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {hasMoreActivity && (
                        <div className="text-center mt-8">
                          <button
                            onClick={() => loadActivityFeed()}
                            className="bg-chef-orange text-white px-6 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors"
                          >
                            Load More Posts
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
