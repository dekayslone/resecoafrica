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