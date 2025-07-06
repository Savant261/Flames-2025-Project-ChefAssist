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

// --- USER PROFILE PREVIEW POPOVER ---
function createProfilePopover() {
  let popover = document.getElementById('profile-popover');
  if (popover) popover.remove();
  popover = document.createElement('div');
  popover.id = 'profile-popover';
  popover.setAttribute('tabindex', '-1');
  popover.className = 'fixed top-20 right-8 z-50 bg-[#FFF8E7] dark:bg-[#23201d] text-[#D35400] dark:text-[#FFB27A] rounded-2xl shadow-2xl p-6 w-64 animate-popover-in';
  popover.innerHTML = `
    <div class="flex flex-col items-center gap-3">
      <div class="w-16 h-16 rounded-full bg-[#FFDAB9] dark:bg-[#3A291B] border-4 border-[#FF6F61] flex items-center justify-center text-3xl font-bold" style="color:#FF6F61;">👨‍🍳</div>
      <div class="font-bold text-lg">ChefAI User</div>
      <div class="text-sm opacity-70 mb-2">user@email.com</div>
      <button class="px-4 py-2 rounded-lg bg-[#FF6F61] text-white font-bold hover:bg-[#D35400] transition w-full mb-1">Account Settings</button>
      <button class="px-4 py-2 rounded-lg bg-[#FFDAB9] dark:bg-[#3A291B] text-[#D35400] dark:text-[#FFB27A] font-bold hover:bg-[#FFE5D0] dark:hover:bg-[#444] transition w-full">Logout</button>
    </div>
  `;
  document.body.appendChild(popover);
  setTimeout(() => popover.focus(), 10);
  // Animate out and remove
  function closePopover(e) {
    if (!popover.contains(e.target) && e.target.id !== 'user-profile-preview') {
      popover.classList.remove('animate-popover-in');
      popover.classList.add('animate-popover-out');
      setTimeout(() => popover.remove(), 180);
      document.removeEventListener('mousedown', closePopover);
      document.removeEventListener('keydown', escClose);
    }
  }
  function escClose(e) {
    if (e.key === 'Escape') closePopover(e);
  }
  document.addEventListener('mousedown', closePopover);
  document.addEventListener('keydown', escClose);
}
document.addEventListener('DOMContentLoaded', function() {
  const preview = document.getElementById('user-profile-preview');
  if (preview) {
    preview.addEventListener('click', function(e) {
      e.stopPropagation();
      createProfilePopover();
    });
  }
});

