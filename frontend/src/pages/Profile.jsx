import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
const Profile = () => {
  const navigate = useNavigate();
  const favoriteRecipes = [
    {
      id: 1,
      title: "Creamy Garlic Parmesan Pasta",
      image:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 124,
      cookTime: "25 min",
      difficulty: "Easy",
      cuisine: "Italian",
      description: "Rich and creamy pasta with garlic and parmesan cheese",
      views: 2340,
      saves: 89,
    },
    {
      id: 2,
      title: "Spicy Thai Basil Stir Fry",
      image:
        "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviews: 89,
      cookTime: "15 min",
      difficulty: "Medium",
      cuisine: "Thai",
      description: "Authentic Thai stir fry with fresh basil and chilies",
      views: 1890,
      saves: 67,
    },
    {
      id: 3,
      title: "Classic Margherita Pizza",
      image:
        "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 203,
      cookTime: "45 min",
      difficulty: "Medium",
      cuisine: "Italian",
      description: "Traditional pizza with fresh mozzarella and basil",
      views: 3210,
      saves: 156,
    },
    {
      id: 4,
      title: "Chocolate Lava Cake",
      image:
        "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 156,
      cookTime: "30 min",
      difficulty: "Hard",
      cuisine: "French",
      description: "Decadent chocolate cake with molten center",
      views: 2780,
      saves: 134,
    },
  ];

  const myRecipes = [
    {
      id: 5,
      title: "Spicy Pasta Arrabbiata",
      image:
        "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 67,
      cookTime: "20 min",
      difficulty: "Easy",
      cuisine: "Italian",
      description: "Fiery pasta with tomatoes, garlic, and red chilies",
      views: 1560,
      saves: 78,
      status: "Published",
      publishedDate: "2 days ago",
    },
    {
      id: 6,
      title: "Butter Chicken Curry",
      image:
        "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 89,
      cookTime: "40 min",
      difficulty: "Medium",
      cuisine: "Indian",
      description: "Creamy and rich Indian curry with tender chicken",
      views: 2340,
      saves: 123,
      status: "Published",
      publishedDate: "1 week ago",
    },
    {
      id: 7,
      title: "Mediterranean Quinoa Bowl",
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      reviews: 45,
      cookTime: "25 min",
      difficulty: "Easy",
      cuisine: "Mediterranean",
      description: "Healthy quinoa bowl with fresh vegetables and feta",
      views: 890,
      saves: 34,
      status: "Draft",
      publishedDate: null,
    },
  ];

  const recommendedRecipes = [
    {
      id: 8,
      title: "Pad Thai Noodles",
      image:
        "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      cookTime: "20 min",
      difficulty: "Medium",
      cuisine: "Thai",
    },
    {
      id: 9,
      title: "Caesar Salad",
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.4,
      cookTime: "10 min",
      difficulty: "Easy",
      cuisine: "American",
    },
    {
      id: 10,
      title: "Beef Tacos",
      image:
        "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      cookTime: "30 min",
      difficulty: "Medium",
      cuisine: "Mexican",
    },
    {
      id: 11,
      title: "Tiramisu",
      image:
        "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      cookTime: "4 hours",
      difficulty: "Hard",
      cuisine: "Italian",
    },
  ];
  useEffect(() => {
    document.title = "Profile / ChefAssit";
  }, []);
  return (
    <>
      <div className="flex flex-col bg-chef-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-chef-orange to-chef-orange-light p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative group">
                  <img
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Priya Malhotra"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover transition-transform group-hover:scale-105"
                  />
                  <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-4 h-4 text-chef-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroklinecap="round"
                        strokeinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                    <h1 className="text-3xl font-bold text-white mb-2 md:mb-0">
                      Priya Malhotra
                    </h1>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Premium
                    </span>
                  </div>
                  <p className="text-white/90 text-lg mb-4 max-w-2xl">
                    Passionate home chef & recipe creator. Lover of all things
                    pasta & spice! Sharing my culinary adventures one recipe at
                    a time.
                  </p>

                  {/* <!-- Achievement Badges --> */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                      🏆 Top Creator
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                      🔥 30-Day Streak
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                      ⭐ 5-Star Chef
                    </span>
                  </div>

                  {/* <!-- Cooking Preferences --> */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                      🍝 Italian
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                      🌶️ Spicy
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                      🥗 Healthy
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                      ⚡ Quick
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Stats Section --> */}
            <div className="bg-white p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center group cursor-pointer">
                  <div className="bg-chef-peach/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 transition-colors">
                    <span
                      className="text-3xl font-bold text-chef-orange stat-number"
                      data-target="24"
                    >
                      0
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">Recipes</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-chef-orange h-2 rounded-full transition-all duration-1000"
                      style={{ width: "48%" }}
                    ></div>
                  </div>
                </div>

                <div className="text-center group cursor-pointer">
                  <div className="bg-chef-peach/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 transition-colors">
                    <span
                      className="text-2xl font-bold text-chef-orange stat-number"
                      data-target="1200"
                    >
                      0
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">Followers</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-chef-orange h-2 rounded-full transition-all duration-1000"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>

                <div className="text-center group cursor-pointer">
                  <div className="bg-chef-peach/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 transition-colors">
                    <span
                      className="text-3xl font-bold text-chef-orange stat-number"
                      data-target="89"
                    >
                      0
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">Favorites</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-chef-orange h-2 rounded-full transition-all duration-1000"
                      style={{ width: "89%" }}
                    ></div>
                  </div>
                </div>

                <div className="text-center group cursor-pointer">
                  <div className="bg-chef-peach/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 transition-colors">
                    <span
                      className="text-2xl font-bold text-chef-orange stat-number"
                      data-target="4.8"
                    >
                      0
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
                className="tab-button active px-6 py-4 text-sm font-medium border-b-2 border-chef-orange text-chef-orange"
                data-tab="favorites"
              >
                Favorites
              </button>
              <button
                className="tab-button px-6 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-chef-orange hover:border-chef-orange/50 transition-colors"
                data-tab="reviews"
              >
                All Recipe
              </button>
              <button
                className="tab-button px-6 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-chef-orange hover:border-chef-orange/50 transition-colors"
                data-tab="activity"
              >
                Activity Feed
              </button>
            </div>

            {/* <!-- Search and Filter --> */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    id="recipe-search"
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
                      stroklinecap="round"
                      strokeinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent">
                  <option>All Cuisines</option>
                  <option>Italian</option>
                  <option>Asian</option>
                  <option>Mexican</option>
                  <option>Indian</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent">
                  <option>All Difficulty</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            {/* <!-- Tab Content --> */}
            <div className="p-6">
              {/* <!-- Favorites Tab --> */}
              <div id="favorites-content" className="tab-content">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-chef-orange">
                    Your Favorite Recipes
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 text-gray-400 hover:text-chef-orange transition-colors"
                      title="Grid View"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
                      </svg>
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-chef-orange transition-colors"
                      title="List View"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroklinecap="round"
                          strokeinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 10h16M4 14h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  id="recipe-grid"
                >
                  {/* <!-- Recipe cards will be populated by JavaScript --> */}
                  {favoriteRecipes.map((recipe, index) => (
                    <div key={index}>
                      <RecipeCard recipe={recipe} isMyRecipe={false} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* <!-- My Recipes Section --> */}
          <div className="bg-white rounded-xl shadow-lg border border-chef-peach/30">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-chef-orange">
                  My Recipes
                </h2>
                <button className="bg-chef-orange text-white px-4 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors">
                  + Add Recipe
                </button>
              </div>
            </div>

            <div className="p-6">
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                id="my-recipes-grid"
              >
                {/* <!-- My recipe cards will be populated by JavaScript --> */}
                {myRecipes.map((recipe, index) => (
                  <div key={index}>
                    <RecipeCard recipe={recipe} isMyRecipe={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
