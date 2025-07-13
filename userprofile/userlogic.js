// Sample data
const favoriteRecipes = [
    {
        id: 1,
        title: "Creamy Garlic Parmesan Pasta",
        image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.8,
        reviews: 124,
        cookTime: "25 min",
        difficulty: "Easy",
        cuisine: "Italian",
        description: "Rich and creamy pasta with garlic and parmesan cheese",
        views: 2340,
        saves: 89
    },
    {
        id: 2,
        title: "Spicy Thai Basil Stir Fry",
        image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.6,
        reviews: 89,
        cookTime: "15 min",
        difficulty: "Medium",
        cuisine: "Thai",
        description: "Authentic Thai stir fry with fresh basil and chilies",
        views: 1890,
        saves: 67
    },
    {
        id: 3,
        title: "Classic Margherita Pizza",
        image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.9,
        reviews: 203,
        cookTime: "45 min",
        difficulty: "Medium",
        cuisine: "Italian",
        description: "Traditional pizza with fresh mozzarella and basil",
        views: 3210,
        saves: 156
    },
    {
        id: 4,
        title: "Chocolate Lava Cake",
        image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.7,
        reviews: 156,
        cookTime: "30 min",
        difficulty: "Hard",
        cuisine: "French",
        description: "Decadent chocolate cake with molten center",
        views: 2780,
        saves: 134
    }
];

const myRecipes = [
    {
        id: 5,
        title: "Spicy Pasta Arrabbiata",
        image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.8,
        reviews: 67,
        cookTime: "20 min",
        difficulty: "Easy",
        cuisine: "Italian",
        description: "Fiery pasta with tomatoes, garlic, and red chilies",
        views: 1560,
        saves: 78,
        status: "Published",
        publishedDate: "2 days ago"
    },
    {
        id: 6,
        title: "Butter Chicken Curry",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.9,
        reviews: 89,
        cookTime: "40 min",
        difficulty: "Medium",
        cuisine: "Indian",
        description: "Creamy and rich Indian curry with tender chicken",
        views: 2340,
        saves: 123,
        status: "Published",
        publishedDate: "1 week ago"
    },
    {
        id: 7,
        title: "Mediterranean Quinoa Bowl",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.5,
        reviews: 45,
        cookTime: "25 min",
        difficulty: "Easy",
        cuisine: "Mediterranean",
        description: "Healthy quinoa bowl with fresh vegetables and feta",
        views: 890,
        saves: 34,
        status: "Draft",
        publishedDate: null
    }
];

const recommendedRecipes = [
    {
        id: 8,
        title: "Pad Thai Noodles",
        image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.6,
        cookTime: "20 min",
        difficulty: "Medium",
        cuisine: "Thai"
    },
    {
        id: 9,
        title: "Caesar Salad",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.4,
        cookTime: "10 min",
        difficulty: "Easy",
        cuisine: "American"
    },
    {
        id: 10,
        title: "Beef Tacos",
        image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.7,
        cookTime: "30 min",
        difficulty: "Medium",
        cuisine: "Mexican"
    },
    {
        id: 11,
        title: "Tiramisu",
        image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.8,
        cookTime: "4 hours",
        difficulty: "Hard",
        cuisine: "Italian"
    }
];

// Utility functions
function getDifficultyColor(difficulty) {
    switch(difficulty.toLowerCase()) {
        case 'easy': return 'difficulty-easy';
        case 'medium': return 'difficulty-medium';
        case 'hard': return 'difficulty-hard';
        default: return 'difficulty-easy';
    }
}

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

function createRecipeCard(recipe, isMyRecipe = false) {
    const statusBadge = isMyRecipe && recipe.status === 'Draft' 
        ? `<span class="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Draft</span>`
        : '';
    
    const publishInfo = isMyRecipe 
        ? `<div class="flex items-center justify-between text-xs text-gray-500 mt-2">
             <span>Views: ${recipe.views.toLocaleString()}</span>
             <span>Saves: ${recipe.saves}</span>
           </div>`
        : '';

    return `
        <div class="recipe-card bg-white rounded-xl shadow-lg overflow-hidden border border-chef-peach/20 hover-lift card-hover group">
            <div class="relative overflow-hidden">
                ${statusBadge}
                <img src="${recipe.image}" alt="${recipe.title}" 
                     class="recipe-image w-full h-48 object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <button class="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
                    <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
                <div class="absolute bottom-2 left-2 flex space-x-1">
                    <span class="cuisine-tag px-2 py-1 text-xs font-medium text-chef-orange-dark rounded-full">
                        ${recipe.cuisine}
                    </span>
                    <span class="px-2 py-1 text-xs font-medium text-white rounded-full ${getDifficultyColor(recipe.difficulty)}">
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
                
                ${publishInfo}
                
                <div class="flex space-x-2 mt-3">
                    <button class="flex-1 bg-chef-orange text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-chef-orange-dark transition-colors">
                        ${isMyRecipe ? 'Edit' : 'View Recipe'}
                    </button>
                    <button class="p-2 border border-gray-300 rounded-lg hover:border-chef-orange hover:text-chef-orange transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createRecommendedCard(recipe) {
    return `
        <div class="recipe-card bg-white rounded-lg shadow-md overflow-hidden border border-chef-peach/20 hover-lift card-hover group">
            <div class="relative overflow-hidden">
                <img src="${recipe.image}" alt="${recipe.title}" 
                     class="recipe-image w-full h-32 object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div class="absolute bottom-1 left-1 flex space-x-1">
                    <span class="px-1 py-0.5 text-xs font-medium text-white rounded ${getDifficultyColor(recipe.difficulty)}">
                        ${recipe.difficulty}
                    </span>
                </div>
            </div>
            
            <div class="p-3">
                <h4 class="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 group-hover:text-chef-orange transition-colors">
                    ${recipe.title}
                </h4>
                <div class="flex items-center justify-between text-xs text-gray-500">
                    <div class="flex items-center">
                        <span class="text-yellow-400 mr-1">${generateStars(recipe.rating)}</span>
                        <span>${recipe.rating}</span>
                    </div>
                    <span>${recipe.cookTime}</span>
                </div>
            </div>
        </div>
    `;
}

// Animation functions
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target > 100) {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = current.toFixed(1);
        }
    }, 16);
}

function showLoadingSkeleton(containerId, count = 4) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'loading-skeleton rounded-xl h-64 bg-gray-200';
        container.appendChild(skeleton);
    }
}

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Add active class to clicked button and show corresponding content
            button.classList.add('active');
            document.getElementById(`${targetTab}-content`).classList.remove('hidden');
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('recipe-search');
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase();
            filterRecipes(query);
        }, 300);
    });
}

function filterRecipes(query) {
    const recipeCards = document.querySelectorAll('#recipe-grid .recipe-card');
    
    recipeCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(query) || description.includes(query)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.3s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize page
function initializePage() {
    // Animate stats counters
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        animateCounter(stat, target);
    });
    
    // Show loading skeletons first
    showLoadingSkeleton('recipe-grid');
    showLoadingSkeleton('my-recipes-grid', 3);
    showLoadingSkeleton('recommended-grid', 4);
    
    // Simulate loading delay and populate content
    setTimeout(() => {
        populateRecipeGrid();
        populateMyRecipes();
        populateRecommended();
    }, 1000);
    
    // Initialize interactive features
    initializeTabs();
    initializeSearch();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function populateRecipeGrid() {
    const container = document.getElementById('recipe-grid');
    container.innerHTML = favoriteRecipes.map(recipe => createRecipeCard(recipe)).join('');
}

function populateMyRecipes() {
    const container = document.getElementById('my-recipes-grid');
    container.innerHTML = myRecipes.map(recipe => createRecipeCard(recipe, true)).join('');
}

function populateRecommended() {
    const container = document.getElementById('recommended-grid');
    container.innerHTML = recommendedRecipes.map(recipe => createRecommendedCard(recipe)).join('');
}

// Add intersection observer for animations
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all recipe cards
    setTimeout(() => {
        document.querySelectorAll('.recipe-card').forEach(card => {
            observer.observe(card);
        });
    }, 1100);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    initializeAnimations();
    
    // Add some interactive feedback
    document.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        }
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading-skeleton');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next tab
            const activeTab = document.querySelector('.tab-button.active');
            const nextTab = activeTab.nextElementSibling;
            if (nextTab && nextTab.classList.contains('tab-button')) {
                nextTab.click();
            }
        } else {
            // Swipe right - previous tab
            const activeTab = document.querySelector('.tab-button.active');
            const prevTab = activeTab.previousElementSibling;
            if (prevTab && prevTab.classList.contains('tab-button')) {
                prevTab.click();
            }
        }
    }
}