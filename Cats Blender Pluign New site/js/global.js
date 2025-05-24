document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.createElement('button');
    navToggle.id = 'nav-toggle';
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (navbar && !document.getElementById('nav-toggle')) {
        navbar.insertBefore(navToggle, navLinks);
        
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                try {
                    const href = this.getAttribute('href');
                    if (href.startsWith('#')) {
                        const element = document.querySelector(href);
                        if (element) {
                            element.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }
                    }
                } catch (error) {
                    console.warn('Error scrolling to element:', error);
                    window.location.href = this.getAttribute('href');
                }
            }
        });
    });
    
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.title = 'Scroll to top';
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.querySelectorAll('h1 + .divider, h2 + .divider').forEach(divider => {
        const parentSection = divider.closest('section, .text-center');
        if (parentSection && (parentSection.classList.contains('text-center') || 
            parentSection.classList.contains('hero') || 
            parentSection.classList.contains('wiki-section') ||
            parentSection.classList.contains('contact-section') ||
            parentSection.classList.contains('support-section'))) {
            divider.style.marginLeft = 'auto';
            divider.style.marginRight = 'auto';
        }
        
        const isLeftAligned = divider.closest('.about-text, .support-card, .text-left');
        if (isLeftAligned) {
            divider.style.marginLeft = '0';
            divider.style.marginRight = 'auto';
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .nav-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
        }
        
        .nav-toggle span {
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px 0;
            background-color: var(--text-light);
            transition: var(--transition-normal);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
        
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            transition: var(--transition-normal);
            box-shadow: var(--shadow-md);
            z-index: 99;
        }
        
        .scroll-top-btn.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-top-btn:hover {
            transform: translateY(-5px);
        }
        
        @media (max-width: 768px) {
            .nav-toggle {
                display: block;
            }
            
            .nav-links {
                display: none;
                width: 100%;
            }
            
            .nav-links.active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
});
