document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-animation');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        '.card, .section-header, .grid-diferenciais, .form-wrapper, .promo-card, .hero-content'
    );

    elementsToAnimate.forEach(el => {
        el.classList.add('reveal-effect');
        observer.observe(el);
    });
});