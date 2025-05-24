document.addEventListener('DOMContentLoaded', function() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
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
    
    document.querySelectorAll('.contact-section h1, .contact-section .divider, .contact-intro, .contact-card').forEach(el => {
        el.classList.add('fade-element');
        observer.observe(el);
    });
});
