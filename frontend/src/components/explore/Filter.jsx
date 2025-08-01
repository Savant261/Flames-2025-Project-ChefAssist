import React, { useState, useMemo, useRef, useEffect } from 'react'
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';

const Filter = ({ onFilterChange, currentFilters = {} }) => {
    const filterOptions = {
        cuisine: ["Italian", "Indian", "Chinese", "Mexican", "Thai", "Japanese", "Mediterranean", "American"],
        dietary: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto"],
        difficulty: ["Easy", "Medium", "Hard"],
        time: ["0-30", "30-60", "60+"],
        sortBy: ["relevance", "newest", "popular", "rating"] // Updated to match backend
    };
    
    const sortByLabels = {
        relevance: "Most Relevant",
        newest: "Newest First",
        popular: "Most Popular", 
        rating: "Highest Rated"
    };

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [filters, setFilters] = useState({
        cuisine: [],
        dietary: [], 
        difficulty: currentFilters.difficulty || "",
        time: currentFilters.cookTime || "",
        sortBy: currentFilters.sortBy || 'relevance'
    });
    const filterRef = useRef(null);

    // Update local filters when currentFilters prop changes
    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            difficulty: currentFilters.difficulty || "",
            time: currentFilters.cookTime || "",
            sortBy: currentFilters.sortBy || 'relevance'
        }));
    }, [currentFilters]);

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
            const newValues = Array.isArray(currentValues) 
                ? (currentValues.includes(value)
                    ? currentValues.filter(v => v !== value)
                    : [...currentValues, value])
                : value;
            return { ...prev, [type]: newValues };
        });
    };

    const handleSingleSelectChange = (type, value) => {
        setFilters(prev => ({ 
            ...prev, 
            [type]: prev[type] === value ? "" : value 
        }));
        setOpenDropdown(null);
    };

    const handleSortChange = (value) => {
        setFilters(prev => ({ ...prev, sortBy: value }));
        setOpenDropdown(null);
    };

    // Notify parent component of filter changes
    useEffect(() => {
        if (onFilterChange) {
            const backendFilters = {
                tags: filters.cuisine.concat(filters.dietary).join(','),
                difficulty: filters.difficulty,
                cookTime: filters.time,
                sortBy: filters.sortBy
            };
            // Only call if filters actually changed
            const filtersChanged = JSON.stringify(backendFilters) !== JSON.stringify(currentFilters);
            if (filtersChanged) {
                onFilterChange(backendFilters);
            }
        }
    }, [filters, onFilterChange]);

    const clearFilters = () => {
        setFilters({ 
            cuisine: [], 
            dietary: [], 
            difficulty: "", 
            time: "", 
            sortBy: 'relevance' 
        });
    };

    const activeFilters = useMemo(() => {
        const active = [];
        if (filters.cuisine.length > 0) {
            active.push(...filters.cuisine.map(value => ({ type: 'cuisine', value })));
        }
        if (filters.dietary.length > 0) {
            active.push(...filters.dietary.map(value => ({ type: 'dietary', value })));
        }
        if (filters.difficulty) {
            active.push({ type: 'difficulty', value: filters.difficulty });
        }
        if (filters.time) {
            active.push({ type: 'time', value: `${filters.time} min` });
        }
        return active;
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
        <div className="top-[68px] z-20 bg-chef-cream/80 backdrop-blur-sm " ref={filterRef}>
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
                                        <button 
                                            key={option} 
                                            onClick={() => handleSingleSelectChange('difficulty', option)}
                                            className={`w-full text-left flex items-center gap-3 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[#FFF8E7] ${filters.difficulty === option ? 'font-bold text-[#D35400]' : 'text-gray-600'}`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </FilterButton>
                            <FilterButton name="Time" type="time">
                                <div className="absolute left-0 w-56 p-2 mt-2 bg-white rounded-lg shadow-xl z-20">
                                    {filterOptions.time.map(option => (
                                        <button 
                                            key={option} 
                                            onClick={() => handleSingleSelectChange('time', option)}
                                            className={`w-full text-left flex items-center gap-3 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[#FFF8E7] ${filters.time === option ? 'font-bold text-[#D35400]' : 'text-gray-600'}`}
                                        >
                                            {option} min
                                        </button>
                                    ))}
                                </div>
                            </FilterButton>
                            <div className="flex-grow"></div>
                            <FilterButton name={`Sort By: ${sortByLabels[filters.sortBy]}`} type="sortBy">
                                <div className="absolute right-0 w-56 p-2 mt-2 bg-white rounded-lg shadow-xl z-20">
                                    {filterOptions.sortBy.map(option => (
                                        <button key={option} onClick={() => handleSortChange(option)} className={`w-full text-left flex items-center gap-3 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[#FFF8E7] ${filters.sortBy === option ? 'font-bold text-[#D35400]' : 'text-gray-600'}`}>
                                            {sortByLabels[option]}
                                        </button>
                                    ))}
                                </div>
                            </FilterButton>
                        </div>
                        {activeFilters.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-4 mt-3 border-t border-gray-200">
                                {activeFilters.map(({ type, value }) => (
                                    <div key={`${type}-${value}`} className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white bg-[#FF6F61] rounded-full">
                                        {value}
                                        <button onClick={() => {
                                            if (type === 'difficulty' || type === 'time') {
                                                handleSingleSelectChange(type, type === 'difficulty' ? value : value.replace(' min', ''));
                                            } else {
                                                handleCheckboxChange(type, value);
                                            }
                                        }}>
                                            <X className="w-3 h-3" />
                                        </button>
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