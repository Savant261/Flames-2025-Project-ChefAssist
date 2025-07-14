import React from 'react'
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
const Profile = () => {
    const navigate = useNavigate();
    const favoriteRecipes = [
        {
            id: 1,
            title: "Creamy Garlic Parmesan Pasta",
            image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.8,
            reviews: 124,
            cookTime: "25 min",
            difficulty: "Easy",
            cuisine: "Italian",
            description: "Rich and creamy pasta with garlic and parmesan cheese",
            views: 2340,
            saves: 89
        },
        {
            id: 2,
            title: "Spicy Thai Basil Stir Fry",
            image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.6,
            reviews: 89,
            cookTime: "15 min",
            difficulty: "Medium",
            cuisine: "Thai",
            description: "Authentic Thai stir fry with fresh basil and chilies",
            views: 1890,
            saves: 67
        },
        {
            id: 3,
            title: "Classic Margherita Pizza",
            image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.9,
            reviews: 203,
            cookTime: "45 min",
            difficulty: "Medium",
            cuisine: "Italian",
            description: "Traditional pizza with fresh mozzarella and basil",
            views: 3210,
            saves: 156
        },
        {
            id: 4,
            title: "Chocolate Lava Cake",
            image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.7,
            reviews: 156,
            cookTime: "30 min",
            difficulty: "Hard",
            cuisine: "French",
            description: "Decadent chocolate cake with molten center",
            views: 2780,
            saves: 134
        }
    ];

    const myRecipes = [
        {
            id: 5,
            title: "Spicy Pasta Arrabbiata",
            image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.8,
            reviews: 67,
            cookTime: "20 min",
            difficulty: "Easy",
            cuisine: "Italian",
            description: "Fiery pasta with tomatoes, garlic, and red chilies",
            views: 1560,
            saves: 78,
            status: "Published",
            publishedDate: "2 days ago"
        },
        {
            id: 6,
            title: "Butter Chicken Curry",
            image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.9,
            reviews: 89,
            cookTime: "40 min",
            difficulty: "Medium",
            cuisine: "Indian",
            description: "Creamy and rich Indian curry with tender chicken",
            views: 2340,
            saves: 123,
            status: "Published",
            publishedDate: "1 week ago"
        },
        {
            id: 7,
            title: "Mediterranean Quinoa Bowl",
            image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.5,
            reviews: 45,
            cookTime: "25 min",
            difficulty: "Easy",
            cuisine: "Mediterranean",
            description: "Healthy quinoa bowl with fresh vegetables and feta",
            views: 890,
            saves: 34,
            status: "Draft",
            publishedDate: null
        }
    ];

    const recommendedRecipes = [
        {
            id: 8,
            title: "Pad Thai Noodles",
            image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.6,
            cookTime: "20 min",
            difficulty: "Medium",
            cuisine: "Thai"
        },
        {
            id: 9,
            title: "Caesar Salad",
            image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.4,
            cookTime: "10 min",
            difficulty: "Easy",
            cuisine: "American"
        },
        {
            id: 10,
            title: "Beef Tacos",
            image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.7,
            cookTime: "30 min",
            difficulty: "Medium",
            cuisine: "Mexican"
        },
        {
            id: 11,
            title: "Tiramisu",
            image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
            rating: 4.8,
            cookTime: "4 hours",
            difficulty: "Hard",
            cuisine: "Italian"
        }
    ];
    return (
        <>
            <div className="flex flex-col bg-chef-cream min-h-screen">
                {/* <div>Profile</div>
            <div onClick={() => navigate("/editProfile")} >edit profile</div> */}
                {/* <header className="bg-white shadow-sm border-b border-chef-peach/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-chef-orange rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-chef-orange">ChefAssist</h1>
                        </div>
                     <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-600 hover:text-chef-orange transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroklinecap="round" strokeinejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h10v-1a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v1z"/>
                        </svg>
                    </button>
                    <button className="p-2 text-gray-600 hover:text-chef-orange transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroklinecap="round" strokeinejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                        </svg>
                    </button>
                </div> 
                    </div>
                </div>
            </header> */}

                {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <button onClick={()=> navigate("/")} className="flex items-center text-chef-orange font-semibold hover:text-chef-orange-dark transition mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroklinecap="round" strokeinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </button>
            </div> */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-chef-orange to-chef-orange-light p-8">
                            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                                <div className="relative group">
                                    <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                                        alt="Priya Malhotra"
                                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover transition-transform group-hover:scale-105" />
                                    <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-4 h-4 text-chef-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroklinecap="round" strokeinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                                        <h1 className="text-3xl font-bold text-white mb-2 md:mb-0">Priya Malhotra</h1>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Premium
                                        </span>
                                    </div>
                                    <p className="text-white/90 text-lg mb-4 max-w-2xl">
                                        Passionate home chef & recipe creator. Lover of all things pasta & spice!
                                        Sharing my culinary adventures one recipe at a time.
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
                                        <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">🍝 Italian</span>
                                        <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">🌶️ Spicy</span>
                                        <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">🥗 Healthy</span>
                                        <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">⚡ Quick</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Stats Section --> */}
                        <div className="bg-white p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center group cursor-pointer">
                                    <div className="bg-chef-peach/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 transition-colors">
                                        <span className="text-3xl font-bold text-chef-orange stat-number" data-target="24">0</span>
                                    </div>
                                    <p className="text-gray-600 font-medium">Recipes</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div className="bg-chef-orange h-2 rounded-full transition-all duration-1000" style={{ width: "48%" }}></div>
                                    </div>
                                </div>

                                <div className="text-center group cursor-pointer">
                                    <div className="bg-chef-peach/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 transition-colors">
                                        <span className="text-2xl font-bold text-chef-orange stat-number" data-target="1200">0</span>
                                    </div>
                                    <p className="text-gray-600 font-medium">Followers</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div className="bg-chef-orange h-2 rounded-full transition-all duration-1000" style={{ width: "75%" }}></div>
                                    </div>
                                </div>

                                <div className="text-center group cursor-pointer">
                                    <div className="bg-chef-peach/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 transition-colors">
                                        <span className="text-3xl font-bold text-chef-orange stat-number" data-target="89">0</span>
                                    </div>
                                    <p className="text-gray-600 font-medium">Favorites</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div className="bg-chef-orange h-2 rounded-full transition-all duration-1000" style={{ width: "89%" }}></div>
                                    </div>
                                </div>

                                <div className="text-center group cursor-pointer">
                                    <div className="bg-chef-peach/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-3 group-hover:bg-chef-peach/50 transition-colors">
                                        <span className="text-2xl font-bold text-chef-orange stat-number" data-target="4.8">0</span>
                                    </div>
                                    <p className="text-gray-600 font-medium">Avg Rating</p>
                                    <div className="flex justify-center mt-2">
                                        <div className="flex text-yellow-400">
                                            ⭐⭐⭐⭐⭐
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Main Content --> */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* <!-- Left Sidebar --> */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* <!-- Subscription Card --> */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-chef-orange">Subscription</h3>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Premium
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">Enjoy unlimited recipe uploads, advanced meal planning, and exclusive chef badges.</p>

                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Unlimited recipe uploads
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Advanced meal planning
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Exclusive chef badges
                                    </div>
                                </div>

                                <div className="text-sm text-gray-500 mb-4">
                                    Next billing: Dec 15, 2024
                                </div>
                            </div>

                            {/* <!-- Recent Activity --> */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                <h3 className="text-xl font-bold text-chef-orange mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-chef-orange rounded-full mt-2"></div>
                                        <div>
                                            <p className="text-sm text-gray-800">Published "Spicy Pasta Arrabbiata"</p>
                                            <p className="text-xs text-gray-500">2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                        <div>
                                            <p className="text-sm text-gray-800">Received 5-star review</p>
                                            <p className="text-xs text-gray-500">5 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <div>
                                            <p className="text-sm text-gray-800">Gained 15 new followers</p>
                                            <p className="text-xs text-gray-500">1 day ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Cooking Calendar --> */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                                <h3 className="text-xl font-bold text-chef-orange mb-4">This Week's Plan</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center p-2 bg-chef-cream rounded-lg">
                                        <span className="text-sm font-medium">Mon</span>
                                        <span className="text-xs text-gray-600">Pasta Night</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                                        <span className="text-sm font-medium">Tue</span>
                                        <span className="text-xs text-gray-600">Stir Fry</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-chef-cream rounded-lg">
                                        <span className="text-sm font-medium">Wed</span>
                                        <span className="text-xs text-gray-600">Curry Night</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Main Content Area --> */}
                        <div className="lg:col-span-2">
                            {/* <!-- Navigation Tabs --> */}
                            <div className="bg-white rounded-xl shadow-lg mb-6 border border-chef-peach/30">
                                <div className="flex flex-wrap border-b border-gray-200">
                                    <button className="tab-button active px-6 py-4 text-sm font-medium border-b-2 border-chef-orange text-chef-orange" data-tab="favorites">
                                        Favorites
                                    </button>
                                    <button className="tab-button px-6 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-chef-orange hover:border-chef-orange/50 transition-colors" data-tab="reviews">
                                        Reviews
                                    </button>
                                    <button className="tab-button px-6 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-chef-orange hover:border-chef-orange/50 transition-colors" data-tab="activity">
                                        Activity Feed
                                    </button>
                                    <button className="tab-button px-6 py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-chef-orange hover:border-chef-orange/50 transition-colors" data-tab="collections">
                                        Collections
                                    </button>
                                </div>

                                {/* <!-- Search and Filter --> */}
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1 relative">
                                            <input type="text" id="recipe-search" placeholder="Search recipes..."
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent" />
                                            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroklinecap="round" strokeinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                                            <h2 className="text-2xl font-bold text-chef-orange">Your Favorite Recipes</h2>
                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 text-gray-400 hover:text-chef-orange transition-colors" title="Grid View">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
                                                    </svg>
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-chef-orange transition-colors" title="List View">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroklinecap="round" strokeinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="recipe-grid">
                                            {/* <!-- Recipe cards will be populated by JavaScript --> */}
                                             {favoriteRecipes.map((recipe, index) => (<div key={index}><RecipeCard recipe={recipe} isMyRecipe={false} /></div>))}
                                        </div>
                                    </div>

                                    <div id="reviews-content" className="tab-content hidden">
                                        <h2 className="text-2xl font-bold text-chef-orange mb-6">Recipe Reviews</h2>
                                        <div className="space-y-4">
                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-start space-x-4">
                                                    <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
                                                        className="w-12 h-12 rounded-full object-cover" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <h4 className="font-semibold">Sarah Johnson</h4>
                                                            <div className="flex text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                                                        </div>
                                                        <p className="text-gray-600 mb-2">"Amazing pasta recipe! The flavors were incredible and my family loved it."</p>
                                                        <p className="text-sm text-gray-500">On: Spicy Pasta Arrabbiata • 2 days ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="activity-content" className="tab-content hidden">
                                        <h2 className="text-2xl font-bold text-chef-orange mb-6">Activity Feed</h2>
                                        <div className="space-y-4">
                                            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="w-10 h-10 bg-chef-orange rounded-full flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium">Recipe "Spicy Pasta Arrabbiata" received a 5-star review</p>
                                                    <p className="text-sm text-gray-500">2 hours ago</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="collections-content" className="tab-content hidden">
                                        <h2 className="text-2xl font-bold text-chef-orange mb-6">Recipe Collections</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                <h3 className="font-semibold mb-2">🍝 Pasta Perfection</h3>
                                                <p className="text-sm text-gray-600 mb-2">12 recipes</p>
                                                <p className="text-xs text-gray-500">All my favorite pasta dishes</p>
                                            </div>
                                            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                <h3 className="font-semibold mb-2">🌶️ Spice It Up</h3>
                                                <p className="text-sm text-gray-600 mb-2">8 recipes</p>
                                                <p className="text-xs text-gray-500">For those who love heat</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- My Recipes Section --> */}
                            <div className="bg-white rounded-xl shadow-lg border border-chef-peach/30">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-chef-orange">My Recipes</h2>
                                        <button className="bg-chef-orange text-white px-4 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors">
                                            + Add Recipe
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="my-recipes-grid">
                                        {/* <!-- My recipe cards will be populated by JavaScript --> */}
                                        {myRecipes.map((recipe, index) => (<div key={index}><RecipeCard recipe={recipe} isMyRecipe={false} /></div>))}
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Recommended Section --> */}
                            <div className="bg-white rounded-xl shadow-lg mt-6 border border-chef-peach/30">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-2xl font-bold text-chef-orange">Recommended For You</h2>
                                    <p className="text-gray-600 mt-1">Based on your cooking preferences and activity</p>
                                </div>

                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" id="recommended-grid">
                                        {/* <!-- Recommended recipe cards will be populated by JavaScript --> */}
                                        {recommendedRecipes.map((recipe, index) => (<div key={index}><RecipeCard recipe={recipe} isMyRecipe={false} /></div>))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Action Buttons --> */}
                <div className="fixed bottom-6 left-6 flex flex-col space-y-3">
                    <button onClick={() => navigate("/editProfile")} className="bg-chef-orange text-white p-4 rounded-full shadow-lg hover:bg-chef-orange-dark transition-all hover:scale-110">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroklinecap="round" strokeinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button className="bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-all hover:scale-110">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroklinecap="round" strokeinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        </svg>
                    </button>
                    <button className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all hover:scale-110">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroklinecap="round" strokeinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                    </button>
                </div>

                {/* <!-- Notification Badge --> */}
                {/* <div className="fixed top-4 right-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                    3
                </div> */}
            </div>
        </>
    )
}

export default Profile