import RecipeCarousel from "../components/RecipeCarousel.jsx";
import { useEffect, useState } from "react";
import { recipeService } from "../api/recipeService.js";

const Explore = () => {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [newRecipes, setNewRecipes] = useState([]);
  const [quickDinners, setQuickDinners] = useState([]);
  const [chefsPicks, setChefsPicks] = useState([]);
  const [fromFollowing, setFromFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch different types of recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch different categories of recipes
        const [trending, newRecipesData, easyRecipes, chefsPicks, followingRecipes] = await Promise.all([
          recipeService.getExploreRecipes('trending', 12),
          recipeService.getExploreRecipes('new', 12),
          recipeService.getExploreRecipes('easy', 12),
          recipeService.getExploreRecipes('chefs-pick', 12),
          recipeService.getExploreRecipes('following', 12)
        ]);

        setTrendingRecipes(trending.recipes || []);
        setNewRecipes(newRecipesData.recipes || []);
        setQuickDinners(easyRecipes.recipes || []);
        setChefsPicks(chefsPicks.recipes || []);
        setFromFollowing(followingRecipes.recipes || []);

      } catch (err) {
        console.error('Error fetching explore recipes:', err);
        setError(err.message || 'Failed to load recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Set page title
  useEffect(() => {
    document.title = 'Explore / ChefAssit';
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-chef-orange)]"></div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[var(--color-chef-orange)] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen">
        {/* <Filter/> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RecipeCarousel
          title="🔥 Trending This Week"
          recipes={trendingRecipes}
        />
        <RecipeCarousel title="✨ Newest Recipes" recipes={newRecipes} />
        <RecipeCarousel
          title="🍲 Quick & Easy Dinners"
          recipes={quickDinners}
        />
        <RecipeCarousel
          title="⭐ From Chefs You Follow"
          recipes={fromFollowing}
        />
        <RecipeCarousel title="🏆 Chef's Picks" recipes={chefsPicks} />
      </main>
    </div>
  );
};

export default Explore;
