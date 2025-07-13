// Edit Profile Page Logic

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeFormHandlers();
    initializeImageUpload();
    initializePasswordStrength();
    initializeBioCounter();
    initializeDropdowns();
    initializeFormValidation();
    loadUserData();
});

// Form handlers
function initializeFormHandlers() {
    const form = document.getElementById('editProfileForm');
    const genderSelect = document.getElementById('gender');
    const customGenderInput = document.getElementById('customGender');
    
    // Handle custom gender input
    genderSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customGenderInput.classList.remove('hidden');
            customGenderInput.focus();
        } else {
            customGenderInput.classList.add('hidden');
            customGenderInput.value = '';
        }
    });
    
    // Handle phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        formatPhoneNumber(this);
    });
    
    // Handle birthday validation
    const birthdayInput = document.getElementById('birthday');
    birthdayInput.addEventListener('change', function() {
        validateBirthday(this);
    });
    
    // Handle URL validation for social links
    const urlInputs = ['website', 'instagram', 'twitter', 'youtube'];
    urlInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('blur', function() {
                validateURL(this);
            });
        }
    });
}

// Image upload functionality
function initializeImageUpload() {
    const imageUpload = document.getElementById('imageUpload');
    const profileImage = document.getElementById('profileImage');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            validateAndUploadImage(file);
        }
    });
    
    // Drag and drop functionality
    const profileImageContainer = profileImage.parentElement;
    
    profileImageContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    profileImageContainer.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });
    
    profileImageContainer.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            validateAndUploadImage(files[0]);
        }
    });
}

function validateAndUploadImage(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
        showMessage('Please upload a valid image file (JPEG, PNG, GIF, or WebP)', 'error');
        return;
    }
    
    if (file.size > maxSize) {
        showMessage('File size must be less than 5MB', 'error');
        return;
    }
    
    // Simulate upload progress
    simulateImageUpload(file);
}

function simulateImageUpload(file) {
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const profileImage = document.getElementById('profileImage');
    
    uploadProgress.classList.remove('hidden');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Create preview
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                showMessage('Profile picture updated successfully!', 'success');
                
                setTimeout(() => {
                    uploadProgress.classList.add('hidden');
                    progressBar.style.width = '0%';
                }, 1000);
            };
            reader.readAsDataURL(file);
        }
    }, 100);
}

function removeProfilePicture() {
    const profileImage = document.getElementById('profileImage');
    const defaultImage = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400';
    
    profileImage.src = defaultImage;
    showMessage('Profile picture removed', 'success');
}

// Password strength checker
function initializePasswordStrength() {
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            checkPasswordMatch();
        });
    }
}

function checkPasswordStrength(password) {
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthBar || !strengthText) return;
    
    let strength = 0;
    let strengthLabel = 'Weak';
    let strengthColor = '#ef4444';
    
    // Check password criteria
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;
    
    if (strength >= 75) {
        strengthLabel = 'Strong';
        strengthColor = '#10b981';
    } else if (strength >= 50) {
        strengthLabel = 'Medium';
        strengthColor = '#f59e0b';
    }
    
    strengthBar.style.width = strength + '%';
    strengthBar.style.backgroundColor = strengthColor;
    strengthText.textContent = `Password strength: ${strengthLabel}`;
    strengthText.style.color = strengthColor;
}

function checkPasswordMatch() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const matchIndicator = document.getElementById('passwordMatch');
    
    if (!matchIndicator) return;
    
    if (confirmPassword.length > 0) {
        matchIndicator.classList.remove('hidden');
        
        if (newPassword === confirmPassword) {
            matchIndicator.textContent = 'Passwords match ✓';
            matchIndicator.className = 'text-xs mt-1 text-green-600';
        } else {
            matchIndicator.textContent = 'Passwords do not match ✗';
            matchIndicator.className = 'text-xs mt-1 text-red-600';
        }
    } else {
        matchIndicator.classList.add('hidden');
    }
}

// Bio character counter
function initializeBioCounter() {
    const bioTextarea = document.getElementById('bio');
    const bioCounter = document.getElementById('bioCounter');
    
    if (bioTextarea && bioCounter) {
        // Initialize counter
        updateBioCounter();
        
        bioTextarea.addEventListener('input', updateBioCounter);
    }
}

function updateBioCounter() {
    const bioTextarea = document.getElementById('bio');
    const bioCounter = document.getElementById('bioCounter');
    const currentLength = bioTextarea.value.length;
    const maxLength = 200;
    
    bioCounter.textContent = `(${currentLength}/${maxLength})`;
    
    if (currentLength > maxLength * 0.9) {
        bioCounter.classList.add('text-red-500');
        bioCounter.classList.remove('text-gray-500', 'text-yellow-500');
    } else if (currentLength > maxLength * 0.7) {
        bioCounter.classList.add('text-yellow-500');
        bioCounter.classList.remove('text-gray-500', 'text-red-500');
    } else {
        bioCounter.classList.add('text-gray-500');
        bioCounter.classList.remove('text-yellow-500', 'text-red-500');
    }
}

// Dropdown functionality
function initializeDropdowns() {
    // Cuisine dropdown
    const cuisineCheckboxes = document.querySelectorAll('input[name="cuisines"]');
    cuisineCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedCuisines);
    });
    
    // Custom cuisine input
    const customCuisineInput = document.getElementById('customCuisine');
    if (customCuisineInput) {
        customCuisineInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addCustomCuisine(this.value);
                this.value = '';
            }
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.relative')) {
            closeAllDropdowns();
        }
    });
}

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const isHidden = dropdown.classList.contains('hidden');
    
    // Close all other dropdowns
    closeAllDropdowns();
    
    if (isHidden) {
        dropdown.classList.remove('hidden');
        dropdown.classList.add('dropdown-enter');
    }
}

function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('[id$="Options"]');
    dropdowns.forEach(dropdown => {
        dropdown.classList.add('hidden');
        dropdown.classList.remove('dropdown-enter');
    });
}

function updateSelectedCuisines() {
    const checkboxes = document.querySelectorAll('input[name="cuisines"]:checked');
    const selectedText = document.getElementById('selectedCuisines');
    
    const selected = Array.from(checkboxes).map(cb => {
        const label = cb.parentElement.textContent.trim();
        return label.split(' ').slice(1).join(' '); // Remove emoji
    });
    
    if (selected.length === 0) {
        selectedText.textContent = 'Select cuisines...';
    } else if (selected.length <= 3) {
        selectedText.textContent = selected.join(', ');
    } else {
        selectedText.textContent = `${selected.slice(0, 2).join(', ')} and ${selected.length - 2} more`;
    }
}

function addCustomCuisine(cuisine) {
    if (!cuisine.trim()) return;
    
    const cuisineOptions = document.getElementById('cuisineOptions').querySelector('.p-2');
    const newOption = document.createElement('label');
    newOption.className = 'flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer';
    newOption.innerHTML = `
        <input type="checkbox" name="cuisines" value="${cuisine.toLowerCase()}" checked class="mr-3 text-chef-orange focus:ring-chef-orange">
        <span>🍽️ ${cuisine}</span>
    `;
    
    cuisineOptions.appendChild(newOption);
    
    // Add event listener to new checkbox
    const newCheckbox = newOption.querySelector('input');
    newCheckbox.addEventListener('change', updateSelectedCuisines);
    
    updateSelectedCuisines();
    showMessage(`Added "${cuisine}" to your preferred cuisines`, 'success');
}

// Form validation
function initializeFormValidation() {
    const form = document.getElementById('editProfileForm');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // URL validation
    if (field.type === 'url' && value) {
        try {
            new URL(value);
        } catch {
            isValid = false;
            errorMessage = 'Please enter a valid URL';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value.replace(/\D/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    if (isValid) {
        showFieldSuccess(field);
    } else {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('input-error');
    field.classList.remove('input-success');
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
}

function showFieldSuccess(field) {
    field.classList.add('input-success');
    field.classList.remove('input-error');
    
    // Remove error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function clearFieldError(field) {
    field.classList.remove('input-error', 'input-success');
    
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Utility functions
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 10) {
        // Format as: XXX-XXX-XXXX
        if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{3})/, '$1-$2');
        }
    }
    
    input.value = value;
}

function validateBirthday(input) {
    const selectedDate = new Date(input.value);
    const today = new Date();
    
    if (selectedDate > today) {
        showFieldError(input, 'Birthday cannot be in the future');
        return false;
    }
    
    const age = today.getFullYear() - selectedDate.getFullYear();
    if (age < 13) {
        showFieldError(input, 'You must be at least 13 years old');
        return false;
    }
    
    showFieldSuccess(input);
    return true;
}

function validateURL(input) {
    const value = input.value.trim();
    if (!value) return true;
    
    try {
        const url = new URL(value);
        if (!['http:', 'https:'].includes(url.protocol)) {
            throw new Error('Invalid protocol');
        }
        showFieldSuccess(input);
        return true;
    } catch {
        showFieldError(input, 'Please enter a valid URL (including http:// or https://)');
        return false;
    }
}

// Modal functions
function openPasswordModal() {
    const modal = document.getElementById('passwordModal');
    modal.classList.remove('hidden');
    modal.classList.add('modal-enter');
    
    // Focus on first input
    setTimeout(() => {
        document.getElementById('currentPassword').focus();
    }, 100);
}

function closePasswordModal() {
    const modal = document.getElementById('passwordModal');
    modal.classList.add('hidden');
    modal.classList.remove('modal-enter');
    
    // Clear form
    document.getElementById('passwordForm').reset();
    document.getElementById('strengthBar').style.width = '0%';
    document.getElementById('strengthText').textContent = 'Password strength: Weak';
    document.getElementById('passwordMatch').classList.add('hidden');
}

// Message system
function showMessage(message, type = 'success') {
    const container = document.getElementById('messageContainer');
    const messageDiv = document.createElement('div');
    
    messageDiv.className = `message-toast message-${type}`;
    messageDiv.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-current opacity-70 hover:opacity-100">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `;
    
    container.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

// Main action functions
function saveProfile() {
    const form = document.getElementById('editProfileForm');
    const formData = new FormData(form);
    
    // Validate all required fields
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showMessage('Please fix the errors before saving', 'error');
        return;
    }
    
    // Show loading state
    const saveButton = event.target;
    const originalText = saveButton.textContent;
    saveButton.innerHTML = '<div class="loading-spinner inline-block mr-2"></div>Saving...';
    saveButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        saveButton.textContent = originalText;
        saveButton.disabled = false;
        
        showMessage('Profile updated successfully!', 'success');
        
        // Optionally redirect back to profile
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2000);
}

function cancelChanges() {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        window.location.href = 'index.html';
    }
}

function goBack() {
    window.history.back();
}

function resendVerification() {
    showMessage('Verification email sent! Please check your inbox.', 'success');
}

function showDietaryInfo() {
    const infoModal = `
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <h3 class="text-xl font-bold text-chef-orange mb-4">Dietary Preferences Guide</h3>
                <div class="space-y-3 text-sm">
                    <div><strong>Vegetarian:</strong> No meat, poultry, or fish</div>
                    <div><strong>Vegan:</strong> No animal products whatsoever</div>
                    <div><strong>Gluten-Free:</strong> No wheat, barley, rye, or gluten</div>
                    <div><strong>Dairy-Free:</strong> No milk or dairy products</div>
                    <div><strong>Keto:</strong> Very low carb, high fat diet</div>
                    <div><strong>Paleo:</strong> Whole foods, no processed foods</div>
                </div>
                <button onclick="this.closest('.fixed').remove()" 
                        class="mt-4 w-full bg-chef-orange text-white py-2 rounded-lg hover:bg-chef-orange-dark transition-colors">
                    Got it!
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', infoModal);
}

// Load user data (simulate API call)
function loadUserData() {
    // This would typically load data from an API
    // For now, we'll just update the bio counter
    updateBioCounter();
    updateSelectedCuisines();
}

// Handle password form submission
document.addEventListener('DOMContentLoaded', function() {
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (newPassword !== confirmPassword) {
                showMessage('Passwords do not match', 'error');
                return;
            }
            
            if (newPassword.length < 8) {
                showMessage('Password must be at least 8 characters long', 'error');
                return;
            }
            
            // Simulate API call
            const submitButton = e.target.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<div class="loading-spinner inline-block mr-2"></div>Updating...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Update Password';
                submitButton.disabled = false;
                closePasswordModal();
                showMessage('Password updated successfully!', 'success');
            }, 2000);
        });
    }
});