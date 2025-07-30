import React from 'react';
import { Loader2 } from 'lucide-react';

const ChatStatus = ({ isLoadingChat, currentChat, activeChats, error }) => {
  return (
    <>
      {/* Loading chat indicator */}
      {isLoadingChat && (
        <div className="w-full mb-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-400 text-blue-700 dark:text-blue-300 px-4 py-2 rounded text-sm flex items-center">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Loading previous chat...
        </div>
      )}
      
      {/* Active chat status - Removed as requested */}
      {/* Chat ID is now managed via URL params only */}

      {/* Error display */}
      {error && (
        <div className="w-full mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </>
  );
};

export default ChatStatus;
