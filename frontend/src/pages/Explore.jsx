import React from 'react'
import { useNavigate } from "react-router-dom"
import Filter from '../components/explore/Filter.jsx'
import RecipeOfTheDay from '../components/explore/RecipeOfTheDay.jsx'
import ChefPick from "../components/explore/ChefPick.jsx"

const Explore = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col bg-chef-cream min-h-screen">
            {/* <!-- Header --> */}
            <div className="bg-white shadow-sm border-b border-chef-peach/30 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between mb-4">
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
                            <div className="text-2xl font-bold text-chef-orange">Recipes</div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button id="viewToggle" className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-chef-orange transition-colors">
                                <svg id="gridIcon" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
                                </svg>
                                <svg id="listIcon" className="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                <span id="viewText">Grid</span>
                            </button>
                            <button className="bg-chef-orange text-white px-4 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors">
                                + Add Recipe
                            </button>
                        </div>
                    </div>

                    {/* <!-- Search Bar --> */}
                    <div className="relative mb-4">
                        <input type="text" id="mainSearch" placeholder="Search recipes, ingredients, or cuisines..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-chef-orange focus:border-transparent text-lg" />
                        <svg className="absolute left-4 top-3.5 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <div id="searchSuggestions" className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 hidden z-10"></div>
                    </div>

                    {/* <!-- Ingredient Search --> */}
                    <div className="relative mb-4">
                        <input type="text" id="ingredientSearch" placeholder="What can I cook with... (e.g., chicken, tomatoes)"
                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chef-orange focus:border-transparent" />
                        <svg className="absolute left-4 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* <!-- Filters Section --> */}
            <Filter/>

            {/* <!-- Main Content --> */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* <!-- Featured Section --> */}
                <div className="mb-12">
                    {/* <!-- Recipe of the Day --> */}
                    <RecipeOfTheDay />

                    {/* <!-- Chef's Pick --> */}
                    

                    {/* <!-- Seasonal Banner --> */}
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10 text-center">
                            <div className="mb-4">
                                <span className="text-6xl">🍂</span>
                                <span className="text-6xl">🎃</span>
                                <span className="text-6xl">🍁</span>
                            </div>
                            <h3 className="text-3xl font-bold mb-2">Autumn Comfort Foods</h3>
                            <p className="text-xl mb-6">Warm up with seasonal favorites and cozy recipes</p>
                            <button className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                Explore Autumn Recipes
                            </button>
                        </div>
                    </div>

                    {/* <!-- Trending Now Section --> */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-chef-orange mb-6 text-center">Trending Now</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6" id="trendingGrid">
                            {/* <!-- Trending recipe cards will be populated here --> */}
                        </div>
                    </div>
                </div>

                {/* <!-- Personalized Sections --> */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* <!-- Recommended for You --> */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                        <h3 className="text-xl font-bold text-chef-orange mb-4">Recommended for You</h3>
                        <div className="space-y-4" id="recommendedGrid">
                            {/* <!-- Recommended recipes will be populated here --> */}
                        </div>
                    </div>

                    {/* <!-- Recently Viewed --> */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                        <h3 className="text-xl font-bold text-chef-orange mb-4">Recently Viewed</h3>
                        <div className="space-y-4" id="recentlyViewedGrid">
                            {/* <!-- Recently viewed recipes will be populated here --> */}
                        </div>
                    </div>

                    {/* <!-- Top Rated by Chefs --> */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                        <h3 className="text-xl font-bold text-chef-orange mb-4">Top Rated by Chefs</h3>
                        <div className="space-y-4" id="topRatedGrid">
                            {/* <!-- Top rated recipes will be populated here --> */}
                        </div>
                    </div>


                </div>

                {/* <!-- Main Recipe Grid --> */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-chef-peach/30">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-chef-orange">All Recipes</h2>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span id="recipeCount">Showing 1-12 of 1,247 recipes</span>
                        </div>
                    </div>

                    {/* <!-- Loading Skeleton --> */}
                    <div id="loadingSkeleton" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 hidden">
                        {/* <!-- Loading skeletons will be generated here --> */}
                    </div>

                    {/* <!-- Recipe Grid --> */}
                    <div id="recipeGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* <!-- Recipe cards will be populated here --> */}
                    </div>

                    {/* <!-- Recipe List View --> */}
                    <div id="recipeList" className="space-y-4 hidden">
                        {/* <!-- Recipe list items will be populated here --> */}
                    </div>

                    {/* <!-- Pagination --> */}
                    <div className="flex items-center justify-center mt-8">
                        <div className="flex items-center space-x-2">
                            <button id="prevPage" className="px-4 py-2 border border-gray-300 rounded-lg hover:border-chef-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <div id="pageNumbers" className="flex items-center space-x-1">
                                {/* <!-- Page numbers will be generated here --> */}
                            </div>
                            <button id="nextPage" className="px-4 py-2 border border-gray-300 rounded-lg hover:border-chef-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Quick View Modal --> */}
            <div id="quickViewModal" className="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-chef-orange">Recipe Preview</h3>
                            <button id="closeQuickView" className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div id="quickViewContent">
                            {/* <!-- Quick view content will be populated here --> */}
                        </div>
                    </div>
                </div>
            </div>


            {/* <!-- Floating Action Buttons --> */}
            <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
                <button id="submitRecipeBtn" className="bg-chef-orange text-white p-4 rounded-full shadow-lg hover:bg-chef-orange-dark transition-all hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                <button id="scrollToTop" className="bg-gray-600 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-all hover:scale-110 opacity-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Explore