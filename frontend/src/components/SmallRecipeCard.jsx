import React from 'react'

const SmallRecipeCard = ({ recipe }) => {
    return (
        <>
            <div className="flex items-center space-x-4">
                <img src={recipe.image} alt="${recipe.title}" class="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                    <h5 className="font-bold text-chef-orange">{recipe.title}</h5>
                    <p className="text-sm text-gray-600">{recipe.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs bg-chef-orange text-white px-2 py-1 rounded">{recipe.cuisine}</span>
                        <span className="text-xs text-gray-500">{recipe.cookTime}</span>
                    </div>
                </div>
            </div>
            <button className="mt-3 w-full bg-chef-orange text-white py-2 rounded-lg hover:bg-chef-orange-dark transition-colors" onclick="viewRecipe(${recipe.id})">
                Cook This Recipe
            </button>
        </>
    )
}

export default SmallRecipeCard