import RecipeCarousel from "../components/RecipeCarousel.jsx";
import { useEffect } from "react";

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
    }
  ];

  const trendingRecipes = sampleRecipes.filter((r) => r.isTrending);
  const newRecipes = sampleRecipes.filter((r) => r.isNew);
  const quickDinners = sampleRecipes.filter((r) => r.difficulty === "Easy");
  const chefsPicks = sampleRecipes.filter((r) =>
    r.badges.includes("Chef's Pick")
  );
  const fromFollowing = sampleRecipes.slice(0, 5); // Placeholder
  useEffect(() => {
      document.title = 'Home / ChefAssit';
  }, []);
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
