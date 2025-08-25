import React from 'react';
import { Users } from 'lucide-react';

const ChefCard = ({ chef, isActive, onClick }) => {
  return (
    <div 
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
        isActive ? 'bg-orange-50 border-l-4 border-orange-500' : ''
      }`}
      onClick={() => onClick(chef)}
    >
      <div className="relative">
        <img 
          src={chef.avatar || '/api/placeholder/40/40'} 
          alt={chef.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        {chef.isActive && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{chef.name}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users className="w-3 h-3" />
          <span>{chef.followers}</span>
          <span>•</span>
          <span>{chef.recipes} recipes</span>
        </div>
      </div>
    </div>
  );
};

export default ChefCard;
