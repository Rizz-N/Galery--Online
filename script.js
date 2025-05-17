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

// Modal image viewer
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".galery .item img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    document.body.classList.add("no-scroll");
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
  document.body.classList.remove("no-scroll");
};