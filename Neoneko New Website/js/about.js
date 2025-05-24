document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('h1, h2, .divider, p, .team-card');
    
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
    
    sections.forEach(section => {
        section.classList.add('fade-element');
        observer.observe(section);
    });
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const aboutSection = document.querySelector('.about-section');
        
        if (aboutSection) {
            const elements = aboutSection.querySelectorAll('h2, .divider');
            elements.forEach(element => {
                element.style.transform = `translateY(${scrollPosition * 0.02}px)`;
            });
        }
    });
    
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--bg-card-hover)';
            this.style.borderColor = 'var(--primary-light)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--bg-card)';
            this.style.borderColor = 'transparent';
        });
    });
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                const cards = entry.target.querySelectorAll('.team-card');
                
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('card-visible');
                    }, 200 * index);
                });
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    document.querySelectorAll('.about-text > h2:nth-of-type(4), .about-text > h2:nth-of-type(5)').forEach(heading => {
        sectionObserver.observe(heading.parentElement);
    });
});
