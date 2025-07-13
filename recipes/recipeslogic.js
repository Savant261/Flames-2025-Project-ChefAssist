// Recipe Page Logic
let currentPage = 1;
let totalPages = 52;
let currentView = 'grid';
let activeFilters = {
    cuisine: [],
    dietary: [],
    difficulty: [],
    time: [],
    search: '',
    ingredientSearch: ''
};

// Sample recipe data
const sampleRecipes = [
    {
        id: 1,
        title: "Creamy Garlic Parmesan Pasta",
        image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
        cuisine: "Italian",
        rating: 4.8,
        reviews: 124,
        cookTime: "25 min",
        difficulty: "Easy",
        description: "Rich and creamy pasta with garlic and parmesan cheese, perfect for a quick weeknight dinner.",
        author: {
            name: "Chef Maria",
            avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        badges: ["Chef's Pick"],
        dietary: ["Vegetarian"],
        ingredients: ["pasta", "garlic", "parmesan", "cream"],
        views: 2340,
        saves: 89,
        isNew: false,
        isTrending: true,
        isLiked: false,
        isSaved: false
    },
    {
        id: 2,
        title: "Spicy Thai Basil Stir Fry",
        image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
        cuisine: "Thai",
        rating: 4.6,
        reviews: 89,
        cookTime: "15 min",
        difficulty: "Medium",
        description: "Authentic Thai stir fry with fresh basil and chilies, bursting with flavor.",
        author: {
            name: "Chef Somchai",
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        badges: ["Hot", "Trending"],
        dietary: [],
        ingredients: ["chicken", "basil", "chilies", "soy sauce"],
        views: 1890,
        saves: 67,
        isNew: false,
        isTrending: true,
        isLiked: false,
        isSaved: false
    },
    {
        id: 3,
        title: "Classic Margherita Pizza",
        image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
        cuisine: "Italian",
        rating: 4.9,
        reviews: 203,
        cookTime: "45 min",
        difficulty: "Medium",
        description: "Traditional pizza with fresh mozzarella, tomatoes, and basil.",
        author: {
            name: "Chef Giuseppe",
            avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        badges: ["Chef's Pick", "Vegetarian"],
        dietary: ["Vegetarian"],
        ingredients: ["pizza dough", "mozzarella", "tomatoes", "basil"],
        views: 3210,
        saves: 156,
        isNew: false,
        isTrending: false,
        isLiked: false,
        isSaved: false
    },
    {
        id: 4,
        title: "Butter Chicken Curry",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
        cuisine: "Indian",
        rating: 4.7,
        reviews: 167,
        cookTime: "40 min",
        difficulty: "Medium",
        description: "Creamy and rich Indian curry with tender chicken in tomato-based sauce.",
        author: {
            name: "Chef Priya",
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        badges: ["New"],
        dietary: [],
        ingredients: ["chicken", "tomatoes", "cream", "spices"],
        views: 2780,
        saves: 134,
        isNew: true,
        isTrending: false,
        isLiked: false,
        isSaved: false
    },
    {
        id: 5,
        title: "Avocado Toast Supreme",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        cuisine: "American",
        rating: 4.4,
        reviews: 78,
        cookTime: "10 min",
        difficulty: "Easy",
        description: "Elevated avocado toast with poached egg and everything seasoning.",
        author: {
            name: "Chef Sarah",
            avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        badges: ["Vegetarian"],
        dietary: ["Vegetarian"],
        ingredients: ["avocado", "bread", "egg", "seasoning"],
        views: 1450,
        saves: 45,
        isNew: false,
        isTrending: false,
        isLiked: false,
        isSaved: false
    },
    {
        id: 6,
        title: "Beef Tacos with Salsa",
        image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=400",
        cuisine: "Mexican",
        rating: 4.5,
        reviews: 134,
        cookTime: "30 min",
        difficulty: "Easy",
        description: "Authentic Mexican tacos with seasoned beef and fresh salsa.",
        author: {
            name: "Chef Carlos",
            avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        badges: [],
        dietary: [],
        ingredients: ["beef", "tortillas", "tomatoes", "onions"],
        views: 1890,
        saves: 89,
        isNew: false,
        isTrending: false,
        isLiked: false,
        isSaved: false
    },
    {
        id: 7,
        title: "Vegan Buddha Bowl",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        cuisine: "Healthy",
        rating: 4.6,
        reviews: 92,
        cookTime: "20 min",
        difficulty: "Easy",
        description: "Nutritious bowl with quinoa, roasted vegetables, and tahini dressing.",
        author: {
            name: "Chef Emma",
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        badges: ["Vegan", "Healthy"],
        dietary: ["Vegan", "Gluten-Free"],
        ingredients: ["quinoa", "vegetables", "tahini", "chickpeas"],
        views: 1670,
        saves: 78,
        isNew: true,
        isTrending: false,
        isLiked: false,
        isSaved: false
    },
    {
        id: 8,
        title: "Chocolate Lava Cake",
        image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
        cuisine: "French",
        rating: 4.8,
        reviews: 156,
        cookTime: "25 min",
        difficulty: "Hard",
        description: "Decadent chocolate cake with molten center, perfect for special occasions.",
        author: {
            name: "Chef Pierre",
            avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        badges: ["Chef's Pick"],
        dietary: ["Vegetarian"],
        ingredients: ["chocolate", "butter", "eggs", "flour"],
        views: 2340,
        saves: 167,
        isNew: false,
        isTrending: true,
        isLiked: false,
        isSaved: false
    },
    {
        id: 9,
        title: "Mediterranean Quinoa Bowl",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        cuisine: "Mediterranean",
        rating: 4.5,
        reviews: 89,
        cookTime: "25 min",
        difficulty: "Easy",
        description: "Healthy quinoa bowl with fresh vegetables and feta cheese.",
        author: {
            name: "Chef Elena",
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        badges: ["Healthy"],
        dietary: ["Vegetarian", "Gluten-Free"],
        ingredients: ["quinoa", "vegetables", "feta", "olives"],
        views: 1230,
        saves: 56,
        isNew: false,
        isTrending: false,
        isLiked: false,
        isSaved: false
    },
    {
        id: 10,
        title: "Chicken Teriyaki Bowl",
        image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
        cuisine: "Japanese",
        rating: 4.7,
        reviews: 145,
        cookTime: "30 min",
        difficulty: "Medium",
        description: "Tender chicken glazed with teriyaki sauce over steamed rice.",
        author: {
            name: "Chef Yuki",
            avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        badges: [],
        dietary: [],
        ingredients: ["chicken", "teriyaki sauce", "rice", "vegetables"],
        views: 1890,
        saves: 98,
        isNew: false,
        isTrending: true,
        isLiked: false,
        isSaved: false
    },
    {
        id: 11,
        title: "Fish and Chips",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        cuisine: "British",
        rating: 4.3,
        reviews: 67,
        cookTime: "35 min",
        difficulty: "Medium",
        description: "Classic British fish and chips with crispy batter and golden fries.",
        author: {
            name: "Chef Oliver",
            avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        badges: [],
        dietary: [],
        ingredients: ["fish", "potatoes", "flour", "oil"],
        views: 1456,
        saves: 67,
        isNew: false,
        isTrending: false,
        isLiked: false,
        isSaved: false
    },
    {
        id: 12,
        title: "Pad Thai Noodles",
        image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
        cuisine: "Thai",
        rating: 4.6,
        reviews: 123,
        cookTime: "20 min",
        difficulty: "Medium",
        description: "Authentic Thai noodles with shrimp, tofu, and peanuts.",
        author: {
            name: "Chef Niran",
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
        },
        badges: ["Trending"],
        dietary: [],
        ingredients: ["rice noodles", "shrimp", "tofu", "peanuts"],
        views: 2100,
        saves: 112,
        isNew: false,
        isTrending: true,
        isLiked: false,
        isSaved: false
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeCountdown();
    populateAllSections();
    initializeScrollToTop();
});

// Event Listeners
function initializeEventListeners() {
    // Search functionality
    const mainSearch = document.getElementById('mainSearch');
    const ingredientSearch = document.getElementById('ingredientSearch');
    
    mainSearch.addEventListener('input', debounce(handleMainSearch, 300));
    ingredientSearch.addEventListener('input', debounce(handleIngredientSearch, 300));
    
    // View toggle
    document.getElementById('viewToggle').addEventListener('click', toggleView);
    
    // Filter dropdowns
    initializeFilterDropdowns();
    
    // Sort functionality
    document.getElementById('sortBy').addEventListener('change', handleSort);
    
    // Clear filters
    document.getElementById('clearFilters').addEventListener('click', clearAllFilters);
    
    // Pagination
    document.getElementById('prevPage').addEventListener('click', () => changePage(currentPage - 1));
    document.getElementById('nextPage').addEventListener('click', () => changePage(currentPage + 1));
    
    // Quick view modal
    document.getElementById('closeQuickView').addEventListener('click', closeQuickView);
    
    // Floating buttons
    document.getElementById('submitRecipeBtn').addEventListener('click', () => {
        showToast('Submit Recipe feature coming soon!', 'info');
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.relative')) {
            closeAllDropdowns();
        }
    });
}

// Search functionality
function handleMainSearch(e) {
    activeFilters.search = e.target.value.toLowerCase();
    showSearchSuggestions(e.target.value);
    loadRecipes();
}

function handleIngredientSearch(e) {
    activeFilters.ingredientSearch = e.target.value.toLowerCase();
    loadRecipes();
}

function showSearchSuggestions(query) {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    
    if (!query.trim()) {
        suggestionsContainer.classList.add('hidden');
        return;
    }
    
    const suggestions = [
        'Pasta recipes',
        'Quick dinner ideas',
        'Vegetarian meals',
        'Spicy dishes',
        'Desserts',
        'Healthy options'
    ].filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()));
    
    if (suggestions.length > 0) {
        suggestionsContainer.innerHTML = suggestions.map(suggestion => 
            `<div class="search-suggestion p-3 hover:bg-chef-cream cursor-pointer border-b border-gray-100 last:border-b-0" onclick="selectSuggestion('${suggestion}')">${suggestion}</div>`
        ).join('');
        suggestionsContainer.classList.remove('hidden');
    } else {
        suggestionsContainer.classList.add('hidden');
    }
}

function selectSuggestion(suggestion) {
    document.getElementById('mainSearch').value = suggestion;
    activeFilters.search = suggestion.toLowerCase();
    document.getElementById('searchSuggestions').classList.add('hidden');
    loadRecipes();
}

// Filter functionality
function initializeFilterDropdowns() {
    const filterButtons = ['cuisineFilter', 'dietaryFilter', 'difficultyFilter', 'timeFilter'];
    
    filterButtons.forEach(buttonId => {
        document.getElementById(buttonId).addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdownId = buttonId.replace('Filter', 'Dropdown');
            toggleDropdown(dropdownId);
        });
    });
    
    // Checkbox event listeners
    document.querySelectorAll('.cuisine-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => updateFilter('cuisine', checkbox.value, checkbox.checked));
    });
    
    document.querySelectorAll('.dietary-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => updateFilter('dietary', checkbox.value, checkbox.checked));
    });
    
    document.querySelectorAll('.difficulty-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => updateFilter('difficulty', checkbox.value, checkbox.checked));
    });
    
    document.querySelectorAll('.time-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => updateFilter('time', checkbox.value, checkbox.checked));
    });
}

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const isHidden = dropdown.classList.contains('hidden');
    
    closeAllDropdowns();
    
    if (isHidden) {
        dropdown.classList.remove('hidden');
        dropdown.style.animation = 'slideInRight 0.2s ease-out';
    }
}

function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.filter-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.add('hidden');
    });
}

function updateFilter(type, value, isChecked) {
    if (isChecked) {
        if (!activeFilters[type].includes(value)) {
            activeFilters[type].push(value);
        }
    } else {
        activeFilters[type] = activeFilters[type].filter(item => item !== value);
    }
    
    updateActiveFiltersDisplay();
    loadRecipes();
}

function updateActiveFiltersDisplay() {
    const container = document.getElementById('activeFilters');
    const filters = [];
    
    // Collect all active filters
    Object.keys(activeFilters).forEach(type => {
        if (Array.isArray(activeFilters[type])) {
            activeFilters[type].forEach(value => {
                filters.push({ type, value });
            });
        }
    });
    
    if (filters.length === 0) {
        container.classList.add('hidden');
        return;
    }
    
    container.innerHTML = filters.map(filter => 
        `<div class="filter-chip bg-chef-orange text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
            <span>${formatFilterValue(filter.type, filter.value)}</span>
            <button onclick="removeFilter('${filter.type}', '${filter.value}')" class="hover:bg-chef-orange-dark rounded-full p-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>`
    ).join('');
    
    container.classList.remove('hidden');
}

function formatFilterValue(type, value) {
    const formatMap = {
        cuisine: {
            italian: '🍝 Italian',
            indian: '🍛 Indian',
            chinese: '🥢 Chinese',
            mexican: '🌮 Mexican',
            thai: '🌶️ Thai',
            japanese: '🍣 Japanese',
            mediterranean: '🫒 Mediterranean',
            american: '🍔 American'
        },
        dietary: {
            vegetarian: '🥬 Vegetarian',
            vegan: '🌱 Vegan',
            'gluten-free': '🌾 Gluten-Free',
            'dairy-free': '🥛 Dairy-Free',
            keto: '🥑 Keto'
        },
        difficulty: {
            easy: 'Easy',
            medium: 'Medium',
            hard: 'Hard'
        },
        time: {
            'under-30': '⚡ Under 30 min',
            '30-60': '⏰ 30-60 min',
            'over-60': '🕐 Over 60 min'
        }
    };
    
    return formatMap[type]?.[value] || value;
}

function removeFilter(type, value) {
    activeFilters[type] = activeFilters[type].filter(item => item !== value);
    
    // Uncheck the corresponding checkbox
    const checkbox = document.querySelector(`input[value="${value}"]`);
    if (checkbox) checkbox.checked = false;
    
    updateActiveFiltersDisplay();
    loadRecipes();
}

function clearAllFilters() {
    activeFilters = {
        cuisine: [],
        dietary: [],
        difficulty: [],
        time: [],
        search: '',
        ingredientSearch: ''
    };
    
    // Clear all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Clear search inputs
    document.getElementById('mainSearch').value = '';
    document.getElementById('ingredientSearch').value = '';
    
    // Reset sort
    document.getElementById('sortBy').value = 'popularity';
    
    updateActiveFiltersDisplay();
    loadRecipes();
}

// View toggle
function toggleView() {
    const gridIcon = document.getElementById('gridIcon');
    const listIcon = document.getElementById('listIcon');
    const viewText = document.getElementById('viewText');
    const recipeGrid = document.getElementById('recipeGrid');
    const recipeList = document.getElementById('recipeList');
    
    if (currentView === 'grid') {
        currentView = 'list';
        gridIcon.classList.add('hidden');
        listIcon.classList.remove('hidden');
        viewText.textContent = 'List';
        recipeGrid.classList.add('hidden');
        recipeList.classList.remove('hidden');
        populateListView();
    } else {
        currentView = 'grid';
        gridIcon.classList.remove('hidden');
        listIcon.classList.add('hidden');
        viewText.textContent = 'Grid';
        recipeGrid.classList.remove('hidden');
        recipeList.classList.add('hidden');
    }
}

// Recipe loading and filtering
function loadRecipes() {
    const filteredRecipes = filterRecipes(sampleRecipes);
    const sortedRecipes = sortRecipes(filteredRecipes);
    
    if (currentView === 'grid') {
        populateRecipeGrid(sortedRecipes);
    } else {
        populateListView(sortedRecipes);
    }
    
    updateRecipeCount(filteredRecipes.length);
    updatePagination();
}

function filterRecipes(recipes) {
    return recipes.filter(recipe => {
        // Search filter
        if (activeFilters.search && !recipe.title.toLowerCase().includes(activeFilters.search) && 
            !recipe.description.toLowerCase().includes(activeFilters.search) &&
            !recipe.cuisine.toLowerCase().includes(activeFilters.search)) {
            return false;
        }
        
        // Ingredient search filter
        if (activeFilters.ingredientSearch && 
            !recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(activeFilters.ingredientSearch))) {
            return false;
        }
        
        // Cuisine filter
        if (activeFilters.cuisine.length > 0 && 
            !activeFilters.cuisine.includes(recipe.cuisine.toLowerCase())) {
            return false;
        }
        
        // Dietary filter
        if (activeFilters.dietary.length > 0 && 
            !activeFilters.dietary.some(diet => recipe.dietary.includes(diet))) {
            return false;
        }
        
        // Difficulty filter
        if (activeFilters.difficulty.length > 0 && 
            !activeFilters.difficulty.includes(recipe.difficulty.toLowerCase())) {
            return false;
        }
        
        // Time filter
        if (activeFilters.time.length > 0) {
            const cookTimeMinutes = parseInt(recipe.cookTime);
            const timeMatches = activeFilters.time.some(timeRange => {
                switch(timeRange) {
                    case 'under-30': return cookTimeMinutes < 30;
                    case '30-60': return cookTimeMinutes >= 30 && cookTimeMinutes <= 60;
                    case 'over-60': return cookTimeMinutes > 60;
                    default: return false;
                }
            });
            if (!timeMatches) return false;
        }
        
        return true;
    });
}

function sortRecipes(recipes) {
    const sortBy = document.getElementById('sortBy').value;
    
    return [...recipes].sort((a, b) => {
        switch(sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return b.isNew - a.isNew;
            case 'time':
                return parseInt(a.cookTime) - parseInt(b.cookTime);
            case 'alphabetical':
                return a.title.localeCompare(b.title);
            case 'popularity':
            default:
                return b.views - a.views;
        }
    });
}

function populateAllSections() {
    // Populate trending recipes (6 cards)
    const trendingRecipes = sampleRecipes.filter(recipe => recipe.isTrending).slice(0, 6);
    populateTrendingGrid(trendingRecipes);
    
    // Populate recommended recipes (3 cards)
    const recommendedRecipes = sampleRecipes.slice(0, 3);
    populateRecommendedGrid(recommendedRecipes);
    
    // Populate recently viewed recipes (3 cards)
    const recentlyViewedRecipes = sampleRecipes.slice(3, 6);
    populateRecentlyViewedGrid(recentlyViewedRecipes);
    
    // Populate top rated recipes (3 cards)
    const topRatedRecipes = sampleRecipes.filter(recipe => recipe.badges.includes("Chef's Pick")).slice(0, 3);
    populateTopRatedGrid(topRatedRecipes);
    
    // Populate all recipes (12 cards)
    populateRecipeGrid(sampleRecipes);
}

function populateTrendingGrid(recipes) {
    const container = document.getElementById('trendingGrid');
    container.innerHTML = recipes.map(recipe => createTrendingCard(recipe)).join('');
}

function populateRecommendedGrid(recipes) {
    const container = document.getElementById('recommendedGrid');
    container.innerHTML = recipes.map(recipe => createSmallCard(recipe)).join('');
}

function populateRecentlyViewedGrid(recipes) {
    const container = document.getElementById('recentlyViewedGrid');
    container.innerHTML = recipes.map(recipe => createSmallCard(recipe)).join('');
}

function populateTopRatedGrid(recipes) {
    const container = document.getElementById('topRatedGrid');
    container.innerHTML = recipes.map(recipe => createSmallCard(recipe)).join('');
}

function populateRecipeGrid(recipes) {
    const container = document.getElementById('recipeGrid');
    container.innerHTML = recipes.map(recipe => createRecipeCard(recipe)).join('');
}

function populateListView(recipes) {
    const container = document.getElementById('recipeList');
    container.innerHTML = recipes.map(recipe => createRecipeListItem(recipe)).join('');
}

function createRecipeCard(recipe) {
    const badges = recipe.badges.map(badge => 
        `<span class="badge-${badge.toLowerCase().replace(/[^a-z]/g, '-')} px-2 py-1 text-xs font-medium text-white rounded-full">${badge}</span>`
    ).join('');
    
    const difficultyColor = getDifficultyColor(recipe.difficulty);
    
    return `
        <div class="recipe-card bg-white rounded-xl shadow-lg overflow-hidden border border-chef-peach/20 cursor-pointer group relative">
            <div class="relative overflow-hidden">
                <img src="${recipe.image}" alt="${recipe.title}" 
                     class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110">
                
                <!-- Heart icon for like -->
                <button class="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 ${recipe.isLiked ? 'text-red-500' : 'text-gray-400'}" 
                        onclick="event.stopPropagation(); toggleLike(${recipe.id})">
                    <svg class="w-5 h-5" fill="${recipe.isLiked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                </button>
                
                <!-- Badges -->
                <div class="absolute top-3 left-3 flex flex-wrap gap-1">
                    ${badges}
                </div>
                
                <!-- Cuisine and Difficulty tags -->
                <div class="absolute bottom-3 left-3 flex space-x-2">
                    <span class="cuisine-tag px-2 py-1 text-xs font-medium rounded-full">${recipe.cuisine}</span>
                    <span class="px-2 py-1 text-xs font-medium text-white rounded-full ${difficultyColor}">
                        ${recipe.difficulty}
                    </span>
                </div>
            </div>
            
            <div class="p-4">
                <h3 class="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-chef-orange transition-colors">
                    ${recipe.title}
                </h3>
                <p class="text-gray-600 text-sm mb-3 line-clamp-2">${recipe.description}</p>
                
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-1">
                        <span class="rating-stars text-yellow-400 text-sm">${generateStars(recipe.rating)}</span>
                        <span class="text-sm text-gray-600">${recipe.rating}</span>
                        <span class="text-sm text-gray-400">(${recipe.reviews})</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-500">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        ${recipe.cookTime}
                    </div>
                </div>
                
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-2">
                        <img src="${recipe.author.avatar}" alt="${recipe.author.name}" 
                             class="author-avatar w-6 h-6 rounded-full object-cover">
                        <span class="text-sm text-gray-600">${recipe.author.name}</span>
                    </div>
                    <div class="social-proof flex items-center text-sm text-gray-500">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        <span>${recipe.views.toLocaleString()}</span>
                    </div>
                </div>
                
                <div class="flex space-x-2">
                    <button class="flex-1 bg-chef-orange text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-chef-orange-dark transition-colors"
                            onclick="event.stopPropagation(); viewRecipe(${recipe.id})">
                        View Recipe
                    </button>
                    <button class="px-4 py-2 border border-chef-orange text-chef-orange rounded-lg hover:bg-chef-orange hover:text-white transition-colors ${recipe.isSaved ? 'bg-chef-orange text-white' : ''}"
                            onclick="event.stopPropagation(); toggleSave(${recipe.id})">
                        ${recipe.isSaved ? 'Saved' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createTrendingCard(recipe) {
    return `
        <div class="recipe-card bg-white rounded-lg shadow-md overflow-hidden border border-chef-peach/20 cursor-pointer group relative">
            <div class="relative overflow-hidden">
                <img src="${recipe.image}" alt="${recipe.title}" 
                     class="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110">
                
                <!-- Heart icon for like -->
                <button class="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-all duration-300 ${recipe.isLiked ? 'text-red-500' : 'text-gray-400'}" 
                        onclick="event.stopPropagation(); toggleLike(${recipe.id})">
                    <svg class="w-4 h-4" fill="${recipe.isLiked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                </button>
                
                <div class="absolute bottom-2 left-2">
                    <span class="cuisine-tag px-2 py-1 text-xs font-medium rounded-full">${recipe.cuisine}</span>
                </div>
            </div>
            
            <div class="p-3">
                <h4 class="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 group-hover:text-chef-orange transition-colors">
                    ${recipe.title}
                </h4>
                <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <div class="flex items-center">
                        <span class="text-yellow-400 mr-1">${generateStars(recipe.rating)}</span>
                        <span>${recipe.rating}</span>
                    </div>
                    <span>${recipe.cookTime}</span>
                </div>
                <button class="w-full bg-chef-orange text-white py-1 px-2 rounded text-xs font-medium hover:bg-chef-orange-dark transition-colors"
                        onclick="event.stopPropagation(); viewRecipe(${recipe.id})">
                    View Recipe
                </button>
            </div>
        </div>
    `;
}

function createSmallCard(recipe) {
    return `
        <div class="flex items-center space-x-3 p-2 hover:bg-chef-cream rounded-lg cursor-pointer transition-colors group">
            <div class="relative">
                <img src="${recipe.image}" alt="${recipe.title}" 
                     class="w-12 h-12 rounded-lg object-cover">
                <button class="absolute -top-1 -right-1 p-1 rounded-full bg-white shadow-sm ${recipe.isLiked ? 'text-red-500' : 'text-gray-400'}" 
                        onclick="event.stopPropagation(); toggleLike(${recipe.id})">
                    <svg class="w-3 h-3" fill="${recipe.isLiked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                </button>
            </div>
            <div class="flex-1">
                <h4 class="font-semibold text-sm group-hover:text-chef-orange transition-colors">${recipe.title}</h4>
                <div class="flex items-center space-x-2 text-xs text-gray-500">
                    <span>${generateStars(recipe.rating)}</span>
                    <span>${recipe.cookTime}</span>
                </div>
            </div>
        </div>
    `;
}

function createRecipeListItem(recipe) {
    const badges = recipe.badges.map(badge => 
        `<span class="badge-${badge.toLowerCase().replace(/[^a-z]/g, '-')} px-2 py-1 text-xs font-medium text-white rounded-full mr-1">${badge}</span>`
    ).join('');
    
    return `
        <div class="recipe-list-item flex items-center p-4 bg-white rounded-lg border border-chef-peach/20 hover:border-chef-orange transition-colors cursor-pointer group">
            <div class="relative mr-4">
                <img src="${recipe.image}" alt="${recipe.title}" class="w-24 h-24 rounded-lg object-cover">
                <button class="absolute -top-1 -right-1 p-1 rounded-full bg-white shadow-sm ${recipe.isLiked ? 'text-red-500' : 'text-gray-400'}" 
                        onclick="event.stopPropagation(); toggleLike(${recipe.id})">
                    <svg class="w-4 h-4" fill="${recipe.isLiked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                </button>
            </div>
            <div class="flex-1">
                <div class="flex items-start justify-between mb-2">
                    <h3 class="font-bold text-lg text-gray-800 group-hover:text-chef-orange transition-colors">
                        ${recipe.title}
                    </h3>
                    <div class="flex space-x-2">
                        <button class="bg-chef-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-chef-orange-dark transition-colors"
                                onclick="event.stopPropagation(); viewRecipe(${recipe.id})">
                            View Recipe
                        </button>
                        <button class="px-4 py-2 border border-chef-orange text-chef-orange rounded-lg hover:bg-chef-orange hover:text-white transition-colors ${recipe.isSaved ? 'bg-chef-orange text-white' : ''}"
                                onclick="event.stopPropagation(); toggleSave(${recipe.id})">
                            ${recipe.isSaved ? 'Saved' : 'Save'}
                        </button>
                    </div>
                </div>
                <p class="text-gray-600 mb-3">${recipe.description}</p>
                <div class="flex items-center space-x-4 mb-2">
                    <span class="cuisine-tag px-2 py-1 text-xs font-medium rounded-full">${recipe.cuisine}</span>
                    <span class="px-2 py-1 text-xs font-medium text-white rounded-full ${getDifficultyColor(recipe.difficulty)}">
                        ${recipe.difficulty}
                    </span>
                    ${badges}
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-1">
                            <span class="rating-stars text-yellow-400">${generateStars(recipe.rating)}</span>
                            <span class="text-sm text-gray-600">${recipe.rating} (${recipe.reviews})</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-500">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            ${recipe.cookTime}
                        </div>
                        <div class="flex items-center space-x-2">
                            <img src="${recipe.author.avatar}" alt="${recipe.author.name}" 
                                 class="author-avatar w-6 h-6 rounded-full object-cover">
                            <span class="text-sm text-gray-600">${recipe.author.name}</span>
                        </div>
                    </div>
                    <div class="social-proof flex items-center text-sm text-gray-500">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        <span>${recipe.views.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Interactive functions
function toggleLike(recipeId) {
    const recipe = sampleRecipes.find(r => r.id === recipeId);
    if (recipe) {
        recipe.isLiked = !recipe.isLiked;
        showToast(recipe.isLiked ? 'Recipe liked! ❤️' : 'Recipe unliked', recipe.isLiked ? 'success' : 'info');
        // Re-render the affected sections
        populateAllSections();
        if (currentView === 'list') {
            populateListView(filterRecipes(sampleRecipes));
        }
    }
}

function toggleSave(recipeId) {
    const recipe = sampleRecipes.find(r => r.id === recipeId);
    if (recipe) {
        recipe.isSaved = !recipe.isSaved;
        if (recipe.isSaved) {
            recipe.saves++;
        } else {
            recipe.saves--;
        }
        showToast(recipe.isSaved ? 'Recipe saved to your collection! 📚' : 'Recipe removed from collection', recipe.isSaved ? 'success' : 'info');
        // Re-render the affected sections
        populateAllSections();
        if (currentView === 'list') {
            populateListView(filterRecipes(sampleRecipes));
        }
    }
}

function viewRecipe(recipeId) {
    const recipe = sampleRecipes.find(r => r.id === recipeId);
    if (recipe) {
        showToast('Opening recipe details...', 'info');
        // Here you would typically navigate to the recipe detail page
        console.log('Viewing recipe:', recipe);
    }
}

// Toast notification system
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    
    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    }[type] || 'bg-green-500';
    
    toast.className = `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out`;
    toast.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="font-medium">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Utility functions
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (hasHalfStar) {
        stars += '⭐';
    }
    
    return stars;
}

function getDifficultyColor(difficulty) {
    switch(difficulty.toLowerCase()) {
        case 'easy': return 'bg-green-500';
        case 'medium': return 'bg-yellow-500';
        case 'hard': return 'bg-red-500';
        default: return 'bg-green-500';
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function updateRecipeCount(count) {
    const start = (currentPage - 1) * 12 + 1;
    const end = Math.min(currentPage * 12, count);
    document.getElementById('recipeCount').textContent = `Showing ${start}-${end} of ${count} recipes`;
}

// Pagination
function updatePagination() {
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Generate page numbers
    pageNumbers.innerHTML = '';
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-number px-3 py-1 border border-gray-300 rounded hover:border-chef-orange transition-colors ${i === currentPage ? 'bg-chef-orange text-white border-chef-orange' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => changePage(i));
        pageNumbers.appendChild(pageBtn);
    }
}

function changePage(page) {
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    loadRecipes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Countdown timer
function initializeCountdown() {
    const timer = document.getElementById('countdownTimer');
    let hours = 13;
    let minutes = 21;
    
    setInterval(() => {
        minutes--;
        if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
                hours = 23;
            }
        }
        
        timer.textContent = `${hours}h ${minutes}m`;
    }, 60000); // Update every minute
}

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.opacity = '0';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Quick View Modal
function openQuickView(recipe) {
    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    
    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <img src="${recipe.image}" alt="${recipe.title}" 
                     class="w-full h-64 rounded-lg object-cover">
            </div>
            <div>
                <h3 class="text-2xl font-bold text-chef-orange mb-2">${recipe.title}</h3>
                <div class="flex items-center space-x-4 mb-4">
                    <div class="flex items-center space-x-1">
                        <span class="rating-stars text-yellow-400">${generateStars(recipe.rating)}</span>
                        <span>${recipe.rating} (${recipe.reviews} reviews)</span>
                    </div>
                    <span class="cuisine-tag px-2 py-1 text-xs font-medium rounded-full">${recipe.cuisine}</span>
                    <span class="px-2 py-1 text-xs font-medium text-white rounded-full ${getDifficultyColor(recipe.difficulty)}">
                        ${recipe.difficulty}
                    </span>
                </div>
                <p class="text-gray-600 mb-4">${recipe.description}</p>
                <div class="flex items-center space-x-4 mb-4">
                    <div class="flex items-center text-sm text-gray-500">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        ${recipe.cookTime}
                    </div>
                    <div class="flex items-center space-x-2">
                        <img src="${recipe.author.avatar}" alt="${recipe.author.name}" 
                             class="w-6 h-6 rounded-full object-cover">
                        <span class="text-sm text-gray-600">${recipe.author.name}</span>
                    </div>
                </div>
                <div class="flex space-x-3">
                    <button class="btn-primary bg-chef-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-chef-orange-dark transition-colors">
                        View Full Recipe
                    </button>
                    <button class="btn-secondary border border-chef-orange text-chef-orange px-6 py-3 rounded-lg font-semibold hover:bg-chef-orange hover:text-white transition-colors" onclick="toggleSave(${recipe.id})">
                        ${recipe.isSaved ? 'Saved' : 'Save Recipe'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.classList.add('hidden');
}

function handleSort() {
    loadRecipes();
}