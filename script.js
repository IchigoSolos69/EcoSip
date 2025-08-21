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
    const animateElements = document.querySelectorAll('.mission-card, .stat-item, .about-intro, .product-card, .testimonial-card, .highlight-item, .gallery-item');
    
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
    const testimonialsStats = document.querySelector('.testimonials-stats');
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    if (testimonialsStats) {
        statsObserver.observe(testimonialsStats);
    }
});

// Gallery Slider Functionality
class GallerySlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.totalSlides = this.slides.length;
        
        this.init();
    }
    
    init() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-play slider
        this.startAutoPlay();
        
        // Pause auto-play on hover
        const slider = document.querySelector('.gallery-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => this.stopAutoPlay());
            slider.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(next);
    }
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prev);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialize gallery slider
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.gallery-slider')) {
        new GallerySlider();
    }
});

// Product card interactions
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productShape = card.querySelector('.product-shape');
        
        card.addEventListener('mouseenter', () => {
            if (productShape) {
                productShape.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (productShape) {
                productShape.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});

// Testimonial card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, rgba(17, 17, 17, 0.9), rgba(0, 255, 136, 0.05))';
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = '#111111';
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
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

// Add to cart functionality
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    addToCartButtons.forEach(button => {
        if (button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create success animation
                const originalText = this.textContent;
                this.textContent = 'Added! ✓';
                this.style.background = 'var(--neon-green)';
                this.style.color = 'var(--primary-bg)';
                this.style.boxShadow = '0 0 20px var(--neon-green)';
                
                // Reset after animation
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                    this.style.color = '';
                    this.style.boxShadow = '';
                }, 2000);
            });
        }
    });
});

// Smooth reveal animations for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(section);
    });
});

// Add CSS for reveal animations
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    section.revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(revealStyle);

// 3D Bottle Model with Three.js
class EcoSipBottle3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.bottle = null;
        this.cap = null;
        this.bottleGroup = null;
        this.container = document.getElementById('bottle-3d-container');
        this.canvas = document.getElementById('bottle-canvas');
        
        if (this.container && this.canvas) {
            this.init();
            this.createBottle();
            this.setupLighting();
            this.setupEventListeners();
            this.animate();
        }
    }
    
    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            50, 
            this.container.offsetWidth / this.container.offsetHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 0, 6);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas,
            alpha: true, 
            antialias: true 
        });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Create bottle group for easier manipulation
        this.bottleGroup = new THREE.Group();
        this.scene.add(this.bottleGroup);
    }
    
    createBottle() {
        // Bottle body geometry - more realistic shape
        const bottleGeometry = new THREE.CylinderGeometry(0.8, 1.0, 3.5, 32);
        
        // Bottle material with eco-friendly colors
        const bottleMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x1de9b6,
            metalness: 0.1,
            roughness: 0.3,
            transparent: true,
            opacity: 0.7,
            transmission: 0.9,
            thickness: 0.5,
            envMapIntensity: 1.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });
        
        this.bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
        this.bottle.castShadow = true;
        this.bottle.receiveShadow = true;
        this.bottleGroup.add(this.bottle);
        
        // Bottle cap
        const capGeometry = new THREE.CylinderGeometry(0.82, 0.82, 0.6, 32);
        const capMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x00ff99,
            metalness: 0.8,
            roughness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });
        
        this.cap = new THREE.Mesh(capGeometry, capMaterial);
        this.cap.position.y = 2.05;
        this.cap.castShadow = true;
        this.bottleGroup.add(this.cap);
        
        // Add EcoSip label
        this.createLabel();
        
        // Add water inside bottle
        this.createWater();
        
        // Position bottle group
        this.bottleGroup.position.y = -0.5;
        this.bottleGroup.rotation.y = Math.PI * 0.1;
    }
    
    createLabel() {
        // Create a simple text label using geometry
        const labelGeometry = new THREE.PlaneGeometry(1.5, 0.8);
        const labelMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.8
        });
        
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.set(0, 0.5, 0.85);
        this.bottleGroup.add(label);
        
        // Add text using CSS3DRenderer alternative - simple geometric text
        const textGeometry = new THREE.RingGeometry(0.1, 0.2, 8);
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(0, 0.5, 0.86);
        this.bottleGroup.add(textMesh);
    }
    
    createWater() {
        // Water inside bottle
        const waterGeometry = new THREE.CylinderGeometry(0.75, 0.95, 2.8, 32);
        const waterMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.3,
            transmission: 1.0,
            thickness: 0.2,
            roughness: 0.0,
            metalness: 0.0
        });
        
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.position.y = -0.2;
        this.bottleGroup.add(water);
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Accent lights for neon effect
        const neonLight1 = new THREE.PointLight(0x00ff88, 0.8, 10);
        neonLight1.position.set(-3, 2, 3);
        this.scene.add(neonLight1);
        
        const neonLight2 = new THREE.PointLight(0x00d4ff, 0.8, 10);
        neonLight2.position.set(3, -2, 3);
        this.scene.add(neonLight2);
    }
    
    setupEventListeners() {
        // Scroll-based cap animation
        window.addEventListener('scroll', () => {
            const scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.5), 1);
            
            if (this.cap) {
                // Cap opens as user scrolls
                this.cap.position.y = 2.05 + (scrollProgress * 0.8);
                this.cap.rotation.z = scrollProgress * Math.PI * 0.3;
            }
            
            // Bottle rotation based on scroll
            if (this.bottleGroup) {
                this.bottleGroup.rotation.y = Math.PI * 0.1 + (scrollProgress * Math.PI * 0.5);
            }
        });
        
        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        
        this.container.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        });
        
        // Apply mouse movement to bottle rotation
        const updateMouseRotation = () => {
            if (this.bottleGroup) {
                this.bottleGroup.rotation.x += (mouseY * 0.1 - this.bottleGroup.rotation.x) * 0.05;
                this.bottleGroup.rotation.y += (mouseX * 0.2 + Math.PI * 0.1 - this.bottleGroup.rotation.y) * 0.05;
            }
        };
        
        // Resize handler
        window.addEventListener('resize', () => {
            if (this.container && this.camera && this.renderer) {
                const width = this.container.offsetWidth;
                const height = this.container.offsetHeight;
                
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(width, height);
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            }
        });
        
        // Store mouse update function for animation loop
        this.updateMouseRotation = updateMouseRotation;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Auto rotation when not interacting
        if (this.bottleGroup) {
            this.bottleGroup.rotation.y += 0.005;
        }
        
        // Apply mouse interaction
        if (this.updateMouseRotation) {
            this.updateMouseRotation();
        }
        
        // Floating animation enhancement
        if (this.bottleGroup) {
            this.bottleGroup.position.y = -0.5 + Math.sin(Date.now() * 0.001) * 0.1;
        }
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize 3D bottle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for Three.js to load
    setTimeout(() => {
        if (typeof THREE !== 'undefined') {
            new EcoSipBottle3D();
        } else {
            console.warn('Three.js not loaded, falling back to 2D bottle');
            // Fallback to 2D bottle if Three.js fails to load
            const container = document.getElementById('bottle-3d-container');
            if (container) {
                container.innerHTML = `
                    <div class="floating-bottle">
                        <div class="bottle-glow"></div>
                        <div class="bottle-shape"></div>
                    </div>
                `;
            }
        }
    }, 100);
});
