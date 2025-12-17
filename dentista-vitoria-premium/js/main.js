/* Script de funcionalidades gerais e integrações
  Author: Vitor Assis Leppaus
*/

const CLIENT_PHONE = "5527999999999";

// Gera link dinâmico para API do WhatsApp
const getWhatsAppLink = (msg) => {
  const encodedMsg = encodeURIComponent(msg);
  return `https://wa.me/${CLIENT_PHONE}?text=${encodedMsg}`;
};

// Listener para botões de CTA
document.querySelectorAll("[data-whatsapp]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); 
    const customMsg = btn.getAttribute("data-whatsapp") || "Olá, gostaria de agendar uma avaliação.";
    window.open(getWhatsAppLink(customMsg), "_blank");
  });
});

// Botão Flutuante (Floating Action Button)
const fab = document.getElementById("whatsapp-float");
if (fab) {
  fab.addEventListener("click", (e) => {
    e.preventDefault();
    window.open(getWhatsAppLink("Olá, vim pelo site e gostaria de agendar uma avaliação."), "_blank");
  });
}

// Observer para animações de scroll
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Opcional: parar de observar após animar
      // scrollObserver.unobserve(entry.target); 
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll(".service-card, .about-content, .about-image, blockquote, .hero-content");
animatedElements.forEach((el) => {
  el.classList.add("animate-on-scroll");
  scrollObserver.observe(el);
});

// Navbar shadow on scroll
window.addEventListener("scroll", () => {
  document.body.classList.toggle("scrolled", window.scrollY > 50);
});