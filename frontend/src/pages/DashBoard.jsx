import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, NavLink } from 'react-router-dom'
import Settings from '../components/dashboard/Settings';
import MyRecipe from '../components/dashboard/MyRecipe';
import Overview from '../components/dashboard/Overview';
import MealPlanner from '../components/dashboard/MealPlanner.jsx';
import Inventory from '../components/dashboard/Inventory.jsx';
import Nutrition from "../components/dashboard/Nutrition.jsx";

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
    const navigate = useNavigate();
    const [sideBar, setSideBar] = useState("overview");
     useEffect(() => {
        document.title = 'DashBoard / ChefAssit';
    }, []);
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 dark:bg-gray-800 dark:border-gray-700/50">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 dark:bg-gray-800 dark:border-gray-700/50">
                {/* --- Sidebar Navigation --- */}
                <aside className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 sticky top-0">
                        {/* User Profile Summary */}
                        <div className="text-center mb-6">
                            <img
                                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
                                alt="Profile"
                                className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-[var(--color-chef-peach)] dark:border-orange-500/50"
                            />
                            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">Priya Malhotra</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Home Chef</p>
                            <div className="flex justify-center space-x-4 mt-3 text-sm">
                                <div className="text-center">
                                    <div className="font-bold text-[var(--color-chef-orange)]">24</div>
                                    <div className="text-gray-500 dark:text-gray-400">Recipes</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-[var(--color-chef-orange)]">1.2K</div>
                                    <div className="text-gray-500 dark:text-gray-400">Followers</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-[var(--color-chef-orange)]">89</div>
                                    <div className="text-gray-500 dark:text-gray-400">Saved</div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="space-y-2">
                            <NavLink to="/dashboard" className={({ isActive }) => `flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-[var(--color-chef-orange)] text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`} end>
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" /></svg>
                                Overview
                            </NavLink>
                            <NavLink to="/dashboard/myRecipes" className={({ isActive }) => `flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-[var(--color-chef-orange)] text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z" /></svg>
                                My Recipes
                            </NavLink>
                            <NavLink to="/dashboard/mealPlanner" className={({ isActive }) => `flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-[var(--color-chef-orange)] text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                Meal Planner
                            </NavLink>
                            <NavLink to="/dashboard/inventory" className={({ isActive }) => `flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-[var(--color-chef-orange)] text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                Inventory
                            </NavLink>
                            <NavLink to="/dashboard/nutrition" className={({ isActive }) => `flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-[var(--color-chef-orange)] text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                Nutrition
                            </NavLink>
                            <NavLink to="/dashboard/settings" className={({ isActive }) => `flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-[var(--color-chef-orange)] text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                Settings
                            </NavLink>
                        </nav>
                    </div>
                </aside>

                {/* --- Main Content --- */}
                <main className="lg:col-span-3">
                    <Routes>
                        <Route index element={<Overview sampleRecipes={sampleRecipes} />} />
                        <Route path="myRecipes" element={<MyRecipe />} />
                        <Route path="mealPlanner" element={<MealPlanner />} />
                        <Route path="inventory" element={<Inventory sampleRecipes={sampleRecipes} />} />
                        <Route path="nutrition" element={<Nutrition />} />
                        <Route path="settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default DashBoard