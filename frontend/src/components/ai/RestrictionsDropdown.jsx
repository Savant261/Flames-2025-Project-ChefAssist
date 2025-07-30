import React from 'react';
import { restrictionsList } from './constants';

const RestrictionsDropdown = ({ 
  showDropdown, 
  setShowDropdown, 
  selectedRestrictions, 
  handleRestrictionToggle 
}) => {
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 dark:bg-gray-800 text-[#FF7F3F] dark:text-orange-400 font-bold shadow border border-[#FFDCA9] dark:border-orange-400 hover:bg-[#FFDCA9] dark:hover:bg-gray-700 transition-all duration-200 animate-fade-in-item"
        style={{ boxShadow: "0 2px 12px #FFDCA955" }}
        onClick={() => setShowDropdown((prev) => !prev)}
        title="Select Restrictions"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="#FF7F3F"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Restrictions
      </button>
      
      {showDropdown && (
        <div
          className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-900 border border-[#FFDCA9] dark:border-orange-400 rounded-2xl shadow-xl p-4 flex flex-col gap-2 animate-dropdown-fade-in-scale min-w-[220px]"
          style={{ boxShadow: "0 4px 24px #FFDCA9AA" }}
        >
          <span className="text-[#FF7F3F] dark:text-orange-400 font-bold mb-2">
            Dietary Restrictions
          </span>
          {restrictionsList.map(({ id, label, icon: Icon }) => (
            <label
              key={id}
              className="flex items-center gap-3 cursor-pointer px-2 py-1 rounded-lg hover:bg-[#FFF6E9] dark:hover:bg-gray-800 transition-all"
            >
              <input
                type="checkbox"
                checked={selectedRestrictions.includes(id)}
                onChange={() => handleRestrictionToggle(id)}
                className="form-checkbox h-5 w-5 text-[#FF7F3F] dark:text-orange-400 border-[#FFDCA9] dark:border-orange-400 rounded focus:ring-2 focus:ring-[#FFDCA9] dark:focus:ring-orange-400 bg-white dark:bg-gray-900"
              />
              <Icon className="w-5 h-5 text-[#FF7F3F] dark:text-orange-400" />
              <span className="text-[#181A1B] dark:text-orange-200 font-semibold">
                {label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestrictionsDropdown;
