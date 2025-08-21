// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.mission-card, .stat-item, .about-intro');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString() + (element.dataset.suffix || '');
        }
    }, 16);
}

// Trigger counter animations when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                const suffix = text.replace(/[0-9,]/g, '');
                stat.dataset.suffix = suffix;
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Particle system enhancement
function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #00ff88, #00d4ff);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        opacity: 0;
        animation: floatUp 8s linear forwards;
    `;
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Add floating particles periodically
setInterval(createFloatingParticle, 3000);

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 0;
            transform: translateY(0) translateX(0) scale(0);
        }
        10% {
            opacity: 1;
            transform: translateY(-100px) translateX(20px) scale(1);
        }
        90% {
            opacity: 1;
            transform: translateY(-90vh) translateX(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100vh) translateX(0) scale(0);
        }
    }
    
    .floating-particle {
        box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    }
`;
document.head.appendChild(style);

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(0) scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
});

// Mission card hover effects
document.querySelectorAll('.mission-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, rgba(17, 17, 17, 0.9), rgba(0, 255, 136, 0.05))';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = '#111111';
    });
});

// Eco visualization rotation control
document.addEventListener('DOMContentLoaded', () => {
    const ecoViz = document.querySelector('.eco-visualization');
    if (ecoViz) {
        let isHovered = false;
        
        ecoViz.addEventListener('mouseenter', () => {
            isHovered = true;
            document.querySelectorAll('.eco-circle:not(.main-circle)').forEach(circle => {
                circle.style.animationPlayState = 'paused';
            });
        });
        
        ecoViz.addEventListener('mouseleave', () => {
            isHovered = false;
            document.querySelectorAll('.eco-circle:not(.main-circle)').forEach(circle => {
                circle.style.animationPlayState = 'running';
            });
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    const particles = document.querySelectorAll('.particle');
    
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    particles.forEach((particle, index) => {
        const speed = 0.1 + (index * 0.05);
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
