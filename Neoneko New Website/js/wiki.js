document.addEventListener('DOMContentLoaded', function() {
    const wikiCards = document.querySelectorAll('.wiki-card');
    
    wikiCards.forEach(card => {
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
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.wiki-section h1, .wiki-section .divider, .wiki-intro, .wiki-card').forEach(el => {
        el.classList.add('fade-element');
        observer.observe(el);
    });
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        wikiCards.forEach((card, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            card.style.transform = `translateY(${scrollPosition * 0.02 * direction}px)`;
        });
    });
});
