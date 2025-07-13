// Subscription Page Logic
class SubscriptionManager {
  constructor() {
      this.currentPlan = null;
      this.paymentModal = document.getElementById('paymentModal');
      this.init();
  }

  init() {
      this.setupEventListeners();
      this.setupFormValidation();
      this.setupAnimations();
      this.checkUserSubscription();
  }

  setupEventListeners() {
      // Plan selection buttons
      document.querySelectorAll('.plan-button').forEach(button => {
          button.addEventListener('click', (e) => {
              const planCard = e.target.closest('.plan-card');
              this.handlePlanSelection(planCard);
          });
      });

      // FAQ toggle
      document.querySelectorAll('.faq-question').forEach(question => {
          question.addEventListener('click', (e) => {
              this.toggleFAQ(e.target.closest('.faq-item'));
          });
      });

      // Modal controls
      document.getElementById('closeModal').addEventListener('click', () => {
          this.closeModal();
      });

      document.querySelector('.modal-overlay').addEventListener('click', (e) => {
          if (e.target === e.currentTarget) {
              this.closeModal();
          }
      });

      // Payment form
      document.querySelector('.payment-form').addEventListener('submit', (e) => {
          e.preventDefault();
          this.handlePayment();
      });

      // Coupon application
      document.getElementById('applyCoupon').addEventListener('click', () => {
          this.applyCoupon();
      });

      // Sticky CTA
      document.querySelector('.sticky-cta-button').addEventListener('click', () => {
          this.scrollToPlans();
      });

      // Scroll detection for sticky CTA
      window.addEventListener('scroll', () => {
          this.handleStickyCtaVisibility();
      });

      // Card number formatting
      document.getElementById('cardNumber').addEventListener('input', (e) => {
          this.formatCardNumber(e.target);
      });

      // Expiry date formatting
      document.getElementById('expiry').addEventListener('input', (e) => {
          this.formatExpiryDate(e.target);
      });

      // CVV validation
      document.getElementById('cvv').addEventListener('input', (e) => {
          this.formatCVV(e.target);
      });
  }

  handlePlanSelection(planCard) {
      const planName = planCard.querySelector('.plan-name').textContent;
      const planPrice = planCard.querySelector('.plan-price').textContent;
      
      // Add selection animation
      planCard.style.transform = 'scale(0.95)';
      setTimeout(() => {
          planCard.style.transform = '';
      }, 150);

      // Update modal with selected plan
      document.getElementById('selectedPlan').textContent = `${planName} Plan`;
      document.getElementById('planPrice').textContent = planPrice;
      
      this.currentPlan = {
          name: planName,
          price: planPrice
      };

      // Show payment modal
      this.showModal();
  }

  showModal() {
      this.paymentModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus on first input
      setTimeout(() => {
          document.getElementById('cardNumber').focus();
      }, 300);
  }

  closeModal() {
      this.paymentModal.classList.remove('active');
      document.body.style.overflow = '';
      
      // Reset form
      document.querySelector('.payment-form').reset();
      this.resetFormValidation();
  }

  toggleFAQ(faqItem) {
      const isActive = faqItem.classList.contains('active');
      
      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
          item.classList.remove('active');
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
          faqItem.classList.add('active');
      }
  }

  applyCoupon() {
      const couponInput = document.getElementById('couponInput');
      const couponCode = couponInput.value.trim().toUpperCase();
      
      // Demo coupon codes
      const validCoupons = {
          'WELCOME20': 20,
          'SAVE10': 10,
          'FIRST15': 15
      };

      if (validCoupons[couponCode]) {
          const discount = validCoupons[couponCode];
          this.showNotification(`Coupon applied! You saved ${discount}%`, 'success');
          couponInput.disabled = true;
          document.getElementById('applyCoupon').textContent = 'Applied';
          document.getElementById('applyCoupon').disabled = true;
      } else if (couponCode) {
          this.showNotification('Invalid coupon code', 'error');
      } else {
          this.showNotification('Please enter a coupon code', 'error');
      }
  }

  handlePayment() {
      if (!this.validatePaymentForm()) {
          return;
      }

      const paymentButton = document.querySelector('.payment-button');
      const originalText = paymentButton.innerHTML;
      
      // Show loading state
      paymentButton.innerHTML = '<span>Processing...</span>';
      paymentButton.disabled = true;

      // Simulate payment processing
      setTimeout(() => {
          this.showNotification('Payment successful! Welcome to ChefAssist Premium!', 'success');
          this.closeModal();
          this.updateUIForSubscription();
          
          // Reset button
          paymentButton.innerHTML = originalText;
          paymentButton.disabled = false;
      }, 2000);
  }

  validatePaymentForm() {
      const cardNumber = document.getElementById('cardNumber').value;
      const expiry = document.getElementById('expiry').value;
      const cvv = document.getElementById('cvv').value;
      const cardName = document.getElementById('cardName').value;

      let isValid = true;

      // Card number validation (simplified)
      if (cardNumber.replace(/\s/g, '').length < 13) {
          this.showFieldError('cardNumber', 'Please enter a valid card number');
          isValid = false;
      }

      // Expiry validation
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
          this.showFieldError('expiry', 'Please enter a valid expiry date (MM/YY)');
          isValid = false;
      }

      // CVV validation
      if (cvv.length < 3) {
          this.showFieldError('cvv', 'Please enter a valid CVV');
          isValid = false;
      }

      // Name validation
      if (cardName.trim().length < 2) {
          this.showFieldError('cardName', 'Please enter the name on the card');
          isValid = false;
      }

      return isValid;
  }

  showFieldError(fieldId, message) {
      const field = document.getElementById(fieldId);
      field.style.borderColor = '#dc3545';
      
      // Remove existing error message
      const existingError = field.parentNode.querySelector('.error-message');
      if (existingError) {
          existingError.remove();
      }

      // Add error message
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      errorElement.style.color = '#dc3545';
      errorElement.style.fontSize = '0.8rem';
      errorElement.style.marginTop = '5px';
      field.parentNode.appendChild(errorElement);
  }

  resetFormValidation() {
      document.querySelectorAll('.form-group input').forEach(input => {
          input.style.borderColor = '#ddd';
      });
      
      document.querySelectorAll('.error-message').forEach(error => {
          error.remove();
      });
  }

  formatCardNumber(input) {
      let value = input.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
      
      input.value = formattedValue;
  }

  formatExpiryDate(input) {
      let value = input.value.replace(/\D/g, '');
      if (value.length >= 2) {
          value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      input.value = value;
  }

  formatCVV(input) {
      input.value = input.value.replace(/\D/g, '').slice(0, 3);
  }

  showNotification(message, type = 'info') {
      // Remove existing notifications
      const existingNotification = document.querySelector('.notification');
      if (existingNotification) {
          existingNotification.remove();
      }

      const notification = document.createElement('div');
      notification.className = `notification notification-${type}`;
      notification.textContent = message;
      
      // Styling
      Object.assign(notification.style, {
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '15px 20px',
          borderRadius: '8px',
          color: 'white',
          fontWeight: '500',
          zIndex: '1001',
          transform: 'translateX(100%)',
          transition: 'transform 0.3s ease',
          maxWidth: '300px',
          wordWrap: 'break-word'
      });

      // Type-specific styling
      if (type === 'success') {
          notification.style.background = '#28a745';
      } else if (type === 'error') {
          notification.style.background = '#dc3545';
      } else {
          notification.style.background = '#17a2b8';
      }

      document.body.appendChild(notification);

      // Animate in
      setTimeout(() => {
          notification.style.transform = 'translateX(0)';
      }, 100);

      // Auto remove
      setTimeout(() => {
          notification.style.transform = 'translateX(100%)';
          setTimeout(() => {
              notification.remove();
          }, 300);
      }, 3000);
  }

  scrollToPlans() {
      document.querySelector('.plans-section').scrollIntoView({
          behavior: 'smooth'
      });
  }

  handleStickyCtaVisibility() {
      const plansSection = document.querySelector('.plans-section');
      const stickyCta = document.querySelector('.sticky-cta');
      const rect = plansSection.getBoundingClientRect();
      
      // Show sticky CTA when plans section is out of view
      if (rect.bottom < 0 && window.innerWidth <= 768) {
          stickyCta.style.display = 'block';
      } else {
          stickyCta.style.display = 'none';
      }
  }

  setupAnimations() {
      // Intersection Observer for fade-in animations
      const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
              }
          });
      }, observerOptions);

      // Observe elements for animation
      document.querySelectorAll('.plan-card, .feature-card, .trust-badge, .testimonial').forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          observer.observe(el);
      });
  }

  setupFormValidation() {
      // Real-time validation
      document.querySelectorAll('.form-group input').forEach(input => {
          input.addEventListener('blur', () => {
              this.validateField(input);
          });

          input.addEventListener('input', () => {
              // Clear error styling on input
              input.style.borderColor = '#ddd';
              const errorMessage = input.parentNode.querySelector('.error-message');
              if (errorMessage) {
                  errorMessage.remove();
              }
          });
      });
  }

  validateField(input) {
      const value = input.value.trim();
      let isValid = true;

      switch (input.id) {
          case 'cardNumber':
              isValid = value.replace(/\s/g, '').length >= 13;
              break;
          case 'expiry':
              isValid = /^\d{2}\/\d{2}$/.test(value);
              break;
          case 'cvv':
              isValid = value.length >= 3;
              break;
          case 'cardName':
              isValid = value.length >= 2;
              break;
      }

      if (!isValid) {
          input.style.borderColor = '#dc3545';
      } else {
          input.style.borderColor = '#28a745';
      }
  }

  checkUserSubscription() {
      // Check if user is already subscribed (demo purposes)
      const isSubscribed = localStorage.getItem('chefassist_subscription');
      
      if (isSubscribed) {
          this.updateUIForSubscription();
      }
  }

  updateUIForSubscription() {
      // Update plan buttons to show current subscription
      document.querySelectorAll('.plan-button').forEach(button => {
          if (button.classList.contains('plan-button-pro')) {
              button.textContent = 'Current Plan';
              button.disabled = true;
              button.style.opacity = '0.7';
          }
      });

      // Save subscription status
      localStorage.setItem('chefassist_subscription', 'pro');
      
      // Add subscription badge to hero
      const heroTitle = document.querySelector('.hero-title');
      if (!heroTitle.querySelector('.subscription-badge')) {
          const badge = document.createElement('span');
          badge.className = 'subscription-badge';
          badge.textContent = 'Premium Member';
          badge.style.cssText = `
              display: inline-block;
              background: #28a745;
              color: white;
              padding: 5px 12px;
              border-radius: 20px;
              font-size: 0.8rem;
              margin-left: 15px;
              vertical-align: middle;
          `;
          heroTitle.appendChild(badge);
      }
  }

  // Demo method to reset subscription (for testing)
  resetSubscription() {
      localStorage.removeItem('chefassist_subscription');
      location.reload();
  }
}

// Initialize the subscription manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SubscriptionManager();
});

// Add some demo data and interactions
document.addEventListener('DOMContentLoaded', () => {
  // Add hover effects to plan cards
  document.querySelectorAll('.plan-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
          card.style.transform = card.classList.contains('plan-card-popular') ? 
              'scale(1.05) translateY(-10px)' : 'translateY(-10px)';
      });

      card.addEventListener('mouseleave', () => {
          card.style.transform = card.classList.contains('plan-card-popular') ? 
              'scale(1.05)' : '';
      });
  });

  // Add smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });

  // Add loading states to buttons
  document.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', function() {
          if (!this.disabled) {
              this.style.transform = 'scale(0.98)';
              setTimeout(() => {
                  this.style.transform = '';
              }, 100);
          }
      });
  });
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
  // Close modal with Escape key
  if (e.key === 'Escape') {
      const modal = document.getElementById('paymentModal');
      if (modal.classList.contains('active')) {
          document.getElementById('closeModal').click();
      }
  }
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
  document.querySelectorAll('.plan-card').forEach(card => {
      card.addEventListener('touchstart', () => {
          card.style.transform = 'scale(0.98)';
      });

      card.addEventListener('touchend', () => {
          setTimeout(() => {
              card.style.transform = '';
          }, 100);
      });
  });
}