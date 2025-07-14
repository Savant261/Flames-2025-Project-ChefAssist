import React from 'react'

const Filter = () => {
    return (
        <>
            <div className="bg-white border-b border-chef-peach/30 sticky top-[120px] z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* <!-- Cuisine Filter --> */}
                        <div className="relative">
                            <button id="cuisineFilter" className="filter-button flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-chef-orange transition-colors">
                                <span>Cuisine</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div id="cuisineDropdown" className="filter-dropdown hidden absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-10">
                                <div className="grid grid-cols-2 gap-2">
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="italian" className="cuisine-checkbox" />
                                        <span>🍝 Italian</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="indian" className="cuisine-checkbox" />
                                        <span>🍛 Indian</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="chinese" className="cuisine-checkbox" />
                                        <span>🥢 Chinese</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="mexican" className="cuisine-checkbox" />
                                        <span>🌮 Mexican</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="thai" className="cuisine-checkbox" />
                                        <span>🌶️ Thai</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="japanese" className="cuisine-checkbox" />
                                        <span>🍣 Japanese</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="mediterranean" className="cuisine-checkbox" />
                                        <span>🫒 Mediterranean</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="american" className="cuisine-checkbox" />
                                        <span>🍔 American</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Dietary Filter --> */}
                        <div className="relative">
                            <button id="dietaryFilter" className="filter-button flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-chef-orange transition-colors">
                                <span>Dietary</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div id="dietaryDropdown" className="filter-dropdown hidden absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-56 z-10">
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="vegetarian" className="dietary-checkbox" />
                                        <span>🥬 Vegetarian</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="vegan" className="dietary-checkbox" />
                                        <span>🌱 Vegan</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="gluten-free" className="dietary-checkbox" />
                                        <span>🌾 Gluten-Free</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="dairy-free" className="dietary-checkbox" />
                                        <span>🥛 Dairy-Free</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="keto" className="dietary-checkbox" />
                                        <span>🥑 Keto</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <button id="difficultyFilter" className="filter-button flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-chef-orange transition-colors">
                                <span>Difficulty</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div id="difficultyDropdown" className="filter-dropdown hidden absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-48 z-10">
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="easy" className="difficulty-checkbox" />
                                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                        <span>Easy</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="medium" className="difficulty-checkbox" />
                                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                                        <span>Medium</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="hard" className="difficulty-checkbox" />
                                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                        <span>Hard</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <button id="timeFilter" className="filter-button flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-chef-orange transition-colors">
                                <span>Time</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div id="timeDropdown" className="filter-dropdown hidden absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-48 z-10">
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="under-30" className="time-checkbox" />
                                        <span>⚡ Under 30 min</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="30-60" className="time-checkbox" />
                                        <span>⏰ 30-60 min</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-chef-cream p-2 rounded">
                                        <input type="checkbox" value="over-60" className="time-checkbox" />
                                        <span>🕐 Over 60 min</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Sort By --> */}
                        <select id="sortBy" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent">
                            <option value="popularity">Most Popular</option>
                            <option value="rating">Highest Rated</option>
                            <option value="newest">Newest</option>
                            <option value="time">Quickest</option>
                            <option value="alphabetical">A-Z</option>
                        </select>

                        {/* <!-- Clear Filters --> */}
                        <button id="clearFilters" className="px-4 py-2 text-chef-orange hover:bg-chef-cream rounded-lg transition-colors">
                            Clear All
                        </button>
                    </div>

                    {/* <!-- Active Filters --> */}
                    <div id="activeFilters" className=" flex flex-wrap gap-2 mt-3">
                        {/* <!-- Active filter chips will be added here --> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter