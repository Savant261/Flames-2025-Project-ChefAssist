import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight} from 'lucide-react';
import RecipeCard2 from "./RecipeCard2.jsx"

const RecipeCarousel = ({ title, recipes }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const calculateMaxScroll = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        setMaxScroll(Math.max(0, contentWidth - containerWidth));
      }
    };
    calculateMaxScroll();
    window.addEventListener("resize", calculateMaxScroll);
    return () => window.removeEventListener("resize", calculateMaxScroll);
  }, [recipes]);

  const scroll = (direction) => {
    const containerWidth = containerRef.current.offsetWidth;
    const scrollAmount = containerWidth * 0.8;
    let newScrollPosition =
      direction === "left"
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;

    // Clamp the scroll position
    newScrollPosition = Math.max(0, Math.min(newScrollPosition, maxScroll));
    setScrollPosition(newScrollPosition);
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-gray-100">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={scrollPosition === 0}
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-[var(--color-chef-cream)] dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={scrollPosition >= maxScroll}
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-[var(--color-chef-cream)] dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="overflow-hidden relative max-w-7xl mx-auto"
      >
        <div
          ref={contentRef}
          className="flex gap-6 px-4 sm:px-6 lg:px-8 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {recipes.map((recipe) => (
            <RecipeCard2 key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeCarousel;
