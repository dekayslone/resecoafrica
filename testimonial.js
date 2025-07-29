  // ================== HAMBURGER MENU TOGGLE ==================
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("open");
  });

  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });

  // ================== SCROLL ANIMATION ==================
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, {
    threshold: 0.1
  });

  // Apply observer to all elements with `.animate-on-scroll`
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));