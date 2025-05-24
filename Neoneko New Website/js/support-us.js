document.addEventListener('DOMContentLoaded', function() {
    const supportCards = document.querySelectorAll('.support-card');
    
    supportCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--bg-card-hover)';
            this.style.borderColor = 'rgba(107, 152, 194, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--bg-card)';
            this.style.borderColor = 'transparent';
        });
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    supportCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        
        observer.observe(card);
    });
    
    const thankYouSection = document.querySelector('.thank-you');
    if (thankYouSection) {
        thankYouSection.style.opacity = '0';
        thankYouSection.style.transform = 'translateY(30px)';
        thankYouSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        const thankYouObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    thankYouObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        thankYouObserver.observe(thankYouSection);
    }
    
    const introElements = document.querySelectorAll('.support-section h1, .support-section .divider, .intro-text');
    
    introElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});
