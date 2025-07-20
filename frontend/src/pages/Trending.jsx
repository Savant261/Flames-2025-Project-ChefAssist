import {useEffect, useState} from 'react'

const Trending = () => {
  useEffect(() => {
    document.title = 'Trending / ChefAssist';
  }, []);

  
  const allRecipes= [
    {
      id: 1,
      title: "Paneer Butter Masala",
      description: "Rich, creamy North Indian curry perfect with naan.",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_JfZHtD_jlggLqhDlthd7Jg2o4gt7OrWH7w&s",
      author: "Chef Ananya",
      views: 18700,
      likes: 1400,
      posted: "1 day ago",
      category: "Trending Today",
    },
    {
      id: 2,
      title: "Classic Avocado Toast",
      description: "Healthy breakfast with fresh avocado and seeds.",
      thumbnail: "https://lovingitvegan.com/wp-content/uploads/2015/11/Avocado-Toast-16.jpg",
      author: "Chef Rahul",
      views: 22100,
      likes: 2300,
      posted: "2 days ago",
      category: "Trending This Week",
    },
    {
      id: 3,
      title: "Chocolate Lava Cake",
      description: "Soft and gooey chocolate dessert to die for.",
      thumbnail: "https://daddysbakery.in/wp-content/uploads/2019/01/Choco-Lava-Cake.jpg",
      author: "Chef Meera",
      views: 30400,
      likes: 3800,
      posted: "4 days ago",
      category: "Trending This Week",
    },
    {
      id: 4,
      title: "Mediterranean Bowl",
      description: "A hearty mix of falafel, hummus, and fresh veggies.",
      thumbnail: "https://simpleveganizer.com/wp-content/uploads/2024/05/Vegan-Mediterranean-Bowls-horizontal.jpg",
      author: "Chef Aarav",
      views: 15200,
      likes: 1100,
      posted: "3 days ago",
      category: "Trending This Month",
    },
    {
      id: 5,
      title: "Stuffed Bell Peppers",
      description: "Colorful, nutritious, and packed with flavor.",
      thumbnail: "https://www.allrecipes.com/thmb/eBsB2933MCuNVCim4O-AyCR97YE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/79805-StuffedPeppersWithturkeyAndVegtables-MFS-2x3-0048-444ecb49b0184daab29e5326e4330af3.jpg",
      author: "Chef Isha",
      views: 12900,
      likes: 980,
      posted: "5 days ago",
      category: "All-Time Favorites",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("Trending Today");

  const filteredRecipes =
    activeCategory === "All-Time Favorites"
      ? allRecipes
      : allRecipes.filter((r) => r.category === activeCategory);

  return (
    <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen px-6 py-10">
      <h2 className="text-3xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-peach)] mb-6">
        🔥 Trending Recipes on ChefAssist
      </h2>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {[
          "Trending Today",
          "Trending This Week",
          "Trending This Month",
          "All-Time Favorites",
        ].map((label, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(label)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              activeCategory === label
                ? "bg-[var(--color-chef-orange-dark)] text-white"
                : "bg-[var(--color-chef-orange-light)] text-white hover:bg-[var(--color-chef-orange-dark)]"
            } dark:bg-[var(--color-chef-orange-dark)] dark:hover:bg-[var(--color-chef-orange-light)]`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Recipe Cards */}
      <div className="space-y-6">
        {filteredRecipes.map((recipe, index) => (
          <div
            key={recipe.id}
            className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden h-48"
          >
            {/* Trending Number */}
            <div className="bg-[var(--color-chef-peach)] dark:bg-[var(--color-chef-orange-dark)] w-12 h-full flex items-center justify-center text-xl font-bold text-[var(--color-chef-orange-dark)] dark:text-white">
              {index + 1}
            </div>

            {/* Thumbnail */}
            <img
              src={recipe.thumbnail}
              alt={recipe.title}
              className="w-48 h-full object-cover"
            />

            {/* Content */}
            <div className="p-4 flex flex-col justify-between flex-1 h-full">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-[var(--color-chef-orange)] dark:text-[var(--color-chef-peach)]">
                  {recipe.title}
                </h3>
                <span className="text-sm bg-[var(--color-chef-orange-light)] text-white px-2 py-1 rounded-full dark:bg-[var(--color-chef-orange-dark)]">
                  #{index + 1}
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                {recipe.description}
              </p>

              <div className="mt-2 flex flex-wrap text-xs text-gray-500 dark:text-gray-400 gap-4">
                <span>👨‍🍳 {recipe.author}</span>
                <span>👁️ {recipe.views.toLocaleString()} views</span>
                <span>❤️ {recipe.likes.toLocaleString()} likes</span>
                <span>🕒 {recipe.posted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

    



export default Trending;