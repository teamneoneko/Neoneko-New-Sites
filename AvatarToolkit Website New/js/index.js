document.addEventListener('DOMContentLoaded', function() {
    const heroElements = document.querySelectorAll('.hero h1, .hero .divider, .hero .hero-text, .hero .description, .hero .cta');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * index);
    });
    
    const downloadElements = document.querySelectorAll('.download-section h2, .download-section .divider, .version-selector-container');
    
    downloadElements.forEach(element => {
        element.classList.add('fade-element');
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
    
    document.querySelectorAll('.fade-element, .card--feature, .features-section h2, .features-section .divider').forEach(el => {
        observer.observe(el);
    });
    
    const featureCards = document.querySelectorAll('.card--feature');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--bg-card-hover)';
            this.style.borderColor = 'var(--primary-light)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--bg-card)';
            this.style.borderColor = 'transparent';
        });
    });
    
    const downloadButton = document.getElementById('download-button');
    if (downloadButton) {
        const newButton = downloadButton.cloneNode(true);
        downloadButton.parentNode.replaceChild(newButton, downloadButton);
    }
});
