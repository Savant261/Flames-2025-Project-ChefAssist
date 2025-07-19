import React, { useState } from 'react'
import RecipeCard from '../RecipeCard.jsx';

const Overview = ({ sampleRecipes }) => {
    // inspriration box
    const [spinWheelRecipe, setSpinWheelRecipe] = useState(null);
    const [spin, setSpin] = useState(false);
    const spinWheel = () => {
        setSpin(true);
        setTimeout(() => {
            setSpinWheelRecipe(sampleRecipes[Math.floor(Math.random() * sampleRecipes.length)]);
            setSpin(false);
        }, 2000);
    }
    return (
        <div id="overview-section" className="dashboard-section">
            {/* Personalized Greeting */}
            <div className="bg-gradient-to-r from-[var(--color-chef-orange)] to-[var(--color-chef-orange-light)] rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Good evening, Priya!</h2>
                    <p className="text-white/90 text-lg mb-4">Ready to cook something amazing today?</p>
                    <div className="flex items-center space-x-6">
                        <div className="text-center"><div className="text-2xl font-bold">7</div><div className="text-sm text-white/80">Day Streak</div></div>
                        <div className="text-center"><div className="text-2xl font-bold">3</div><div className="text-sm text-white/80">Recipes This Week</div></div>
                        <div className="text-center"><div className="text-2xl font-bold">156</div><div className="text-sm text-white/80">Total Likes</div></div>
                    </div>
                </div>
            </div>

            {/* Recipe Inspiration Wheel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 mb-8">
                <h3 className="text-xl font-bold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-orange-light)] mb-4">Recipe Inspiration Wheel</h3>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                    <div className="relative">
                        <div className={`${spin ? "animate-spin" : ""} w-48 h-48 rounded-full border-8 border-[var(--color-chef-orange)] dark:border-[var(--color-chef-orange-dark)] relative overflow-hidden cursor-pointer`} onClick={() => spinWheel()}>
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-chef-orange)] to-[var(--color-chef-orange-light)]"></div>
                            <div className="absolute inset-4 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-2xl mb-2">🎲</div>
                                    <div className="font-bold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-orange-light)]">Spin Me!</div>
                                </div>
                            </div>
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-[var(--color-chef-orange-dark)]"></div>
                        </div>
                    </div>
                    <div className="flex-1">
                        {spinWheelRecipe && (
                            <div>
                                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-2">Your Inspiration:</h4>
                                <div className="bg-[var(--color-chef-cream)] dark:bg-gray-700/50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <img src={spinWheelRecipe.image} alt={spinWheelRecipe.title} className="w-16 h-16 rounded-lg object-cover" />
                                        <div className="flex-1">
                                            <h5 className="font-bold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-orange-light)]">{spinWheelRecipe.title}</h5>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{spinWheelRecipe.description}</p>
                                        </div>
                                    </div>
                                    <button className="mt-3 w-full bg-[var(--color-chef-orange)] text-white py-2 rounded-lg hover:bg-[var(--color-chef-orange-dark)] transition-colors">Cook This Recipe</button>
                                </div>
                            </div>
                        )}
                        {!spinWheelRecipe && (
                            <div className="text-gray-600 dark:text-gray-400">
                                <p className="mb-2">Feeling indecisive? Let the wheel choose your next culinary adventure!</p>
                                <p className="text-sm">Click the wheel to get a random recipe suggestion.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Recipes Cooked</p>
                            <p className="text-2xl font-bold text-[var(--color-chef-orange)]">47</p>
                        </div>
                        <div className="w-12 h-12 bg-[var(--color-chef-orange)]/10 dark:bg-orange-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-[var(--color-chef-orange)] dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
                            <p className="text-2xl font-bold text-[var(--color-chef-orange)]">4.8</p>
                        </div>
                        <div className="w-12 h-12 bg-[var(--color-chef-orange)]/10 dark:bg-orange-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-[var(--color-chef-orange)] dark:text-orange-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
                            <p className="text-2xl font-bold text-[var(--color-chef-orange)]">1.2K</p>
                        </div>
                        <div className="w-12 h-12 bg-[var(--color-chef-orange)]/10 dark:bg-orange-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-[var(--color-chef-orange)] dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personalized Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-orange-light)] mb-4">Recommended for You</h3>
                    <div className="space-y-4">
                        {sampleRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <h3 className="text-xl font-bold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-orange-light)] mb-4">Trending in Your Cuisine</h3>
                    <div className="space-y-4">
                        {sampleRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview