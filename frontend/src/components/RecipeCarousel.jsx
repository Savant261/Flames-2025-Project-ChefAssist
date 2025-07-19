import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RecipeCard2 from "./RecipeCard2.jsx";

const RecipeCarousel = ({ title, recipes }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth * 0.8
          : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-gray-100">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-[var(--color-chef-cream)] dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-[var(--color-chef-cream)] dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
      >
        {recipes.map((recipe) => (
          <RecipeCard2 key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeCarousel;
