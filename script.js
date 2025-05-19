// Home hero section slider pagination

const slides = document.querySelectorAll('.hero-section .slide, .hero-section .slide-active');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentSlide = 0;
let interval;

function animateOut(slide) {
  const content = slide.querySelector('.content');
  const cover = slide.querySelector('.cover');

  content.classList.remove('fade-in-left');
  cover.classList.remove('fade-in-right');

  content.classList.add('fade-out-left');
  cover.classList.add('fade-out-right');
}

function animateIn(slide) {
  const content = slide.querySelector('.content');
  const cover = slide.querySelector('.cover');

  content.classList.remove('fade-out-left');
  cover.classList.remove('fade-out-right');

  content.classList.add('fade-in-left');
  cover.classList.add('fade-in-right');
}

function updateSlide(index) {
  const current = slides[currentSlide];
  animateOut(current);

  setTimeout(() => {
    current.classList.remove('slide-active');
    current.classList.add('slide');

    const next = slides[index];
    next.classList.remove('slide');
    next.classList.add('slide-active');

    animateIn(next);

    currentSlide = index;
    prevBtn.disabled = currentSlide === 0;
  }, 600);
}

prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) {
    updateSlide(currentSlide - 1);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentSlide === slides.length - 1) {
    updateSlide(0);
  } else {
    updateSlide(currentSlide + 1);
  }
});

// Hero section autoplay system

function startAutoplay() {
  interval = setInterval(() => {
    if (currentSlide === slides.length - 1) {
      updateSlide(0);
    } else {
      updateSlide(currentSlide + 1);
    }
  }, 5000);
}

function stopAutoplay() {
  clearInterval(interval);
}

document.querySelector('.hero-section').addEventListener('mouseenter', stopAutoplay);
document.querySelector('.hero-section').addEventListener('mouseleave', startAutoplay);

// Initial load animation
window.addEventListener('DOMContentLoaded', () => {
  const firstSlide = slides[0];
  firstSlide.querySelector('.content').classList.add('fade-in-left');
  firstSlide.querySelector('.cover').classList.add('fade-in-right');
  startAutoplay();
});

// Fade in animation trigger when scrolling

const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        
        observer.unobserve(entry.target);
        }
    });
});

fadeInElements.forEach(el => observer.observe(el));
