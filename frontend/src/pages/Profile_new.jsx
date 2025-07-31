import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import userService from "../api/userService";
import activityFeedService from "../api/activityFeedService";

const Profile = () => {
  const navigate = useNavigate();
  const { userName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState('favorites');
  
  // Recipe states
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [activityPosts, setActivityPosts] = useState([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All Cuisines');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulty');
  const [selectedMealType, setSelectedMealType] = useState('All Meal Types');
  
  // Pagination states
  const [recipePage, setRecipePage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);
  const [hasMoreRecipes, setHasMoreRecipes] = useState(true);
  const [hasMoreActivity, setHasMoreActivity] = useState(true);

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
      <div className="flex flex-col bg-chef-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div className="bg-gray-300 h-64"></div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="bg-gray-300 rounded-full w-20 h-20 mx-auto mb-3"></div>
                    <div className="bg-gray-300 h-4 w-16 mx-auto rounded"></div>
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
      <div className="flex flex-col bg-chef-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-4">{error}</p>
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
      <div className="flex flex-col bg-chef-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-chef-orange to-chef-orange-light p-8">
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
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center group cursor-pointer">
                  <div className="bg-chef-peach/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 transition-colors">
                    <span className="text-3xl font-bold text-chef-orange">
                      {profileData.stats.totalRecipes}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">Recipes</p>
                </div>

                <div className="text-center group cursor-pointer">
                  <div className="bg-chef-peach/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 transition-colors">
                    <span className="text-2xl font-bold text-chef-orange">
                      {profileData.stats.followers}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">Followers</p>
                </div>

                <div className="text-center group cursor-pointer">
                  <div className="bg-chef-peach/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 transition-colors">
                    <span className="text-3xl font-bold text-chef-orange">
                      {profileData.stats.favoriteRecipesCount}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">Favorites</p>
                </div>

                <div className="text-center group cursor-pointer">
                  <div className="bg-chef-peach/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 transition-colors">
                    <span className="text-2xl font-bold text-chef-orange">
                      {profileData.stats.averageRating?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">Avg Rating</p>
                  <div className="flex justify-center mt-2">
                    <div className="flex text-yellow-400">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-white rounded-xl shadow-lg mb-6 border border-chef-peach/30">
            <div className="flex flex-wrap border-b border-gray-200">
              <button
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'favorites' 
                    ? 'border-chef-orange text-chef-orange' 
                    : 'border-transparent text-gray-500 hover:text-chef-orange hover:border-chef-orange/50'
                }`}
                onClick={() => handleTabChange('favorites')}
              >
                Favorite Recipes
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'reviews' 
                    ? 'border-chef-orange text-chef-orange' 
                    : 'border-transparent text-gray-500 hover:text-chef-orange hover:border-chef-orange/50'
                }`}
                onClick={() => handleTabChange('reviews')}
              >
                All Recipes ({profileData.stats.totalRecipes})
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'activity' 
                    ? 'border-chef-orange text-chef-orange' 
                    : 'border-transparent text-gray-500 hover:text-chef-orange hover:border-chef-orange/50'
                }`}
                onClick={() => handleTabChange('activity')}
              >
                Activity Feed
              </button>
            </div>

            {/* Search and Filter */}
            {(activeTab === 'reviews') && (
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <form onSubmit={handleSearch}>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search recipes..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                      />
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
                  <select 
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                  >
                    {cuisineOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <select 
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
                  >
                    {difficultyOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <select 
                    value={selectedMealType}
                    onChange={(e) => setSelectedMealType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent"
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
              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-chef-orange">
                      Favorite Recipes
                    </h2>
                  </div>

                  {favoriteRecipes.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">🍳</div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No favorite recipes yet</h3>
                      <p className="text-gray-500">Start exploring recipes to build your favorites collection!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {favoriteRecipes.map((recipe, index) => (
                        <div key={index}>
                          <RecipeCard recipe={recipe} isMyRecipe={false} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* All Recipes Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-chef-orange">
                      All Recipes by {profileData.user.username}
                    </h2>
                  </div>

                  {userRecipes.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">📝</div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes found</h3>
                      <p className="text-gray-500">This user hasn't shared any public recipes yet.</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userRecipes.map((recipe, index) => (
                          <div key={index}>
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

              {/* Activity Feed Tab */}
              {activeTab === 'activity' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-chef-orange">
                      Activity Feed
                    </h2>
                  </div>

                  {activityPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-6xl mb-4">📢</div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No activity yet</h3>
                      <p className="text-gray-500">This user hasn't shared any posts yet.</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-6">
                        {activityPosts.map((post, index) => (
                          <div key={post._id || index} className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start space-x-4">
                              <img
                                src={post.author.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"}
                                alt={post.author.username}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-semibold text-gray-900">
                                    {post.author.fullName || post.author.username}
                                  </h4>
                                  <span className="text-gray-500 text-sm">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-gray-800 mb-4">{post.content}</p>
                                
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
                                
                                <div className="flex items-center space-x-6 text-gray-500">
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
