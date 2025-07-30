import React from 'react';
import RestrictionsDropdown from './RestrictionsDropdown';

const AiHeader = ({
  showDropdown,
  setShowDropdown,
  selectedRestrictions,
  handleRestrictionToggle,
  currentChat,
  startNewChat,
  setShowHistory
}) => {
  return (
    <div className="w-full flex flex-row items-center justify-between absolute top-6 left-0 right-0 px-8 z-40">
      {/* Restrictions Button - Top Left */}
      <RestrictionsDropdown
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        selectedRestrictions={selectedRestrictions}
        handleRestrictionToggle={handleRestrictionToggle}
      />
      
      {/* Top Right Buttons */}
      <div className="flex items-center gap-3">
        {/* New Chat Button */}
        {currentChat && (
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400 font-bold shadow border border-[#FFDCA9] dark:border-orange-400 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 transition-all duration-200 animate-fade-in-item"
            style={{ boxShadow: "0 2px 12px #FFDCA955" }}
            onClick={startNewChat}
            title="Start New Chat"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#FF7F3F"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Chat
          </button>
        )}

        {/* History Button */}
        <button
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400 font-bold shadow border border-[#FFDCA9] dark:border-orange-400 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 transition-all duration-200 animate-fade-in-item"
          style={{ boxShadow: "0 2px 12px #FFDCA955" }}
          onClick={() => setShowHistory(true)}
          title="Show History"
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="#FF7F3F"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 12a9 9 0 1 0 9-9" />
            <path d="M12 7v5l3 3" />
          </svg>
          History
        </button>
      </div>
    </div>
  );
};

export default AiHeader;
