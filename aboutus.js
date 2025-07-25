  AOS.init({ duration: 800, once: true });

  function playVideo() {
    const video = document.getElementById("resecovideo");
    document.querySelector(".video-thumbnail").style.display = "none";
    video.style.display = "block";
    video.muted = false;
    video.play();
  }

  function toggleMobileMenu() {
    const mobileNav = document.getElementById("mobileNav");
    mobileNav.classList.toggle("open");
  }

  document.getElementById("hamburger").addEventListener("click", toggleMobileMenu);

  // ✅ Toggle dropdown inside mobile nav
  function toggleMobileDropdown(e) {
    e.preventDefault();
    const dropdown = document.getElementById("mobileDropdownToggle");
    dropdown.classList.toggle("open");
  }