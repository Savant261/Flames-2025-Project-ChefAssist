import React, { useState } from 'react'
import RecipeCard from '../RecipeCard.jsx';
import Alert from './Alert.jsx';

const MyRecipe = ({ sampleRecipes }) => {
    const alerts = [{
        title: `New Review on "Creamy Garlic Parmesan Pasta`,
        description: `Sarah Johnson left a 5-star review: "Amazing recipe! My family loved it."`,
        time: "2 hours ago",
    }, {
        title: "Recipe Update Needed",
        description: "Your \"Spicy Thai Basil Stir Fry\" recipe has received feedback about cooking time. Consider updating.",
        time: "1 day ago",
    }]
    const [myRecipeNav, setMyRecipeNav] = useState("published");
    const published = sampleRecipes.filter((recipe) => recipe.status === "published")
    const draft = sampleRecipes.filter((recipe) => recipe.status === "draft")
   return (
        <div id="my-recipes-section" className="dashboard-section">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-orange-light)]">My Recipes</h2>
                <button className="bg-[var(--color-chef-orange)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-chef-orange-dark)] transition-colors">+ Create Recipe</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50"><div className="text-2xl font-bold text-[var(--color-chef-orange)]">24</div><div className="text-sm text-gray-600 dark:text-gray-400">Published</div></div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50"><div className="text-2xl font-bold text-yellow-500">3</div><div className="text-sm text-gray-600 dark:text-gray-400">Drafts</div></div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50"><div className="text-2xl font-bold text-green-500">156</div><div className="text-sm text-gray-600 dark:text-gray-400">Total Likes</div></div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50"><div className="text-2xl font-bold text-blue-500">2.3K</div><div className="text-sm text-gray-600 dark:text-gray-400">Views</div></div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-8">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-8 px-6">
                        <button onClick={() => setMyRecipeNav("published")} className={`py-4 px-2 border-b-2 font-medium ${myRecipeNav === 'published' ? 'border-[var(--color-chef-orange)] text-[var(--color-chef-orange)]' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-[var(--color-chef-orange)]'}`}>Published ({published.length})</button>
                        <button onClick={() => setMyRecipeNav("draft")} className={`py-4 px-2 border-b-2 font-medium ${myRecipeNav === 'draft' ? 'border-[var(--color-chef-orange)] text-[var(--color-chef-orange)]' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-[var(--color-chef-orange)]'}`}>Drafts ({draft.length})</button>
                        <button onClick={() => setMyRecipeNav("alert")} className={`py-4 px-2 border-b-2 font-medium ${myRecipeNav === 'alert' ? 'border-[var(--color-chef-orange)] text-[var(--color-chef-orange)]' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-[var(--color-chef-orange)]'}`}>Alerts ({alerts.length})</button>
                    </nav>
                </div>
                <div className="p-6">
                    {myRecipeNav === "published" && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{published.map(r => <RecipeCard key={r.id} recipe={r} />)}</div>}
                    {myRecipeNav === "draft" && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{draft.map(r => <RecipeCard key={r.id} recipe={r} />)}</div>}
                    {myRecipeNav === "alert" && <div className="space-y-4">{alerts.map((alt, i) => <Alert key={i} alert={alt} />)}</div>}
                </div>
            </div>
        </div>
    );
};

export default MyRecipe