// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
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

function playVideo() {
  const video = document.querySelector('.custom-video');
  const thumbnail = document.querySelector('.video-thumbnail');

  // Hide thumbnail if needed
  if (thumbnail) {
    thumbnail.style.display = 'none';
  }

  // Show and play the video
  if (video) {
    video.style.display = 'block';
    video.play();
  }
}

 gsap.from("#heroTitle", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    delay: 0.5
  });

  gsap.from(".hero-text p", {
    y: 30,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    delay: 1.2
  });