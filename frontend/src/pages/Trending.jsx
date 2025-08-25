import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

const Trending = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Trending / ChefAssist';
  }, []);

  
  const [allRecipes, setAllRecipes] = useState([]);
  const [trendingData, setTrendingData] = useState({
    trendingToday: [],
    trendingWeek: [],
    trendingMonth: [],
    allTimeFavorites: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState("Trending Today");

  // Map backend data to frontend format
  const getRecipesByCategory = () => {
    switch (activeCategory) { 
      case "Trending Today":
        return trendingData.trendingToday;
      case "Trending This Week":
        return trendingData.trendingWeek;
      case "Trending This Month":
        return trendingData.trendingMonth;
      case "All-Time Favorites":
        return trendingData.allTimeFavorites;
      default:
        return [];
    }
  };
  const filteredRecipes = getRecipesByCategory() || [];

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  useEffect(() => {
    document.title = 'Trending / ChefAssist';
    const fetchTrending = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/recipes/trending');
        setTrendingData(res.data);
      } catch (err) {
        setError('Failed to load trending recipes');
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen px-6 py-10">
      <h2 className="text-3xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-peach)] mb-6">
        🔥 Trending Recipes on ChefAssist
      </h2>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {[
          "Trending Today",
          "Trending This Week",
          "Trending This Month",
          "All-Time Favorites",
        ].map((label, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(label)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              activeCategory === label
                ? "bg-[var(--color-chef-orange-dark)] text-white"
                : "bg-[var(--color-chef-orange-light)] text-white hover:bg-[var(--color-chef-orange-dark)]"
            } dark:bg-[var(--color-chef-orange-dark)] dark:hover:bg-[var(--color-chef-orange-light)]`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Loading/Error State */}
      {loading ? (
        <div className="text-center text-lg text-gray-500 dark:text-gray-300">Loading trending recipes...</div>
      ) : error ? (
        <div className="text-center text-lg text-red-500">{error}</div>
      ) : (
        <div className="space-y-6">
          {filteredRecipes.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-300">No trending recipes found.</div>
          ) : (
            filteredRecipes.map((recipe, index) => (
              <div
                key={recipe._id || recipe.id || index}
                onClick={() => handleRecipeClick(recipe._id || recipe.id)}
                className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden h-48 cursor-pointer transform hover:scale-[1.02]"
              >
                {/* Trending Number */}
                <div className="bg-[var(--color-chef-peach)] dark:bg-[var(--color-chef-orange-dark)] w-12 h-full flex items-center justify-center text-xl font-bold text-[var(--color-chef-orange-dark)] dark:text-white">
                  {index + 1}
                </div>

                {/* Thumbnail */}
                <img
                  src={recipe.imageUrl || recipe.thumbnail}
                  alt={recipe.title}
                  className="w-48 h-full object-cover"
                />

                {/* Content */}
                <div className="p-4 flex flex-col justify-between flex-1 h-full">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-peach)]">
                      {recipe.title}
                    </h3>
                    <span className="text-sm bg-[var(--color-chef-orange-light)] text-white px-2 py-1 rounded-full dark:bg-[var(--color-chef-orange-dark)]">
                      #{index + 1}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {recipe.description}
                  </p>

                  <div className="mt-2 flex flex-wrap text-xs text-gray-500 dark:text-gray-400 gap-4">
                    <span>👨‍🍳 {recipe.author?.username || recipe.author || 'Unknown'}</span>
                    <span>👁️ {recipe.views?.toLocaleString() || 0} views</span>
                    <span>❤️ {recipe.likes?.toLocaleString() || 0} likes</span>
                    <span>🕒 {new Date(recipe.createdAt).toLocaleDateString() || ''}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

    



export default Trending;