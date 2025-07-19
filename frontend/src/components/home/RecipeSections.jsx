import React from 'react';
import RecipeCard2 from '../RecipeCard2';

// Sample recipe data
const trendingRecipes = [
  {
    id: 1,
    title: 'Creamy Garlic Pasta',
    image: 'https://images.unsplash.com/photo-1645112411348-404c94d2ebef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['Trending', 'Italian'],
    author: {
      name: 'Maria Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      followers: 12453
    },
    rating: 4.8,
    reviews: 124,
    views: 12456,
    cookTime: '25 min'
  },
  {
    id: 2,
    title: 'Spicy Thai Basil Chicken',
    image: 'https://images.unsplash.com/photo-1630016665408-ca383a97f433?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['Spicy', 'Asian'],
    author: {
      name: 'Wei Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      followers: 9876
    },
    rating: 4.9,
    reviews: 98,
    views: 18765,
    cookTime: '20 min'
  },
  {
    id: 3,
    title: 'Avocado Toast with Poached Eggs',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['Healthy', 'Breakfast'],
    author: {
      name: 'Sophie Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      followers: 15678
    },
    rating: 4.7,
    reviews: 203,
    views: 25678,
    cookTime: '15 min'
  },
  {
    id: 4,
    title: 'Beef Bourguignon',
    image: 'https://images.unsplash.com/photo-1600891964094-94c0c4217aeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['French', 'Dinner'],
    author: {
      name: 'Jean Dupont',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      followers: 8765
    },
    rating: 4.9,
    reviews: 156,
    views: 19876,
    cookTime: '3 hrs 30 min'
  },
  {
    id: 5,
    title: 'Vegan Buddha Bowl',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['Vegan', 'Healthy'],
    author: {
      name: 'Emma Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      followers: 23456
    },
    rating: 4.6,
    reviews: 187,
    views: 28765,
    cookTime: '20 min'
  },
  {
    id: 6,
    title: 'Chocolate Lava Cake',
    image: 'https://images.unsplash.com/photo-1571115173808-985e9e21c5f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['Dessert', 'Chocolate'],
    author: {
      name: 'Lucas Martin',
      avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
      followers: 14567
    },
    rating: 4.9,
    reviews: 234,
    views: 34567,
    cookTime: '30 min'
  }
];

const newestRecipes = [
  {
    id: 7,
    title: 'Mediterranean Quinoa Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['New', 'Salad'],
    author: {
      name: 'Nikos Papadopoulos',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      followers: 8765
    },
    rating: 4.7,
    reviews: 32,
    views: 4567,
    cookTime: '20 min'
  },
  {
    id: 8,
    title: 'Mushroom Risotto',
    image: 'https://images.unsplash.com/photo-1579924109553-7e42f192bae5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['New', 'Italian'],
    author: {
      name: 'Giovanni Rossi',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      followers: 14567
    },
    rating: 4.8,
    reviews: 28,
    views: 3987,
    cookTime: '45 min'
  },
  {
    id: 9,
    title: 'Korean Bibimbap',
    image: 'https://images.unsplash.com/photo-1526318896982-ef2dd9a044e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['New', 'Korean'],
    author: {
      name: 'Min-ji Park',
      avatar: 'https://randomuser.me/api/portraits/women/37.jpg',
      followers: 19876
    },
    rating: 4.9,
    reviews: 45,
    views: 5678,
    cookTime: '35 min'
  },
  {
    id: 10,
    title: 'Butter Chicken',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['New', 'Indian'],
    author: {
      name: 'Raj Patel',
      avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
      followers: 17654
    },
    rating: 4.9,
    reviews: 56,
    views: 6789,
    cookTime: '50 min'
  },
  {
    id: 11,
    title: 'Greek Moussaka',
    image: 'https://images.unsplash.com/photo-1631050471710-1d8f8c3a3b2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['New', 'Greek'],
    author: {
      name: 'Eleni Papadakis',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
      followers: 12345
    },
    rating: 4.8,
    reviews: 38,
    views: 5123,
    cookTime: '1 hr 30 min'
  },
  {
    id: 12,
    title: 'Vietnamese Pho',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['New', 'Vietnamese'],
    author: {
      name: 'Minh Nguyen',
      avatar: 'https://randomuser.me/api/portraits/men/39.jpg',
      followers: 9876
    },
    rating: 4.9,
    reviews: 42,
    views: 5890,
    cookTime: '2 hrs 15 min'
  }
];

const quickEasyDinners = [
  {
    id: 13,
    title: '15-Minute Garlic Shrimp Pasta',
    image: 'https://images.unsplash.com/photo-1625943555419-6aed55d3a805?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['Quick', 'Pasta'],
    author: {
      name: 'Sophia Chen',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      followers: 23456
    },
    rating: 4.7,
    reviews: 156,
    views: 28765,
    cookTime: '15 min'
  },
  {
    id: 14,
    title: 'One-Pan Lemon Garlic Chicken',
    image: 'https://images.unsplash.com/photo-1541015403287-926ca9298218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['Quick', 'One-Pan'],
    author: {
      name: 'Michael Brown',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      followers: 18765
    },
    rating: 4.8,
    reviews: 198,
    views: 25678,
    cookTime: '25 min'
  },
  {
    id: 15,
    title: 'Veggie Stir-Fry',
    image: 'https://images.unsplash.com/photo-1625938144741-2f3e7c4d1c4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['Quick', 'Veggie'],
    author: {
      name: 'Olivia Green',
      avatar: 'https://randomuser.me/api/portraits/women/39.jpg',
      followers: 21345
    },
    rating: 4.6,
    reviews: 143,
    views: 24567,
    cookTime: '20 min'
  },
  {
    id: 16,
    title: 'Caprese Stuffed Avocados',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['Quick', 'Vegetarian'],
    author: {
      name: 'Luca Bianchi',
      avatar: 'https://randomuser.me/api/portraits/men/37.jpg',
      followers: 15678
    },
    rating: 4.5,
    reviews: 98,
    views: 19876,
    cookTime: '15 min'
  },
  {
    id: 17,
    title: 'Honey Garlic Salmon',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['Quick', 'Healthy'],
    author: {
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
      followers: 22345
    },
    rating: 4.8,
    reviews: 176,
    views: 26789,
    cookTime: '20 min'
  },
  {
    id: 18,
    title: 'Beef and Broccoli Stir Fry',
    image: 'https://images.unsplash.com/photo-1604917019118-204e5d7b8f5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    badges: ['Quick', 'Asian'],
    author: {
      name: 'David Kim',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      followers: 19876
    },
    rating: 4.7,
    reviews: 165,
    views: 27890,
    cookTime: '25 min'
  }
];

const RecipeSection = ({ title, recipes }) => (
  <div className="mb-16">
    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#D35400] px-4">{title}</h2>
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-6 px-4 w-max">
        {recipes.map(recipe => (
          <div key={recipe.id} className="w-72 flex-shrink-0">
            <RecipeCard2 recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RecipeSections = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#D35400] mb-4">
            Discover Amazing Recipes
          </h2>
          <p className="text-lg text-[#6B4F3A] max-w-3xl mx-auto">
            Explore our collection of delicious recipes for every occasion, from quick weeknight dinners to impressive weekend feasts.
          </p>
        </div>
      
      <RecipeSection 
        title="🔥 Trending This Week" 
        recipes={trendingRecipes} 
      />
      
      <RecipeSection 
        title="✨ Newest Recipes" 
        recipes={newestRecipes} 
      />
      
      <RecipeSection 
        title="⏱️ Quick & Easy Dinners" 
        recipes={quickEasyDinners} 
      />
      
        <div className="flex justify-center mt-16">
          <button 
            className="px-8 py-3 bg-[#D35400] text-white font-bold rounded-full hover:bg-[#B34700] transition-colors duration-300 shadow-lg transform hover:scale-105"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Explore All Recipes
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecipeSections;
