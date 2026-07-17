// Shared navigation behavior: hamburger toggle and dropdowns
document.addEventListener('DOMContentLoaded', function(){
  const hb = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  // Create overlay element
  let overlay = document.querySelector('.mobile-menu-overlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
  }
  
  // Hamburger toggle with animation
  if(hb && mobileMenu){
    hb.addEventListener('click', function(e){
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
      hb.classList.toggle('open');
      overlay.classList.toggle('active');
      mobileMenu.setAttribute('aria-hidden', mobileMenu.classList.contains('open') ? 'false' : 'true');
      
      // Prevent body scroll when menu is open
      if(mobileMenu.classList.contains('open')){
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when overlay is clicked
    overlay.addEventListener('click', function(){
      mobileMenu.classList.remove('open');
      hb.classList.remove('open');
      overlay.classList.remove('active');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }

  // Close mobile menu when a regular link is clicked
  if(mobileMenu){
    mobileMenu.addEventListener('click', function(e){
      if(e.target.tagName === 'A' && !e.target.closest('.dropdown')){
        mobileMenu.classList.remove('open');
        if(hb) hb.classList.remove('open');
        if(overlay) overlay.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  // Dropdown toggles for mobile
  document.querySelectorAll('.dropdown > a').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      var parent = anchor.parentElement;
      // On small screens allow the mobile menu to expand its submenus
      if(window.innerWidth <= 860){
        e.preventDefault();
        // Close other open dropdowns
        document.querySelectorAll('.dropdown.open').forEach(function(openDropdown){
          if(openDropdown !== parent){
            openDropdown.classList.remove('open');
          }
        });
        // Toggle current dropdown
        parent.classList.toggle('open');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e){
    if(!e.target.closest('.dropdown')){
      document.querySelectorAll('.dropdown.open').forEach(function(openEl){
        openEl.classList.remove('open');
      });
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')){
      mobileMenu.classList.remove('open');
      hb.classList.remove('open');
      if(overlay) overlay.classList.remove('active');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      hb.focus();
    }
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', function(){
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function(){
      // Close mobile menu when resizing to desktop
      if(window.innerWidth > 860 && mobileMenu && mobileMenu.classList.contains('open')){
        mobileMenu.classList.remove('open');
        if(hb) hb.classList.remove('open');
        if(overlay) overlay.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }, 250);
  });
});
