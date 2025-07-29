 document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.close-menu');

    // Open mobile menu on hamburger click
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    // Close mobile menu on close button click
    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = ''; // Restore scroll
    });

    // Optional: Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.mobile-menu .dropdown');

  dropdowns.forEach(drop => {
    const anchor = drop.querySelector('a');

    anchor.addEventListener('click', (e) => {
      e.preventDefault(); // prevent link navigation
      drop.classList.toggle('open');
    });
  });
});