/* ========================================
   RESECO AFRICA - ADVANCED ANIMATIONS
   GSAP + ScrollTrigger + Interactive Effects
   ======================================== */

// ======================= LOADING SCREEN =======================
document.addEventListener('DOMContentLoaded', () => {
  // Hide loader after everything loads
  const loader = document.querySelector('.loader-overlay');
  if (loader) {
    // Wait for GSAP to load, then hide
    const checkGsap = setInterval(() => {
      if (typeof gsap !== 'undefined') {
        clearInterval(checkGsap);
        
        // Animate loader out with GSAP
        gsap.to('.loader-progress-bar', {
          width: '100%',
          duration: 1.2,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.to(loader, {
              opacity: 0,
              duration: 0.8,
              ease: 'power2.out',
              onComplete: () => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
                
                // Start all animations after loader
                initAllAnimations();
              }
            });
          }
        });
      }
    }, 100);
    
    // Fallback: hide loader after 3.5s even if GSAP fails
    setTimeout(() => {
      if (!loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        if (typeof gsap !== 'undefined') {
          initAllAnimations();
        }
      }
    }, 3500);
  } else {
    // No loader, start animations directly
    if (typeof gsap !== 'undefined') {
      document.addEventListener('DOMContentLoaded', initAllAnimations);
    }
  }
});

// ======================= MAIN INIT FUNCTION =======================
function initAllAnimations() {
  
  // Register ScrollTrigger plugin if available
  if (gsap && gsap.registerPlugin) {
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch(e) {
      console.log('ScrollTrigger not available, running without it');
    }
  }

  initScrollProgress();
  initRevealAnimations();
  initStaggerAnimations();
  initParallaxEffects();
  initMagneticButtons();
  initRippleEffects();
  initCursorGlow();
  initFloatingActions();
  initCounterAnimations();
  initSplitTextAnimations();
  initHeroAnimations();
  initGlassCardTilt();
}

// ======================= SCROLL PROGRESS =======================
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';
  });
}

// ======================= GSAP REVEAL ON SCROLL =======================
function initRevealAnimations() {
  if (typeof gsap === 'undefined') return;
  
  // Elements with reveal classes
  const revealSelectors = [
    '.reveal-fade', '.reveal-left', '.reveal-right', 
    '.reveal-scale', '.reveal-rotate'
  ];
  
  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      // Stagger items if they are children of a container
      const parent = el.closest('.stagger-children');
      if (parent) return; // Handled by stagger
      
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        },
        opacity: 1,
        y: el.classList.contains('reveal-left') || el.classList.contains('reveal-right') ? 0 : 
           el.classList.contains('reveal-scale') ? 0 : 
           el.classList.contains('reveal-rotate') ? 0 : 0,
        x: el.classList.contains('reveal-left') ? 0 : 
           el.classList.contains('reveal-right') ? 0 : 0,
        scale: el.classList.contains('reveal-scale') ? 1 : 
               el.classList.contains('reveal-rotate') ? 1 : undefined,
        rotate: el.classList.contains('reveal-rotate') ? 0 : undefined,
        duration: 1.2,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });
  });
  
  // Auto-reveal elements with [data-reveal] attribute
  document.querySelectorAll('[data-reveal]').forEach(el => {
    const delay = parseFloat(el.getAttribute('data-delay')) || 0;
    const duration = parseFloat(el.getAttribute('data-duration')) || 1.2;
    
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      y: 50,
      duration: duration,
      delay: delay,
      ease: 'power3.out'
    });
  });
}

// ======================= STAGGER ANIMATIONS =======================
function initStaggerAnimations() {
  if (typeof gsap === 'undefined') return;
  
  document.querySelectorAll('.stagger-children').forEach(container => {
    const children = container.children;
    if (!children.length) return;
    
    gsap.to(children, {
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });
}

// ======================= PARALLAX EFFECTS =======================
function initParallaxEffects() {
  // Parallax on mouse move for hero section
  const heroWrapper = document.querySelector('.hero-wrapper');
  if (heroWrapper) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      
      document.querySelectorAll('.parallax-layer').forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
        layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }
  
  // Scroll parallax
  if (typeof gsap !== 'undefined') {
    document.querySelectorAll('.parallax-scroll').forEach(el => {
      const speed = parseFloat(el.getAttribute('data-speed')) || 0.3;
      
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: `${100 * speed}px`,
        ease: 'none'
      });
    });
  }
}

// ======================= MAGNETIC BUTTONS =======================
function initMagneticButtons() {
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ======================= RIPPLE EFFECT =======================
function initRippleEffects() {
  document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ======================= CURSOR GLOW =======================
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;
  
  // Check if device supports hover (desktop)
  if (!window.matchMedia('(hover: hover)').matches) {
    glow.style.display = 'none';
    return;
  }
  
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth follow
  function animateGlow() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    glow.style.transform = `translate(${currentX - 150}px, ${currentY - 150}px)`;
    
    // Scale up on interactive elements
    const target = document.elementFromPoint(mouseX, mouseY);
    if (target) {
      const interactive = target.closest('a, button, .property-card-enhanced, .filter-pill, .mvv-card, .highlight-box');
      if (interactive) {
        glow.style.transform = `translate(${currentX - 150}px, ${currentY - 150}px) scale(1.5)`;
        glow.style.background = 'radial-gradient(circle, rgba(79, 200, 116, 0.12), transparent 70%)';
      } else {
        glow.style.transform = `translate(${currentX - 150}px, ${currentY - 150}px) scale(1)`;
        glow.style.background = 'radial-gradient(circle, rgba(79, 200, 116, 0.06), transparent 70%)';
      }
    }
    
    requestAnimationFrame(animateGlow);
  }
  
  animateGlow();
}

// ======================= FLOATING ACTIONS =======================
function initFloatingActions() {
  // Back to top
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });
    
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ======================= COUNTER ANIMATIONS (GSAP) =======================
function initCounterAnimations() {
  if (typeof gsap === 'undefined') return;
  
  document.querySelectorAll('.counter').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    if (!target) return;
    
    // Reset to 0
    counter.innerText = '0';
    
    gsap.to(counter, {
      scrollTrigger: {
        trigger: counter.closest('.score-grid') || counter.closest('.success-score-section'),
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            innerText: target,
            duration: 2.5,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate: function() {
              counter.innerText = Math.round(counter.textContent) + '+';
            },
            onComplete: () => {
              counter.innerText = target + '+';
            }
          });
        }
      }
    });
  });
}

// ======================= SPLIT TEXT ANIMATIONS =======================
function initSplitTextAnimations() {
  if (typeof gsap === 'undefined') return;
  
  document.querySelectorAll('.split-text').forEach(el => {
    const text = el.textContent;
    const chars = text.split('');
    el.innerHTML = '';
    
    chars.forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.classList.add('char');
      span.style.display = 'inline-block';
      el.appendChild(span);
    });
    
    gsap.from(el.querySelectorAll('.char'), {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      },
      opacity: 0,
      y: 30,
      rotateX: -90,
      duration: 0.6,
      stagger: 0.03,
      ease: 'back.out(1.7)'
    });
  });
}

// ======================= HERO ANIMATIONS =======================
function initHeroAnimations() {
  if (typeof gsap === 'undefined') return;
  
  // Hero entrance animation
  const heroTitle = document.getElementById('hero-text');
  if (heroTitle) {
    gsap.from(heroTitle, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.5
    });
  }
  
  // Hero wrapper background transition enhancement
  const heroWrapper = document.querySelector('.hero-wrapper');
  if (heroWrapper) {
    // Create a gradient overlay that animates
    gsap.to(heroWrapper, {
      backgroundPosition: '50% 50%',
      duration: 1,
      ease: 'power2.out'
    });
  }
}

// ======================= GLASS CARD TILT EFFECT =======================
function initGlassCardTilt() {
  document.querySelectorAll('.glass-card, .property-card-enhanced').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      // Only apply tilt on larger screens
      if (window.innerWidth < 768) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -5;
      const rotateY = (x - centerX) / centerX * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

// ======================= EXPOSE API =======================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initAllAnimations,
    initScrollProgress,
    initRevealAnimations,
    initParallaxEffects,
    initMagneticButtons,
    initRippleEffects,
    initCursorGlow,
    initCounterAnimations
  };
}