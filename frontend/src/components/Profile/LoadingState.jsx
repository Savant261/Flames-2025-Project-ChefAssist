import React from 'react';

const LoadingState = () => {
  return (
    <div className="flex flex-col bg-chef-cream dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
          {/* Header Loading */}
          <div className="bg-gray-300 dark:bg-gray-700 h-64"></div>
          
          {/* Stats Loading */}
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="bg-gray-300 dark:bg-gray-700 rounded-full w-20 h-20 mx-auto mb-3"></div>
                  <div className="bg-gray-300 dark:bg-gray-700 h-4 w-16 mx-auto rounded"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Content Loading */}
          <div className="p-6 space-y-4">
            <div className="bg-gray-300 dark:bg-gray-700 h-8 w-1/3 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
