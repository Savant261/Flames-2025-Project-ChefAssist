import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard';
import RecipeOfTheDay from '../components/explore/RecipeOfTheDay';
import Alert from '../components/dashboard/Alert';
const DashBoard = () => {
    const sampleRecipes = [
        {
            id: 1,
            title: "Creamy Garlic Parmesan Pasta",
            image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
            cuisine: "Italian",
            rating: 4.8,
            reviews: 124,
            cookTime: "25 min",
            difficulty: "Easy",
            description: "Rich and creamy pasta with garlic and parmesan cheese",
            author: "Priya Malhotra",
            status: "published",
            publishedDate: "2 days ago",
            views: 2340,
            likes: 89,
            ingredients: ["pasta", "garlic", "parmesan", "cream"],
            calories: 450,
            protein: 18,
            carbs: 52,
            fat: 16
        },
        {
            id: 2,
            title: "Spicy Thai Basil Stir Fry",
            image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
            cuisine: "Thai",
            rating: 4.6,
            reviews: 89,
            cookTime: "15 min",
            difficulty: "Medium",
            description: "Authentic Thai stir fry with fresh basil and chilies",
            author: "Priya Malhotra",
            status: "published",
            publishedDate: "1 week ago",
            views: 1890,
            likes: 67,
            ingredients: ["chicken", "basil", "chilies", "soy sauce"],
            calories: 380,
            protein: 25,
            carbs: 28,
            fat: 18
        },
        {
            id: 3,
            title: "Mediterranean Quinoa Bowl",
            image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
            cuisine: "Mediterranean",
            rating: 4.5,
            reviews: 45,
            cookTime: "25 min",
            difficulty: "Easy",
            description: "Healthy quinoa bowl with fresh vegetables and feta",
            author: "Priya Malhotra",
            status: "draft",
            publishedDate: null,
            views: 0,
            likes: 0,
            ingredients: ["quinoa", "vegetables", "feta", "olives"],
            calories: 320,
            protein: 12,
            carbs: 45,
            fat: 10
        }
    ];
    const inventoryItems = [
        { name: "Tomatoes", quantity: 3, unit: "lbs", expiry: "2024-12-20", status: "fresh" },
        { name: "Pasta", quantity: 2, unit: "boxes", expiry: "2025-06-15", status: "fresh" },
        { name: "Garlic", quantity: 1, unit: "bulb", expiry: "2024-12-18", status: "expiring" },
        { name: "Parmesan", quantity: 1, unit: "block", expiry: "2024-12-15", status: "expired" },
        { name: "Basil", quantity: 1, unit: "bunch", expiry: "2024-12-16", status: "expiring" }
    ];

    const mealPlan = {
        "2024-12-09": [{ name: "Pasta Night", type: "dinner", recipe: "Creamy Garlic Parmesan Pasta" }],
        "2024-12-10": [{ name: "Stir Fry", type: "dinner", recipe: "Spicy Thai Basil Stir Fry" }],
        "2024-12-11": [{ name: "Healthy Bowl", type: "lunch", recipe: "Mediterranean Quinoa Bowl" }]
    };
    const alert = [{
        title: `New Review on "Creamy Garlic Parmesan Pasta`,
        description: `Sarah Johnson left a 5-star review: "Amazing recipe! My family loved it."`,
        time: "2 hours ago",
    }, {
        title: "Recipe Update Needed",
        description: "Your \"Spicy Thai Basil Stir Fry\" recipe has received feedback about cooking time. Consider updating.",
        time: "1 day ago",
    }]
    const navigate = useNavigate();
    const published = sampleRecipes.filter((recipe) => recipe.status === "published")
    const draft = sampleRecipes.filter((recipe) => recipe.status === "draft")
    const [sideBar, setSideBar] = useState("overview");
    const [spinWheelRecipe, setSpinWheelRecipe] = useState(null);
    const spinWheel = () => {
        setSpinWheelRecipe(sampleRecipes[Math.floor(Math.random() * sampleRecipes.length)]);
    }
    const [myRecipeNav, setMyRecipeNav] = useState("published");
    return (
        <>
            <div className="bg-white shadow-sm border-b border-chef-peach/30 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button onClick={() => navigate("/")} className="p-2 text-gray-600 hover:text-chef-orange transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div className="w-10 h-10 bg-chef-orange rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-chef-orange">Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* <button className="p-2 text-gray-600 hover:text-chef-orange transition-colors relative">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h10v-1a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v1z" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                            </button> */}
                            <button onClick={() => navigate("/editProfile")} className="bg-chef-orange text-white px-4 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* <!-- Sidebar Navigation --> */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30 sticky top-24">
                            {/* <!-- User Profile Summary --> */}
                            <div className="text-center mb-6">
                                <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
                                    alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-chef-peach" />
                                <h3 className="font-bold text-lg text-gray-800">Priya Malhotra</h3>
                                <p className="text-sm text-gray-600">Home Chef</p>
                                <div className="flex justify-center space-x-4 mt-3 text-sm">
                                    <div className="text-center">
                                        <div className="font-bold text-chef-orange">24</div>
                                        <div className="text-gray-500">Recipes</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-chef-orange">1.2K</div>
                                        <div className="text-gray-500">Followers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-chef-orange">89</div>
                                        <div className="text-gray-500">Saved</div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Navigation Menu --> */}
                            <nav className="space-y-2">
                                <button className="nav-item active w-full text-left px-4 py-3 rounded-lg transition-colors" data-section="overview" onClick={() => setSideBar("overview")}>
                                    <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    </svg>
                                    Overview
                                </button>
                                <button className="nav-item w-full text-left px-4 py-3 rounded-lg transition-colors" data-section="my-recipes" onClick={() => setSideBar("myRecipes")}>
                                    <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z" />
                                    </svg>
                                    My Recipes
                                </button>
                                <button className="nav-item w-full text-left px-4 py-3 rounded-lg transition-colors" data-section="meal-planner" onClick={() => setSideBar("mealPlanner")}>
                                    <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Meal Planner
                                </button>
                                <button className="nav-item w-full text-left px-4 py-3 rounded-lg transition-colors" data-section="inventory" onClick={() => setSideBar("inventory")}>
                                    <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Inventory
                                </button>
                                <button className="nav-item w-full text-left px-4 py-3 rounded-lg transition-colors" data-section="nutrition" onClick={() => setSideBar("nutrition")}>
                                    <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Nutrition
                                </button>
                                <button className="nav-item w-full text-left px-4 py-3 rounded-lg transition-colors" data-section="settings" onClick={() => setSideBar("settings")}>
                                    <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Settings
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* <!-- Main Content --> */}
                    <div className="lg:col-span-3">
                        {/* <!-- Overview Section --> */}
                        {sideBar == "overview" && (<div id="overview-section" className="dashboard-section">
                            {/* <!-- Personalized Greeting --> */}
                            <div className="bg-gradient-to-r from-chef-orange to-chef-orange-light rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold mb-2" id="greeting">Good evening, Priya!</h2>
                                    <p className="text-white/90 text-lg mb-4">Ready to cook something amazing today?</p>
                                    <div className="flex items-center space-x-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">7</div>
                                            <div className="text-sm text-white/80">Day Streak</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">3</div>
                                            <div className="text-sm text-white/80">Recipes This Week</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">156</div>
                                            <div className="text-sm text-white/80">Total Likes</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Recipe Inspiration Wheel --> */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30 mb-8">
                                <h3 className="text-xl font-bold text-chef-orange mb-4">Recipe Inspiration Wheel</h3>
                                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                                    <div className="relative">
                                        <div id="inspirationWheel" className="w-48 h-48 rounded-full border-8 border-chef-orange relative overflow-hidden cursor-pointer">
                                            <div className="absolute inset-0 bg-gradient-to-r from-chef-orange to-chef-orange-light"></div>
                                            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-2xl mb-2">🎲</div>
                                                    <div className="font-bold text-chef-orange" onClick={() => spinWheel()}>Spin Me!</div>
                                                </div>
                                            </div>
                                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-chef-orange-dark"></div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        {spinWheelRecipe != null && (<div id="wheelResult">
                                            <h4 className="font-bold text-lg text-gray-800 mb-2">Your Inspiration:</h4>
                                            <div id="suggestedRecipe" className="bg-chef-cream p-4 rounded-lg">
                                                <div className="flex items-center space-x-4">
                                                    <img src={`${spinWheelRecipe.image}`} alt={`${spinWheelRecipe.title}`} class="w-16 h-16 rounded-lg object-cover" />
                                                    <div className="flex-1">
                                                        <h5 className="font-bold text-chef-orange">{spinWheelRecipe.title}</h5>
                                                        <p className="text-sm text-gray-600">{spinWheelRecipe.description}</p>
                                                        <div className="flex items-center space-x-2 mt-2">
                                                            <span className="text-xs bg-chef-orange text-white px-2 py-1 rounded">${spinWheelRecipe.cuisine}</span>
                                                            <span className="text-xs text-gray-500">{spinWheelRecipe.cookTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="mt-3 w-full bg-chef-orange text-white py-2 rounded-lg hover:bg-chef-orange-dark transition-colors" onclick="viewRecipe(${randomRecipe.id})">
                                                    Cook This Recipe
                                                </button>
                                            </div>
                                        </div>)}

                                        {spinWheelRecipe == null && (<div id="wheelInstructions" className="text-gray-600">
                                            <p className="mb-2">Feeling indecisive? Let the wheel choose your next culinary adventure!</p>
                                            <p className="text-sm">Click the wheel to get a random recipe suggestion based on your preferences.</p>
                                        </div>)}

                                    </div>
                                </div>
                            </div>

                            {/* <!-- Quick Stats Grid --> */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Recipes Cooked</p>
                                            <p className="text-2xl font-bold text-chef-orange">47</p>
                                            <p className="text-xs text-green-600">+3 this week</p>
                                        </div>
                                        <div className="w-12 h-12 bg-chef-orange/10 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-chef-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Avg Rating</p>
                                            <p className="text-2xl font-bold text-chef-orange">4.8</p>
                                            <p className="text-xs text-green-600">⭐⭐⭐⭐⭐</p>
                                        </div>
                                        <div className="w-12 h-12 bg-chef-orange/10 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-chef-orange" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Calories Saved</p>
                                            <p className="text-2xl font-bold text-chef-orange">2.4K</p>
                                            <p className="text-xs text-green-600">vs restaurant</p>
                                        </div>
                                        <div className="w-12 h-12 bg-chef-orange/10 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-chef-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Personalized Recommendations --> */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <h3 className="text-xl font-bold text-chef-orange mb-4">Recommended for You</h3>
                                    <div className="space-y-4" id="recommendedRecipes">
                                        {/* <!-- Recommended recipes will be populated here --> */}
                                        {sampleRecipes.map((recipe, index) => (<div key={index}><RecipeCard recipe={recipe} /></div>))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <h3 className="text-xl font-bold text-chef-orange mb-4">Trending in Your Cuisine</h3>
                                    <div className="space-y-4" id="trendingCuisine">
                                        {/* <!-- Trending cuisine recipes will be populated here --> */}
                                        {sampleRecipes.map((recipe, index) => (<div key={index}><RecipeCard recipe={recipe} /></div>))}
                                    </div>
                                </div>
                            </div>
                        </div>)}


                        {/* <!-- My Recipes Section --> */}
                        {sideBar == "myRecipes" && (<div id="my-recipes-section" className="dashboard-section">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-chef-orange">My Recipes</h2>
                                <button className="bg-chef-orange text-white px-4 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors">
                                    + Create Recipe
                                </button>
                            </div>

                            {/* <!-- Recipe Stats --> */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                                    <div className="text-2xl font-bold text-chef-orange">24</div>
                                    <div className="text-sm text-gray-600">Published</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                                    <div className="text-2xl font-bold text-yellow-500">3</div>
                                    <div className="text-sm text-gray-600">Drafts</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                                    <div className="text-2xl font-bold text-green-500">156</div>
                                    <div className="text-sm text-gray-600">Total Likes</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                                    <div className="text-2xl font-bold text-blue-500">2.3K</div>
                                    <div className="text-sm text-gray-600">Views</div>
                                </div>
                            </div>

                            {/* <!-- Recipe Tabs --> */}
                            <div className="bg-white rounded-xl shadow-lg border border-chef-peach/30 mb-8">
                                <div className="border-b border-gray-200">
                                    <nav className="flex space-x-8 px-6">
                                        <button className="recipe-tab active py-4 px-2 border-b-2 border-chef-orange text-chef-orange font-medium" data-tab="published" onClick={() => setMyRecipeNav("published")}>
                                            Published ({published.length})
                                        </button>
                                        <button className="recipe-tab py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-chef-orange" data-tab="drafts" onClick={() => setMyRecipeNav("draft")}>
                                            Drafts ({draft.length})
                                        </button>
                                        <button className="recipe-tab py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-chef-orange" data-tab="alerts" onClick={() => setMyRecipeNav("alert")}>
                                            Alerts ({alert.length})
                                        </button>
                                    </nav>
                                </div>

                                <div className="p-6">
                                    <div id="published-tab" className="recipe-tab-content">
                                        {myRecipeNav === "published" && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="publishedRecipes">
                                            {published.map((recipe, index) => (<div key={index}><RecipeCard recipe={recipe} /></div>))}
                                        </div>)}
                                    </div>

                                    <div id="drafts-tab" className="recipe-tab-content">
                                        {myRecipeNav === "draft" && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="draftRecipes">
                                            {draft.map((recipe, index) => (<div key={index}><RecipeCard recipe={recipe} /></div>))}
                                        </div>)}
                                    </div>

                                    <div id="alerts-tab" className="recipe-tab-content ">
                                        {myRecipeNav === "alert" && (<div className="space-y-4" id="recipeAlerts">
                                            {alert.map((alt, index) => (
                                                <div key={index} > <Alert alert={alt} /></div>
                                            ))}
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                        </div>)}


                        {/* <!-- Meal Planner Section --> */}
                        {sideBar == "mealPlanner" && (<div id="meal-planner-section" className="dashboard-section ">
                            <h2 className="text-2xl font-bold text-chef-orange mb-6">Meal Planner</h2>

                            {/* <!-- Weekly Calendar --> */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30 mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-800">This Week's Menu</h3>
                                    <div className="flex space-x-2">
                                        <button className="p-2 text-gray-600 hover:text-chef-orange transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <span className="px-4 py-2 text-gray-700 font-medium">Dec 9-15, 2024</span>
                                        <button className="p-2 text-gray-600 hover:text-chef-orange transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 gap-4" id="mealCalendar">
                                    {/* <!-- Calendar will be populated here --> */}
                                </div>
                            </div>

                            {/* <!-- Meal Planning Tools --> */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <h3 className="text-xl font-bold text-chef-orange mb-4">Quick Add Meals</h3>
                                    <div className="space-y-3">
                                        <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-chef-orange transition-colors">
                                            🍝 Pasta Night
                                        </button>
                                        <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-chef-orange transition-colors">
                                            🌮 Taco Tuesday
                                        </button>
                                        <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-chef-orange transition-colors">
                                            🍛 Curry Night
                                        </button>
                                        <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-chef-orange transition-colors">
                                            🥗 Healthy Bowl
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <h3 className="text-xl font-bold text-chef-orange mb-4">Shopping List</h3>
                                    <div className="space-y-2" id="shoppingList">
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" className="text-chef-orange" />
                                            <span className="text-gray-700">Tomatoes (3 lbs)</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" className="text-chef-orange" />
                                            <span className="text-gray-700">Pasta (2 boxes)</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input type="checkbox" className="text-chef-orange" />
                                            <span className="text-gray-700 line-through">Garlic (1 bulb)</span>
                                        </div>
                                    </div>
                                    <button className="mt-4 w-full bg-chef-orange text-white py-2 rounded-lg hover:bg-chef-orange-dark transition-colors">
                                        Generate from Meal Plan
                                    </button>
                                </div>
                            </div>
                        </div>)}


                        {/* <!-- Inventory Section --> */}
                        {sideBar == "inventory" && (<div id="inventory-section" className="dashboard-section ">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-chef-orange">Ingredient Inventory</h2>
                                <button className="bg-chef-orange text-white px-4 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors"
                                //  onClick="openAddIngredientModal()"
                                >
                                    + Add Ingredient
                                </button>
                            </div>

                            {/* <!-- Inventory Stats --> */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                                    <div className="text-2xl font-bold text-chef-orange">47</div>
                                    <div className="text-sm text-gray-600">Total Ingredients</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                                    <div className="text-2xl font-bold text-red-500">5</div>
                                    <div className="text-sm text-gray-600">Expiring Soon</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                                    <div className="text-2xl font-bold text-green-500">12</div>
                                    <div className="text-sm text-gray-600">Recipes Available</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* <!-- Current Inventory --> */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <h3 className="text-xl font-bold text-chef-orange mb-4">Current Inventory</h3>
                                    <div className="space-y-3" id="inventoryList">
                                        {/* <!-- Inventory items will be populated here --> */}
                                    </div>
                                </div>

                                {/* <!-- Recipe Suggestions --> */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <h3 className="text-xl font-bold text-chef-orange mb-4">What You Can Cook</h3>
                                    <div className="space-y-4" id="inventoryRecipes">
                                        {/* <!-- Recipe suggestions will be populated here --> */}
                                    </div>
                                </div>
                            </div>
                        </div>)}


                        {/* <!-- Nutrition Section --> */}
                        {sideBar == "nutrition" && (<div id="nutrition-section" className="dashboard-section ">
                            <h2 className="text-2xl font-bold text-chef-orange mb-6">Nutritional Insights</h2>

                            {/* <!-- Nutrition Overview --> */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                                    <div className="text-2xl font-bold text-blue-500">1,847</div>
                                    <div className="text-sm text-gray-600">Avg Daily Calories</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                                    <div className="text-2xl font-bold text-green-500">45%</div>
                                    <div className="text-sm text-gray-600">Carbs</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                                    <div className="text-2xl font-bold text-red-500">25%</div>
                                    <div className="text-sm text-gray-600">Protein</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-chef-peach/30">
                                    <div className="text-2xl font-bold text-yellow-500">30%</div>
                                    <div className="text-sm text-gray-600">Fat</div>
                                </div>
                            </div>

                            {/* <!-- Charts --> */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <h3 className="text-xl font-bold text-chef-orange mb-4">Weekly Nutrition Breakdown</h3>
                                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                                        <div className="text-center">
                                            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-chef-orange to-chef-orange-light flex items-center justify-center">
                                                <div className="text-white text-center">
                                                    <div className="text-2xl font-bold">1,847</div>
                                                    <div className="text-sm">Avg Calories</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-center space-x-4 text-sm">
                                                <div className="flex items-center">
                                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                                    <span>Carbs 45%</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                                                    <span>Protein 25%</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                                                    <span>Fat 30%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <h3 className="text-xl font-bold text-chef-orange mb-4">Nutrition Goals</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-medium">Daily Calories</span>
                                                <span className="text-sm text-gray-600">1,847 / 2,000</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-chef-orange h-2 rounded-full" style={{ width: "92%" }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-medium">Protein</span>
                                                <span className="text-sm text-gray-600">115g / 150g</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-red-500 h-2 rounded-full" style={{ width: "77%" }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-medium">Fiber</span>
                                                <span className="text-sm text-gray-600">28g / 35g</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}


                        {/* <!-- Settings Section --> */}
                        {sideBar == "settings" && (<div id="settings-section" className="dashboard-section ">
                            <h2 className="text-2xl font-bold text-chef-orange mb-6">Settings & Preferences</h2>

                            <div className="space-y-8">
                                {/* <!-- Dietary Preferences --> */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <h3 className="text-xl font-bold text-chef-orange mb-4">Dietary Preferences</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input type="checkbox" className="text-chef-orange" />
                                            <span>🥬 Vegetarian</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input type="checkbox" className="text-chef-orange" />
                                            <span>🌱 Vegan</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input type="checkbox" className="text-chef-orange" />
                                            <span>🌾 Gluten-Free</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input type="checkbox" className="text-chef-orange" />
                                            <span>🥛 Dairy-Free</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input type="checkbox" className="text-chef-orange" />
                                            <span>🥑 Keto</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input type="checkbox" className="text-chef-orange" />
                                            <span>🦴 Paleo</span>
                                        </label>
                                    </div>
                                </div>

                                {/* <!-- Allergies & Restrictions --> */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <h3 className="text-xl font-bold text-chef-orange mb-4">Allergies & Restrictions</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-red-500">⚠️</span>
                                                <span className="font-medium">Nuts</span>
                                            </div>
                                            <button className="text-red-500 hover:text-red-700">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-chef-orange hover:text-chef-orange transition-colors">
                                            + Add Allergy or Restriction
                                        </button>
                                    </div>
                                </div>

                                {/* <!-- Feedback & Support --> */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                    <h3 className="text-xl font-bold text-chef-orange mb-4">Feedback & Support</h3>
                                    <div className="space-y-4">
                                        <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-chef-orange transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium">Send Feedback</div>
                                                    <div className="text-sm text-gray-600">Help us improve ChefAssist</div>
                                                </div>
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </button>
                                        <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-chef-orange transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium">Contact Support</div>
                                                    <div className="text-sm text-gray-600">Get help with your account</div>
                                                </div>
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </button>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <div className="text-sm font-medium mb-2">Support Tickets</div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>Recipe upload issue</span>
                                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">In Progress</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>Account settings help</span>
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Resolved</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}

                    </div>
                </div>
            </div>

            {/* <!-- Add Ingredient Modal --> */}
            <div id="addIngredientModal" className="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-chef-orange">Add Ingredient</h3>
                        <button
                            // onclick="closeAddIngredientModal()"
                            className="text-gray-400 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form id="addIngredientForm" className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ingredient Name</label>
                            <input type="text" id="ingredientName" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent" placeholder="e.g., Tomatoes" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                <input type="number" id="ingredientQuantity" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent" placeholder="3" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                                <select id="ingredientUnit" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent">
                                    <option>lbs</option>
                                    <option>kg</option>
                                    <option>pieces</option>
                                    <option>cups</option>
                                    <option>tbsp</option>
                                    <option>tsp</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                            <input type="date" id="ingredientExpiry" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent" />
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <button type="button"
                                //  onclick="closeAddIngredientModal()" 
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" className="flex-1 px-4 py-2 bg-chef-orange text-white rounded-lg hover:bg-chef-orange-dark transition-colors">
                                Add Ingredient
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default DashBoard