// joinamb.js

// Toggle mobile nav menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('show');
  });

  // Optional: Close nav when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('show');
    }
  });
});
