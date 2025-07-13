// Dashboard Logic
let currentSection = 'overview';
let userPreferences = {
    dietary: ['vegetarian'],
    allergies: ['nuts'],
    cuisines: ['italian', 'indian', 'thai']
};

// Sample data
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
        description: "Rich and creamy pasta with garlic and parmesan cheese",
        author: "Priya Malhotra",
        status: "published",
        publishedDate: "2 days ago",
        views: 2340,
        likes: 89,
        ingredients: ["pasta", "garlic", "parmesan", "cream"],
        calories: 450,
        protein: 18,
        carbs: 52,
        fat: 16
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
        description: "Authentic Thai stir fry with fresh basil and chilies",
        author: "Priya Malhotra",
        status: "published",
        publishedDate: "1 week ago",
        views: 1890,
        likes: 67,
        ingredients: ["chicken", "basil", "chilies", "soy sauce"],
        calories: 380,
        protein: 25,
        carbs: 28,
        fat: 18
    },
    {
        id: 3,
        title: "Mediterranean Quinoa Bowl",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
        cuisine: "Mediterranean",
        rating: 4.5,
        reviews: 45,
        cookTime: "25 min",
        difficulty: "Easy",
        description: "Healthy quinoa bowl with fresh vegetables and feta",
        author: "Priya Malhotra",
        status: "draft",
        publishedDate: null,
        views: 0,
        likes: 0,
        ingredients: ["quinoa", "vegetables", "feta", "olives"],
        calories: 320,
        protein: 12,
        carbs: 45,
        fat: 10
    }
];

const inventoryItems = [
    { name: "Tomatoes", quantity: 3, unit: "lbs", expiry: "2024-12-20", status: "fresh" },
    { name: "Pasta", quantity: 2, unit: "boxes", expiry: "2025-06-15", status: "fresh" },
    { name: "Garlic", quantity: 1, unit: "bulb", expiry: "2024-12-18", status: "expiring" },
    { name: "Parmesan", quantity: 1, unit: "block", expiry: "2024-12-15", status: "expired" },
    { name: "Basil", quantity: 1, unit: "bunch", expiry: "2024-12-16", status: "expiring" }
];

const mealPlan = {
    "2024-12-09": [{ name: "Pasta Night", type: "dinner", recipe: "Creamy Garlic Parmesan Pasta" }],
    "2024-12-10": [{ name: "Stir Fry", type: "dinner", recipe: "Spicy Thai Basil Stir Fry" }],
    "2024-12-11": [{ name: "Healthy Bowl", type: "lunch", recipe: "Mediterranean Quinoa Bowl" }]
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeGreeting();
    initializeInspirationWheel();
    populateAllSections();
    initializeFormHandlers();
    initializeDragAndDrop();
});

// Navigation
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            switchSection(section);
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function switchSection(section) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(sec => {
        sec.classList.add('hidden');
    });
    
    // Show selected section
    document.getElementById(`${section}-section`).classList.remove('hidden');
    currentSection = section;
    
    // Load section-specific data
    loadSectionData(section);
}

function loadSectionData(section) {
    switch(section) {
        case 'overview':
            populateRecommendations();
            break;
        case 'my-recipes':
            populateMyRecipes();
            break;
        case 'meal-planner':
            populateMealCalendar();
            break;
        case 'inventory':
            populateInventory();
            break;
        case 'nutrition':
            updateNutritionCharts();
            break;
        case 'settings':
            loadUserSettings();
            break;
    }
}

// Greeting
function initializeGreeting() {
    const hour = new Date().getHours();
    let greeting = "Good morning";
    
    if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon";
    } else if (hour >= 17) {
        greeting = "Good evening";
    }
    
    document.getElementById('greeting').textContent = `${greeting}, Priya!`;
}

// Inspiration Wheel
function initializeInspirationWheel() {
    const wheel = document.getElementById('inspirationWheel');
    
    wheel.addEventListener('click', function() {
        spinWheel();
    });
}

function spinWheel() {
    const wheel = document.getElementById('inspirationWheel');
    const result = document.getElementById('wheelResult');
    const instructions = document.getElementById('wheelInstructions');
    const suggestedRecipe = document.getElementById('suggestedRecipe');
    
    // Add spinning animation
    wheel.classList.add('spinning');
    
    // Simulate spinning delay
    setTimeout(() => {
        wheel.classList.remove('spinning');
        
        // Get random recipe suggestion
        const randomRecipe = sampleRecipes[Math.floor(Math.random() * sampleRecipes.length)];
        
        // Show result
        instructions.classList.add('hidden');
        result.classList.remove('hidden');
        
        suggestedRecipe.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${randomRecipe.image}" alt="${randomRecipe.title}" class="w-16 h-16 rounded-lg object-cover">
                <div class="flex-1">
                    <h5 class="font-bold text-chef-orange">${randomRecipe.title}</h5>
                    <p class="text-sm text-gray-600">${randomRecipe.description}</p>
                    <div class="flex items-center space-x-2 mt-2">
                        <span class="text-xs bg-chef-orange text-white px-2 py-1 rounded">${randomRecipe.cuisine}</span>
                        <span class="text-xs text-gray-500">${randomRecipe.cookTime}</span>
                    </div>
                </div>
            </div>
            <button class="mt-3 w-full bg-chef-orange text-white py-2 rounded-lg hover:bg-chef-orange-dark transition-colors" onclick="viewRecipe(${randomRecipe.id})">
                Cook This Recipe
            </button>
        `;
        
        showToast('🎲 Recipe suggestion ready!', 'success');
    }, 3000);
}

// Populate sections
function populateAllSections() {
    populateRecommendations();
    populateMyRecipes();
    populateMealCalendar();
    populateInventory();
}

function populateRecommendations() {
    const recommendedContainer = document.getElementById('recommendedRecipes');
    const trendingContainer = document.getElementById('trendingCuisine');
    
    // Filter recipes based on user preferences
    const recommended = sampleRecipes.filter(recipe => 
        userPreferences.cuisines.includes(recipe.cuisine.toLowerCase())
    ).slice(0, 3);
    
    const trending = sampleRecipes.filter(recipe => 
        recipe.rating >= 4.5
    ).slice(0, 3);
    
    recommendedContainer.innerHTML = recommended.map(recipe => createSmallRecipeCard(recipe)).join('');
    trendingContainer.innerHTML = trending.map(recipe => createSmallRecipeCard(recipe)).join('');
}

function populateMyRecipes() {
    const publishedContainer = document.getElementById('publishedRecipes');
    const draftContainer = document.getElementById('draftRecipes');
    const alertsContainer = document.getElementById('recipeAlerts');
    
    const published = sampleRecipes.filter(recipe => recipe.status === 'published');
    const drafts = sampleRecipes.filter(recipe => recipe.status === 'draft');
    
    publishedContainer.innerHTML = published.map(recipe => createMyRecipeCard(recipe)).join('');
    draftContainer.innerHTML = drafts.map(recipe => createMyRecipeCard(recipe)).join('');
    
    // Recipe alerts
    alertsContainer.innerHTML = `
        <div class="alert alert-info">
            <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                    <h4 class="font-medium">New Review on "Creamy Garlic Parmesan Pasta"</h4>
                    <p class="text-sm mt-1">Sarah Johnson left a 5-star review: "Amazing recipe! My family loved it."</p>
                    <p class="text-xs text-gray-500 mt-2">2 hours ago</p>
                </div>
            </div>
        </div>
        <div class="alert alert-warning">
            <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-yellow-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                <div>
                    <h4 class="font-medium">Recipe Update Needed</h4>
                    <p class="text-sm mt-1">Your "Spicy Thai Basil Stir Fry" recipe has received feedback about cooking time. Consider updating.</p>
                    <p class="text-xs text-gray-500 mt-2">1 day ago</p>
                </div>
            </div>
        </div>
    `;
    
    // Initialize recipe tabs
    initializeRecipeTabs();
}

function populateMealCalendar() {
    const calendar = document.getElementById('mealCalendar');
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dates = ['9', '10', '11', '12', '13', '14', '15'];
    
    calendar.innerHTML = days.map((day, index) => {
        const date = `2024-12-${dates[index].padStart(2, '0')}`;
        const meals = mealPlan[date] || [];
        
        return `
            <div class="calendar-day ${meals.length > 0 ? 'has-meal' : ''}" data-date="${date}">
                <div class="text-center mb-2">
                    <div class="font-medium text-gray-700">${day}</div>
                    <div class="text-2xl font-bold text-chef-orange">${dates[index]}</div>
                </div>
                <div class="space-y-1">
                    ${meals.map(meal => `
                        <div class="meal-item text-xs">
                            <div class="font-medium">${meal.name}</div>
                            <div class="text-gray-500">${meal.type}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function populateInventory() {
    const inventoryList = document.getElementById('inventoryList');
    const inventoryRecipes = document.getElementById('inventoryRecipes');
    
    inventoryList.innerHTML = inventoryItems.map(item => `
        <div class="inventory-item ${item.status}">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="font-medium">${item.name}</div>
                    <div class="text-sm text-gray-600">${item.quantity} ${item.unit}</div>
                    <div class="text-xs text-gray-500">Expires: ${new Date(item.expiry).toLocaleDateString()}</div>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="status-badge ${item.status}">
                        ${item.status === 'fresh' ? '✅' : item.status === 'expiring' ? '⚠️' : '❌'}
                    </span>
                    <button class="text-red-500 hover:text-red-700" onclick="removeInventoryItem('${item.name}')">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Find recipes that can be made with current inventory
    const availableIngredients = inventoryItems.filter(item => item.status !== 'expired').map(item => item.name.toLowerCase());
    const possibleRecipes = sampleRecipes.filter(recipe => 
        recipe.ingredients.some(ingredient => availableIngredients.includes(ingredient))
    );
    
    inventoryRecipes.innerHTML = possibleRecipes.slice(0, 3).map(recipe => createSmallRecipeCard(recipe)).join('');
}

// Recipe card creators
function createSmallRecipeCard(recipe) {
    return `
        <div class="flex items-center space-x-3 p-3 hover:bg-chef-cream rounded-lg cursor-pointer transition-colors group" onclick="viewRecipe(${recipe.id})">
            <img src="${recipe.image}" alt="${recipe.title}" 
                 class="w-12 h-12 rounded-lg object-cover">
            <div class="flex-1">
                <h4 class="font-semibold text-sm group-hover:text-chef-orange transition-colors">${recipe.title}</h4>
                <div class="flex items-center space-x-2 text-xs text-gray-500">
                    <span>${generateStars(recipe.rating)}</span>
                    <span>${recipe.cookTime}</span>
                    <span class="px-2 py-1 bg-chef-orange/10 text-chef-orange rounded">${recipe.cuisine}</span>
                </div>
            </div>
        </div>
    `;
}

function createMyRecipeCard(recipe) {
    return `
        <div class="recipe-card bg-white rounded-xl shadow-lg overflow-hidden border border-chef-peach/20 group">
            <div class="relative overflow-hidden">
                <img src="${recipe.image}" alt="${recipe.title}" 
                     class="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110">
                <div class="absolute top-2 left-2">
                    <span class="badge badge-${recipe.status}">${recipe.status}</span>
                </div>
                <div class="absolute top-2 right-2 flex space-x-1">
                    <button class="p-1 bg-white/80 rounded-full hover:bg-white transition-colors" onclick="editRecipe(${recipe.id})">
                        <svg class="w-4 h-4 text-chef-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                        </svg>
                    </button>
                    <button class="p-1 bg-white/80 rounded-full hover:bg-white transition-colors" onclick="deleteRecipe(${recipe.id})">
                        <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="p-4">
                <h3 class="font-bold text-lg text-gray-800 mb-2 group-hover:text-chef-orange transition-colors">
                    ${recipe.title}
                </h3>
                <p class="text-gray-600 text-sm mb-3">${recipe.description}</p>
                
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
                
                <div class="flex items-center justify-between text-sm text-gray-500">
                    <div class="flex space-x-4">
                        <span>👁️ ${recipe.views}</span>
                        <span>❤️ ${recipe.likes}</span>
                    </div>
                    <span>${recipe.publishedDate || 'Draft'}</span>
                </div>
            </div>
        </div>
    `;
}

// Recipe tabs
function initializeRecipeTabs() {
    const tabs = document.querySelectorAll('.recipe-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            document.querySelectorAll('.recipe-tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(`${targetTab}-tab`).classList.remove('hidden');
        });
    });
}

// Form handlers
function initializeFormHandlers() {
    // Add ingredient form
    const addIngredientForm = document.getElementById('addIngredientForm');
    if (addIngredientForm) {
        addIngredientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addIngredient();
        });
    }
}

function addIngredient() {
    const name = document.getElementById('ingredientName').value;
    const quantity = document.getElementById('ingredientQuantity').value;
    const unit = document.getElementById('ingredientUnit').value;
    const expiry = document.getElementById('ingredientExpiry').value;
    
    if (!name || !quantity || !expiry) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    const newItem = {
        name,
        quantity: parseInt(quantity),
        unit,
        expiry,
        status: 'fresh'
    };
    
    inventoryItems.push(newItem);
    populateInventory();
    closeAddIngredientModal();
    showToast(`${name} added to inventory!`, 'success');
}

// Drag and drop
function initializeDragAndDrop() {
    // Make meal items draggable
    document.addEventListener('dragstart', function(e) {
        if (e.target.classList.contains('meal-item')) {
            e.dataTransfer.setData('text/plain', e.target.textContent);
            e.target.classList.add('dragging');
        }
    });
    
    document.addEventListener('dragend', function(e) {
        if (e.target.classList.contains('meal-item')) {
            e.target.classList.remove('dragging');
        }
    });
    
    // Make calendar days drop zones
    document.addEventListener('dragover', function(e) {
        if (e.target.closest('.calendar-day')) {
            e.preventDefault();
            e.target.closest('.calendar-day').classList.add('drop-zone');
        }
    });
    
    document.addEventListener('dragleave', function(e) {
        if (e.target.closest('.calendar-day')) {
            e.target.closest('.calendar-day').classList.remove('drop-zone');
        }
    });
    
    document.addEventListener('drop', function(e) {
        const calendarDay = e.target.closest('.calendar-day');
        if (calendarDay) {
            e.preventDefault();
            const mealData = e.dataTransfer.getData('text/plain');
            const date = calendarDay.getAttribute('data-date');
            
            // Add meal to calendar
            if (!mealPlan[date]) {
                mealPlan[date] = [];
            }
            
            mealPlan[date].push({
                name: mealData,
                type: 'dinner',
                recipe: mealData
            });
            
            populateMealCalendar();
            calendarDay.classList.remove('drop-zone');
            showToast('Meal added to calendar!', 'success');
        }
    });
}

// Nutrition charts
function updateNutritionCharts() {
    // This would typically integrate with a charting library
    // For now, we'll just update the progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Settings
function loadUserSettings() {
    // Load user preferences into form
    const dietaryCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    dietaryCheckboxes.forEach(checkbox => {
        if (userPreferences.dietary.includes(checkbox.nextElementSibling.textContent.toLowerCase().replace(/[^a-z]/g, ''))) {
            checkbox.checked = true;
        }
    });
}

// Modal functions
function openAddIngredientModal() {
    document.getElementById('addIngredientModal').classList.remove('hidden');
}

function closeAddIngredientModal() {
    document.getElementById('addIngredientModal').classList.add('hidden');
    document.getElementById('addIngredientForm').reset();
}

// Action functions
function viewRecipe(recipeId) {
    showToast('Opening recipe details...', 'info');
    // Navigate to recipe detail page
}

function editRecipe(recipeId) {
    showToast('Opening recipe editor...', 'info');
    // Navigate to recipe edit page
}

function deleteRecipe(recipeId) {
    if (confirm('Are you sure you want to delete this recipe?')) {
        const index = sampleRecipes.findIndex(r => r.id === recipeId);
        if (index > -1) {
            sampleRecipes.splice(index, 1);
            populateMyRecipes();
            showToast('Recipe deleted successfully', 'success');
        }
    }
}

function removeInventoryItem(itemName) {
    const index = inventoryItems.findIndex(item => item.name === itemName);
    if (index > -1) {
        inventoryItems.splice(index, 1);
        populateInventory();
        showToast(`${itemName} removed from inventory`, 'success');
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
    
    toast.className = `toast ${type} ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out`;
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

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
    
    // Quick navigation shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                switchSection('overview');
                break;
            case '2':
                e.preventDefault();
                switchSection('my-recipes');
                break;
            case '3':
                e.preventDefault();
                switchSection('meal-planner');
                break;
            case '4':
                e.preventDefault();
                switchSection('inventory');
                break;
            case '5':
                e.preventDefault();
                switchSection('nutrition');
                break;
            case '6':
                e.preventDefault();
                switchSection('settings');
                break;
        }
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Auto-save functionality
let autoSaveTimer;
function autoSave() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        // Save user preferences and data
        localStorage.setItem('chefAssistUserPreferences', JSON.stringify(userPreferences));
        localStorage.setItem('chefAssistInventory', JSON.stringify(inventoryItems));
        localStorage.setItem('chefAssistMealPlan', JSON.stringify(mealPlan));
    }, 2000);
}

// Load saved data on page load
function loadSavedData() {
    const savedPreferences = localStorage.getItem('chefAssistUserPreferences');
    const savedInventory = localStorage.getItem('chefAssistInventory');
    const savedMealPlan = localStorage.getItem('chefAssistMealPlan');
    
    if (savedPreferences) {
        userPreferences = JSON.parse(savedPreferences);
    }
    
    if (savedInventory) {
        inventoryItems.splice(0, inventoryItems.length, ...JSON.parse(savedInventory));
    }
    
    if (savedMealPlan) {
        Object.assign(mealPlan, JSON.parse(savedMealPlan));
    }
}

// Initialize saved data
loadSavedData();

// Performance optimization
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

// Lazy loading for images
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

// Initialize lazy loading
initializeLazyLoading();

// Service worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Analytics tracking
function trackEvent(eventName, eventData) {
    // Track user interactions for analytics
    console.log('Event tracked:', eventName, eventData);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Dashboard error:', e.error);
    showToast('Something went wrong. Please try again.', 'error');
});

// Responsive design helpers
function checkMobileView() {
    return window.innerWidth < 768;
}

function adaptToMobile() {
    if (checkMobileView()) {
        // Adapt UI for mobile
        document.body.classList.add('mobile-view');
    } else {
        document.body.classList.remove('mobile-view');
    }
}

window.addEventListener('resize', debounce(adaptToMobile, 250));
adaptToMobile();