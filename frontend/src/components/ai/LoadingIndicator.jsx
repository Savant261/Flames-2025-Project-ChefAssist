import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const LoadingIndicator = ({ isLoading }) => {
  const [loadingMessage, setLoadingMessage] = useState("Generating...");

  useEffect(() => {
    if (!isLoading) return;

    const messages = [
      "Generating...",
      "Creating your recipe...",
      "AI is thinking...",
      "Almost there...",
      "Perfecting the recipe...",
      "This may take up to 2 minutes..."
    ];

    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed left-0 right-0 bottom-0 flex items-end justify-center z-50 pointer-events-none">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 mb-12 max-w-xl w-full animate-fade-in-scale border border-[#FFDCA9] dark:border-orange-400 pointer-events-auto flex flex-col items-center justify-center transition-all duration-300">
        <div className="flex items-center mb-2">
          <Loader2 className="w-6 h-6 mr-2 animate-spin text-[#FF7F3F] dark:text-orange-400" />
          <span className="text-[#FF7F3F] dark:text-orange-400 text-lg font-semibold">
            {loadingMessage}
          </span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          AI recipe generation can take 30-120 seconds
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
