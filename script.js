// Cursor glow effect
const glow = document.querySelector('.cursor-glow');
if (glow) {
  let glowTimeout;
  window.addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = '0.7';
    clearTimeout(glowTimeout);
    glowTimeout = setTimeout(() => { glow.style.opacity = '0'; }, 2000);
  });
}

// Dropdown hover with delay
let dropdownTimeout;
document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(dropdownTimeout);
    document.querySelectorAll('.nav-dropdown.open').forEach((d) => {
      if (d !== dropdown) d.classList.remove('open');
    });
    dropdown.classList.add('open');
  });
  dropdown.addEventListener('mouseleave', () => {
    dropdownTimeout = setTimeout(() => { dropdown.classList.remove('open'); }, 100);
  });
});

// Mobile menu
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');

const closeNav = () => {
  menuButton?.classList.remove('open');
  nav?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  document.querySelectorAll('.nav-dropdown.open').forEach((d) => d.classList.remove('open'));
};

if (menuButton) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.classList.toggle('open');
    nav?.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-dropdown') && !event.target.closest('.menu-toggle')) {
    document.querySelectorAll('.nav-dropdown.open').forEach((d) => d.classList.remove('open'));
  }
});

// Reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(element);
});

// Scroll progress
const progressBar = document.querySelector('.scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}