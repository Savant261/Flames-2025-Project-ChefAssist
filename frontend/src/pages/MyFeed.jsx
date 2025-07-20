import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Bookmark, Clock, Users, Star, ChefHat, TrendingUp, Play, Activity, Grid3X3, Filter } from 'lucide-react';

// Mock data for chefs (added 2 more chefs)
const mockChefs = [
  {
    id: 1,
    name: 'Gordon Ramsay',
    avatar: 'https://turkeyanaclinic.com/wp-content/uploads/2024/09/Gordon-Ramsay-2.jpg',
    followers: '2.1M',
    recipes: 156,
    isActive: false
  },
  {
    id: 2,
    name: 'Julia Child',
    avatar: 'https://www.southernliving.com/thmb/DmDECxT3WZsQ_KeGwDlaqmKjYik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/image-2-20caed10bab24db3ba1b579c268c4625.jpg',
    followers: '890K',
    recipes: 89,
    isActive: false
  },
  {
    id: 3,
    name: 'Marco Pierre',
    avatar: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=400',
    followers: '1.5M',
    recipes: 203,
    isActive: false
  },
  {
    id: 4,
    name: 'Ina Garten',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
    followers: '750K',
    recipes: 67,
    isActive: false
  },
  {
    id: 5,
    name: 'Anthony Bourdain',
    avatar: 'https://images.deepai.org/chat-style-image/a1e9406638f044ecb46b761f6470d7c5/output.jpg',
    followers: '3.2M',
    recipes: 245,
    isActive: false
  },
  {
    id: 6,
    name: 'Ranveer Brar',
    avatar: 'https://tse4.mm.bing.net/th/id/OIP.PSzO_55vct7nPBJV0MmeqQHaFv?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    followers: '850K',
    recipes: 145,
    isActive: false
  },
  {
    id: 7,
    name: 'Jamie Oliver',
    avatar: 'https://cdn.britannica.com/20/200220-050-394A5A7C/Jamie-Oliver-2016.jpg',
    followers: '1.8M',
    recipes: 178,
    isActive: false
  },
  {
    id: 8,
    name: 'Ritu Dalmia',
    avatar: 'https://uaerg.ae/wp-content/uploads/2023/06/XN446MMJG5A27F3QS4UPZ6XYME.jpeg',
    followers: '680K',
    recipes: 123,
    isActive: false
  },
  {
    id: 9,
    name: 'Anahita Dhondy',
    avatar: 'https://i1.wp.com/www.smartfood.org/wp-content/uploads/2019/09/Anahita-resized-lowres.jpg?fit=1805%2C2215&ssl=1',
    followers: '420K',
    recipes: 98,
    isActive: false
  }
];

// Extended mock data for recipes (30+ items)
const mockRecipes = [
  {
    id: 1,
    type: 'recipe',
    chef: mockChefs[0],
    title: 'Perfect Beef Wellington',
    image: 'https://newsfeed.ph/wp-content/uploads/2025/01/page-85.jpg',
    cookingTime: '2h 30m',
    difficulty: 'Expert',
    likes: 1847,
    comments: 134,
    timeAgo: '2 hours ago',
    description: 'Master the art of creating the perfect Beef Wellington with this detailed recipe.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 2,
    type: 'recipe',
    chef: mockChefs[1],
    title: 'Classic French Onion Soup',
    image: 'https://www.southernliving.com/thmb/DmDECxT3WZsQ_KeGwDlaqmKjYik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/image-2-20caed10bab24db3ba1b579c268c4625.jpg',
    cookingTime: '1h 15m',
    difficulty: 'Intermediate',
    likes: 892,
    comments: 67,
    timeAgo: '4 hours ago',
    description: 'Traditional French onion soup with caramelized onions and gruyere cheese.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 3,
    type: 'recipe',
    chef: mockChefs[2],
    title: 'Truffle Risotto Masterclass',
    image: 'https://images.pexels.com/photos/1460872/pexels-photo-1460872.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '45m',
    difficulty: 'Intermediate',
    likes: 2156,
    comments: 189,
    timeAgo: '6 hours ago',
    description: 'Learn the traditional technique for creating creamy, luxurious truffle risotto.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 4,
    type: 'recipe',
    chef: mockChefs[3],
    title: 'Lemon Bars with Shortbread Crust',
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '1h 15m',
    difficulty: 'Beginner',
    likes: 934,
    comments: 78,
    timeAgo: '8 hours ago',
    description: 'These tangy lemon bars with buttery shortbread crust are perfect for any occasion.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 5,
    type: 'recipe',
    chef: mockChefs[0],
    title: 'Hell\'s Kitchen Signature Burger',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '30m',
    difficulty: 'Intermediate',
    likes: 3421,
    comments: 267,
    timeAgo: '1 day ago',
    description: 'The ultimate burger recipe straight from Hell\'s Kitchen with hand-cut fries.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 6,
    type: 'recipe',
    chef: mockChefs[5],
    title: 'Ranveer\'s Butter Chicken',
    image: 'https://tse4.mm.bing.net/th/id/OIP.PSzO_55vct7nPBJV0MmeqQHaFv?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    cookingTime: '1h 30m',
    difficulty: 'Intermediate',
    likes: 2156,
    comments: 156,
    timeAgo: '1 day ago',
    description: 'Rich and creamy butter chicken with aromatic Indian spices and tender chicken.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 7,
    type: 'recipe',
    chef: mockChefs[6],
    title: 'Jamie\'s 15-Minute Pasta',
    image: 'https://cdn.britannica.com/20/200220-050-394A5A7C/Jamie-Oliver-2016.jpg',
    cookingTime: '15m',
    difficulty: 'Beginner',
    likes: 2890,
    comments: 234,
    timeAgo: '2 days ago',
    description: 'Quick and delicious pasta that\'s perfect for busy weeknights.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 8,
    type: 'recipe',
    chef: mockChefs[7],
    title: 'Ritu\'s Dal Makhani',
    image: 'https://uaerg.ae/wp-content/uploads/2023/06/XN446MMJG5A27F3QS4UPZ6XYME.jpeg',
    cookingTime: '2h',
    difficulty: 'Beginner',
    likes: 1890,
    comments: 123,
    timeAgo: '2 days ago',
    description: 'Creamy black lentils slow-cooked with butter and aromatic spices.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 9,
    type: 'recipe',
    chef: mockChefs[1],
    title: 'Coq au Vin Traditional',
    image: 'https://www.southernliving.com/thmb/DmDECxT3WZsQ_KeGwDlaqmKjYik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/image-2-20caed10bab24db3ba1b579c268c4625.jpg',
    cookingTime: '2h',
    difficulty: 'Expert',
    likes: 1234,
    comments: 89,
    timeAgo: '3 days ago',
    description: 'Classic French chicken braised in wine with vegetables.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 10,
    type: 'recipe',
    chef: mockChefs[2],
    title: 'Pan-Seared Duck Breast',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '45m',
    difficulty: 'Expert',
    likes: 1876,
    comments: 145,
    timeAgo: '3 days ago',
    description: 'Perfectly cooked duck breast with crispy skin and cherry sauce.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 11,
    type: 'recipe',
    chef: mockChefs[3],
    title: 'Barefoot Contessa Roast Chicken',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '1h 30m',
    difficulty: 'Intermediate',
    likes: 2345,
    comments: 178,
    timeAgo: '4 days ago',
    description: 'Simple yet elegant roast chicken with herbs and lemon.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 12,
    type: 'recipe',
    chef: mockChefs[4],
    title: 'No Reservations Ramen',
    image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '3h',
    difficulty: 'Expert',
    likes: 3456,
    comments: 289,
    timeAgo: '4 days ago',
    description: 'Authentic tonkotsu ramen with rich, creamy broth.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 13,
    type: 'recipe',
    chef: mockChefs[5],
    title: 'Ranveer\'s Biryani Masterclass',
    image: 'https://tse4.mm.bing.net/th/id/OIP.PSzO_55vct7nPBJV0MmeqQHaFv?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    cookingTime: '2h 30m',
    difficulty: 'Intermediate',
    likes: 2987,
    comments: 156,
    timeAgo: '5 days ago',
    description: 'Authentic Hyderabadi biryani with fragrant basmati rice and tender mutton.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 14,
    type: 'recipe',
    chef: mockChefs[6],
    title: 'Jamie\'s Fish and Chips',
    image: 'https://cdn.britannica.com/20/200220-050-394A5A7C/Jamie-Oliver-2016.jpg',
    cookingTime: '1h',
    difficulty: 'Intermediate',
    likes: 2678,
    comments: 201,
    timeAgo: '5 days ago',
    description: 'Crispy beer-battered fish with perfect chips.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 15,
    type: 'recipe',
    chef: mockChefs[7],
    title: 'Ritu\'s Goan Fish Curry',
    image: 'https://uaerg.ae/wp-content/uploads/2023/06/XN446MMJG5A27F3QS4UPZ6XYME.jpeg',
    cookingTime: '40m',
    difficulty: 'Intermediate',
    likes: 1689,
    comments: 134,
    timeAgo: '6 days ago',
    description: 'Tangy and spicy Goan fish curry with coconut milk and kokum.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 16,
    type: 'recipe',
    chef: mockChefs[0],
    title: 'Gordon\'s Scrambled Eggs',
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '10m',
    difficulty: 'Beginner',
    likes: 4567,
    comments: 345,
    timeAgo: '1 week ago',
    description: 'The secret to perfect, creamy scrambled eggs.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 17,
    type: 'recipe',
    chef: mockChefs[1],
    title: 'Julia\'s Beef Bourguignon',
    image: 'https://images.pexels.com/photos/793785/pexels-photo-793785.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '3h',
    difficulty: 'Expert',
    likes: 2890,
    comments: 234,
    timeAgo: '1 week ago',
    description: 'The classic French beef stew that made Julia famous.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 18,
    type: 'recipe',
    chef: mockChefs[2],
    title: 'Marco\'s Perfect Risotto',
    image: 'https://images.pexels.com/photos/1460872/pexels-photo-1460872.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '30m',
    difficulty: 'Intermediate',
    likes: 1678,
    comments: 123,
    timeAgo: '1 week ago',
    description: 'Learn the technique for perfect risotto every time.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 19,
    type: 'recipe',
    chef: mockChefs[3],
    title: 'Ina\'s Chocolate Cake',
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '2h',
    difficulty: 'Intermediate',
    likes: 3456,
    comments: 278,
    timeAgo: '1 week ago',
    description: 'Rich, moist chocolate cake with buttercream frosting.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 20,
    type: 'recipe',
    chef: mockChefs[4],
    title: 'Anthony\'s Pho Bo',
    image: 'https://images.deepai.org/chat-style-image/a1e9406638f044ecb46b761f6470d7c5/output.jpg',
    cookingTime: '4h',
    difficulty: 'Expert',
    likes: 2345,
    comments: 189,
    timeAgo: '1 week ago',
    description: 'Authentic Vietnamese beef pho with aromatic broth.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 21,
    type: 'recipe',
    chef: mockChefs[5],
    title: 'Ranveer\'s Tandoori Chicken',
    image: 'https://tse4.mm.bing.net/th/id/OIP.PSzO_55vct7nPBJV0MmeqQHaFv?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    cookingTime: '4h',
    difficulty: 'Intermediate',
    likes: 2456,
    comments: 156,
    timeAgo: '2 weeks ago',
    description: 'Smoky tandoori chicken marinated in yogurt and spices, cooked in clay oven.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 22,
    type: 'recipe',
    chef: mockChefs[6],
    title: 'Jamie\'s Carbonara',
    image: 'https://cdn.britannica.com/20/200220-050-394A5A7C/Jamie-Oliver-2016.jpg',
    cookingTime: '20m',
    difficulty: 'Intermediate',
    likes: 2678,
    comments: 201,
    timeAgo: '2 weeks ago',
    description: 'Authentic Italian carbonara with guanciale and pecorino.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 23,
    type: 'recipe',
    chef: mockChefs[7],
    title: 'Ritu\'s Paneer Makhani',
    image: 'https://uaerg.ae/wp-content/uploads/2023/06/XN446MMJG5A27F3QS4UPZ6XYME.jpeg',
    cookingTime: '35m',
    difficulty: 'Beginner',
    likes: 1956,
    comments: 134,
    timeAgo: '2 weeks ago',
    description: 'Creamy paneer in rich tomato gravy with butter and cream.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 24,
    type: 'recipe',
    chef: mockChefs[0],
    title: 'Gordon\'s Fish Tacos',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '30m',
    difficulty: 'Intermediate',
    likes: 2234,
    comments: 167,
    timeAgo: '2 weeks ago',
    description: 'Fresh fish tacos with mango salsa and lime crema.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 25,
    type: 'recipe',
    chef: mockChefs[1],
    title: 'Julia\'s Ratatouille',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '1h 30m',
    difficulty: 'Intermediate',
    likes: 1567,
    comments: 123,
    timeAgo: '3 weeks ago',
    description: 'Traditional Provençal vegetable stew.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 26,
    type: 'recipe',
    chef: mockChefs[2],
    title: 'Marco\'s Osso Buco',
    image: 'https://images.pexels.com/photos/793785/pexels-photo-793785.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '3h',
    difficulty: 'Expert',
    likes: 1890,
    comments: 145,
    timeAgo: '3 weeks ago',
    description: 'Braised veal shanks with gremolata.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 27,
    type: 'recipe',
    chef: mockChefs[3],
    title: 'Ina\'s Herb Roasted Turkey',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '4h',
    difficulty: 'Intermediate',
    likes: 2456,
    comments: 189,
    timeAgo: '3 weeks ago',
    description: 'Perfect holiday turkey with herb butter.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 28,
    type: 'recipe',
    chef: mockChefs[4],
    title: 'Anthony\'s Banh Mi',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '45m',
    difficulty: 'Intermediate',
    likes: 1678,
    comments: 134,
    timeAgo: '3 weeks ago',
    description: 'Vietnamese sandwich with pickled vegetables.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 29,
    type: 'recipe',
    chef: mockChefs[5],
    title: 'Ranveer\'s Chole Bhature',
    image: 'https://tse4.mm.bing.net/th/id/OIP.PSzO_55vct7nPBJV0MmeqQHaFv?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    cookingTime: '3h',
    difficulty: 'Intermediate',
    likes: 2789,
    comments: 167,
    timeAgo: '1 month ago',
    description: 'Spicy chickpea curry with fluffy deep-fried bread.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 30,
    type: 'recipe',
    chef: mockChefs[6],
    title: 'Jamie\'s Shepherd\'s Pie',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '1h 45m',
    difficulty: 'Intermediate',
    likes: 1789,
    comments: 145,
    timeAgo: '1 month ago',
    description: 'Comfort food classic with lamb and mashed potatoes.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 31,
    type: 'recipe',
    chef: mockChefs[7],
    title: 'Ritu\'s Rajma Masala',
    image: 'https://uaerg.ae/wp-content/uploads/2023/06/XN446MMJG5A27F3QS4UPZ6XYME.jpeg',
    cookingTime: '1h 30m',
    difficulty: 'Beginner',
    likes: 1678,
    comments: 112,
    timeAgo: '1 month ago',
    description: 'Kidney beans in spiced tomato gravy, perfect with rice.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 32,
    type: 'recipe',
    chef: mockChefs[0],
    title: 'Gordon\'s Sticky Toffee Pudding',
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '1h 30m',
    difficulty: 'Intermediate',
    likes: 2890,
    comments: 234,
    timeAgo: '1 month ago',
    description: 'British dessert with dates and toffee sauce.',
    isLiked: false,
    isSaved: false
  },
  // New recipes for Anahita Dhondy
  {
    id: 33,
    type: 'recipe',
    chef: mockChefs[8],
    title: 'Anahita\'s Parsi Dhansak',
    image: 'https://i1.wp.com/www.smartfood.org/wp-content/uploads/2019/09/Anahita-resized-lowres.jpg?fit=1805%2C2215&ssl=1',
    cookingTime: '2h 30m',
    difficulty: 'Expert',
    likes: 1567,
    comments: 123,
    timeAgo: '3 days ago',
    description: 'Traditional Parsi lentil curry with vegetables and aromatic spices.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 34,
    type: 'recipe',
    chef: mockChefs[8],
    title: 'Anahita\'s Sali Boti',
    image: 'https://i1.wp.com/www.smartfood.org/wp-content/uploads/2019/09/Anahita-resized-lowres.jpg?fit=1805%2C2215&ssl=1',
    cookingTime: '1h 45m',
    difficulty: 'Intermediate',
    likes: 1234,
    comments: 89,
    timeAgo: '1 week ago',
    description: 'Parsi mutton curry topped with crispy potato straws.',
    isLiked: false,
    isSaved: false
  },
  {
    id: 35,
    type: 'recipe',
    chef: mockChefs[8],
    title: 'Anahita\'s Berry Pulao',
    image: 'https://i1.wp.com/www.smartfood.org/wp-content/uploads/2019/09/Anahita-resized-lowres.jpg?fit=1805%2C2215&ssl=1',
    cookingTime: '45m',
    difficulty: 'Intermediate',
    likes: 987,
    comments: 67,
    timeAgo: '2 weeks ago',
    description: 'Fragrant rice pilaf with dried fruits and nuts, Parsi style.',
    isLiked: false,
    isSaved: false
  }
];

// Extended mock data for activities (30+ items)
const mockActivities = [
  {
    id: 101,
    type: 'activity',
    chef: mockChefs[1],
    title: 'Chef Julia shared a cooking tip',
    content: 'The secret to perfect French onion soup is patience. Cook the onions low and slow for at least 45 minutes.',
    timeAgo: '4 hours ago',
    likes: 892,
    comments: 67,
    isLiked: false,
    isSaved: false
  },
  {
    id: 102,
    type: 'activity',
    chef: mockChefs[4],
    title: 'Chef Anthony liked a recipe',
    content: 'Authentic Vietnamese Pho by Chef Linh',
    timeAgo: '12 hours ago',
    likes: 567,
    comments: 23,
    isLiked: false,
    isSaved: false
  },
  {
    id: 103,
    type: 'activity',
    chef: mockChefs[1],
    title: 'Chef Julia updated her profile',
    content: 'Added 3 new French pastry recipes to her collection',
    timeAgo: '2 days ago',
    likes: 445,
    comments: 34,
    isLiked: false,
    isSaved: false
  },
  {
    id: 104,
    type: 'activity',
    chef: mockChefs[0],
    title: 'Chef Gordon started a live cooking session',
    content: 'Teaching how to make perfect scrambled eggs - join now!',
    timeAgo: '3 hours ago',
    likes: 1234,
    comments: 89,
    isLiked: false,
    isSaved: false
  },
  {
    id: 105,
    type: 'activity',
    chef: mockChefs[2],
    title: 'Chef Marco shared kitchen wisdom',
    content: 'Always taste your food before serving. Your palate is your best tool.',
    timeAgo: '6 hours ago',
    likes: 678,
    comments: 45,
    isLiked: false,
    isSaved: false
  },
  {
    id: 106,
    type: 'activity',
    chef: mockChefs[3],
    title: 'Chef Ina posted a behind-the-scenes video',
    content: 'Setting up for today\'s Barefoot Contessa filming',
    timeAgo: '8 hours ago',
    likes: 789,
    comments: 56,
    isLiked: false,
    isSaved: false
  },
  {
    id: 107,
    type: 'activity',
    chef: mockChefs[5],
    title: 'Chef Ranveer announced a new cookbook',
    content: 'Excited to share my new Indian spice cookbook coming this fall!',
    timeAgo: '1 day ago',
    likes: 1567,
    comments: 123,
    isLiked: false,
    isSaved: false
  },
  {
    id: 108,
    type: 'activity',
    chef: mockChefs[6],
    title: 'Chef Jamie shared a sustainability tip',
    content: 'Use every part of your vegetables - stems, leaves, and peels can add amazing flavor!',
    timeAgo: '1 day ago',
    likes: 890,
    comments: 67,
    isLiked: false,
    isSaved: false
  },
  {
    id: 109,
    type: 'activity',
    chef: mockChefs[7],
    title: 'Chef Ritu celebrated a milestone',
    content: 'Thank you for 500K followers! Here\'s to many more delicious Indian meals together',
    timeAgo: '2 days ago',
    likes: 2345,
    comments: 189,
    isLiked: false,
    isSaved: false
  },
  {
    id: 110,
    type: 'activity',
    chef: mockChefs[0],
    title: 'Chef Gordon reviewed a restaurant',
    content: 'Just visited an incredible family-run Italian place in London. The passion shows in every dish!',
    timeAgo: '2 days ago',
    likes: 1678,
    comments: 134,
    isLiked: false,
    isSaved: false
  },
  {
    id: 111,
    type: 'activity',
    chef: mockChefs[1],
    title: 'Chef Julia shared a memory',
    content: 'Remembering my first time making Beef Bourguignon - what a disaster that was!',
    timeAgo: '3 days ago',
    likes: 1234,
    comments: 98,
    isLiked: false,
    isSaved: false
  },
  {
    id: 112,
    type: 'activity',
    chef: mockChefs[2],
    title: 'Chef Marco announced a masterclass',
    content: 'Join me next week for an exclusive pasta-making masterclass',
    timeAgo: '3 days ago',
    likes: 987,
    comments: 76,
    isLiked: false,
    isSaved: false
  },
  {
    id: 113,
    type: 'activity',
    chef: mockChefs[3],
    title: 'Chef Ina shared a party planning tip',
    content: 'Always prepare what you can in advance. Your guests want to see you, not just your back in the kitchen!',
    timeAgo: '4 days ago',
    likes: 1456,
    comments: 112,
    isLiked: false,
    isSaved: false
  },
  {
    id: 114,
    type: 'activity',
    chef: mockChefs[4],
    title: 'Chef Anthony shared travel inspiration',
    content: 'The best meals happen when you least expect them. Stay curious, stay hungry.',
    timeAgo: '4 days ago',
    likes: 2890,
    comments: 234,
    isLiked: false,
    isSaved: false
  },
  {
    id: 115,
    type: 'activity',
    chef: mockChefs[5],
    title: 'Chef Ranveer shared a spice tip',
    content: 'Always toast your whole spices before grinding - it releases amazing aromas and flavors!',
    timeAgo: '5 days ago',
    likes: 678,
    comments: 45,
    isLiked: false,
    isSaved: false
  },
  {
    id: 116,
    type: 'activity',
    chef: mockChefs[6],
    title: 'Chef Jamie promoted healthy eating',
    content: 'Small changes make big differences. Try swapping white rice for cauliflower rice this week!',
    timeAgo: '5 days ago',
    likes: 1789,
    comments: 145,
    isLiked: false,
    isSaved: false
  },
  {
    id: 117,
    type: 'activity',
    chef: mockChefs[7],
    title: 'Chef Ritu shared a time-saving hack',
    content: 'Prep your masala base on Sunday for the whole week. Future you will thank present you!',
    timeAgo: '6 days ago',
    likes: 1234,
    comments: 89,
    isLiked: false,
    isSaved: false
  },
  {
    id: 118,
    type: 'activity',
    chef: mockChefs[0],
    title: 'Chef Gordon shared kitchen safety',
    content: 'A sharp knife is a safe knife. Keep your blades properly maintained!',
    timeAgo: '1 week ago',
    likes: 2456,
    comments: 178,
    isLiked: false,
    isSaved: false
  },
  {
    id: 119,
    type: 'activity',
    chef: mockChefs[1],
    title: 'Chef Julia celebrated French cuisine',
    content: 'French cooking is not about complicated techniques - it\'s about respecting ingredients.',
    timeAgo: '1 week ago',
    likes: 1567,
    comments: 123,
    isLiked: false,
    isSaved: false
  },
  {
    id: 120,
    type: 'activity',
    chef: mockChefs[2],
    title: 'Chef Marco shared perfectionism advice',
    content: 'Perfection is not about being flawless - it\'s about caring deeply about what you do.',
    timeAgo: '1 week ago',
    likes: 890,
    comments: 67,
    isLiked: false,
    isSaved: false
  },
  {
    id: 121,
    type: 'activity',
    chef: mockChefs[3],
    title: 'Chef Ina shared entertaining wisdom',
    content: 'The most important ingredient in any meal is the love you put into it.',
    timeAgo: '1 week ago',
    likes: 1678,
    comments: 134,
    isLiked: false,
    isSaved: false
  },
  {
    id: 122,
    type: 'activity',
    chef: mockChefs[4],
    title: 'Chef Anthony shared cultural appreciation',
    content: 'Food is the universal language. It connects us across all cultures and borders.',
    timeAgo: '2 weeks ago',
    likes: 3456,
    comments: 267,
    isLiked: false,
    isSaved: false
  },
  {
    id: 123,
    type: 'activity',
    chef: mockChefs[5],
    title: 'Chef Ranveer shared Indian cooking wisdom',
    content: 'Indian cooking is like classical music - it\'s all about harmony of spices and soul!',
    timeAgo: '2 weeks ago',
    likes: 1234,
    comments: 98,
    isLiked: false,
    isSaved: false
  },
  {
    id: 124,
    type: 'activity',
    chef: mockChefs[6],
    title: 'Chef Jamie promoted family cooking',
    content: 'Get the kids involved in cooking. It\'s the best way to teach them about nutrition and creativity.',
    timeAgo: '2 weeks ago',
    likes: 2890,
    comments: 234,
    isLiked: false,
    isSaved: false
  },
  {
    id: 125,
    type: 'activity',
    chef: mockChefs[7],
    title: 'Chef Ritu shared positivity',
    content: 'Every Indian meal is a chance to nourish not just the body, but the soul too!',
    timeAgo: '2 weeks ago',
    likes: 1567,
    comments: 123,
    isLiked: false,
    isSaved: false
  },
  {
    id: 126,
    type: 'activity',
    chef: mockChefs[0],
    title: 'Chef Gordon shared mentorship advice',
    content: 'The best chefs never stop learning. Stay humble, stay hungry.',
    timeAgo: '3 weeks ago',
    likes: 2345,
    comments: 189,
    isLiked: false,
    isSaved: false
  },
  {
    id: 127,
    type: 'activity',
    chef: mockChefs[1],
    title: 'Chef Julia shared cooking philosophy',
    content: 'Cooking is one of the great pleasures of life. Don\'t rush it, savor every moment.',
    timeAgo: '3 weeks ago',
    likes: 1789,
    comments: 145,
    isLiked: false,
    isSaved: false
  },
  {
    id: 128,
    type: 'activity',
    chef: mockChefs[2],
    title: 'Chef Marco shared excellence standards',
    content: 'Excellence is not a skill, it\'s an attitude. Bring it to everything you do.',
    timeAgo: '3 weeks ago',
    likes: 1456,
    comments: 112,
    isLiked: false,
    isSaved: false
  },
  {
    id: 129,
    type: 'activity',
    chef: mockChefs[3],
    title: 'Chef Ina shared hosting tips',
    content: 'The secret to great entertaining is making your guests feel at home.',
    timeAgo: '1 month ago',
    likes: 1234,
    comments: 89,
    isLiked: false,
    isSaved: false
  },
  {
    id: 130,
    type: 'activity',
    chef: mockChefs[4],
    title: 'Chef Anthony shared adventure spirit',
    content: 'The best stories happen when you say yes to the unknown.',
    timeAgo: '1 month ago',
    likes: 2678,
    comments: 201,
    isLiked: false,
    isSaved: false
  },
  {
    id: 131,
    type: 'activity',
    chef: mockChefs[5],
    title: 'Chef Ranveer shared passion',
    content: 'Cooking with passion and love is the secret ingredient that makes everything taste better!',
    timeAgo: '1 month ago',
    likes: 1890,
    comments: 156,
    isLiked: false,
    isSaved: false
  },
  {
    id: 132,
    type: 'activity',
    chef: mockChefs[6],
    title: 'Chef Jamie shared sustainability message',
    content: 'Every small step towards sustainable cooking makes a difference for our planet.',
    timeAgo: '1 month ago',
    likes: 2456,
    comments: 189,
    isLiked: false,
    isSaved: false
  },
  // New activities for Anahita Dhondy
  {
    id: 133,
    type: 'activity',
    chef: mockChefs[8],
    title: 'Chef Anahita shared Parsi cooking wisdom',
    content: 'The beauty of Parsi cuisine lies in its perfect balance of sweet, sour, and spicy flavors.',
    timeAgo: '2 days ago',
    likes: 567,
    comments: 45,
    isLiked: false,
    isSaved: false
  },
  {
    id: 134,
    type: 'activity',
    chef: mockChefs[8],
    title: 'Chef Anahita announced a cooking workshop',
    content: 'Join me for an exclusive Parsi cuisine workshop next month in Mumbai!',
    timeAgo: '1 week ago',
    likes: 890,
    comments: 67,
    isLiked: false,
    isSaved: false
  },
  {
    id: 135,
    type: 'activity',
    chef: mockChefs[8],
    title: 'Chef Anahita shared heritage cooking',
    content: 'Preserving traditional Parsi recipes is not just cooking, it\'s keeping our culture alive.',
    timeAgo: '2 weeks ago',
    likes: 1234,
    comments: 89,
    isLiked: false,
    isSaved: false
  }
];

const MyFeed = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedChef, setSelectedChef] = useState(null);
  const [recipes, setRecipes] = useState(mockRecipes);
  const [activities, setActivities] = useState(mockActivities);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [visibleCount, setVisibleCount] = useState(9); // Show 9 items initially
  const [loadingMore, setLoadingMore] = useState(false);

  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleTabChange = (tab) => {
    setLoading(true);
    setActiveTab(tab);
    setVisibleCount(9); // Reset to initial count when changing tabs
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleLike = (contentId, type) => {
    if (type === 'recipe') {
      setRecipes(prev => prev.map(item => 
        item.id === contentId 
          ? { 
              ...item, 
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
              isLiked: !item.isLiked 
            }
          : item
      ));
    } else {
      setActivities(prev => prev.map(item => 
        item.id === contentId 
          ? { 
              ...item, 
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
              isLiked: !item.isLiked 
            }
          : item
      ));
    }
    
    const action = type === 'recipe' ? 
      (recipes.find(r => r.id === contentId)?.isLiked ? 'Recipe unliked!' : 'Recipe liked!') :
      (activities.find(a => a.id === contentId)?.isLiked ? 'Activity unliked!' : 'Activity liked!');
    
    showToastNotification(action);
  };

  const handleSave = (contentId, type) => {
    if (type === 'recipe') {
      setRecipes(prev => prev.map(item => 
        item.id === contentId 
          ? { ...item, isSaved: !item.isSaved }
          : item
      ));
    } else {
      setActivities(prev => prev.map(item => 
        item.id === contentId 
          ? { ...item, isSaved: !item.isSaved }
          : item
      ));
    }
    
    const action = type === 'recipe' ? 
      (recipes.find(r => r.id === contentId)?.isSaved ? 'Recipe removed from saved!' : 'Recipe saved to your collection!') :
      (activities.find(a => a.id === contentId)?.isSaved ? 'Activity removed from saved!' : 'Activity saved!');
    
    showToastNotification(action);
  };

  const getCurrentContent = () => {
    let content = [];
    
    if (activeTab === 'all') {
      // Mix recipes and activities for "all" view
      content = [...recipes, ...activities].sort((a, b) => {
        // Sort by a mix of likes and recency for more realistic feed
        const aScore = a.likes + (Math.random() * 1000);
        const bScore = b.likes + (Math.random() * 1000);
        return bScore - aScore;
      });
    } else if (activeTab === 'recipes') {
      content = recipes;
    } else {
      content = activities;
    }
    
    // Filter by selected chef if one is selected
    if (selectedChef) {
      content = content.filter(item => item.chef.id === selectedChef.id);
    }
    
    return content.slice(0, visibleCount); // Only return visible items
  };

  const getTotalContent = () => {
    let content = [];
    
    if (activeTab === 'all') {
      content = [...recipes, ...activities];
    } else if (activeTab === 'recipes') {
      content = recipes;
    } else {
      content = activities;
    }
    
    if (selectedChef) {
      content = content.filter(item => item.chef.id === selectedChef.id);
    }
    
    return content;
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setVisibleCount(prev => prev + 6); // Load 6 more items
      setLoadingMore(false);
    }, 800);
  };

  const renderCard = (item) => {
    if (item.type === 'recipe') {
      return (
        <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group h-full">
          <div className="relative overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-4">
                <button
                  onClick={() => handleLike(item.id, 'recipe')}
                  className={`bg-white bg-opacity-90 p-3 rounded-full transition-all duration-200 transform hover:scale-110 ${
                    item.isLiked ? 'bg-red-50' : 'hover:bg-red-50'
                  }`}
                >
                  <Heart 
                    size={20} 
                    className={`transition-colors duration-200 ${
                      item.isLiked ? 'text-red-500 fill-red-500' : 'text-red-500'
                    }`} 
                  />
                </button>
                <button
                  onClick={() => handleSave(item.id, 'recipe')}
                  className={`bg-white bg-opacity-90 p-3 rounded-full transition-all duration-200 transform hover:scale-110 ${
                    item.isSaved ? 'bg-blue-50' : 'hover:bg-blue-50'
                  }`}
                >
                  <Bookmark 
                    size={20} 
                    className={`transition-colors duration-200 ${
                      item.isSaved ? 'text-blue-500 fill-blue-500' : 'text-blue-500'
                    }`} 
                  />
                </button>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <span 
                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: '#D97706' }}
              >
                {item.difficulty}
              </span>
            </div>
          </div>
          
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={item.chef.avatar}
                alt={item.chef.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-600">{item.chef.name}</span>
            </div>
            
            <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 flex-grow">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{item.cookingTime}</span>
              </div>
              <span>{item.timeAgo}</span>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleLike(item.id, 'recipe')}
                  className={`flex items-center space-x-1 transition-all duration-200 transform hover:scale-105 ${
                    item.isLiked ? 'text-red-600' : 'text-red-500 hover:text-red-600'
                  }`}
                >
                  <Heart 
                    size={16} 
                    className={item.isLiked ? 'fill-red-600' : ''} 
                  />
                  <span className="text-sm font-medium">{item.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors duration-200">
                  <MessageCircle size={16} />
                  <span className="text-sm font-medium">{item.comments}</span>
                </button>
              </div>
              <button 
                className="text-orange-600 hover:text-orange-700 transition-colors duration-200 font-medium text-sm transform hover:scale-105"
              >
                View Recipe
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
          <div className="flex items-start space-x-3 h-full">
            <img
              src={item.chef.avatar}
              alt={item.chef.name}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 flex flex-col h-full">
              <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-gray-600 mb-3 flex-grow">{item.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                <span>{item.timeAgo}</span>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleLike(item.id, 'activity')}
                    className={`flex items-center space-x-1 transition-all duration-200 transform hover:scale-105 ${
                      item.isLiked ? 'text-red-600' : 'text-red-500 hover:text-red-600'
                    }`}
                  >
                    <Heart 
                      size={14} 
                      className={item.isLiked ? 'fill-red-600' : ''} 
                    />
                    <span>{item.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors duration-200">
                    <MessageCircle size={14} />
                    <span>{item.comments}</span>
                  </button>
                  <button
                    onClick={() => handleSave(item.id, 'activity')}
                    className={`transition-all duration-200 transform hover:scale-105 ${
                      item.isSaved ? 'text-blue-600' : 'text-blue-500 hover:text-blue-600'
                    }`}
                  >
                    <Bookmark 
                      size={14} 
                      className={item.isSaved ? 'fill-blue-600' : ''} 
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEF3E2' }}>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out animate-bounce">
          <div 
            className="px-6 py-3 rounded-lg shadow-lg text-white font-medium"
            style={{ backgroundColor: '#D97706' }}
          >
            {toastMessage}
          </div>
        </div>
      )}

      {/* Chef Profile Cards Section */}
      <div className="bg-white border-b border-orange-100 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-center space-x-4 flex-wrap">
            {/* All Chefs Card */}
            <button
              onClick={() => setSelectedChef(null)}
              className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                selectedChef === null
                  ? 'bg-orange-100 shadow-md'
                  : 'hover:bg-orange-50'
              }`}
            >
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  selectedChef === null ? 'ring-4 ring-orange-300' : ''
                }`}
                style={{ backgroundColor: '#D97706' }}
              >
                All
              </div>
              <span className={`text-sm font-medium ${
                selectedChef === null ? 'text-orange-700' : 'text-gray-600'
              }`}>
                All Chefs
              </span>
            </button>

            {/* Individual Chef Cards */}
            {mockChefs.map((chef) => (
              <button
                key={chef.id}
                onClick={() => setSelectedChef(chef)}
                className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedChef?.id === chef.id
                    ? 'bg-orange-100 shadow-md'
                    : 'hover:bg-orange-50'
                }`}
              >
                <div className="relative">
                  <img
                    src={chef.avatar}
                    alt={chef.name}
                    className={`w-16 h-16 rounded-full object-cover ${
                      selectedChef?.id === chef.id ? 'ring-4 ring-orange-300' : ''
                    }`}
                  />
                  {chef.isActive && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <span className={`text-sm font-medium text-center ${
                  selectedChef?.id === chef.id ? 'text-orange-700' : 'text-gray-600'
                }`}>
                  {chef.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white border-b border-orange-100 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => handleTabChange('all')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'all'
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
              style={{ 
                backgroundColor: activeTab === 'all' ? '#D97706' : 'transparent'
              }}
            >
              <Grid3X3 size={20} />
              <span>All Content</span>
            </button>
            
            <button
              onClick={() => handleTabChange('recipes')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'recipes'
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
              style={{ 
                backgroundColor: activeTab === 'recipes' ? '#D97706' : 'transparent'
              }}
            >
              <ChefHat size={20} />
              <span>Recipes</span>
            </button>
            
            <button
              onClick={() => handleTabChange('activities')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'activities'
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
              style={{ 
                backgroundColor: activeTab === 'activities' ? '#D97706' : 'transparent'
              }}
            >
              <Activity size={20} />
              <span>Activities</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentContent().map((item) => renderCard(item))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && getCurrentContent().length < getTotalContent().length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-8 py-3 rounded-full font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: '#D97706' }}
            >
              {loadingMore ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                `Load More (${getTotalContent().length - getCurrentContent().length} remaining)`
              )}
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {getTotalContent().length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <ChefHat size={64} className="text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No content yet</h3>
          <p className="text-gray-500 text-center max-w-md">
            Start following some chefs to see their latest recipes and updates in your feed.
          </p>
          <button 
            className="mt-6 px-6 py-3 rounded-full font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            style={{ backgroundColor: '#D97706' }}
          >
            Discover Chefs
          </button>
        </div>
      )}
    </div>
  );
};

export default MyFeed;