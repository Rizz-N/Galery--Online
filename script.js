const scrollContainer = document.getElementById('scroll');
const aboutusContainer = document.getElementById('about');

// Duplicate card biar infinite
const cards = Array.from(scrollContainer.children);
cards.forEach(card => {
  const clone = card.cloneNode(true);
  scrollContainer.appendChild(clone);
});

// Pause saat hover
aboutusContainer.addEventListener('mouseenter', () => {
  aboutusContainer.classList.add('paused');
});

aboutusContainer.addEventListener('mouseleave', () => {
  aboutusContainer.classList.remove('paused');
});
