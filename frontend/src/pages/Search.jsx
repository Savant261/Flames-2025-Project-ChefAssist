import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResultCard from "../components/search/SearchResultCard.jsx";
import { recipeService } from "../api/recipeService.js";

import Filter from "../components/explore/Filter.jsx";

// --- The New Search Page ---
const Search = () => {
  // This hook would be used to get the actual search query from the URL
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    tags: searchParams.get("tags") || "",
    difficulty: searchParams.get("difficulty") || "",
    cookTime: searchParams.get("cookTime") || "",
    sortBy: searchParams.get("sortBy") || "relevance"
  });

  // Function to perform search
  const performSearch = useCallback(async (searchQuery, searchFilters, page = 1) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await recipeService.searchRecipes({
        q: searchQuery,
        ...searchFilters,
        page,
        limit: 12
      });
      
      if (page === 1) {
        setRecipes(response.recipes);
      } else {
        setRecipes(prev => [...prev, ...response.recipes]);
      }
      
      setSearchResults(response);
      setCurrentPage(page);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more recipes
  const loadMoreRecipes = useCallback(() => {
    if (searchResults && currentPage < searchResults.pages) {
      performSearch(query, filters, currentPage + 1);
    }
  }, [searchResults, currentPage, query, filters, performSearch]);

  // Update filters and search
  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
    
    // Perform new search
    performSearch(query, newFilters, 1);
  }, [query, setSearchParams, performSearch]);

  // Initial search on component mount or query change
  useEffect(() => {
    if (query && query.trim()) {
      performSearch(query, filters, 1);
    } else {
      // Clear results if no query
      setRecipes([]);
      setSearchResults(null);
      setError(null);
      setLoading(false);
    }
  }, [query, performSearch]); // Only depend on query, not filters

  const sampleRecipes = [
    {
      id: 1,
      title: "Creamy Garlic Parmesan Pasta",
      image:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Italian",
      rating: 4.8,
      reviews: 124,
      cookTime: "25 min",
      difficulty: "Easy",
      author: {
        name: "Chef Maria",
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
        followers: 12500,
      },
      views: 2340,
      description:
        "Rich and creamy pasta with garlic and parmesan cheese, perfect for a quick weeknight dinner.",
    },
    {
      id: 3,
      title: "Classic Margherita Pizza",
      image:
        "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Italian",
      rating: 4.9,
      reviews: 203,
      cookTime: "45 min",
      difficulty: "Medium",
      author: {
        name: "Chef Giuseppe",
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
        followers: 22000,
      },
      views: 3210,
      description:
        "Traditional pizza with fresh mozzarella, tomatoes, and basil.",
    },
    {
      id: 12,
      title: "Pad Thai Noodles",
      image:
        "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Thai",
      rating: 4.6,
      reviews: 123,
      cookTime: "20 min",
      difficulty: "Medium",
      author: {
        name: "Chef Niran",
        avatar:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
        followers: 9800,
      },
      views: 2100,
      description: "Authentic Thai noodles with shrimp, tofu, and peanuts.",
    },
  ];
  useEffect(() => {
    document.title = "Search / ChefAssit";
  }, []);

  // Show loading state
  if (loading && recipes.length === 0) {
    return (
      <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen">
        <Filter onFilterChange={updateFilters} currentFilters={filters} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-chef-orange)]"></div>
          </div>
        </main>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen">
        <Filter onFilterChange={updateFilters} currentFilters={filters} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">Error: {error}</div>
            <button 
              onClick={() => performSearch(query, filters, 1)}
              className="px-6 py-3 rounded-lg bg-[var(--color-chef-orange)] text-white font-semibold hover:bg-[var(--color-chef-orange-dark)] transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Show no results state
  if (!loading && query && recipes.length === 0 && !error) {
    return (
      <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen">
        <Filter onFilterChange={updateFilters} currentFilters={filters} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              No results found for "
              <span className="text-[var(--color-chef-orange)]">{query}</span>"
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Try adjusting your search terms or filters
            </p>
          </header>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No recipes match your search criteria.</p>
            <button 
              onClick={() => {
                setSearchParams({ q: "" });
                setRecipes([]);
                setSearchResults(null);
                setError(null);
              }}
              className="px-6 py-3 rounded-lg bg-[var(--color-chef-orange)] text-white font-semibold hover:bg-[var(--color-chef-orange-dark)] transition-colors"
            >
              Clear Search
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Show initial state when no query
  if (!query) {
    return (
      <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen">
        <Filter onFilterChange={updateFilters} currentFilters={filters} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Search Recipes
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Enter a search term to discover amazing recipes
            </p>
          </header>
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Start typing to search for recipes...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen">
      <Filter onFilterChange={updateFilters} currentFilters={filters} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {query ? (
              <>
                Search results for "
                <span className="text-[var(--color-chef-orange)]">{query}</span>"
              </>
            ) : (
              "Search Recipes"
            )}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {searchResults ? (
              <>
                Showing {recipes.length} of {searchResults.total} recipes
                {searchResults.filters && (
                  <span className="ml-2">
                    {searchResults.filters.tags?.length > 0 && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1">
                        Tags: {searchResults.filters.tags.join(', ')}
                      </span>
                    )}
                    {searchResults.filters.difficulty && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1">
                        {searchResults.filters.difficulty}
                      </span>
                    )}
                    {searchResults.filters.cookTime && (
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mr-1">
                        {searchResults.filters.cookTime} min
                      </span>
                    )}
                  </span>
                )}
              </>
            ) : query ? (
              "Enter a search term to find recipes"
            ) : (
              "Discover amazing recipes"
            )}
          </p>
        </header>

        <div className="space-y-6">
          {recipes.map((recipe) => (
            <SearchResultCard key={recipe._id || recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Load More Button */}
        {searchResults && currentPage < searchResults.pages && (
          <div className="flex items-center justify-center mt-12">
            <button 
              onClick={loadMoreRecipes}
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-[var(--color-chef-orange)] text-white font-semibold hover:bg-[var(--color-chef-orange-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Loading...
                </span>
              ) : (
                `Load More Recipes (${searchResults.total - recipes.length} remaining)`
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
