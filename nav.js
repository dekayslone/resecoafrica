// Shared navigation behavior: hamburger toggle and dropdowns
document.addEventListener('DOMContentLoaded', function(){
  const hb = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if(hb && mobileMenu){
    hb.addEventListener('click', function(){ mobileMenu.classList.toggle('open'); hb.classList.toggle('is-open'); });
  }

  // Close mobile when link clicked
  if(mobileMenu){
    mobileMenu.addEventListener('click', function(e){ if(e.target.tagName === 'A'){ mobileMenu.classList.remove('open'); } });
  }

  // Dropdown toggles for desktop and mobile
  document.querySelectorAll('.dropdown > a').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      var parent = anchor.parentElement;
      // on small screens allow the mobile menu to expand its submenus
      if(window.innerWidth <= 860){
        e.preventDefault(); parent.classList.toggle('open');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e){
    document.querySelectorAll('.dropdown.open').forEach(function(openEl){ if(!openEl.contains(e.target)){ openEl.classList.remove('open'); } });
  });
});