import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { recipeService } from '../api/recipeService';
import userService from '../api/userService';
import followService from '../api/followService';
import { useUser } from '../store';
import { ArrowLeft, Clock, Users, Star, Bookmark, Share2, Play, Pause, ChefHat, Timer, Utensils, Heart, MessageCircle, Download, Printer as Print, Sun, Moon, CheckCircle2, ThumbsUp, Send, UserPlus, Eye, Plus } from 'lucide-react';

const ViewRecipe = ({ recipe, onBack, navigate }) => {
  const { userData } = useUser();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [checkedSteps, setCheckedSteps] = useState({});
  const [isRecipeSaved, setIsRecipeSaved] = useState(false);
  const [savingRecipe, setSavingRecipe] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHoveringFollow, setIsHoveringFollow] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  // Define comprehensive default recipe data
  const defaultRecipeData = {
    id: 'default-recipe',
    title: 'Delicious Default Recipe',
    description: 'This is a placeholder recipe. No specific recipe data was provided.',
    image: 'https://images.unsplash.com/photo-1543339396-1807d9b5443a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTkyOXwwfDF8c2VhcmNofDE4fHxyZWNpcGUlMjBwbGFjZWhvbGRlcnxlbnwwfHx8fDE3MDY2ODc5MDJ8MA&ixlib=rb-4.0.3&q=80&w=1080',
    rating: 4.0,
    cuisine: "Global",
    difficulty: "Easy",
    cookTime: "30 min",
    servings: 2,
    prepTime: "10 min",
    calories: 350,
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    likes: 125,
    views: 1250,
    author: {
      name: 'Chef Maria',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      followers: 2500,
      isFollowing: false
    },
    ingredients: [
      { id: 1, item: "1 cup flour", category: "Pantry" },
      { id: 2, item: "1/2 cup sugar", category: "Pantry" },
      { id: 3, item: "2 eggs", category: "Dairy" },
      { id: 4, item: "1/4 cup milk", category: "Dairy" },
      { id: 5, item: "1 tsp baking powder", category: "Pantry" },
      { id: 6, item: "Pinch of salt", category: "Spices" }
    ],
    instructions: [
      { id: 1, step: "Preheat oven to 180°C (350°F).", time: "5 min" },
      { id: 2, step: "Mix dry ingredients in a bowl.", time: "2 min" },
      { id: 3, step: "Whisk wet ingredients, then combine with dry.", time: "3 min" },
      { id: 4, step: "Pour into a greased pan and bake.", time: "20 min" },
      { id: 5, step: "Enjoy your default recipe!", time: "1 min" }
    ],
    nutrition: {
      calories: 350,
      protein: "10g",
      carbs: "50g",
      fat: "15g",
      fiber: "2g"
    },
    tags: ["Basic", "Quick", "Placeholder"],
    reviews: [
      { id: 1, name: "Gemini AI", avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', rating: 5, comment: "Works perfectly as a default!", date: "Today", likes: 12 },
      { id: 2, name: "Chef Bot", avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', rating: 4, comment: "Great base recipe to start with!", date: "Yesterday", likes: 8 },
      { id: 3, name: "Food Lover", avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b169?w=40&h=40&fit=crop&crop=face', rating: 5, comment: "Simple yet delicious. Thanks for sharing!", date: "2 days ago", likes: 15 }
    ]
  };

  const detailedRecipe = {
    ...defaultRecipeData,
    ...recipe,
    ingredients: recipe?.ingredients || defaultRecipeData.ingredients,
    instructions: recipe?.instructions || defaultRecipeData.instructions,
    nutrition: recipe?.nutrition ? { ...defaultRecipeData.nutrition, ...recipe.nutrition } : defaultRecipeData.nutrition,
    tags: recipe?.tags || defaultRecipeData.tags,
    reviews: recipe?.reviews || defaultRecipeData.reviews,
  };

  // Check if recipe is saved on component mount
  useEffect(() => {
    if (recipe?.id) {
      checkIfRecipeSaved();
      initializeRecipeData();
      loadComments();
    }
  }, [recipe?.id]);

  const initializeRecipeData = async () => {
    try {
      // Set follower count from recipe data first
      const initialFollowerCount = recipe?.author?.followers || recipe?.author?.followersCount || 0;
      setFollowerCount(initialFollowerCount);
      
      // Initialize like status and count - check if user is logged in
      const userId = userData?._id || userData?.id;
      if (recipe?.id && userId) {
        try {
          const likeStatus = await recipeService.checkLikeStatus(recipe.id);
          setIsLiked(likeStatus.isLiked);
          setLikeCount(likeStatus.likeCount || recipe?.likes || 0);
        } catch (likeError) {
          // Fallback to recipe data
          setLikeCount(recipe?.likes || 0);
          setIsLiked(false);
        }
      } else {
        // If no recipe ID or user not logged in, use default values
        setLikeCount(recipe?.likes || 0);
        setIsLiked(false);
      }
      
      // Initialize follow status if author exists and user is logged in
      if ((recipe?.author?.id || recipe?.author?._id) && userId) {
        const authorId = recipe.author.id || recipe.author._id;
        try {
          const followStatus = await followService.getFollowStatus(authorId);
          setIsFollowing(followStatus.isFollowing);
          // Update follower count from API if available
          if (followStatus.followerCount !== undefined) {
            setFollowerCount(followStatus.followerCount);
          }
        } catch (error) {
          console.error('Follow status not available:', error);
          setIsFollowing(false);
        }
      } else {
        setIsFollowing(false);
      }
      
      // Set default rating for comment form
      setUserRating(5);
      
    } catch (error) {
      console.error('Error initializing recipe data:', error);
      // Fallback to default values
      setLikeCount(recipe?.likes || 0);
      setIsLiked(false);
      setIsFollowing(false);
      setFollowerCount(recipe?.author?.followers || recipe?.author?.followersCount || 0);
      setUserRating(5);
    }
  };

  const loadComments = async () => {
    try {
      if (recipe?.id) {
        const commentsData = await recipeService.getComments(recipe.id, 1, 20);
        setComments(commentsData.comments || []);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
      // Use fallback comments if API fails
      setComments(recipe?.reviews || defaultRecipeData.reviews);
    }
  };

  const checkIfRecipeSaved = async () => {
    try {
      const result = await userService.checkRecipeSaved(recipe.id);
      setIsRecipeSaved(result.isSaved);
    } catch (error) {
      console.error('Error checking if recipe is saved:', error);
    }
  };

  // Handle like/unlike recipe
  const handleToggleLike = async () => {
    // Store previous state for potential rollback
    let previousLiked = isLiked;
    let previousCount = likeCount;
    
    try {
      if (!recipe?.id) {
        toast.error('Recipe not available');
        return;
      }

      // Check if user is authenticated
      if (!userData?._id) {
        toast.error('Please login to like recipes');
        return;
      }
      
      // Prevent multiple simultaneous requests
      if (handleToggleLike.isProcessing) {
        return;
      }
      handleToggleLike.isProcessing = true;
      
      // Optimistic update
      setIsLiked(!isLiked);
      setLikeCount(!isLiked ? likeCount + 1 : Math.max(0, likeCount - 1));

      const result = await recipeService.toggleLike(recipe.id);
      
      // Update with actual server response
      setIsLiked(result.isLiked);
      setLikeCount(result.likeCount);
      
      toast.success(result.isLiked ? 'Recipe liked! ❤️' : 'Like removed!', {
        position: "top-right",
        autoClose: 2000,
      });
      
    } catch (error) {
      console.error('Error toggling like:', error);
      
      // Revert optimistic update on error
      setIsLiked(previousLiked);
      setLikeCount(previousCount);
      toast.error('Failed to update like status. Please try again.');
    } finally {
      // Reset the processing flag
      handleToggleLike.isProcessing = false;
    }
  };

  // Handle follow/unfollow author
  const handleToggleFollow = async () => {
    try {
      if (!recipe?.author?.id && !recipe?.author?._id) {
        toast.error('Author information not available');
        return;
      }

      const authorId = recipe.author.id || recipe.author._id;
      
      if (isFollowing) {
        const result = await followService.unfollowUser(authorId);
        setIsFollowing(false);
        // Use the follower count from API if available, otherwise decrement
        setFollowerCount(result.followerCount !== undefined ? result.followerCount : Math.max(0, followerCount - 1));
        toast.success('Unfollowed author', {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        const result = await followService.followUser(authorId);
        setIsFollowing(true);
        // Use the follower count from API if available, otherwise increment
        setFollowerCount(result.followerCount !== undefined ? result.followerCount : followerCount + 1);
        toast.success('Following author! 👥', {
          position: "top-right",
          autoClose: 2000,
        });
      }
      
    } catch (error) {
      console.error('Error toggling follow:', error);
      toast.error('Failed to update follow status');
    }
  };

  // Handle rating
  const handleRating = async (rating) => {
    try {
      setUserRating(rating);
      toast.success(`Recipe rated ${rating} stars! ⭐`, {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Error rating recipe:', error);
    }
  };

  // Handle comment submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !userRating) {
      toast.error('Please add a comment and rating');
      return;
    }
    
    try {
      setLoadingComments(true);
      
      const result = await recipeService.addComment(recipe.id, newComment.trim(), userRating);
      
      // Add new comment to the list
      const newCommentObj = {
        id: result.comment.id,
        text: result.comment.text,
        rating: result.comment.rating,
        author: {
          username: result.comment.author.username,
          avatar: result.comment.author.avatar
        },
        createdAt: result.comment.createdAt
      };
      
      setComments(prev => [newCommentObj, ...prev]);
      setNewComment('');
      setUserRating(5); // Reset to default 5 stars
      
      // Update recipe rating if provided
      if (result.newRecipeRating) {
        // Update the rating in the recipe data
        if (recipe) {
          recipe.rating = result.newRecipeRating;
        }
        detailedRecipe.rating = result.newRecipeRating;
      }
      
      toast.success('Comment added! 💬', {
        position: "top-right",
        autoClose: 2000,
      });
      
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error(error.message || 'Failed to add comment');
    } finally {
      setLoadingComments(false);
    }
  };

  // Handle comment like (simplified - would need backend implementation)
  const handleCommentLike = async (commentId) => {
    try {
      // For now, just show feedback - would need comment like API
      toast.success('Comment liked! 👍', {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  // Handle author profile navigation
  const handleAuthorClick = () => {
    const authorUsername = recipe?.author?.username || detailedRecipe?.author?.name;
    if (authorUsername) {
      navigate(`/profile/${authorUsername}`);
    } else {
      toast.error('Author profile not available');
    }
  };

  // Toggle favorite/save recipe
  const handleToggleFavorite = async () => {
    if (savingRecipe) return;
    
    try {
      setSavingRecipe(true);
      const result = await userService.toggleSavedRecipe({ recipeId: recipe.id });
      setIsRecipeSaved(result.isSaved);
      
      if (result.isSaved) {
        toast.success('Recipe saved to your favorites! 💖', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.info('Recipe removed from favorites', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setSavingRecipe(false);
    }
  };

  // Share recipe function
  const handleShareRecipe = async () => {
    try {
      const recipeUrl = `${window.location.origin}/recipe/${recipe.id}`;
      
      // Try to use the Web Share API first (mobile/modern browsers)
      if (navigator.share) {
        await navigator.share({
          title: recipe.title,
          text: `Check out this amazing recipe: ${recipe.title}`,
          url: recipeUrl,
        });
        toast.success('Recipe shared successfully! 🔗', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(recipeUrl);
        toast.success('Recipe link copied to clipboard! 📋', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error sharing recipe:', error);
      // Fallback: manually copy to clipboard
      try {
        const recipeUrl = `${window.location.origin}/recipe/${recipe.id}`;
        await navigator.clipboard.writeText(recipeUrl);
        toast.success('Recipe link copied to clipboard! 📋', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (clipboardError) {
        toast.error('Unable to share recipe. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  // Download recipe function
  const handleDownloadRecipe = () => {
    const recipeText = `
${recipe.title}

Description: ${recipe.description}

Ingredients:
${recipe.ingredients.map(ing => `• ${ing.item}`).join('\n')}

Instructions:
${recipe.instructions.map((inst, idx) => `${idx + 1}. ${inst.step} (${inst.time})`).join('\n')}

Nutrition Information:
${Object.entries(recipe.nutrition).map(([key, value]) => `${key}: ${value}`).join('\n')}

Recipe from ChefAssist - ${window.location.origin}/recipe/${recipe.id}
    `;
    
    const blob = new Blob([recipeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_recipe.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Recipe downloaded successfully! 📄', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Adapt recipe function
  const handleAdaptRecipe = async () => {
    try {
      // Prepare recipe data for adaptation
      const recipeData = {
        title: recipe.title,
        ingredients: recipe.ingredients.map(ing => ing.item),
        instructions: recipe.instructions.map(inst => inst.step),
        servings: recipe.servings,
        cookTime: recipe.cookTime,
        difficulty: recipe.difficulty,
        cuisine: recipe.cuisine
      };
      
      // Generate a comprehensive prompt for AI adaptation
      const adaptPrompt = `I want to adapt this recipe: "${recipe.title}"

CURRENT RECIPE DETAILS:
- Cuisine: ${recipe.cuisine}
- Difficulty: ${recipe.difficulty}
- Servings: ${recipe.servings}
- Cook Time: ${recipe.cookTime}

INGREDIENTS:
${recipe.ingredients.map(ing => `• ${ing.item}`).join('\n')}

INSTRUCTIONS:
${recipe.instructions.map((inst, idx) => `${idx + 1}. ${inst.step}`).join('\n')}

Please adapt this recipe based on my dietary preferences and restrictions. You can modify ingredients, cooking methods, or proportions to better suit my needs while maintaining the essence of the dish.`;

      // Store recipe data in sessionStorage for the AI page to access
      sessionStorage.setItem('adaptRecipeData', JSON.stringify({
        originalRecipe: recipeData,
        mode: 'adapt',
        prompt: adaptPrompt
      }));

      // Navigate to AI page with adaptation mode
      navigate('/ai?mode=adapt&action=adapt-recipe');
      
      toast.success('Redirecting to AI Chef for recipe adaptation! 🤖👨‍🍳', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
    } catch (error) {
      console.error('Error preparing recipe adaptation:', error);
      toast.error('Failed to prepare recipe for adaptation. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Print recipe function
  const handlePrintRecipe = () => {
    window.print();
    toast.success('Print dialog opened! 🖨️', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const toggleIngredient = (id) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleStep = (id) => {
    setCheckedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} // Dark mode for inactive stars
        />
      );
    }
    return stars;
  };

  const groupedIngredients = detailedRecipe.ingredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {});

  return (
    // Main container with base background and dark mode background - fixed mobile scrolling
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FEF3E2] dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#FED7AA] dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-[#D97706] hover:text-[#B45309] transition-colors duration-200 dark:text-[#F59E0B] dark:hover:text-[#FBAD5E]"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Back</span>
            </button>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={handleToggleLike}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isLiked 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-[#FED7AA] hover:bg-[#D97706] hover:text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                }`}
                title={isLiked ? "Unlike recipe" : "Like recipe"}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleToggleFavorite}
                disabled={savingRecipe}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isRecipeSaved 
                    ? 'bg-[#D97706] text-white hover:bg-[#B45309]' 
                    : 'bg-[#FED7AA] hover:bg-[#D97706] hover:text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                }`}
                title={isRecipeSaved ? "Remove from favorites" : "Add to favorites"}
              >
                <Bookmark className={`w-5 h-5 ${isRecipeSaved ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShareRecipe}
                className="p-2 rounded-full bg-[#FED7AA] hover:bg-[#D97706] hover:text-white transition-all duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                title="Share recipe"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleDownloadRecipe}
                className="hidden sm:flex p-2 rounded-full bg-[#FED7AA] hover:bg-[#D97706] hover:text-white transition-all duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                title="Download recipe"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={handlePrintRecipe}
                className="hidden sm:flex p-2 rounded-full bg-[#FED7AA] hover:bg-[#D97706] hover:text-white transition-all duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                title="Print recipe"
              >
                <Print className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Recipe Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipe Header with Author Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
              {/* Author Section */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div 
                  className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200"
                  onClick={handleAuthorClick}
                >
                  <img
                    src={detailedRecipe.author?.avatar || defaultRecipeData.author.avatar}
                    alt={detailedRecipe.author?.name || 'Chef'}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#FED7AA] dark:border-gray-600"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 hover:text-[#D97706] dark:hover:text-[#FBAD5E] transition-colors">
                      {detailedRecipe.author?.name || defaultRecipeData.author.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {followerCount.toLocaleString()} followers
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {(detailedRecipe.views || defaultRecipeData.views).toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleToggleFollow}
                  onMouseEnter={() => setIsHoveringFollow(true)}
                  onMouseLeave={() => setIsHoveringFollow(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isFollowing
                      ? 'bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-800 dark:hover:text-red-400'
                      : 'bg-[#D97706] text-white hover:bg-[#B45309] dark:bg-[#F59E0B] dark:hover:bg-[#D97706]'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      {isHoveringFollow ? (
                        <>
                          <UserPlus className="w-4 h-4 rotate-45" />
                          <span>Unfollow</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Following</span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              </div>

              {/* Recipe Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-[#D97706] text-white text-xs font-medium px-2 py-1 rounded dark:bg-[#F59E0B]">
                  {detailedRecipe.cuisine}
                </span>
                <span className="bg-[#F59E0B] text-white text-xs font-medium px-2 py-1 rounded dark:bg-[#D97706]">
                  {detailedRecipe.difficulty}
                </span>
                {detailedRecipe.tags.map((tag, index) => (
                  <span key={index} className="bg-[#FED7AA] text-[#B45309] text-xs font-medium px-2 py-1 rounded dark:bg-gray-700 dark:text-[#FED7AA]">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 dark:text-gray-100">{detailedRecipe.title}</h1>
              <p className="text-gray-600 text-base sm:text-lg mb-6 dark:text-gray-300">{detailedRecipe.description}</p>

              {/* Recipe Stats and Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-[#FEF3E2] rounded-lg dark:bg-gray-700">
                  <Clock className="w-6 h-6 text-[#D97706] mx-auto mb-1 dark:text-[#FBAD5E]" />
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{detailedRecipe.totalTime}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Total Time</div>
                </div>
                <div className="text-center p-3 bg-[#FEF3E2] rounded-lg dark:bg-gray-700">
                  <Users className="w-6 h-6 text-[#D97706] mx-auto mb-1 dark:text-[#FBAD5E]" />
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{detailedRecipe.servings}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Servings</div>
                </div>
                <div className="text-center p-3 bg-[#FEF3E2] rounded-lg dark:bg-gray-700">
                  <Utensils className="w-6 h-6 text-[#D97706] mx-auto mb-1 dark:text-[#FBAD5E]" />
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{detailedRecipe.calories}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Calories</div>
                </div>
                <div className="text-center p-3 bg-[#FEF3E2] rounded-lg dark:bg-gray-700">
                  <Star className="w-6 h-6 text-[#D97706] mx-auto mb-1 dark:text-[#FBAD5E]" />
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {detailedRecipe.rating || 5.0}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
                </div>
              </div>

              {/* Like and Rating Section */}
              <div className="flex items-center justify-between p-4 bg-[#FEF3E2] dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleToggleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isLiked
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="font-medium">{likeCount}</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Rate:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        className="transition-colors duration-200"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= userRating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center dark:text-gray-100">
                <Play className="w-5 h-5 mr-2 text-[#D97706] dark:text-[#FBAD5E]" />
                Recipe Video
              </h2>
              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-[#D97706] to-[#F59E0B] flex items-center justify-center">
                  {isVideoPlaying && detailedRecipe.videoUrl ? (
                      <video
                        src={detailedRecipe.videoUrl}
                        controls
                        autoPlay
                        className="absolute inset-0 w-full h-full object-cover"
                        onEnded={() => setIsVideoPlaying(false)}
                      >
                        Your browser does not support the video tag.
                      </video>
                  ) : (
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-30 transition-all duration-200"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black bg-opacity-50 rounded-lg p-3">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span>Watch how to make {detailedRecipe.title}</span>
                      <span>5:32</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 px-6">
                  {['ingredients', 'instructions', 'nutrition'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                        activeTab === tab
                          ? 'border-[#D97706] text-[#D97706] dark:border-[#FBAD5E] dark:text-[#FBAD5E]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Ingredients Tab */}
                {activeTab === 'ingredients' && (
                  <div className="space-y-6">
                    {Object.entries(groupedIngredients).map(([category, ingredients]) => (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center dark:text-gray-100">
                          <ChefHat className="w-5 h-5 mr-2 text-[#D97706] dark:text-[#FBAD5E]" />
                          {category}
                        </h3>
                        <div className="space-y-2">
                          {ingredients.map((ingredient) => (
                            <label
                              key={ingredient.id}
                              className="flex items-center p-3 rounded-lg hover:bg-[#FEF3E2] transition-colors duration-200 cursor-pointer dark:hover:bg-gray-700"
                            >
                              <input
                                type="checkbox"
                                checked={checkedIngredients[ingredient.id] || false}
                                onChange={() => toggleIngredient(ingredient.id)}
                                className="w-5 h-5 text-[#D97706] rounded focus:ring-[#D97706] focus:ring-2 dark:text-[#FBAD5E] dark:focus:ring-[#FBAD5E]"
                              />
                              <span className={`ml-3 ${checkedIngredients[ingredient.id] ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-200'}`}>
                                {ingredient.item}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Instructions Tab */}
                {activeTab === 'instructions' && (
                  <div className="space-y-4">
                    {detailedRecipe.instructions.map((instruction, index) => (
                      <div
                        key={instruction.id}
                        className="flex items-start p-4 rounded-lg hover:bg-[#FEF3E2] transition-colors duration-200 dark:hover:bg-gray-700"
                      >
                        <button
                          onClick={() => toggleStep(instruction.id)}
                          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-200 ${
                            checkedSteps[instruction.id]
                              ? 'bg-[#D97706] border-[#D97706] dark:bg-[#FBAD5E] dark:border-[#FBAD5E]'
                              : 'border-[#D97706] hover:bg-[#FED7AA] dark:border-[#FBAD5E] dark:hover:bg-gray-600 dark:text-[#FBAD5E]'
                          }`}
                        >
                          {checkedSteps[instruction.id] ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-[#D97706] font-bold text-sm dark:text-[#FBAD5E]">{index + 1}</span>
                          )}
                        </button>
                        <div className="flex-1">
                          <p className={`text-gray-900 mb-2 ${checkedSteps[instruction.id] ? 'line-through text-gray-500 dark:text-gray-400' : 'dark:text-gray-200'}`}>
                            {instruction.step}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Timer className="w-4 h-4 mr-1" />
                            {instruction.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Nutrition Tab */}
                {activeTab === 'nutrition' && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(detailedRecipe.nutrition).map(([key, value]) => (
                      <div key={key} className="text-center p-4 bg-[#FEF3E2] rounded-lg dark:bg-gray-700">
                        <div className="text-2xl font-bold text-[#D97706] mb-1 dark:text-[#FBAD5E]">{value}</div>
                        <div className="text-sm text-gray-600 capitalize dark:text-gray-400">{key}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Reviews & Related */}
          <div className="space-y-6">
            {/* Recipe Image */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
              <img
                src={detailedRecipe.image}
                alt={detailedRecipe.title}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center dark:text-gray-100">
                <MessageCircle className="w-5 h-5 mr-2 text-[#D97706] dark:text-[#FBAD5E]" />
                Comments ({comments.length})
              </h3>
              
              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mb-6">
                <div className="flex space-x-4">
                  <img
                    src={userData?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'}
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#D97706] dark:focus:ring-[#FBAD5E] focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                      rows="3"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Rate this recipe:</span>
                        <span className="text-xs text-red-500">*</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setUserRating(star)}
                            className="transition-colors duration-200"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                star <= userRating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          ({userRating}/5)
                        </span>
                      </div>
                      <button
                        type="submit"
                        disabled={!newComment.trim() || !userRating || loadingComments}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#D97706] text-white rounded-lg hover:bg-[#B45309] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 dark:bg-[#F59E0B] dark:hover:bg-[#D97706]"
                      >
                        <Send className="w-4 h-4" />
                        <span>{loadingComments ? 'Posting...' : 'Post'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.slice(0, showAllComments ? comments.length : 3).map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-b-0 dark:border-gray-700">
                    <div className="flex space-x-3">
                      <img
                        src={comment.author?.avatar || comment.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'}
                        alt={comment.author?.username || comment.name || 'User'}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 dark:text-gray-200">
                              {comment.author?.username || comment.name || 'Anonymous'}
                            </span>
                            <div className="flex items-center">
                              {renderStars(comment.rating)}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : comment.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {comment.text || comment.comment}
                        </p>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleCommentLike(comment.id)}
                            className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-[#D97706] dark:hover:text-[#FBAD5E] transition-colors duration-200"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{comment.likes || 0}</span>
                          </button>
                          <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#D97706] dark:hover:text-[#FBAD5E] transition-colors duration-200">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {comments.length > 3 && (
                <button
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="w-full mt-4 py-2 px-4 text-sm text-[#D97706] dark:text-[#FBAD5E] hover:bg-[#FEF3E2] dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  {showAllComments ? 'Show Less' : `View ${comments.length - 3} More Comments`}
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 mb-4 dark:text-gray-100">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleAdaptRecipe}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center gap-2"
                  title="Adapt this recipe to your dietary preferences using AI"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Adapt Recipe with AI
                </button>
                <button
                  onClick={() => toast.success('Added to meal plan! 📅', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  })}
                  className="w-full py-3 px-4 bg-[#D97706] hover:bg-[#B45309] text-white rounded-lg transition-colors duration-200 dark:bg-[#F59E0B] dark:hover:bg-[#D97706]"
                >
                  Add to Meal Plan
                </button>
                <button
                  onClick={() => toast.success('Shopping list created! 🛒', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  })}
                  className="w-full py-3 px-4 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-lg transition-colors duration-200 dark:bg-[#D97706] dark:hover:bg-[#B45309]"
                >
                  Create Shopping List
                </button>
                <button
                  onClick={() => toast.info('Recipe scaled successfully! ⚖️', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  })}
                  className="w-full py-3 px-4 border-2 border-[#D97706] text-[#D97706] hover:bg-[#FED7AA] rounded-lg transition-colors duration-200 dark:border-[#FBAD5E] dark:text-[#FBAD5E] dark:hover:bg-gray-700 dark:hover:text-gray-100"
                >
                  Scale Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Recipe component that handles routing and data fetching
const Recipe = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedRecipe = await recipeService.getRecipe(recipeId);
      
      // Transform backend data to match ViewRecipe component expectations
      const transformedRecipe = {
        id: fetchedRecipe._id,
        title: fetchedRecipe.title || 'Untitled Recipe',
        description: fetchedRecipe.description || 'No description available',
        image: fetchedRecipe.imageUrl || 'https://images.unsplash.com/photo-1543339396-1807d9b5443a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTkyOXwwfDF8c2VhcmNofDE4fHxyZWNpcGUlMjBwbGFjZWhvbGRlcnxlbnwwfHx8fDE3MDY2ODc5MDJ8MA&ixlib=rb-4.0.3&q=80&w=1080',
        rating: fetchedRecipe.rating || 5.0,
        cuisine: fetchedRecipe.tags?.[0] || "Global",
        difficulty: fetchedRecipe.difficulty || "Medium",
        cookTime: fetchedRecipe.cookTime || "30 min",
        servings: fetchedRecipe.servings || 4,
        prepTime: "15 min",
        totalTime: fetchedRecipe.cookTime || "45 min",
        calories: fetchedRecipe.nutrition?.calories || 350,
        likes: fetchedRecipe.likes || 0,
        views: fetchedRecipe.views || 0,
        videoUrl: null,
        author: {
          id: fetchedRecipe.author?._id,
          username: fetchedRecipe.author?.username,
          name: fetchedRecipe.author?.username || fetchedRecipe.author?.fullName || 'Anonymous Chef',
          avatar: fetchedRecipe.author?.avatar || 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          followers: fetchedRecipe.author?.followersCount || fetchedRecipe.author?.followers || 0,
          followersCount: fetchedRecipe.author?.followersCount || fetchedRecipe.author?.followers || 0,
          isFollowing: false // This will be determined by API call
        },
        ingredients: fetchedRecipe.ingredients?.map((ing, index) => ({
          id: index + 1,
          item: `${ing.quantity} ${ing.unit || ''} ${ing.name}`.trim(),
          category: ing.category || "Ingredients"
        })) || [],
        instructions: fetchedRecipe.instructions?.map((inst, index) => ({
          id: index + 1,
          step: inst.step,
          time: "5 min"
        })) || [],
        nutrition: {
          calories: fetchedRecipe.nutrition?.calories || "350",
          protein: fetchedRecipe.nutrition?.protein || "20g",
          fat: fetchedRecipe.nutrition?.fat || "15g",
          carbs: fetchedRecipe.nutrition?.carbs || "45g",
          fiber: "5g"
        },
        tags: fetchedRecipe.tags || [],
        reviews: [] // This would be fetched separately
      };
      
      setRecipe(transformedRecipe);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching recipe:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEF3E2] dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D97706]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FEF3E2] dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Recipe Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="bg-[#D97706] text-white px-6 py-2 rounded-lg hover:bg-[#B45309] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!recipeId) {
    return (
      <div className="min-h-screen bg-[#FEF3E2] dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Recipe Browser</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Please select a recipe to view</p>
          <button
            onClick={() => navigate('/dashboard/myRecipes')}
            className="bg-[#D97706] text-white px-6 py-2 rounded-lg hover:bg-[#B45309] transition-colors"
          >
            View My Recipes
          </button>
        </div>
      </div>
    );
  }

  return <ViewRecipe recipeId={recipeId} recipe={recipe} onBack={handleBack} navigate={navigate} />;
};

export default Recipe;