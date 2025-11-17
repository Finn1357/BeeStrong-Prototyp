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

// Click handlers for navigation links
document.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-page')) {
    e.preventDefault();
    const pageName = e.target.getAttribute('data-page');
    navigateToPage(pageName);
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

// Smooth scrolling for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if(target){
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // move focus for accessibility
      target.setAttribute('tabindex','-1');
      target.focus({ preventScroll: true });
    }
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
