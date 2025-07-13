// Typing animation for input
const prompts = [
  "Eggs, spinach, and mushrooms",
  "I have tomatoes, onions, and pasta.",
  "Healthy recipe with lentils, kale, and carrots.",
  "Vegan recipe with quinoa, chickpeas, and bell peppers."
];
let i = 0, j = 0, currentPrompt = 0, isDeleting = false;
const input = document.getElementById('typing-input');
function typeLoop() {
  if (!input) return;
  if (!isDeleting && j <= prompts[currentPrompt].length) {
      input.setAttribute('placeholder', prompts[currentPrompt].substring(0, j));
      j++;
      setTimeout(typeLoop, 80);
  } else if (isDeleting && j >= 0) {
      input.setAttribute('placeholder', prompts[currentPrompt].substring(0, j));
      j--;
      setTimeout(typeLoop, 30);
  } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
          currentPrompt = (currentPrompt + 1) % prompts.length;
      }
      setTimeout(typeLoop, isDeleting ? 700 : 1000);
  }
}
typeLoop();

// =====================
// Hero Carousel Logic
// =====================
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('hero-carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const images = Array.from(track.children);
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  let current = 0;
  let intervalId = null;

  // Set up dots
  dotsContainer.innerHTML = '';
  images.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = 'w-3 h-3 rounded-full bg-[#FFDAB9] border-2 border-[#FF6F61] transition-all duration-300';
      if (idx === 0) dot.classList.add('scale-125', 'bg-[#FF6F61]');
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => goTo(idx));
      dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  function update() {
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, idx) => {
          dot.classList.toggle('scale-125', idx === current);
          dot.classList.toggle('bg-[#FF6F61]', idx === current);
          dot.classList.toggle('bg-[#FFDAB9]', idx !== current);
      });
  }

  function goTo(idx) {
      current = idx;
      update();
      resetInterval();
  }
  function next() {
      current = (current + 1) % images.length;
      update();
      resetInterval();
  }
  function prev() {
      current = (current - 1 + images.length) % images.length;
      update();
      resetInterval();
  }
  function resetInterval() {
      clearInterval(intervalId);
      intervalId = setInterval(next, 3800);
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Touch/drag support (optional, for mobile)
  let startX = 0;
  let isDragging = false;
  track.addEventListener('touchstart', e => {
      isDragging = true;
      startX = e.touches[0].clientX;
  });
  track.addEventListener('touchmove', e => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 50) {
          if (dx > 0) prev();
          else next();
          isDragging = false;
      }
  });
  track.addEventListener('touchend', () => {
      isDragging = false;
  });

  update();
  intervalId = setInterval(next, 3800);
});

// --- Smooth Scroll with Offset and Active Link Highlight ---
const NAV_LINKS = document.querySelectorAll('nav a[href^="#"]');
const SECTIONS = [
{ id: 'flow-usage', link: null },
{ id: 'features-chefai', link: null },
{ id: 'footer-chefai', link: null }
];

// Map links to sections
NAV_LINKS.forEach(link => {
const href = link.getAttribute('href').replace('#', '');
const section = SECTIONS.find(s => s.id === href);
if (section) section.link = link;

link.addEventListener('click', function(e) {
  const target = document.getElementById(href);
  if (target) {
    e.preventDefault();
    const yOffset = -24; // If you have a sticky navbar, adjust this offset
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    // Accessibility: focus the first heading in the section
    setTimeout(() => {
      const heading = target.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) heading.setAttribute('tabindex', '-1'), heading.focus();
    }, 700);
  }
});
});

// Highlight active nav link on scroll
function highlightActiveSection() {
let found = false;
for (const { id, link } of SECTIONS) {
  const section = document.getElementById(id);
  if (!section || !link) continue;
  const rect = section.getBoundingClientRect();
  if (!found && rect.top <= 80 && rect.bottom > 80) {
    link.classList.add('text-[#D35400]', 'font-extrabold');
    found = true;
  } else {
    link.classList.remove('text-[#D35400]', 'font-extrabold');
  }
}
}
window.addEventListener('scroll', debounce(highlightActiveSection, 50));
document.addEventListener('DOMContentLoaded', highlightActiveSection);

// Debounce helper
function debounce(fn, ms) {
let timeout;
return function(...args) {
  clearTimeout(timeout);
  timeout = setTimeout(() => fn.apply(this, args), ms);
};
}

// Testimonials Section Animation
function animateTestimonialCards() {
const cards = document.querySelectorAll('.testimonial-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.remove('opacity-0');
        entry.target.classList.remove('translate-y-8');
        entry.target.classList.add('opacity-100');
        entry.target.classList.add('translate-y-0');
      }, idx * 180);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
cards.forEach(card => observer.observe(card));
}
document.addEventListener('DOMContentLoaded', animateTestimonialCards);

// Flow Usage Section Animation
function animateFlowCards() {
const cards = document.querySelectorAll('.flow-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.remove('opacity-0');
        entry.target.classList.remove('-translate-x-16');
        entry.target.classList.remove('translate-x-16');
        entry.target.classList.add('opacity-100');
        entry.target.classList.add('translate-x-0');
      }, idx * 150);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
cards.forEach(card => observer.observe(card));
}
document.addEventListener('DOMContentLoaded', animateFlowCards);

// --- DARK MODE TOGGLE ---
function setDarkMode(enabled) {
const html = document.documentElement;
const icon = document.getElementById('dark-mode-icon');
if (enabled) {
  html.classList.add('dark');
  if (icon) icon.textContent = '☀️';
} else {
  html.classList.remove('dark');
  if (icon) icon.textContent = '🌙';
}
localStorage.setItem('chefai-darkmode', enabled ? '1' : '0');
}
function initDarkMode() {
const saved = localStorage.getItem('chefai-darkmode');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setDarkMode(saved === '1' || (saved === null && prefersDark));
const toggle = document.getElementById('dark-mode-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(!isDark);
  });
}
}
document.addEventListener('DOMContentLoaded', initDarkMode);

// --- FAQ ACCORDION ---
function initFAQAccordion() {
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', function() {
    const answer = this.querySelector('.faq-answer');
    const toggle = this.querySelector('.faq-toggle');
    const isOpen = !answer.classList.contains('hidden');
    // Close all
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
    document.querySelectorAll('.faq-toggle').forEach(t => t.textContent = '+');
    // Open if not already
    if (!isOpen) {
      answer.classList.remove('hidden');
      toggle.textContent = '−';
    }
  });
});
}
document.addEventListener('DOMContentLoaded', initFAQAccordion);

// --- USER PROFILE DROPDOWN LOGIC ---
document.addEventListener('DOMContentLoaded', function() {
  const profilePreview = document.getElementById('user-profile-preview');
  const dropdown = document.getElementById('profile-dropdown');
  const authAction = document.getElementById('auth-action');

  // Mock authentication state
  let isAuthenticated = false; // Set to true if user is signed in



  function updateDropdownAuthAction() {
    if (!authAction) return;
    if (isAuthenticated) {
      authAction.textContent = 'Log Out';
      authAction.onclick = function() {
        isAuthenticated = false;
        updateDropdownAuthAction();
  
        dropdown.classList.add('hidden');
        alert('Logged out!');
      };
    } else {
      authAction.textContent = 'Sign In / Sign Up';
      authAction.onclick = function() {
        dropdown.classList.add('hidden');
        openAuthModal('signin');
      };
    }
  }
  updateDropdownAuthAction();

  // Toggle dropdown (no animation, no movement)
  if (profilePreview && dropdown) {
    profilePreview.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('hidden');
    });
    // Hide dropdown when clicking outside
    document.addEventListener('mousedown', function(e) {
      if (!profilePreview.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
    // Hide dropdown on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') dropdown.classList.add('hidden');
    });
  }

  // --- AUTH MODAL LOGIC ---
  const authModal = document.getElementById('auth-modal');
  const authFormContainer = document.getElementById('auth-form-container');
  const closeAuthModalBtn = document.getElementById('close-auth-modal');

  // Render functions for sign in and sign up forms
  function renderSignInForm() {
    authFormContainer.innerHTML = `
      <div class="flex items-center gap-2 mb-6">
        <span class="text-2xl font-extrabold tracking-tight" style="color:#D35400;">ChefAssist</span>
      </div>
      <h2 class="text-2xl font-bold mb-2" style="color:#D35400;">Welcome Back</h2>
      <p class="text-[#6B4F3A] mb-6">Sign in with your email, username, and password.</p>
      <form id="signin-form" class="flex flex-col gap-4">
        <input type="email" placeholder="Email Address" class="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" required>
        <input type="text" placeholder="Username" class="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" required>
        <div class="relative">
          <input type="password" placeholder="Password" class="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61] w-full" required>
          <a href="#" class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#FF6F61] hover:underline">Forgot?</a>
        </div>
        <div class="flex items-center mb-2">
          <input type="checkbox" id="remember-me" class="accent-[#FF6F61] mr-2">
          <label for="remember-me" class="text-[#B35C00] text-sm">Remember me</label>
        </div>
        <button type="submit" class="bg-[#D35400] text-white font-bold rounded-lg py-3">Sign In</button>
        <button type="button" class="flex items-center justify-center gap-2 border border-[#FFDAB9] bg-white text-[#D35400] font-semibold rounded-lg py-3" id="google-signin-btn">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google"> Sign in with Google
        </button>
        <div class="text-center text-sm mt-2 text-[#6B4F3A]">Don't have an account? <a href="#" id="switch-to-signup" class="text-[#FF6F61] font-bold">Sign Up</a></div>
      </form>
    `;
    // Add switch event
    const switchLink = authFormContainer.querySelector('#switch-to-signup');
    if (switchLink) switchLink.onclick = function(e) {
      e.preventDefault();
      renderSignUpForm();
    };
  }

  function renderSignUpForm() {
    authFormContainer.innerHTML = `
      <div class="flex items-center gap-2 mb-6">
        <span class="text-2xl font-extrabold tracking-tight" style="color:#D35400;">ChefAssist</span>
      </div>
      <h2 class="text-2xl font-bold mb-2" style="color:#D35400;">Create Your Account</h2>
      <p class="text-[#6B4F3A] mb-6">Sign up with your email, username, and password.</p>
      <form id="signup-form" class="flex flex-col gap-4">
        <input type="email" placeholder="Email Address" class="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" required>
        <input type="text" placeholder="Username" class="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" required>
        <input type="password" placeholder="Password" class="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" required>
        <input type="password" placeholder="Confirm Password" class="rounded-lg border border-[#FFDAB9] px-4 py-3 bg-[#FFF8E7] text-[#D35400] focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" required>
        <button type="submit" class="bg-[#D35400] text-white font-bold rounded-lg py-3">Sign Up</button>
        <button type="button" class="flex items-center justify-center gap-2 border border-[#FFDAB9] bg-white text-[#D35400] font-semibold rounded-lg py-3" id="google-signup-btn">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google"> Sign up with Google
        </button>
        <div class="text-center text-sm mt-2 text-[#6B4F3A]">Already have an account? <a href="#" id="switch-to-signin" class="text-[#FF6F61] font-bold">Sign In</a></div>
      </form>
    `;
    // Add switch event
    const switchLink = authFormContainer.querySelector('#switch-to-signin');
    if (switchLink) switchLink.onclick = function(e) {
      e.preventDefault();
      renderSignInForm();
    };
  }

  // Open modal in sign in or sign up mode
  function openAuthModal(mode) {
    if (!authModal) return;
    authModal.classList.remove('hidden');
    if (mode === 'signup') {
      renderSignUpForm();
    } else {
      renderSignInForm();
    }
  }

  // Close modal
  if (closeAuthModalBtn) {
    closeAuthModalBtn.onclick = function() {
      authModal.classList.add('hidden');
    };
  }
  // Also close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !authModal.classList.contains('hidden')) {
      authModal.classList.add('hidden');
    }
  });
});

// Recipe Carousel Logic
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
let angle = 0;

function rotateCarousel(direction) {
  if (!carousel) return;
  const itemCount = items.length;
  const theta = 360 / itemCount;
  angle += direction * theta;
  carousel.style.transform = `translateZ(-300px) rotateY(${angle}deg)`;
}

if (prevButton) prevButton.addEventListener('click', () => rotateCarousel(1));
if (nextButton) nextButton.addEventListener('click', () => rotateCarousel(-1));

// Initial Carousel Setup
if (carousel && items.length) {
  items.forEach((item, index) => {
    const theta = 360 / items.length;
    const angle = theta * index;
    item.style.transform = `rotateY(${angle}deg) translateZ(300px)`;
  });
}

// 3D Recipe Slider Logic
const sliderData = [
  {
    title: "Creamy Cheese Pasta",
    image: "images/creamycheesepasta.jpg",
    description: "Silky pasta tossed in a rich, creamy cheese sauce.",
    rating: 4.7
  },
  {
    title: "Chicken Tandoori",
    image: "images/chickentandoori.webp",
    description: "Smoky, juicy chicken marinated in vibrant Indian spices.",
    rating: 4.8
  },
  {
    title: "Fresh Avocado Salad",
    image: "images/freshavocadosalad.jpg",
    description: "Crisp greens with ripe avocado, cherry tomatoes, and lime.",
    rating: 4.6
  },
  {
    title: "Kerala Chicken Stew",
    image: "images/keralachickenstew.jpg",
    description: "Coconut milk-based stew with tender chicken and spices.",
    rating: 4.7
  },
  {
    title: "Mango Chia Pudding",
    image: "images/mangochiapudding.png",
    description: "Creamy chia pudding layered with fresh mango puree.",
    rating: 4.9
  },
  {
    title: "Malabar Prawn Curry",
    image: "images/malabarprawncurry.png",
    description: "Spicy prawns simmered in a tangy coconut curry.",
    rating: 4.8
  }
];

document.addEventListener('DOMContentLoaded', function () {
  const sliderBgWallpaper = document.getElementById('slider-bg-wallpaper');
  const sliderTitle = document.getElementById('slider-title');
  const sliderDesc = document.getElementById('slider-desc');
  const sliderRating = document.getElementById('slider-rating');
  const sliderThumbnails = document.getElementById('slider-thumbnails');
  const sliderPrev = document.getElementById('slider-prev');
  const sliderNext = document.getElementById('slider-next');
  const sliderFullscreenBtn = document.getElementById('slider-fullscreen');
  let sliderIndex = 0;
  let isTransitioning = false;

  function fadeToNewImage(newIdx) {
    if (!sliderBgWallpaper) return;
    if (isTransitioning) return;
    isTransitioning = true;
    sliderBgWallpaper.classList.remove('fade-in');
    sliderBgWallpaper.classList.add('fade-out');
    setTimeout(() => {
      sliderIndex = newIdx;
      renderSlider(true);
      sliderBgWallpaper.classList.remove('fade-out');
      sliderBgWallpaper.classList.add('fade-in');
      setTimeout(() => { isTransitioning = false; }, 500);
    }, 350);
  }

  function renderSlider(skipFade) {
    const recipe = sliderData[sliderIndex];
    // Set wallpaper background
    if (sliderBgWallpaper) {
      sliderBgWallpaper.style.backgroundImage = `url('${recipe.image}')`;
      if (!skipFade) {
        sliderBgWallpaper.classList.remove('fade-in', 'fade-out');
        void sliderBgWallpaper.offsetWidth;
        sliderBgWallpaper.classList.add('fade-in');
      }
      // Render right-side overlay
      let overlay = sliderBgWallpaper.querySelector('.slider-info-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'slider-info-overlay';
        overlay.innerHTML = `<div class="p-7">
          <div id="slider-title" class="slider-title"></div>
          <div id="slider-rating" class="slider-rating"></div>
          <div id="slider-desc" class="slider-desc"></div>
        </div>`;
        sliderBgWallpaper.appendChild(overlay);
      }
      overlay.querySelector('#slider-title').textContent = recipe.title;
      overlay.querySelector('#slider-desc').textContent = recipe.description;
      overlay.querySelector('#slider-desc').setAttribute('data-tooltip', recipe.description);
      overlay.querySelector('#slider-rating').innerHTML = `${'★'.repeat(Math.round(recipe.rating))} <span>${recipe.rating}/5</span>`;
    }
    // Render thumbnails
    if (sliderThumbnails) {
      sliderThumbnails.innerHTML = '';
      sliderData.forEach((rec, idx) => {
        const thumb = document.createElement('div');
        thumb.className = 'slider-thumb' + (idx === sliderIndex ? ' active' : '');
        thumb.innerHTML = `<img src="${rec.image}" alt="${rec.title}" />`;
        thumb.addEventListener('click', () => {
          if (idx !== sliderIndex) fadeToNewImage(idx);
        });
        sliderThumbnails.appendChild(thumb);
      });
      // Scroll active thumb into view
      const activeThumb = sliderThumbnails.querySelector('.slider-thumb.active');
      if (activeThumb && typeof activeThumb.scrollIntoView === 'function') {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }

  function handleSliderNav(dir) {
    let newIdx = (sliderIndex + dir + sliderData.length) % sliderData.length;
    fadeToNewImage(newIdx);
  }

  if (sliderPrev) sliderPrev.addEventListener('click', () => handleSliderNav(-1));
  if (sliderNext) sliderNext.addEventListener('click', () => handleSliderNav(1));

  // Full-screen functionality
  if (sliderFullscreenBtn && sliderBgWallpaper) {
    sliderFullscreenBtn.addEventListener('click', () => {
      if (sliderBgWallpaper.requestFullscreen) {
        sliderBgWallpaper.requestFullscreen();
      } else if (sliderBgWallpaper.webkitRequestFullscreen) {
        sliderBgWallpaper.webkitRequestFullscreen();
      } else if (sliderBgWallpaper.msRequestFullscreen) {
        sliderBgWallpaper.msRequestFullscreen();
      }
    });
  }

  // Swipe support for mobile
  let startX = null;
  if (sliderBgWallpaper) {
    sliderBgWallpaper.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    sliderBgWallpaper.addEventListener('touchend', e => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) handleSliderNav(-1);
      else if (startX - endX > 50) handleSliderNav(1);
      startX = null;
    });
  }

  renderSlider();
});


// 3D Recipe Slider Logic

document.addEventListener('DOMContentLoaded', function () {
  // Slider logic starts here
  const sliderData = [
  {
    title: "Creamy Cheese Pasta",
    image: "images/creamycheesepasta.jpg",
    description: "Silky pasta tossed in a rich, creamy cheese sauce.",
    rating: 4.7
  },
  {
    title: "Chicken Tandoori",
    image: "images/chickentandoori.webp",
    description: "Smoky, juicy chicken marinated in vibrant Indian spices.",
    rating: 4.8
  },
  {
    title: "Fresh Avocado Salad",
    image: "images/freshavocadosalad.jpg",
    description: "Crisp greens with ripe avocado, cherry tomatoes, and lime.",
    rating: 4.6
  },
  {
    title: "Kerala Chicken Stew",
    image: "images/keralachickenstew.jpg",
    description: "Coconut milk-based stew with tender chicken and spices.",
    rating: 4.7
  },
  {
    title: "Mango Chia Pudding",
    image: "images/mangochiapudding.png",
    description: "Creamy chia pudding layered with fresh mango puree.",
    rating: 4.9
  },
  {
    title: "Malabar Prawn Curry",
    image: "images/malabarprawncurry.png",
    description: "Spicy prawns simmered in a tangy coconut curry.",
    rating: 4.8
  }
];

const sliderTrack = document.getElementById('slider-track');
const sliderBg = document.getElementById('slider-bg');
const sliderPrev = document.getElementById('slider-prev');
const sliderNext = document.getElementById('slider-next');
const sliderDots = document.getElementById('slider-dots');
let sliderIndex = 0;

function renderSlider() {
  sliderTrack.innerHTML = '';
  sliderData.forEach((recipe, idx) => {
    const card = document.createElement('div');
    card.className = 'slider-card' + (idx === sliderIndex ? ' active' : idx === (sliderIndex - 1 + sliderData.length) % sliderData.length || idx === (sliderIndex + 1) % sliderData.length ? ' side' : '');
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <div class="slider-info">
        <div class="slider-title">${recipe.title}</div>
        <div class="slider-desc">${recipe.description}</div>
        <div class="slider-rating">${'★'.repeat(Math.round(recipe.rating))}<span style="color:#B35C00;font-size:0.97em;">${recipe.rating}/5</span></div>
      </div>
    `;
    sliderTrack.appendChild(card);
  });
  updateSliderBg();
  updateSliderDots();
}

function updateSliderBg() {
  sliderBg.style.backgroundImage = `url('${sliderData[sliderIndex].image}')`;
}

function updateSliderDots() {
  sliderDots.innerHTML = '';
  sliderData.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'slider-dot' + (idx === sliderIndex ? ' active' : '');
    dot.addEventListener('click', () => {
      sliderIndex = idx;
      renderSlider();
    });
    sliderDots.appendChild(dot);
  });
}

function handleSliderNav(dir) {
  sliderIndex = (sliderIndex + dir + sliderData.length) % sliderData.length;
  renderSlider();
}

if (sliderPrev && sliderNext) {
  sliderPrev.addEventListener('click', () => handleSliderNav(-1));
  sliderNext.addEventListener('click', () => handleSliderNav(1));
}

// Swipe support for mobile
let startX = null;
sliderTrack && sliderTrack.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});
sliderTrack && sliderTrack.addEventListener('touchend', e => {
  if (startX === null) return;
  const endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) handleSliderNav(-1);
  else if (startX - endX > 50) handleSliderNav(1);
  startX = null;
});

// Autoplay for Most Liked Recipes Slider
let sliderAutoplayInterval = null;
function startSliderAutoplay() {
  if (sliderAutoplayInterval) clearInterval(sliderAutoplayInterval);
  sliderAutoplayInterval = setInterval(() => {
    handleSliderNav(1);
  }, 5000);
}
function stopSliderAutoplay() {
  if (sliderAutoplayInterval) clearInterval(sliderAutoplayInterval);
  sliderAutoplayInterval = null;
}

if (sliderTrack) {
  renderSlider();
  startSliderAutoplay();
  sliderTrack.addEventListener('mouseenter', stopSliderAutoplay);
  sliderTrack.addEventListener('mouseleave', startSliderAutoplay);
} else {
  console.error('Slider track not found: #slider-track');
}
});
