// script.js

// 1. Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 2. Fade-in on scroll (Intersection Observer)
const fadeElements = document.querySelectorAll('.animate-fadeInUp');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-6');
      }
    });
  },
  { threshold: 0.1 }
);

fadeElements.forEach(el => {
  el.classList.add('opacity-0', 'translate-y-6', 'transition', 'duration-1000');
  observer.observe(el);
});

// 3. Optional: Dark mode toggle (if needed)
const toggleBtn = document.getElementById('darkToggle');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });
}

// 4. Back to top button
const backToTop = document.createElement('button');
backToTop.innerText = '↑ Top';
backToTop.className =
  'fixed bottom-6 right-6 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-opacity opacity-0 pointer-events-none';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.remove('opacity-0', 'pointer-events-none');
  } else {
    backToTop.classList.add('opacity-0', 'pointer-events-none');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
