import React, { memo } from 'react';

const MessageCard = memo(({ chat, isCurrentOutput = false, input = "" }) => {
  return (
    <div className="flex flex-col items-center w-full animate-fade-in-scale animate-expand-card">
      {/* User query pill on the right */}
      <div className="w-full flex justify-end mb-4">
        <div
          className="bg-[#A5A6B2] dark:bg-orange-400 text-white dark:text-gray-900 px-6 py-3 rounded-full text-lg font-semibold shadow-lg max-w-xs text-right animate-fade-in-item"
          style={{ boxShadow: "0 2px 12px #A5A6B255" }}
        >
          {isCurrentOutput ? input : chat.input}
        </div>
      </div>
      
      {/* AI response card centered */}
      <div
        className="bg-white/90 dark:bg-gray-900 rounded-3xl shadow-2xl p-10 border border-[#FFDCA9] dark:border-orange-400 w-full backdrop-blur-lg"
        style={{
          boxShadow: "0 8px 32px #FFDCA9AA",
          transition: "transform 0.2s",
        }}
      >
        <div className="text-[#181A1B] dark:text-orange-200 whitespace-pre-line text-xl font-semibold tracking-wide mb-2">
          {isCurrentOutput ? chat : chat.output}
        </div>
        
        {/* Action buttons row (like Gemini) */}
        <div className="flex gap-6 mt-8">
          <button
            className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-4 py-2 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110"
            style={{ transition: "transform 0.2s" }}
          >
            👍
          </button>
          <button
            className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-4 py-2 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110"
            style={{ transition: "transform 0.2s" }}
          >
            👎
          </button>
          <button
            className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-4 py-2 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110"
            style={{ transition: "transform 0.2s" }}
          >
            🔗
          </button>
          <button
            className="text-[#FF7F3F] dark:text-orange-400 bg-white/80 dark:bg-gray-800 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 rounded-full px-4 py-2 font-semibold transition shadow animate-pulse-on-hover scale-100 hover:scale-110"
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
