import React, { memo } from 'react';

const MessageCard = memo(({ chat, isCurrentOutput = false, input = "", isStreaming = false }) => {
  // Handle both old format (string) and new format (object)
  const userInput = isCurrentOutput ? input : chat.input;
  const aiOutput = isCurrentOutput ? chat : chat.output;
  const chatIsStreaming = isStreaming || chat.isStreaming || false;

  return (
    <div className="flex flex-col items-center w-full animate-fade-in-scale animate-expand-card max-w-5xl mx-auto">
      {/* User query pill on the right */}
      <div className="w-full flex justify-end mb-3">
        <div
          className="bg-[#A5A6B2] dark:bg-orange-400 text-white dark:text-gray-900 px-4 py-2 rounded-full text-base font-semibold shadow-lg max-w-md text-right animate-fade-in-item"
          style={{ boxShadow: "0 2px 12px #A5A6B255" }}
        >
          {userInput}
        </div>
      </div>
      
      {/* AI response card centered */}
      <div
        className="bg-white/90 dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border border-[#FFDCA9] dark:border-orange-400 w-full backdrop-blur-lg"
        style={{
          boxShadow: "0 8px 32px #FFDCA9AA",
          transition: "transform 0.2s",
        }}
      >
        <div className="text-[#181A1B] dark:text-orange-200 whitespace-pre-line text-lg font-semibold tracking-wide mb-2">
          {aiOutput}
          {/* Show typing indicator when streaming */}
          {chatIsStreaming && (
            <span className="inline-block ml-2 animate-pulse">
              <span className="bg-[#FF7F3F] w-2 h-2 rounded-full inline-block mr-1 animate-bounce"></span>
              <span className="bg-[#FF7F3F] w-2 h-2 rounded-full inline-block mr-1 animate-bounce" style={{ animationDelay: '0.1s' }}></span>
              <span className="bg-[#FF7F3F] w-2 h-2 rounded-full inline-block animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            </span>
          )}
        </div>
        
        {/* Action buttons row (like Gemini) */}
        <div className="flex gap-4 mt-4">
          <button
            className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-3 py-1.5 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110"
            style={{ transition: "transform 0.2s" }}
          >
            👍
          </button>
          <button
            className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-3 py-1.5 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110"
            style={{ transition: "transform 0.2s" }}
          >
            👎
          </button>
          <button
            className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-3 py-1.5 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110"
            style={{ transition: "transform 0.2s" }}
          >
            🔗
          </button>
          <button
            className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-3 py-1.5 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110"
            style={{ transition: "transform 0.2s" }}
          >
            📋
          </button>
        </div>
      </div>
    </div>
  );
});

MessageCard.displayName = 'MessageCard';

export default MessageCard;
