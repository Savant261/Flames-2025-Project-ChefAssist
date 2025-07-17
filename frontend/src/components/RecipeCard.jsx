import React from 'react'
import { useNavigate } from 'react-router-dom';



const RecipeCard = ({ recipe, isMyRecipe = false }) =>  {
    const navigate = useNavigate();
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '⭐';
        }
        if (hasHalfStar) {
            stars += '⭐';
        }

        return stars;
    }

    const publishInfo = isMyRecipe
        ? `<div className="flex items-center justify-between text-xs text-gray-500 mt-2">
             <span>Views: ${recipe.views.toLocaleString()}</span>
             <span>Saves: ${recipe.saves}</span>
           </div>`
        : '';

    return (
        <div className="recipe-card bg-white rounded-xl shadow-lg overflow-hidden border border-chef-peach/20 hover-lift card-hover group" >
            <div className="relative overflow-hidden">
               {recipe.status &&  (<span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">{recipe.status.toUpperCase()}</span>)}
                <img src={`${recipe.image}`} alt="${recipe.title}"
                    className="recipe-image w-full h-48 object-cover" />
                {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div> */}
                <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>
                <div className="absolute bottom-2 left-2 flex space-x-1">
                    <span className="cuisine-tag px-2 py-1 text-xs font-medium text-chef-orange-dark rounded-full">
                        {recipe.cuisine}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium text-white rounded-full ${getDifficultyColor(recipe.difficulty)}">
                        {recipe.difficulty}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-chef-orange transition-colors">
                    {recipe.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                        <span className="rating-stars text-yellow-400 text-sm">{generateStars(recipe.rating)}</span>
                        <span className="text-sm text-gray-600">{recipe.rating}</span>
                        <span className="text-sm text-gray-400">({recipe.reviews})</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {recipe.cookTime}
                    </div>
                </div>

                {publishInfo}

                <div className="flex space-x-2 mt-3">
                    <button className="flex-1 bg-chef-orange text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-chef-orange-dark transition-colors" onClick={() => navigate("/recipe")}>
                        {isMyRecipe ? 'Edit' : 'View Recipe'}
                    </button>


                    <button className="p-2 border border-gray-300 rounded-lg hover:border-chef-orange hover:text-chef-orange transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>)
}

export default RecipeCard;