import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../api/userService";
import activityFeedService from "../api/activityFeedService";
import followService from "../api/followService";
import { useUser } from "../store";

// Components
import {
  ProfileHeader,
  ProfileStats,
  ProfileTabs,
  SearchAndFilters,
  RecipesTab,
  FavoritesTab,
  ActivityTab,
  LoadingState,
  ErrorState
} from "../components/Profile";

const Profile = () => {
  const navigate = useNavigate();
  const { userName } = useParams();
  const { userData, isAuthenticated } = useUser(); // Get from context
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

  // Check if current user is the profile owner - now using context
  const isOwner = userData && userName && userData.username === userName;
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
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={loadProfile} />;
  }

  if (!profileData) return null;

  return (
    <>
      <div className="flex flex-col bg-chef-cream dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProfileHeader
            profileData={profileData}
            isOwner={isOwner}
            isFollowing={isFollowing}
            followLoading={followLoading} 
            followerCount={followerCount}
            followingCount={followingCount}
            handleFollowToggle={handleFollowToggle}
          />
          
          <div className="mt-6">
            <ProfileStats
              profileData={profileData}
              followerCount={followerCount}
              followingCount={followingCount}
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6 border border-chef-peach/30 dark:border-gray-700">
            <ProfileTabs
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              profileData={profileData}
            />

            {/* Search and Filter */}
            {activeTab === 'reviews' && (
              <SearchAndFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCuisine={selectedCuisine}
                selectedDifficulty={selectedDifficulty}
                selectedMealType={selectedMealType}
                handleSearch={handleSearch}
                resetFilters={resetFilters}
                handleCuisineChange={handleCuisineChange}
                handleDifficultyChange={handleDifficultyChange}
                handleMealTypeChange={handleMealTypeChange}
                cuisineOptions={cuisineOptions}
                difficultyOptions={difficultyOptions}
                mealTypeOptions={mealTypeOptions}
              />
            )}

            {/* Tab Content */}
            <div className="p-6">
              {/* All Recipes Tab */}
              {activeTab === 'reviews' && (
                <RecipesTab
                  userRecipes={userRecipes}
                  profileData={profileData}
                  hasMoreRecipes={hasMoreRecipes}
                  loadUserRecipes={loadUserRecipes}
                />
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <FavoritesTab favoriteRecipes={favoriteRecipes} />
              )}

              {/* Activity Feed Tab */}
              {activeTab === 'activity' && (
                <ActivityTab
                  activityPosts={activityPosts}
                  isOwner={isOwner}
                  showPostForm={showPostForm}
                  setShowPostForm={setShowPostForm}
                  newPost={newPost}
                  setNewPost={setNewPost}
                  handleCreatePost={handleCreatePost}
                  hasMoreActivity={hasMoreActivity}
                  loadActivityFeed={loadActivityFeed}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
