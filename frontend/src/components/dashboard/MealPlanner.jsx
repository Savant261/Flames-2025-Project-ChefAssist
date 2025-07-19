import React from "react";

const MealPlanner = () => {
  const mealPlan = {
    "2024-12-09": [
      {
        name: "Pasta Night",
        type: "dinner",
        recipe: "Creamy Garlic Parmesan Pasta",
      },
    ],
    "2024-12-10": [
      { name: "Stir Fry", type: "dinner", recipe: "Spicy Thai Basil Stir Fry" },
    ],
    "2024-12-11": [
      {
        name: "Healthy Bowl",
        type: "lunch",
        recipe: "Mediterranean Quinoa Bowl",
      },
    ],
  };
  return (
    <div id="meal-planner-section" className="dashboard-section">
      <h2 className="text-2xl font-bold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-orange-light)] mb-6">
        Meal Planner
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 mb-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          This Week's Menu
        </h3>
        <div className="text-center text-gray-500 dark:text-gray-400 p-8">
          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:text-chef-orange transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="px-4 py-2 text-gray-700 font-medium">
              Dec 9-15, 2024
            </span>
            <button className="p-2 text-gray-600 hover:text-chef-orange transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-xl font-bold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-orange-light)] mb-4">
            Quick Add Meals
          </h3>
          <div className="text-center text-gray-500 dark:text-gray-400 p-8">
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-chef-orange transition-colors">
                🍝 Pasta Night
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-chef-orange transition-colors">
                🌮 Taco Tuesday
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-chef-orange transition-colors">
                🍛 Curry Night
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-chef-orange transition-colors">
                🥗 Healthy Bowl
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-xl font-bold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-orange-light)] mb-4">
            Shopping List
          </h3>
          <div className="text-center text-gray-500 dark:text-gray-400 p-8">
            <div className="space-y-2" id="shoppingList">
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="text-chef-orange" />
                <span className="text-gray-700">Tomatoes (3 lbs)</span>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="text-chef-orange" />
                <span className="text-gray-700">Pasta (2 boxes)</span>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="text-chef-orange" />
                <span className="text-gray-700 line-through">
                  Garlic (1 bulb)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
