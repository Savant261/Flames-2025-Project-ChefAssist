import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Bookmark, Clock, Users, Star, ChefHat, TrendingUp, Play } from 'lucide-react';

// const MyFeed = () => {
//   useEffect(() => {
//     document.title = 'MyFeed / ChefAssist';
//   }, []);
//   return (
// // Mock data for chefs
const mockChefs = [
  {
    id: 'all',
    name: 'All Chefs',
    avatar: null,
    isActive: true,
    isAllOption: true
  },
  {
    id: 1,
    name: 'Gordon Ramsay',
    avatar: 'https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=400',
    followers: '2.1M',
    recipes: 156,
    isActive: false
  },
  {
    id: 2,
    name: 'Julia Child',
    avatar: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    avatar: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=400',
    followers: '3.2M',
    recipes: 245,
    isActive: false
  },
  {
    id: 6,
    name: 'Emeril Lagasse',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
    followers: '650K',
    recipes: 134,
    isActive: false
  }
];

// Mock data for feed content
const mockFeedContent = [
  {
    id: 1,
    type: 'recipe',
    chef: mockChefs[1],
    title: 'Perfect Beef Wellington',
    image: 'https://images.pexels.com/photos/793785/pexels-photo-793785.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '2h 30m',
    difficulty: 'Expert',
    likes: 1847,
    comments: 134,
    timeAgo: '2 hours ago',
    description: 'Master the art of creating the perfect Beef Wellington with this detailed recipe.'
  },
  {
    id: 2,
    type: 'activity',
    chef: mockChefs[2],
    title: 'Chef Julia shared a cooking tip',
    content: 'The secret to perfect French onion soup is patience. Cook the onions low and slow for at least 45 minutes.',
    timeAgo: '4 hours ago',
    likes: 892,
    comments: 67
  },
  {
    id: 3,
    type: 'recipe',
    chef: mockChefs[3],
    title: 'Truffle Risotto Masterclass',
    image: 'https://images.pexels.com/photos/1460872/pexels-photo-1460872.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '45m',
    difficulty: 'Intermediate',
    likes: 2156,
    comments: 189,
    timeAgo: '6 hours ago',
    description: 'Learn the traditional technique for creating creamy, luxurious truffle risotto.'
  },
  {
    id: 4,
    type: 'recipe',
    chef: mockChefs[4],
    title: 'Lemon Bars with Shortbread Crust',
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '1h 15m',
    difficulty: 'Beginner',
    likes: 934,
    comments: 78,
    timeAgo: '8 hours ago',
    description: 'These tangy lemon bars with buttery shortbread crust are perfect for any occasion.'
  },
  {
    id: 5,
    type: 'activity',
    chef: mockChefs[5],
    title: 'Chef Anthony liked a recipe',
    content: 'Authentic Vietnamese Pho by Chef Linh',
    timeAgo: '12 hours ago',
    likes: 567,
    comments: 23
  },
  {
    id: 6,
    type: 'recipe',
    chef: mockChefs[1],
    title: 'Hell\'s Kitchen Signature Burger',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '30m',
    difficulty: 'Intermediate',
    likes: 3421,
    comments: 267,
    timeAgo: '1 day ago',
    description: 'The ultimate burger recipe straight from Hell\'s Kitchen with hand-cut fries.'
  },
  {
    id: 7,
    type: 'recipe',
    chef: mockChefs[6],
    title: 'Emeril\'s Creole Jambalaya',
    image: 'https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookingTime: '1h 45m',
    difficulty: 'Intermediate',
    likes: 1678,
    comments: 156,
    timeAgo: '1 day ago',
    description: 'BAM! This authentic Creole jambalaya will transport you straight to New Orleans.'
  },
  {
    id: 8,
    type: 'activity',
    chef: mockChefs[2],
    title: 'Chef Julia updated her profile',
    content: 'Added 3 new French pastry recipes to her collection',
    timeAgo: '2 days ago',
    likes: 445,
    comments: 34
  }
];

const MyFeed = () => {
  const [selectedChef, setSelectedChef] = useState('all');
  const [chefs, setChefs] = useState(mockChefs);
  const [feedContent, setFeedContent] = useState(mockFeedContent);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleChefSelect = (chefId) => {
    setLoading(true);
    
    // Update active chef
    const updatedChefs = chefs.map(chef => ({
      ...chef,
      isActive: chef.id === chefId
    }));
    setChefs(updatedChefs);
    setSelectedChef(chefId);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const handleLike = (contentId) => {
    setFeedContent(prev => prev.map(item => 
      item.id === contentId 
        ? { ...item, likes: item.likes + 1 }
        : item
    ));
    showToastNotification('Recipe liked!');
  };

  const handleSave = (contentId) => {
    showToastNotification('Recipe saved to your collection!');
  };

  const getFilteredContent = () => {
    if (selectedChef === 'all') {
      return feedContent;
    }
    return feedContent.filter(item => item.chef.id === selectedChef);
  };

  const selectedChefData = chefs.find(chef => chef.id === selectedChef);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEF3E2' }}>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out">
          <div 
            className="px-6 py-3 rounded-lg shadow-lg text-white font-medium"
            style={{ backgroundColor: '#D97706' }}
          >
            {toastMessage}
          </div>
        </div>
      )}

      {/* Chef Following Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-orange-100 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
            {chefs.map((chef) => (
              <div
                key={chef.id}
                onClick={() => handleChefSelect(chef.id)}
                className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                  chef.isActive ? 'transform scale-105' : 'hover:transform hover:scale-102'
                }`}
              >
                <div className="flex flex-col items-center space-y-2 p-3 rounded-xl transition-all duration-300">
                  {chef.isAllOption ? (
                    <div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ${
                        chef.isActive 
                          ? 'shadow-lg transform scale-110' 
                          : 'hover:shadow-md'
                      }`}
                      style={{ 
                        backgroundColor: chef.isActive ? '#D97706' : '#F59E0B',
                        border: chef.isActive ? '3px solid #B45309' : '2px solid transparent'
                      }}
                    >
                      ALL
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={chef.avatar}
                        alt={chef.name}
                        className={`w-16 h-16 rounded-full object-cover transition-all duration-300 ${
                          chef.isActive 
                            ? 'shadow-lg transform scale-110' 
                            : 'hover:shadow-md'
                        }`}
                        style={{ 
                          border: chef.isActive ? '3px solid #D97706' : '2px solid transparent'
                        }}
                      />
                      {chef.isActive && (
                        <div 
                          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                          style={{ backgroundColor: '#D97706' }}
                        >
                          ✓
                        </div>
                      )}
                    </div>
                  )}
                  <span 
                    className={`text-sm font-medium transition-colors duration-300 ${
                      chef.isActive ? 'text-orange-600' : 'text-gray-600'
                    }`}
                  >
                    {chef.name.split(' ')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chef Banner (when specific chef is selected) */}
      {selectedChef !== 'all' && selectedChefData && !selectedChefData.isAllOption && (
        <div 
          className="relative px-6 py-8 mb-6"
          style={{ backgroundColor: '#FED7AA' }}
        >
          <div className="flex items-center space-x-6">
            <img
              src={selectedChefData.avatar}
              alt={selectedChefData.name}
              className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedChefData.name}</h1>
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Users size={20} />
                  <span className="font-medium">{selectedChefData.followers} followers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ChefHat size={20} />
                  <span className="font-medium">{selectedChefData.recipes} recipes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="px-6 pb-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
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
            {getFilteredContent().map((item) => (
              <div key={item.id}>
                {item.type === 'recipe' ? (
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-4">
                          <button
                            onClick={() => handleLike(item.id)}
                            className="bg-white bg-opacity-90 p-3 rounded-full hover:bg-red-50 transition-colors duration-200"
                          >
                            <Heart size={20} className="text-red-500" />
                          </button>
                          <button
                            onClick={() => handleSave(item.id)}
                            className="bg-white bg-opacity-90 p-3 rounded-full hover:bg-blue-50 transition-colors duration-200"
                          >
                            <Bookmark size={20} className="text-blue-500" />
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
                    
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={item.chef.avatar}
                          alt={item.chef.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-600">{item.chef.name}</span>
                      </div>
                      
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-2">
                          <Clock size={16} />
                          <span>{item.cookingTime}</span>
                        </div>
                        <span>{item.timeAgo}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button 
                            onClick={() => handleLike(item.id)}
                            className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors duration-200"
                          >
                            <Heart size={16} />
                            <span className="text-sm font-medium">{item.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors duration-200">
                            <MessageCircle size={16} />
                            <span className="text-sm font-medium">{item.comments}</span>
                          </button>
                        </div>
                        <button 
                          className="text-orange-600 hover:text-orange-700 transition-colors duration-200 font-medium text-sm"
                        >
                          View Recipe
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.chef.avatar}
                        alt={item.chef.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                        <p className="text-gray-600 mb-3">{item.content}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{item.timeAgo}</span>
                          <div className="flex items-center space-x-4">
                            <button 
                              onClick={() => handleLike(item.id)}
                              className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors duration-200"
                            >
                              <Heart size={14} />
                              <span>{item.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors duration-200">
                              <MessageCircle size={14} />
                              <span>{item.comments}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && (
          <div className="flex justify-center mt-8">
            <button 
              className="px-8 py-3 rounded-full font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              style={{ backgroundColor: '#D97706' }}
            >
              Load More Recipes
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {getFilteredContent().length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <ChefHat size={64} className="text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes yet</h3>
          <p className="text-gray-500 text-center max-w-md">
            {selectedChef === 'all' 
              ? "Start following some chefs to see their latest recipes and updates in your feed."
              : `${selectedChefData?.name} hasn't shared any recipes yet. Check back later!`
            }
          </p>
          <button 
            className="mt-6 px-6 py-3 rounded-full font-medium text-white transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: '#D97706' }}
          >
            Discover Chefs
          </button>
        </div>
      )}
    </div>
  );
};

export default MyFeed