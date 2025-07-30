import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Alert from "./Alert";
import MyRecipeCard from "./MyRecipeCard";
import { recipeService } from "../../api/recipeService";

const MyRecipe = () => {
  const [myRecipeNav, setMyRecipeNav] = useState("published");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's recipes when component mounts
  useEffect(() => {
    fetchUserRecipes();
  }, []);

  const fetchUserRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await recipeService.getUserRecipes('all');
      setRecipes(response.recipes || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching user recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh recipes (can be called from child components)
  const refreshRecipes = () => {
    fetchUserRecipes();
  };

  // Filter recipes by visibility status
  const published = recipes.filter(
    (recipe) => recipe.visibility === "public"
  );
  const draft = recipes.filter((recipe) => recipe.visibility === "draft");
  
  // Calculate total views and likes (approximate since likes are in separate collection)
  const totalViews = recipes.reduce((sum, recipe) => sum + (recipe.views || 0), 0);
  const totalRecipes = recipes.length;
  
  const alerts = [
    {
      title: `New Review on "Creamy Garlic Parmesan Pasta"`,
      description: `Sarah Johnson left a 5-star review...`,
      time: "2 hours ago",
    },
  ];

  return (
    <div id="my-recipes-section" className="p-4 sm:p-6 lg:p-8">
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--color-chef-orange)]"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="text-red-600 dark:text-red-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Error loading recipes
              </h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-orange-light)]">
              My Recipes
            </h2>
            <div className="flex gap-3">
              <button
                onClick={refreshRecipes}
                disabled={loading}
                className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
              <NavLink
                to="/recipe/create"
                className="bg-[var(--color-chef-orange)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-chef-orange-dark)] transition-colors font-semibold"
              >
                + Create Recipe
              </NavLink>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-2xl font-bold text-[var(--color-chef-orange)]">
                {published.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Published
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-2xl font-bold text-yellow-500">
                {draft.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Drafts</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-2xl font-bold text-green-500">{totalRecipes}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Recipes
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-2xl font-bold text-blue-500">{totalViews.toLocaleString()}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
            </div>
          </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setMyRecipeNav("published")}
              className={`py-4 px-2 border-b-2 font-medium ${
                myRecipeNav === "published"
                  ? "border-[var(--color-chef-orange)] text-[var(--color-chef-orange)]"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-[var(--color-chef-orange)]"
              }`}
            >
              Published ({published.length})
            </button>
            <button
              onClick={() => setMyRecipeNav("draft")}
              className={`py-4 px-2 border-b-2 font-medium ${
                myRecipeNav === "draft"
                  ? "border-[var(--color-chef-orange)] text-[var(--color-chef-orange)]"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-[var(--color-chef-orange)]"
              }`}
            >
              Drafts ({draft.length})
            </button>
            <button
              onClick={() => setMyRecipeNav("alert")}
              className={`py-4 px-2 border-b-2 font-medium ${
                myRecipeNav === "alert"
                  ? "border-[var(--color-chef-orange)] text-[var(--color-chef-orange)]"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-[var(--color-chef-orange)]"
              }`}
            >
              Alerts ({alerts.length})
            </button>
          </nav>
        </div>
        <div className="p-6">
          {myRecipeNav === "published" && (
            <div className="space-y-6">
              {published.length > 0 ? (
                published.map((r) => (
                  <MyRecipeCard key={r._id} recipe={r} onRecipeUpdate={refreshRecipes} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No published recipes yet</p>
                  <NavLink
                    to="/recipe/create"
                    className="inline-flex items-center px-4 py-2 bg-[var(--color-chef-orange)] text-white rounded-lg hover:bg-[var(--color-chef-orange-dark)] transition-colors"
                  >
                    Create Your First Recipe
                  </NavLink>
                </div>
              )}
            </div>
          )}
          {myRecipeNav === "draft" && (
            <div className="space-y-6">
              {draft.length > 0 ? (
                draft.map((r) => (
                  <MyRecipeCard key={r._id} recipe={r} onRecipeUpdate={refreshRecipes} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No draft recipes</p>
                </div>
              )}
            </div>
          )}
          {myRecipeNav === "alert" && (
            <div className="space-y-4">
              {alerts.map((alt, i) => (
                <Alert key={i} alert={alt} />
              ))}
            </div>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default MyRecipe;