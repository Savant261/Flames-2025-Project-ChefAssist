import RecipeCarousel from "../components/RecipeCarousel.jsx";
import { useEffect, useState } from "react";
import { recipeService } from "../api/recipeService.js";

const Explore = () => {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [newRecipes, setNewRecipes] = useState([]);
  const [quickDinners, setQuickDinners] = useState([]);
  const [chefsPicks, setChefsPicks] = useState([]);
  const [fromFollowing, setFromFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch different types of recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch different categories of recipes
        const [trending, newRecipesData, easyRecipes, chefsPicks, followingRecipes] = await Promise.all([
          recipeService.getExploreRecipes('trending', 12),
          recipeService.getExploreRecipes('new', 12),
          recipeService.getExploreRecipes('easy', 12),
          recipeService.getExploreRecipes('chefs-pick', 12),
          recipeService.getExploreRecipes('following', 12)
        ]);

        setTrendingRecipes(trending.recipes || []);
        setNewRecipes(newRecipesData.recipes || []);
        setQuickDinners(easyRecipes.recipes || []);
        setChefsPicks(chefsPicks.recipes || []);
        setFromFollowing(followingRecipes.recipes || []);

      } catch (err) {
        console.error('Error fetching explore recipes:', err);
        setError(err.message || 'Failed to load recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Set page title
  useEffect(() => {
    document.title = 'Explore / ChefAssit';
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-chef-orange)]"></div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[var(--color-chef-cream)] dark:bg-gray-900 min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[var(--color-chef-orange)] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

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
      difficulty: "Medium",
      author: {
        name: "Chef Maria",
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
        followers: 12500,
      },
      badges: ["Chef's Pick"],
      isNew: false,
      isTrending: false,
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
    {
      id: 9,
      title: 'Avocado Toast with Poached Eggs',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      badges: ['Healthy', 'Breakfast'],
      author: {
        name: 'Sophie Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
        followers: 15678
      },
      badges: ["Hot", "Trending"],
      isNew: false,
      isTrending: true,
      rating: 4.7,
      reviews: 203,
      views: 25678,
      cookTime: '15 min'
    },
    {
      id: 10,
      title: 'Red Wine Braised Salmon',
      image: 'https://www.deliciousliving.com/files/uploads/drupal/uploads/2012/08/salmonredwinehoney.png',
      badges: ['French', 'Dinner'],
      author: {
        name: 'Jean Dupont',
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
        followers: 8765
      },
      badges: ['New', 'Dinner'],
      isNew: true,
      isTrending: false,
      rating: 4.9,
      reviews: 156,
      views: 19876,
      cookTime: '3 hrs 30 min'
    },
    {
      id: 11,
      title: 'Vegan Buddha Bowl',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      author: {
        name: 'Emma Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
        followers: 23456
      },
      badges: ['New', 'Dinner'],
      isNew: true,
      isTrending: false,
      rating: 4.6,
      reviews: 187,
      views: 28765,
      cookTime: '20 min'
    },
    {
      id: 12,
      title: 'Mediterranean Quinoa Salad',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      author: {
        name: 'Nikos Papadopoulos',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        followers: 8765
      },
      badges: ['New', 'Salad'],
      isNew: true,
      isTrending: false,
      rating: 4.7,
      reviews: 32,
      views: 4567,
      cookTime: '20 min'
    },
    {
      id: 13,
      title: 'Mushroom Risotto',
      image: 'https://rainbowplantlife.com/wp-content/uploads/2020/01/vegan-mushroom-risotto-in-blue-bowl-with-spoon-and-glass-of-wine-in-background-1670x2048.jpg',
      author: {
        name: 'Giovanni Rossi',
        avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
        followers: 14567
      },
      badges: ['New', 'Dinner'],
      isNew: true,
      isTrending: false,
      rating: 4.8,
      reviews: 28,
      views: 3987,
      cookTime: '45 min'
    },
    {
      id: 14,
      title: 'Korean Bibimbap',
      image: 'https://i.pinimg.com/originals/be/d7/ff/bed7ff3d9a38da80a2061c11bb191918.jpg',
      author: {
        name: 'Min-ji Park',
        avatar: 'https://randomuser.me/api/portraits/women/37.jpg',
        followers: 19876
      },
      badges: ['New', 'Dinner'],
      isNew: true,
      isTrending: false,
      rating: 4.9,
      reviews: 45,
      views: 5678,
      cookTime: '35 min'
    },
    {
      id: 15,
      title: 'Hyderabadi Dum Biryani',
      image: 'https://www.whiskaffair.com/wp-content/uploads/2020/07/Chicken-Biryani-2-3.jpg',
      author: {
        name: 'Raj Patel',
        avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
        followers: 17654
      },
      badges: ["Chef's Pick"],
      isNew: true,
      isTrending: false,
      rating: 4.9,
      reviews: 56,
      views: 6789,
      cookTime: '50 min'
    },
    {
      id: 16,
      title: 'Greek Moussaka',
      image: 'https://www.196flavors.com/wp-content/uploads/2016/01/moussaka-4-FP.jpg',
      author: {
        name: 'Eleni Papadakis',
        avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
        followers: 12345
      },
      badges: ["Chef's Pick", "Greek"],
      isNew: true,
      isTrending: false,
      rating: 4.8,
      reviews: 38,
      views: 5123,
      cookTime: '1 hr 30 min'
    },
    {
      id: 17,
      title: 'Vietnamese Pho',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      author: {
        name: 'Minh Nguyen',
        avatar: 'https://randomuser.me/api/portraits/men/39.jpg',
        followers: 9876
      },
      badges: ["Chef's Pick", "Vietnamese"],
      isNew: false,
      isTrending: true,
      rating: 4.7,
      reviews: 156,
      views: 28765,
      cookTime: '15 min'
    },
    {
      id: 18,
      title: '15-Minute Garlic Shrimp Pasta',
      image: 'https://tse1.mm.bing.net/th/id/OIP.KNIEGCAXdfLzqCoWecAEpQHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      author: {
        name: 'Sophia Chen',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        followers: 23456
      },
      badges: ["Easy", "Pasta"],
      isNew: false,
      isTrending: false,
      rating: 4.7,
      difficulty: "Easy",
      reviews: 156,
      views: 28765,
      cookTime: '15 min'
    },
    {
      id: 19,
      title: 'One-Pan Lemon Garlic Chicken',
      image: 'https://tse4.mm.bing.net/th/id/OIP.GK_THP-LPUpgnluxbQZtJAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      author: {
        name: 'Michael Brown',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        followers: 18765
      },
      badges: ["Chef's Pick", "One-Pan"],
      isNew: false,
      isTrending: false,
      
      rating: 4.7,
      reviews: 156,
      views: 28765,
      cookTime: '15 min'
    },
    {
      id: 20,
      title: 'Veggie Stir-Fry',
      image: 'https://th.bing.com/th/id/OIP.5oTQEuMX1KUnErz29p6PGwHaJ4?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
      
      author: {
        name: 'Olivia Green',
        avatar: 'https://randomuser.me/api/portraits/women/39.jpg',
        followers: 21345
      },
      badges: ['Quick', 'Veggie'],
      isNew : false,
      isTrending: false,
      difficulty: "Easy",
      rating: 4.6,
      reviews: 143,
      views: 24567,
      cookTime: '20 min'
    },
    {
      id: 21,
      title: 'Caprese Stuffed Avocados',
      image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      
      author: {
        name: 'Luca Bianchi',
        avatar: 'https://randomuser.me/api/portraits/men/37.jpg',
        followers: 15678
      },
      badges: ['Quick', 'Vegetarian'],
      isNew: false,
      isTrending:false,
      difficulty: "Easy",
      rating: 4.5,
      reviews: 98,
      views: 19876,
      cookTime: '15 min'
    },
    {
      id: 22,
      title: 'Honey Garlic Salmon',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      
      author: {
        name: 'Emma Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
        followers: 22345
      },
      badges: ['Quick', 'Healthy'],
      isNew: false,
      isTrending: true,
      rating: 4.8,
      reviews: 176,
      views: 26789,
      cookTime: '20 min'
    },
    {
      id: 23,
      title: 'Beef and Broccoli Stir Fry',
      image: 'https://th.bing.com/th/id/OIP.b8K8CbpAS3aCZoRXkiYDnAHaJQ?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
      
      author: {
        name: 'David Kim',
        avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
        followers: 19876
      },
      badges: ['Trending', 'Asian'],
      isNew: false,
      isTrending: true,
      rating: 4.7,
      reviews: 165,
      views: 27890,
      cookTime: '25 min'
    },
  
    {
      id: 25,
      title: 'Truffle & Saffron Biryani',
      image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      cuisine: 'Royal Indian',
      author: {
        name: 'Vikram Singh',
        avatar: 'https://randomuser.me/api/portraits/men/66.jpg',
        followers: 31200
      },
      badges: ['Luxury', 'Gourmet'],
      isNew: true,
      isTrending: true,
      rating: 4.9,
      reviews: 289,
      views: 41200,
      cookTime: '1 hr 15 min',
      difficulty: 'Hard',
      description: 'An opulent take on the classic biryani with black truffle shavings and premium saffron'
    },
    {
      id: 26,
      title: 'Foie Gras Samosa with Gold Leaf',
      image: 'https://tse4.mm.bing.net/th/id/OIP.FQoAktiHgF9sgNiJ72HVbAHaE7?r=0&w=800&h=533&rs=1&pid=ImgDetMain&o=7&rm=3',
      cuisine: 'Fusion',
      author: {
        name: 'Aisha Kapoor',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        followers: 28700
      },
      badges: ["Gourmet","Chef's Pick"],
      isNew: true,
      isTrending: false,
      rating: 4.9,
      reviews: 312,
      views: 38900,
      cookTime: '45 min',
      difficulty: 'Hard',
      description: 'Deconstructed samosa with foie gras mousse, edible gold leaf, and truffle oil drizzle'
    },
    {
      id: 27,
      title: 'Wagyu Beef Vindaloo',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      cuisine: 'Indo-Japanese',
      author: {
        name: 'Kenji Tanaka',
        avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
        followers: 34200
      },
      badges: ['Luxury', 'Spicy'],
      isNew: true,
      isTrending: true,
      rating: 4.9,
      reviews: 298,
      views: 42500,
      cookTime: '2 hrs',
      difficulty: 'Medium',
      description: 'A5 Japanese Wagyu prepared with Goan vindaloo spices and aged vinegar'
    },
    {
      id: 28,
      title: 'Rogan Josh',
      image: 'https://hips.hearstapps.com/hmg-prod/images/rogan-josh-main-1572547756.jpg?crop=1.00xw:0.670xh;0,0.163xh&resize=1120:*',
      cuisine: 'Kashmiri',
      author: {
        name: 'Aarav Khan',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        followers: 19800
      },
      badges: ["Spicy","Chef's Pick"],
      isNew: true,
      isTrending: false,
      rating: 4.8,
      reviews: 234,
      views: 31200,
      cookTime: '1 hr 30 min',
      difficulty: 'Hard'
    },
    {
      id: 29,
      title: 'Truffle & Gold Leaf Kulfi',
      image: 'https://img.freepik.com/premium-photo/truffle-topped-with-gold-leaf-delicious-truffle-dishes-photography_1295756-80275.jpg',
      cuisine: 'Indian Dessert',
      author: {
        name: 'Zara Mehta',
        avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
        followers: 26700
      },
      badges: ['Dessert', 'Luxury'],
      isNew: true,
      isTrending: true,
      rating: 4.9,
      reviews: 321,
      views: 41200,
      cookTime: '6 hrs',
      difficulty: 'Medium',
      description: 'Creamy saffron and cardamom kulfi with white truffle honey and 24k gold leaf'
    },
    {
      id: 30,
      title: 'Spanish Seafood Paella',
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      cuisine: 'Spanish',
      author: {
        name: 'Carlos Mendez',
        avatar: 'https://randomuser.me/api/portraits/men/82.jpg',
        followers: 22300
      },
      badges: ['Special Occasion', 'Seafood'],
      isNew: true,
      isTrending: true,
      rating: 4.9,
      reviews: 312,
      views: 38900,
      cookTime: '1 hr 20 min',
      difficulty: 'Hard'
    }
    
  ];

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
