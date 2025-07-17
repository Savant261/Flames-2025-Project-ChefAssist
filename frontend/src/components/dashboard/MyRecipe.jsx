import React, { useState } from 'react'
import RecipeCard from '../RecipeCard.jsx';
import Alert from './Alert.jsx';

const MyRecipe = ({ sampleRecipes }) => {
    const alert = [{
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
                <h2 className="text-2xl font-bold text-chef-orange">My Recipes</h2>
                <button className="bg-chef-orange text-white px-4 py-2 rounded-lg hover:bg-chef-orange-dark transition-colors">
                    + Create Recipe
                    {/* todo */}
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
        </div>
    )
}

export default MyRecipe