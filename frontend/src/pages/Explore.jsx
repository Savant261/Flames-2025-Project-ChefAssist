import RecipeCarousel from "../components/RecipeCarousel.jsx";

const Explore = () => {
  const sampleRecipes = [
    {
      id: 1,
      title: "Creamy Garlic Parmesan Pasta",
      image:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Italian",
      rating: 4.8,
      reviews: 124,
      cookTime: "25 min",
      difficulty: "Easy",
      author: {
        name: "Chef Maria",
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
        followers: 12500,
      },
      badges: ["Chef's Pick"],
      isNew: false,
      isTrending: true,
      views: 2340,
    },
    {
      id: 2,
      title: "Spicy Thai Basil Stir Fry",
      image:
        "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Thai",
      rating: 4.6,
      reviews: 89,
      cookTime: "15 min",
      difficulty: "Medium",
      author: {
        name: "Chef Somchai",
        avatar:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
        followers: 8200,
      },
      badges: ["Hot", "Trending"],
      isNew: false,
      isTrending: true,
      views: 1890,
    },
    {
      id: 3,
      title: "Classic Margherita Pizza",
      image:
        "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Italian",
      rating: 4.9,
      reviews: 203,
      cookTime: "45 min",
      difficulty: "Medium",
      author: {
        name: "Chef Giuseppe",
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
        followers: 22000,
      },
      badges: ["Chef's Pick"],
      isNew: false,
      isTrending: false,
      views: 3210,
    },
    {
      id: 4,
      title: "Butter Chicken Curry",
      image:
        "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "Indian",
      rating: 4.7,
      reviews: 167,
      cookTime: "40 min",
      difficulty: "Medium",
      author: {
        name: "Chef Priya",
        avatar:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
        followers: 15000,
      },
      badges: ["New"],
      isNew: true,
      isTrending: false,
      views: 2780,
    },
    {
      id: 5,
      title: "Avocado Toast Supreme",
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "American",
      rating: 4.4,
      reviews: 78,
      cookTime: "10 min",
      difficulty: "Easy",
      author: {
        name: "Chef Sarah",
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
        followers: 5600,
      },
      badges: ["Vegetarian"],
      isNew: false,
      isTrending: false,
      views: 1450,
    },
    {
      id: 8,
      title: "Chocolate Lava Cake",
      image:
        "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
      cuisine: "French",
      rating: 4.8,
      reviews: 156,
      cookTime: "25 min",
      difficulty: "Hard",
      author: {
        name: "Chef Pierre",
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
        followers: 18000,
      },
      badges: ["Chef's Pick"],
      isNew: false,
      isTrending: true,
      views: 2340,
    },
  ];

  const trendingRecipes = sampleRecipes.filter((r) => r.isTrending);
  const newRecipes = sampleRecipes.filter((r) => r.isNew);
  const quickDinners = sampleRecipes.filter((r) => r.difficulty === "Easy");
  const chefsPicks = sampleRecipes.filter((r) =>
    r.badges.includes("Chef's Pick")
  );
  const fromFollowing = sampleRecipes.slice(0, 5); // Placeholder

  return (
    <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen">
        {/* <Filter/> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RecipeCarousel
          title="🔥 Trending This Week"
          recipes={trendingRecipes}
        />
        <RecipeCarousel title="✨ Newest Recipes" recipes={newRecipes} />
        <RecipeCarousel
          title="🍲 Quick & Easy Dinners"
          recipes={quickDinners}
        />
        <RecipeCarousel
          title="⭐ From Chefs You Follow"
          recipes={fromFollowing}
        />
        <RecipeCarousel title="🏆 Chef's Picks" recipes={chefsPicks} />
      </main>
    </div>
  );
};

export default Explore;
