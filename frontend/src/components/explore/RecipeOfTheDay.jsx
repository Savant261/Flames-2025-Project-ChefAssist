import React from 'react'

const RecipeOfTheDay = () => {
    return (
        <>
            <div className="bg-gradient-to-r from-chef-orange to-chef-orange-light rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex-1 mb-6 md:mb-0">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Recipe of the Day</span>
                                <div id="countdown" className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                    New recipe in: <span id="countdownTimer">13h 21m</span>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Spicy Thai Basil Chicken</h2>
                            <p className="text-white/90 mb-4">Authentic Thai street food with aromatic basil and chilies. Quick, flavorful, and absolutely delicious!</p>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center space-x-1">
                                    <span className="text-yellow-300">⭐⭐⭐⭐⭐</span>
                                    <span>4.8 (234 reviews)</span>
                                </div>
                                <span>⏱️ 25 min</span>
                                <span>👨‍🍳 Medium</span>
                            </div>
                            <p className="text-sm text-white/80 mb-4">🔥 Cooked by 1,245 users today</p>
                            <button className="bg-white text-chef-orange px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                Cook This Recipe
                            </button>
                        </div>
                        <div className="relative">
                            <img src="https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400"
                                alt="Thai Basil Chicken"
                                className="w-64 h-64 rounded-xl object-cover shadow-2xl" />
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                                HOT
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecipeOfTheDay