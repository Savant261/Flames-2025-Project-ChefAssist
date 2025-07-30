import React from 'react';
import { modes } from './constants';

const ModeSelector = ({ selectedMode, setSelectedMode }) => {
  return (
    <div className="flex flex-row gap-4 mb-2">
      {modes.map(({ id, label }, idx) => (
        <button
          key={id}
          type="button"
          onClick={() => setSelectedMode(id)}
          className={`px-6 py-3 rounded-full font-semibold text-lg shadow border-2 transition-all duration-200
            ${
              selectedMode === id
                ? "bg-gradient-to-r from-[#FF7F3F] to-[#FFDCA9] text-white border-[#FFDCA9] scale-105 dark:bg-gradient-to-r dark:from-orange-400 dark:to-orange-200 dark:text-gray-900 dark:border-orange-400"
                : "bg-white/80 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400 border-[#FFDCA9] dark:border-orange-400 hover:bg-[#FFF6E9] dark:hover:bg-gray-700"
            }
          animate-fade-in-item`}
          style={{
            animationDelay: `${idx * 0.05}s`,
            boxShadow:
              selectedMode === id
                ? "0 4px 16px #FF7F3F55"
                : "0 2px 8px #FFDCA955",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
