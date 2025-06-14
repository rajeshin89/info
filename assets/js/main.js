// === main.js ===
document.addEventListener('DOMContentLoaded', () => {
  AOS.init();

  const typed = document.querySelector('.typed');
  if (typed) {
    let typedStrings = typed.getAttribute('data-typed-items');
    typedStrings = typedStrings.split(',');

    new Typed('.typed', {
      strings: typedStrings,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    });
  }
});
