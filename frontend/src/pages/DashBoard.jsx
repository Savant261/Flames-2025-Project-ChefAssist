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


    return (
        <>
            <div className="bg-white shadow-sm border-b border-chef-peach/30 sticky top-0 z-50">
                {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                            <button className="p-2 text-gray-600 hover:text-chef-orange transition-colors relative">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h10v-1a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v1z" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                            </button>
                            <button onClick={() => navigate("/editProfile")} className="bg-chef-orange text-white px-4 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div> */}
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
                                <NavLink to="/dashboard" className={({ isActive }) => ` block w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-chef-cream ${isActive ? "bg-chef-orange" : ""}`} end>
                                    <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    </svg>
                                    Overview
                                </NavLink>
                                <NavLink to="/dashboard/myRecipes" className={({ isActive }) => ` block w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-chef-cream ${isActive ? "bg-chef-orange" : ""}`}>
                                    <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z" />
                                    </svg>
                                    My Recipes
                                </NavLink>
                                <NavLink to="/dashboard/mealPlanner" className={({ isActive }) => ` block w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-chef-cream ${isActive ? "bg-chef-orange" : ""}`}>
                                    <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Meal Planner
                                </NavLink>
                                <NavLink to="/dashboard/inventory" className={({ isActive }) => `block ${isActive ? "bg-chef-orange" : ""} w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-chef-cream`}>
                                    <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Inventory
                                </NavLink>
                                <NavLink to="/dashboard/nutrition" className={({ isActive }) => `block ${isActive ? "bg-chef-orange" : ""} w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-chef-cream`}>
                                    <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Nutrition
                                </NavLink>
                                <NavLink to="/dashboard/settings" className={({ isActive }) => `block ${isActive ? "bg-chef-orange" : ""} w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-chef-cream`}>
                                    <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Settings
                                </NavLink>
                            </nav>
                        </div>
                    </div>

                    {/* <!-- Main Content --> */}
                    <div className="lg:col-span-3">
                        <Routes>
                            <Route index element={<Overview sampleRecipes={sampleRecipes} />} />
                            <Route path="myRecipes" element={<MyRecipe sampleRecipes={sampleRecipes} />} />
                            <Route path="mealPlanner" element={<MealPlanner />} />
                            <Route path="inventory" element={<Inventory sampleRecipes={sampleRecipes} />} />
                            <Route path="nutrition" element={<Nutrition />} />
                            <Route path="settings" element={<Settings />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard