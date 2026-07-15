# Reseco Africa Website - UI/Design Update Plan

## Current Issues Found:
1. **index.html**: Duplicate property section (lines 277-316 and 317+), broken footer HTML structure
2. **Inconsistent navigation** across pages - different nav styles, hamburger, mobile menus
3. **Canonical URL issues** - aboutus.html points to github.io, not resecoafrica.com
4. **Missing footer closing tags** in index.html
5. **style.css 3750 lines** - severely bloated with duplicated CSS
6. **main.js** has duplicate dropdown handlers (3x same code blocks)
7. **Different page styles** - each page has its own separate CSS (about.css, services.css, contact.css) instead of using shared styles

## Improvement Plan:
- [ ] Fix critical HTML structure issues in index.html
- [ ] Unify navigation across all pages (consistent desktop + mobile menu)
- [ ] Clean up style.css - remove duplicates, consolidate
- [ ] Fix broken footer HTML structure
- [ ] Standardize page layouts across all pages
- [ ] Fix canonical URLs to point to resecoafrica.com
- [ ] Remove duplicate JS code in main.js
- [ ] Add CSS variables for consistent theming
- [ ] Improve mobile responsiveness
- [ ] Push updates to GitHub