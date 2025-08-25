import React from 'react';

const FeedLoading = () => {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          {/* Header */}
          <div className="flex items-center p-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="ml-3 flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
          
          {/* Image */}
          <div className="w-full h-64 bg-gray-200"></div>
          
          {/* Content */}
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            
            <div className="flex items-center gap-4">
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-8 ml-auto"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedLoading;
