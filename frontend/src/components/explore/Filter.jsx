import React, { useState, useMemo, useRef, useEffect } from 'react'
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
const Filter = () => {
    const filterOptions = {
        cuisine: ["Italian", "Indian", "Chinese", "Mexican", "Thai", "Japanese", "Mediterranean", "American"],
        dietary: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto"],
        difficulty: ["Easy", "Medium", "Hard"],
        time: ["Under 30 min", "30-60 min", "Over 60 min"],
        sortBy: ["Most Popular", "Highest Rated", "Newest"] // Added for the new dropdown
    };
    const [isFilterVisible, setIsFilterVisible] = useState(false); // State to toggle the filter bar
    const [openDropdown, setOpenDropdown] = useState(null);
    const [filters, setFilters] = useState({
        cuisine: [], dietary: [], difficulty: [], time: [], sortBy: 'Most Popular'
    });
    const filterRef = useRef(null);

    // Custom hook to close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [filterRef]);


    const handleCheckboxChange = (type, value) => {
        setFilters(prev => {
            const currentValues = prev[type];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [type]: newValues };
        });
    };

    const handleSortChange = (value) => {
        setFilters(prev => ({ ...prev, sortBy: value }));
        setOpenDropdown(null); // Close dropdown after selection
    };

    const clearFilters = () => {
        setFilters({ cuisine: [], dietary: [], difficulty: [], time: [], sortBy: 'Most Popular' });
    };

    const activeFilters = useMemo(() => {
        return Object.entries(filters).flatMap(([type, values]) =>
            type !== 'sortBy' && Array.isArray(values) ? values.map(value => ({ type, value })) : []
        );
    }, [filters]);

    const FilterButton = ({ name, type, children }) => (
        <div className="relative">
            <button onClick={() => setOpenDropdown(openDropdown === type ? null : type)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 transition bg-white border border-gray-300 rounded-full hover:border-[#FF6F61] hover:bg-white">
                {name} <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === type ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === type && children}
        </div>
    );

    return (
        <div className="top-[68px] z-20 bg-white/80 backdrop-blur-sm shadow-sm" ref={filterRef}>
            <div className="p-4 mx-auto max-w-7xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">Filter & Sort</h3>
                    <button
                        onClick={() => setIsFilterVisible(!isFilterVisible)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white transition rounded-full bg-[#FF6F61] hover:bg-[#E55B4D]"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>{isFilterVisible ? 'Hide' : 'Show'}</span>
                    </button>
                </div>

                {isFilterVisible && (
                    <div className="pt-4 mt-4 border-t">
                        <div className="flex flex-wrap items-center gap-3">
                            <FilterButton name="Cuisine" type="cuisine">
                                <div className="absolute left-0 w-56 p-2 mt-2 bg-white rounded-lg shadow-xl z-20">
                                    {filterOptions.cuisine.map(option => (
                                        <label key={option} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-md cursor-pointer hover:bg-[#FFF8E7]"><input type="checkbox" checked={filters.cuisine.includes(option)} onChange={() => handleCheckboxChange('cuisine', option)} className="w-4 h-4 rounded text-[#FF6F61] focus:ring-[#FF6F61]" />{option}</label>
                                    ))}
                                </div>
                            </FilterButton>
                            <FilterButton name="Dietary" type="dietary">
                                <div className="absolute left-0 w-56 p-2 mt-2 bg-white rounded-lg shadow-xl z-20">
                                    {filterOptions.dietary.map(option => (
                                        <label key={option} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-md cursor-pointer hover:bg-[#FFF8E7]"><input type="checkbox" checked={filters.dietary.includes(option)} onChange={() => handleCheckboxChange('dietary', option)} className="w-4 h-4 rounded text-[#FF6F61] focus:ring-[#FF6F61]" />{option}</label>
                                    ))}
                                </div>
                            </FilterButton>
                            <FilterButton name="Difficulty" type="difficulty">
                                <div className="absolute left-0 w-56 p-2 mt-2 bg-white rounded-lg shadow-xl z-20">
                                    {filterOptions.difficulty.map(option => (
                                        <label key={option} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-md cursor-pointer hover:bg-[#FFF8E7]"><input type="checkbox" checked={filters.difficulty.includes(option)} onChange={() => handleCheckboxChange('difficulty', option)} className="w-4 h-4 rounded text-[#FF6F61] focus:ring-[#FF6F61]" />{option}</label>
                                    ))}
                                </div>
                            </FilterButton>
                            <FilterButton name="Time" type="time">
                                <div className="absolute left-0 w-56 p-2 mt-2 bg-white rounded-lg shadow-xl z-20">
                                    {filterOptions.time.map(option => (
                                        <label key={option} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-md cursor-pointer hover:bg-[#FFF8E7]"><input type="checkbox" checked={filters.time.includes(option)} onChange={() => handleCheckboxChange('time', option)} className="w-4 h-4 rounded text-[#FF6F61] focus:ring-[#FF6F61]" />{option}</label>
                                    ))}
                                </div>
                            </FilterButton>
                            <div className="flex-grow"></div>
                            <FilterButton name={`Sort By: ${filters.sortBy}`} type="sortBy">
                                <div className="absolute right-0 w-56 p-2 mt-2 bg-white rounded-lg shadow-xl z-20">
                                    {filterOptions.sortBy.map(option => (
                                        <button key={option} onClick={() => handleSortChange(option)} className={`w-full text-left flex items-center gap-3 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[#FFF8E7] ${filters.sortBy === option ? 'font-bold text-[#D35400]' : 'text-gray-600'}`}>
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </FilterButton>
                        </div>
                        {activeFilters.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-4 mt-3 border-t border-gray-200">
                                {activeFilters.map(({ type, value }) => (
                                    <div key={value} className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white bg-[#FF6F61] rounded-full">
                                        {value}
                                        <button onClick={() => handleCheckboxChange(type, value)}><X className="w-3 h-3" /></button>
                                    </div>
                                ))}
                                <button onClick={clearFilters} className="px-3 py-1 text-xs font-semibold text-gray-600 transition hover:text-red-500">Clear All</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filter