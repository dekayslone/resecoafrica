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
const rotatingText = document.getElementById('rotatingText');
if (rotatingText) {
  let rotateIndex = 0;
  const rotateDivs = rotatingText.querySelectorAll('span');

  setInterval(() => {
    rotateDivs.forEach((div, i) => {
      div.style.display = i === rotateIndex ? 'inline' : 'none';
    });
    rotateIndex = (rotateIndex + 1) % rotateDivs.length;
  }, 2500);
}

// ======================= HAMBURGER MENU =======================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu when link is clicked
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.hamburger') && !e.target.closest('.mobile-menu')) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
}

// ======================= NAVBAR SCROLL EFFECT =======================
const header = document.querySelector('header');

if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ======================= DROPDOWN MENU =======================
document.querySelectorAll('.navbar .dropdown').forEach(dropdown => {
  const menu = dropdown.querySelector('.dropdown-menu');
  if (!menu) return;
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

// ======================= COUNTERS & SCORE CARDS =======================
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const scoreCards = document.querySelectorAll(".score-card");
  let hasCounted = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasCounted) {
        hasCounted = true;
        scoreCards.forEach(card => card.classList.add("visible"));
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
  }, { threshold: 0.4 });

  const section = document.querySelector("#success-score");
  if (section) observer.observe(section);
});

// ======================= ENHANCED PROPERTY SECTION =======================
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
    button.addEventListener('click', (event) => {
      const filter = button.getAttribute('data-filter');
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      propertyCards.forEach((card, index) => {
        card.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
          if (filter === 'all' || card.classList.contains(filter)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out forwards';
            card.style.animationDelay = `${index * 0.1}s`;
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });

      createRipple(button, event);
    });
  });
}

// ======================= PROPERTY ANIMATIONS =======================
function initPropertyAnimations() {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.property-card-enhanced').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Parallax effect
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
  const scrolled = window.pageYOffset;
  document.querySelectorAll('.property-card-enhanced').forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const image = card.querySelector('.property-image-enhanced');
      if (image) {
        const offset = (scrolled - (rect.top + scrolled) + window.innerHeight) / (window.innerHeight + card.offsetHeight);
        image.style.transform = `scale(1.1) translateY(${offset * 30 - 15}px)`;
      }
    }
  });
}

// ======================= QUICK VIEW =======================
function initQuickView() {
  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.property-card-enhanced');
      const name = card?.querySelector('.property-title-enhanced')?.textContent || 'Property';
      showQuickViewToast(name);
    });
  });
}

function showQuickViewToast(propertyName) {
  const toast = document.createElement('div');
  toast.className = 'quick-view-toast';
  toast.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>Quick view for ${propertyName} - Full details coming soon!</span>
  `;
  toast.style.cssText = `
    position: fixed; bottom: 30px; right: 30px; display: flex; align-items: center; gap: 12px;
    padding: 16px 24px; background: linear-gradient(135deg, #4fc874, #3cb265); color: white;
    border-radius: 12px; font-size: 0.95rem; font-weight: 600;
    box-shadow: 0 10px 30px rgba(79, 200, 116, 0.3); z-index: 10000;
    animation: slideInUp 0.3s ease-out;
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOutDown 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ======================= LAZY LOADING =======================
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => imgObserver.observe(img));
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
    position: absolute; width: ${size}px; height: ${size}px; border-radius: 50%;
    background: rgba(255, 255, 255, 0.5); left: ${x}px; top: ${y}px;
    transform: scale(0); animation: ripple 0.6s ease-out; pointer-events: none;
  `;
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

// ======================= BUTTON HOVER EFFECTS =======================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-enhanced, .cta-btn-primary, .cta-btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect();
      this.style.setProperty('--x', `${e.clientX - rect.left}px`);
      this.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
  });
});

// ======================= KEYBOARD NAVIGATION =======================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.property-card-enhanced').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.querySelector('.btn-primary-enhanced')?.click();
      }
    });
  });

  document.querySelectorAll('.btn-enhanced, .filter-pill').forEach(button => {
    button.addEventListener('focus', function() {
      this.style.outline = '3px solid rgba(79, 200, 116, 0.5)';
      this.style.outlineOffset = '3px';
    });
    button.addEventListener('blur', function() {
      this.style.outline = 'none';
    });
  });
});

// ======================= ANIMATED CARDS ON SCROLL =======================
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.animated').forEach(card => cardObserver.observe(card));

// ======================= FAQ TOGGLE =======================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    question?.addEventListener("click", () => {
      document.querySelectorAll(".faq-item").forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });
});

// ======================= DYNAMIC CSS ANIMATIONS =======================
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.95); } }
  @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideOutDown { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(20px); } }
  @keyframes ripple { to { transform: scale(4); opacity: 0; } }
  .faq-item.active .faq-answer { max-height: 300px; padding: 16px 0; }
  .faq-item.active .toggle-icon { transform: rotate(45deg); }
  .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; padding: 0; }
  .toggle-icon { transition: transform 0.3s ease; display: inline-block; }
`;
document.head.appendChild(style);

// ======================= ANALYTICS & TRACKING =======================
function trackPropertyView(propertyName) {
  console.log(`Property viewed: ${propertyName}`);
}
function trackPropertyClick(propertyName, action) {
  console.log(`Property action: ${action} on ${propertyName}`);
}

document.addEventListener('DOMContentLoaded', () => {
  const viewObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const propertyName = entry.target.querySelector('.property-title-enhanced')?.textContent;
        if (propertyName) trackPropertyView(propertyName);
        viewObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.property-card-enhanced').forEach(card => viewObserver.observe(card));
});

// Module exports
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initPropertyFilters, initPropertyAnimations, initQuickView, trackPropertyView, trackPropertyClick };
}