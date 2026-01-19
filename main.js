// ======================= HERO SLIDESHOW =======================
const heroWrapper = document.querySelector('.hero-wrapper');
const heroText = document.getElementById('hero-text');

const slides = [
  { image: 'assets/backgroundimages/slide1.png', text: 'Real Estate' },
  { image: 'assets/backgroundimages/slide2.png', text: 'Luxury' },
  { image: 'assets/backgroundimages/slide3.png', text: 'Ecosystem' },
  { image: 'assets/backgroundimages/slide4.png', text: 'Africa' },
  { image: 'assets/backgroundimages/slide5.png', text: 'Affordable' },
  { image: 'assets/backgroundimages/slide6.png', text: 'Excellence' }
];

let currentSlide = 0;

function showSlide(index) {
  const { image, text } = slides[index];
  heroWrapper.style.backgroundImage = `url(${image})`;

  heroText.style.opacity = 0;
  setTimeout(() => {
    heroText.textContent = text;
    heroText.style.opacity = 1;
  }, 500);
}



showSlide(currentSlide);

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

// ======================= ROTATING TEXT =======================
let rotateIndex = 0;
const rotateDivs = rotatingText?.querySelectorAll('div');

setInterval(() => {
  rotateDivs?.forEach((div, i) => {
    div.style.display = i === rotateIndex ? 'block' : 'none';
  });
  rotateIndex = (rotateIndex + 1) % rotateDivs.length;
}, 2000);

// ======================= HAMBURGER MENU =======================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
  });

  closeMenu?.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
}

// ======================= COUNTERS & SCORE CARDS =======================
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const scoreCards = document.querySelectorAll(".score-card");
  let hasCounted = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasCounted) {
        hasCounted = true;

        // Animate score cards
        scoreCards.forEach(card => card.classList.add("visible"));

        // Animate counters
        counters.forEach(counter => {
          const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const increment = target / 100;

            if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(updateCount, 40);
            } else {
              counter.innerText = target + "+";
            }
          };
          updateCount();
        });

        observer.disconnect();
      }
    });
  }, {
    threshold: 0.4
  });

  const section = document.querySelector("#success-score");
  if (section) observer.observe(section);
});

// ======================= ENHANCED PROPERTY SECTION =======================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initPropertyFilters();
  initPropertyAnimations();
  initQuickView();
  initLazyLoading();
});

// ======================= PROPERTY FILTERS =======================
function initPropertyFilters() {
  const filterButtons = document.querySelectorAll('.filter-pill');
  const propertyCards = document.querySelectorAll('.property-card-enhanced');

  if (!filterButtons.length || !propertyCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter cards with animation
      propertyCards.forEach((card, index) => {
        // Add exit animation
        card.style.animation = 'fadeOut 0.3s ease-out';

        setTimeout(() => {
          if (filter === 'all') {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out forwards';
            card.style.animationDelay = `${index * 0.1}s`;
          } else {
            if (card.classList.contains(filter)) {
              card.style.display = 'block';
              card.style.animation = 'fadeInUp 0.5s ease-out forwards';
              card.style.animationDelay = `${index * 0.1}s`;
            } else {
              card.style.display = 'none';
            }
          }
        }, 300);
      });

      // Add ripple effect
      createRipple(button, event);
    });
  });
}

// ======================= PROPERTY ANIMATIONS =======================
function initPropertyAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe property cards
  const propertyCards = document.querySelectorAll('.property-card-enhanced');
  propertyCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Parallax effect on scroll
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  });
}

function handleParallax() {
  const propertyCards = document.querySelectorAll('.property-card-enhanced');
  const scrolled = window.pageYOffset;

  propertyCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardTop = rect.top + scrolled;
    const cardHeight = card.offsetHeight;
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const image = card.querySelector('.property-image-enhanced');
      if (image) {
        const offset = (scrolled - cardTop + windowHeight) / (windowHeight + cardHeight);
        const translateY = offset * 30 - 15; // Range: -15 to 15
        image.style.transform = `scale(1.1) translateY(${translateY}px)`;
      }
    }
  });
}



function showQuickViewToast(propertyName) {
  // Create toast notification
  const toast = document.createElement('div');
  toast.className = 'quick-view-toast';
  toast.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>Quick view for ${propertyName} - Full details coming soon!</span>
  `;

  // Add styles
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    background: linear-gradient(135deg, #4fc874, #3cb265);
    color: white;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(79, 200, 116, 0.3);
    z-index: 10000;
    animation: slideInUp 0.3s ease-out;
  `;

  document.body.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOutDown 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function trackQuickView(propertyName) {
  // Add your analytics tracking here
  console.log(`Quick view clicked: ${propertyName}`);
  
  // Example: Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'quick_view', {
      'event_category': 'Property',
      'event_label': propertyName
    });
  }
}



// ======================= RIPPLE EFFECT =======================
function createRipple(element, event) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    left: ${x}px;
    top: ${y}px;
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  `;

  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// ======================= BUTTON HOVER EFFECTS =======================
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn-enhanced, .cta-btn-primary, .cta-btn-secondary');

  buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.style.setProperty('--x', `${x}px`);
      this.style.setProperty('--y', `${y}px`);
    });
  });
});



function resetTilt(e) {
  const card = e.currentTarget;
  card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
}

// ======================= KEYBOARD NAVIGATION =======================
document.addEventListener('DOMContentLoaded', () => {
  const propertyCards = document.querySelectorAll('.property-card-enhanced');
  const buttons = document.querySelectorAll('.btn-enhanced, .filter-pill');

  // Make cards keyboard accessible
  propertyCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const primaryButton = card.querySelector('.btn-primary-enhanced');
        if (primaryButton) {
          primaryButton.click();
        }
      }
    });
  });

  // Enhanced focus styles
  buttons.forEach(button => {
    button.addEventListener('focus', function() {
      this.style.outline = '3px solid rgba(79, 200, 116, 0.5)';
      this.style.outlineOffset = '3px';
    });

    button.addEventListener('blur', function() {
      this.style.outline = 'none';
    });
  });
});

// ======================= PERFORMANCE OPTIMIZATION =======================
// Debounce function for scroll events
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

// Throttle function for mouse move events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ======================= CSS ANIMATIONS KEYFRAMES =======================
// Add dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideOutDown {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .quick-view-toast {
    animation: slideInUp 0.3s ease-out;
  }
`;
document.head.appendChild(style);

// ======================= ANALYTICS & TRACKING =======================
function trackPropertyView(propertyName) {
  console.log(`Property viewed: ${propertyName}`);
  // Add your analytics code here
}

function trackPropertyClick(propertyName, action) {
  console.log(`Property action: ${action} on ${propertyName}`);
  // Add your analytics code here
}

// Track when properties come into view
document.addEventListener('DOMContentLoaded', () => {
  const propertyCards = document.querySelectorAll('.property-card-enhanced');
  
  const viewObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const propertyName = entry.target.querySelector('.property-title-enhanced')?.textContent;
        if (propertyName) {
          trackPropertyView(propertyName);
        }
        viewObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  propertyCards.forEach(card => viewObserver.observe(card));
});

// ======================= EXPORT FUNCTIONS (if using modules) =======================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initPropertyFilters,
    initPropertyAnimations,
    initQuickView,
    trackPropertyView,
    trackPropertyClick
  };
}


// ======================= CARD FADE-IN ON SCROLL =======================
const animatedCards = document.querySelectorAll('.animated');

const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      cardObserver.unobserve(entry.target); // one-time trigger
    }
  });
}, {
  threshold: 0.2
});

animatedCards.forEach(card => {
  cardObserver.observe(card);
});

// ======================= FAQ TOGGLE =======================
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".toggle-icon");

    question.addEventListener("click", () => {
      // Collapse all others
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle this one
      item.classList.toggle("active");
    });
  });
});

const dropdown = document.querySelector('.navbar .dropdown');
let hideTimeout;

dropdown.addEventListener('mouseenter', () => {
  clearTimeout(hideTimeout); // Cancel any previous hide timer
  dropdown.classList.add('active');
});

dropdown.addEventListener('mouseleave', () => {
  hideTimeout = setTimeout(() => {
    dropdown.classList.remove('active');
  }, 3000);
});

document.querySelectorAll('.navbar .dropdown').forEach(dropdown => {
  const menu = dropdown.querySelector('.dropdown-menu');
  let timeout;

  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(timeout);
    menu.style.display = 'block';
    dropdown.classList.add('active');
  });

  dropdown.addEventListener('mouseleave', () => {
    timeout = setTimeout(() => {
      menu.style.display = 'none';
      dropdown.classList.remove('active');
    }, 500);
  });
});

document.querySelectorAll('.navbar .dropdown').forEach(dropdown => {
  const menu = dropdown.querySelector('.dropdown-menu');
  let timeout;

  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(timeout);
    menu.style.display = 'block';
  });

  dropdown.addEventListener('mouseleave', () => {
    timeout = setTimeout(() => {
      menu.style.display = 'none';
    }, 500);
  });
});

 // Add intersection observer for scroll animations
    const cards = document.querySelectorAll('.property-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, {
      threshold: 0.1
    });

    cards.forEach(card => {
      observer.observe(card);
    });
