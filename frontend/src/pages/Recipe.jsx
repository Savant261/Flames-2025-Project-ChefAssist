import React, { useState ,useEffect} from 'react'

const Recipe = () => {
  const [showComments, setShowComments] = useState(false)
  useEffect(() => {
    document.title = 'Recipe / ChefAssist';
  }, []);
  return (
    <div className="min-h-screen bg-[var(--color-chef-cream)] flex flex-col">
      {/* Main content excluding navbar/footer */}
      <div className="flex flex-1 overflow-hidden">

        {/* RECIPE CONTENT */}
        <div
          className={`transition-all duration-300 ease-in-out w-full max-w-3xl mx-auto px-4 py-6 ${showComments ? "md:mr-[400px]" : ""
            }`}
        >
          {/* Recipe Card */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative">

            {/* Image with buttons */}
            <div className="relative">
              <img
                src="https://source.unsplash.com/800x400/?omelette"
                alt="Omelette Dish"
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-white text-[var(--color-chef-orange-dark)] border border-[var(--color-chef-orange-light)] px-3 py-1 rounded-full shadow-sm hover:bg-[var(--color-chef-peach)] transition text-sm">
                  💾 Save
                </button>
                <button className="bg-[var(--color-chef-orange)] text-white px-3 py-1 rounded-full shadow-sm hover:bg-[var(--color-chef-orange-dark)] transition text-sm">
                  🤖 Adapt with AI
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-[var(--color-chef-orange-dark)]">Simple Omelette Recipe</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    by <span className="font-medium text-[var(--color-chef-orange)]">Kaushiki Mishra</span> &bull; 1.2k followers &bull; 3.4k views
                  </p>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <button className="px-3 py-1.5 bg-[var(--color-chef-peach)] text-[var(--color-chef-orange-dark)] rounded-full hover:bg-[var(--color-chef-orange-light)] transition">
                    ❤️ Like
                  </button>
                  <button
                    onClick={() => setShowComments(true)}
                    className="px-3 py-1.5 border border-[var(--color-chef-orange-light)] text-[var(--color-chef-orange-dark)] rounded-full hover:bg-[var(--color-chef-peach)] transition"
                  >
                    💬 Comment
                  </button>
                </div>
              </div>

              <p className="text-gray-700">
                A quick and easy omelette recipe—perfect for any time of the day!
              </p>

              <div className="bg-[var(--color-chef-peach)] p-4 rounded-lg text-sm">
                <p><strong>Total Time:</strong> ~10 mins</p>
                <p><strong>Prep:</strong> 5 mins &nbsp;|&nbsp; <strong>Cook:</strong> 5 mins</p>
              </div>

              {/* Ingredients */}
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-chef-orange)] mb-2">Ingredients</h2>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>2-3 large eggs</li>
                  <li>Salt, to taste</li>
                  <li>Pepper, to taste</li>
                  <li>1 tbsp butter or oil</li>
                  <li>Optional: veggies, cheese, cooked meats</li>
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-chef-orange)] mb-2">Instructions</h2>
                <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                  <li>Beat the eggs with salt and pepper until fluffy.</li>
                  <li>Heat the pan and add butter or oil.</li>
                  <li>Pour eggs, cook evenly, tilt the pan.</li>
                  <li>Add fillings midway through cooking.</li>
                  <li>Fold the omelette, cook for 1 min more.</li>
                  <li>Serve hot with toast or salad!</li>
                </ol>
              </div>

              {/* Nutrition */}
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-chef-orange)] mb-2">Nutrition</h2>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <p><strong>Calories:</strong> 277 kcal</p>
                  <p><strong>Carbs:</strong> 0g</p>
                  <p><strong>Protein:</strong> 20g</p>
                  <p><strong>Fat:</strong> 22g</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COMMENT PANEL (Instagram Reels style) */}
        <div
          className={`rounded-xl fixed top-[97px] bottom-[56px] right-2 w-full md:w-[400px] bg-white shadow-lg border-l transition-transform duration-300 ease-in-out z-40 ${showComments ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold text-[var(--color-chef-orange-dark)]">Comments</h3>
            <button
              onClick={() => setShowComments(false)}
              className="text-gray-500 hover:text-[var(--color-chef-orange)] text-xl"
            >
              ✖
            </button>
          </div>
          <div className="p-4 space-y-4 max-h-[calc(100%-110px)] overflow-y-auto">
            <div className="border-b pb-2 text-sm"><strong>user123:</strong> This turned out amazing! 🍳</div>
            <div className="border-b pb-2 text-sm"><strong>foodieFan:</strong> Added mushrooms. Loved it!</div>
            <div className="border-b pb-2 text-sm"><strong>chefLover:</strong> Easy and quick. Will repeat!</div>
          </div>
          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-chef-orange-light)]"
            />
            <button className="bg-[var(--color-chef-orange)] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[var(--color-chef-orange-dark)] transition">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};





export default Recipe