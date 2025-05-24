document.addEventListener('DOMContentLoaded', function() {
    const heroElements = document.querySelectorAll('.hero h1, .hero .divider, .hero .hero-text, .hero .description, .hero .cta');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * index);
    });
    
    const projectCards = document.querySelectorAll('.card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--bg-card-hover)';
            this.style.borderColor = 'var(--primary-light)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--bg-card)';
            this.style.borderColor = 'transparent';
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.card, .featured-projects h2, .featured-projects .divider').forEach(el => {
        el.classList.add('fade-element');
        observer.observe(el);
    });
});
