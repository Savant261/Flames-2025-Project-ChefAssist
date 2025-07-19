import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResultCard from "../components/search/SearchResultCard.jsx";

import Filter from "../components/explore/Filter.jsx";

// --- The New Search Page ---
const Search = () => {
  // This hook would be used to get the actual search query from the URL
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "pasta";

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
  return (
    <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen">
      <Filter />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Search results for "
            <span className="text-[var(--color-chef-orange)]">{query}</span>"
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Showing {sampleRecipes.length} recipes
          </p>
        </header>

        <div className="space-y-6">
          {sampleRecipes.map((recipe) => (
            <SearchResultCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Pagination would go here */}
        <div className="flex items-center justify-center mt-12">
          <button className="px-6 py-3 rounded-lg bg-[var(--color-chef-orange)] text-white font-semibold hover:bg-[var(--color-chef-orange-dark)] transition-colors">
            Load More Recipes
          </button>
        </div>
      </main>
    </div>
  );
};

export default Search;
