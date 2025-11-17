// Page Navigation
function navigateToPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show the requested page
  const page = document.getElementById(pageName + '-page');
  if (page) {
    page.classList.add('active');
    window.scrollTo(0, 0);
  }
}

// Helper: smooth scroll to an element by id
function scrollToId(id){
  const target = document.getElementById(id);
  if(target){
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // move focus for accessibility
    target.setAttribute('tabindex','-1');
    target.focus({ preventScroll: true });
  }
}

// Global click handler: handle page navigation and in-page anchors
document.addEventListener('click', (e) => {
  const el = e.target.closest('a,button');
  if(!el) return;

  // If element has data-page, handle SPA navigation (and possibly section anchors)
  if (el.hasAttribute('data-page')){
    e.preventDefault();
    const pageName = el.getAttribute('data-page');
    const href = el.getAttribute('href') || '';
    const isSection = href.startsWith('#');

    if(isSection){
      const id = href.slice(1);
      const currentPageId = document.querySelector('.page.active')?.id;
      if(currentPageId === 'home-page'){
        scrollToId(id);
      } else {
        navigateToPage(pageName);
        // wait a moment for the page to become active then scroll
        setTimeout(()=> scrollToId(id), 150);
      }
      return;
    }

    // Regular page navigation without scrolling
    navigateToPage(pageName);
    return;
  }

  // If it's an in-page anchor (href="#...") without data-page
  const href = el.getAttribute('href') || '';
  if(href.startsWith('#')){
    e.preventDefault();
    const id = href.slice(1);
    const currentPageId = document.querySelector('.page.active')?.id;
    // If target is already on the active page, just scroll
    if(currentPageId === 'home-page' || document.getElementById(id)?.closest('.page')?.classList.contains('active')){
      scrollToId(id);
    } else {
      // If not on the correct page, navigate to home then scroll
      navigateToPage('home');
      setTimeout(()=> scrollToId(id), 150);
    }
  }
});

// Logo click returns to home
document.querySelector('.logo-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  navigateToPage('home');
});

// Smooth fade-in on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("fade-in");
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Observe elements in all pages
  document.querySelectorAll(".card, .feature, .section").forEach((el)=>{
    observer.observe(el);
  });
});

// Floating CTA: scroll to top
const toTop = document.getElementById('toTop');
const toTopKontakt = document.getElementById('toTopKontakt');

[toTop, toTopKontakt].forEach(btn => {
  if(btn){
    btn.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));
  }
});

// Show/hide floating CTA based on scroll position
function updateToTopVisibility(){
  const currentPage = document.querySelector('.page.active');
  const toTopBtn = currentPage?.querySelector('.floating-cta');
  
  if(!toTopBtn) return;
  if(window.scrollY > 300){
    toTopBtn.classList.remove('hidden');
  } else {
    toTopBtn.classList.add('hidden');
  }
}

// initialize hidden state and add scroll listener
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.floating-cta').forEach(btn => {
    btn.classList.add('hidden');
  });
  updateToTopVisibility();
});
window.addEventListener('scroll', updateToTopVisibility);
