/* Core script for animations and interactions
  Author: Vitor Assis Leppaus
*/

document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initHeaderScroll();
  initCardInteractions();
  initSmoothScroll();
  initMobileMenu();
});

// Intersection Observer for scroll animations
const initScrollAnimations = () => {
  const elements = document.querySelectorAll(
    ".hero-text, .hero-image, .procedimento-card, .autoridade-image, .autoridade-text, .resultados-grid img, .cta-final"
  );

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
};

// Header shadow on scroll
const initHeaderScroll = () => {
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 20 
      ? "0 10px 30px rgba(0,0,0,0.08)" 
      : "none";
  });
};

// Hover effects for service cards
const initCardInteractions = () => {
  document.querySelectorAll(".procedimento-card").forEach(card => {
    card.addEventListener("mouseenter", () => card.style.transform = "translateY(-8px)");
    card.addEventListener("mouseleave", () => card.style.transform = "translateY(0)");
  });
};

// Smooth scrolling for anchor links
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        // Close menu if open (mobile)
        document.getElementById("navMenu").classList.remove("active");
      }
    });
  });
};

// Mobile Menu Toggle
const initMobileMenu = () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if(menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
};