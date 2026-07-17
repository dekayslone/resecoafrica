// Shared navigation behavior: hamburger toggle and dropdowns
document.addEventListener('DOMContentLoaded', function(){
  const hb = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  // Hamburger toggle with animation
  if(hb && mobileMenu){
    hb.addEventListener('click', function(e){
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
      hb.classList.toggle('open');
      mobileMenu.setAttribute('aria-hidden', mobileMenu.classList.contains('open') ? 'false' : 'true');
    });
  }

  // Close mobile menu when link clicked
  if(mobileMenu){
    mobileMenu.addEventListener('click', function(e){
      if(e.target.tagName === 'A' && !e.target.closest('.dropdown')){
        mobileMenu.classList.remove('open');
        if(hb) hb.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function(e){
    if(mobileMenu && hb && mobileMenu.classList.contains('open')){
      if(!mobileMenu.contains(e.target) && !hb.contains(e.target)){
        mobileMenu.classList.remove('open');
        hb.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    }
  });

  // Dropdown toggles for desktop and mobile
  document.querySelectorAll('.dropdown > a').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      var parent = anchor.parentElement;
      // on small screens allow the mobile menu to expand its submenus
      if(window.innerWidth <= 860){
        e.preventDefault();
        parent.classList.toggle('open');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e){
    document.querySelectorAll('.dropdown.open').forEach(function(openEl){
      if(!openEl.contains(e.target)){
        openEl.classList.remove('open');
      }
    });
  });
});