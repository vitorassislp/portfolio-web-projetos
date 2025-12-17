/* Core Functionality Script
  Project: Law Firm Landing Page
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // Accordion Logic
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Close siblings
            accordions.forEach(item => {
                if (item !== this) {
                    item.classList.remove('active');
                    item.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // Smooth Scroll Fallback (for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});