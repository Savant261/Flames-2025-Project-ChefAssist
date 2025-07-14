import React from 'react'

const ChefPick = () => {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-chef-peach/30">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-chef-orange rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-chef-orange">Chef's Pick</h3>
                        <p className="text-gray-600">Handpicked by our culinary experts</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <img src={"https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500"}
                            alt="Creamy Garlic Parmesan Pasta"
                            className="w-full h-64 rounded-xl object-cover" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-3">Creamy Garlic Parmesan Pasta</h4>
                        <div className="flex items-center space-x-4 mb-4">
                            <img src={"https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"}
                                alt="Chef Maria"
                                className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <p className="font-semibold">Chef Maria Rodriguez</p>
                                <p className="text-sm text-gray-600">Italian Cuisine Expert</p>
                            </div>
                        </div>
                        <blockquote className="text-gray-700 italic mb-4 border-l-4 border-chef-orange pl-4">
                            "This recipe brings back memories of my grandmother's kitchen in Tuscany. The secret is in the timing - never rush the garlic!"
                        </blockquote>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                                <span className="text-sm text-gray-600">4.9 (156 reviews)</span>
                            </div>
                            <button className="text-chef-orange hover:text-chef-orange-dark font-semibold">
                                Meet the Chef →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChefPick