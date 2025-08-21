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

// Contact form functionality
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('.form-submit');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = 'Sending... <span class="btn-arrow">⏳</span>';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitButton.innerHTML = 'Message Sent! <span class="btn-arrow">✓</span>';
                submitButton.style.background = 'var(--neon-green)';
                
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            }, 2000);
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Enhanced form input animations
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        // Handle input focus and blur for label animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
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
        this.clock = new THREE.Clock();
        
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
        this.scene.background = null;
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            45, 
            this.container.offsetWidth / this.container.offsetHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 0, 8);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas,
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        
        // Create bottle group for easier manipulation
        this.bottleGroup = new THREE.Group();
        this.scene.add(this.bottleGroup);
        
        // Add subtle fog for depth
        this.scene.fog = new THREE.Fog(0x000000, 15, 30);
    }
    
    createBottle() {
        // Create a more realistic bottle shape using custom geometry
        const bottleShape = new THREE.Shape();
        
        // Bottle profile - sleek, modern design
        bottleShape.moveTo(0, -2);
        bottleShape.lineTo(0.3, -2);
        bottleShape.lineTo(0.4, -1.8);
        bottleShape.lineTo(0.5, -1.5);
        bottleShape.lineTo(0.6, -1);
        bottleShape.lineTo(0.7, -0.5);
        bottleShape.lineTo(0.8, 0);
        bottleShape.lineTo(0.85, 0.5);
        bottleShape.lineTo(0.9, 1);
        bottleShape.lineTo(0.9, 1.5);
        bottleShape.lineTo(0.85, 2);
        bottleShape.lineTo(0.8, 2.2);
        bottleShape.lineTo(0.7, 2.3);
        bottleShape.lineTo(0.6, 2.4);
        bottleShape.lineTo(0.5, 2.5);
        bottleShape.lineTo(0.4, 2.6);
        bottleShape.lineTo(0.3, 2.7);
        bottleShape.lineTo(0.2, 2.8);
        bottleShape.lineTo(0.1, 2.9);
        bottleShape.lineTo(0, 3);
        
        // Extrude the shape to create 3D bottle
        const extrudeSettings = {
            steps: 1,
            depth: 0.1,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.05,
            bevelOffset: 0,
            bevelSegments: 8
        };
        
        const bottleGeometry = new THREE.ExtrudeGeometry(bottleShape, extrudeSettings);
        
        // Create glass material with proper transparency and refraction
        const bottleMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.0,
            roughness: 0.0,
            transparent: true,
            opacity: 0.1,
            transmission: 0.95,
            thickness: 0.5,
            envMapIntensity: 1.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.0,
            ior: 1.5,
            attenuationDistance: 1.0,
            attenuationColor: 0x00ff88
        });
        
        this.bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
        this.bottle.castShadow = true;
        this.bottle.receiveShadow = true;
        this.bottleGroup.add(this.bottle);
        
        // Create bottle cap with better design
        const capGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.4, 32);
        const capMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x00ff88,
            metalness: 0.8,
            roughness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });
        
        this.cap = new THREE.Mesh(capGeometry, capMaterial);
        this.cap.position.y = 3.2;
        this.cap.castShadow = true;
        this.bottleGroup.add(this.cap);
        
        // Add water inside bottle
        this.createWater();
        
        // Add EcoSip branding
        this.createBranding();
        
        // Position bottle group
        this.bottleGroup.position.y = -0.5;
        this.bottleGroup.rotation.y = Math.PI * 0.2;
    }
    
    createWater() {
        // Create water geometry that fits inside the bottle
        const waterGeometry = new THREE.CylinderGeometry(0.6, 0.7, 2.5, 32);
        const waterMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.4,
            transmission: 0.9,
            thickness: 0.3,
            roughness: 0.0,
            metalness: 0.0,
            ior: 1.33
        });
        
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.position.y = 0.2;
        this.bottleGroup.add(water);
        
        // Add water surface with ripples
        const surfaceGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.02, 32);
        const surfaceMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.6,
            transmission: 0.8,
            roughness: 0.1
        });
        
        const waterSurface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
        waterSurface.position.y = 1.45;
        this.bottleGroup.add(waterSurface);
    }
    
    createBranding() {
        // Create a sleek label
        const labelGeometry = new THREE.PlaneGeometry(1.2, 0.8);
        const labelMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.9
        });
        
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.set(0, 0.5, 0.6);
        label.rotation.y = Math.PI * 0.1;
        this.bottleGroup.add(label);
        
        // Add EcoSip text (simplified geometric representation)
        const textGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.02);
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(0, 0.5, 0.61);
        textMesh.rotation.y = Math.PI * 0.1;
        this.bottleGroup.add(textMesh);
    }
    
    setupLighting() {
        // Ambient light for overall illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        this.scene.add(directionalLight);
        
        // Neon accent lights
        const neonLight1 = new THREE.PointLight(0x00ff88, 1.0, 15);
        neonLight1.position.set(-4, 3, 4);
        this.scene.add(neonLight1);
        
        const neonLight2 = new THREE.PointLight(0x00d4ff, 1.0, 15);
        neonLight2.position.set(4, -2, 4);
        this.scene.add(neonLight2);
        
        // Rim light for bottle edge highlighting
        const rimLight = new THREE.PointLight(0xffffff, 0.8, 12);
        rimLight.position.set(0, 0, 6);
        this.scene.add(rimLight);
        
        // Animate the lights
        this.neonLight1 = neonLight1;
        this.neonLight2 = neonLight2;
    }
    
    setupEventListeners() {
        // Mouse interaction for bottle rotation
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = Math.PI * 0.2;
        
        this.container.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            targetRotationX = mouseY * 0.5;
            targetRotationY = Math.PI * 0.2 + mouseX * 0.8;
        });
        
        // Scroll-based animations
        window.addEventListener('scroll', () => {
            const scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.5), 1);
            
            if (this.cap) {
                // Cap opens smoothly as user scrolls
                this.cap.position.y = 3.2 + (scrollProgress * 0.6);
                this.cap.rotation.z = scrollProgress * Math.PI * 0.2;
            }
            
            // Bottle tilts slightly
            if (this.bottleGroup) {
                this.bottleGroup.rotation.z = scrollProgress * 0.2;
            }
        });
        
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
        
        // Store target rotations for smooth animation
        this.targetRotationX = targetRotationX;
        this.targetRotationY = targetRotationY;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const delta = this.clock.getDelta();
        const time = this.clock.getElapsedTime();
        
        // Smooth rotation interpolation
        if (this.bottleGroup) {
            this.bottleGroup.rotation.x += (this.targetRotationX - this.bottleGroup.rotation.x) * 0.05;
            this.bottleGroup.rotation.y += (this.targetRotationY - this.bottleGroup.rotation.y) * 0.05;
            
            // Add subtle floating animation
            this.bottleGroup.position.y = -0.5 + Math.sin(time * 2) * 0.1;
        }
        
        // Animate neon lights
        if (this.neonLight1 && this.neonLight2) {
            this.neonLight1.intensity = 1.0 + Math.sin(time * 3) * 0.3;
            this.neonLight2.intensity = 1.0 + Math.sin(time * 3 + Math.PI) * 0.3;
        }
        
        // Subtle camera movement
        this.camera.position.x = Math.sin(time * 0.5) * 0.5;
        this.camera.position.z = 8 + Math.sin(time * 0.3) * 0.3;
        this.camera.lookAt(0, 0, 0);
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
}

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Mobile-optimized 3D bottle initialization
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Three.js to load
    setTimeout(() => {
        if (typeof THREE !== 'undefined') {
            // Check if device is mobile for performance optimization
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // Reduce 3D bottle complexity on mobile
                const bottle3D = new EcoSipBottle3D();
                // Reduce animation frequency on mobile
                bottle3D.reducedPerformance = true;
            } else {
                new EcoSipBottle3D();
            }
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

// Touch-friendly interactions for mobile
document.addEventListener('DOMContentLoaded', () => {
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('.btn, .social-icon, .product-card, .testimonial-card');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Improve form input experience on mobile
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        // Prevent zoom on iOS when focusing inputs
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name=viewport]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
                }
            }
        });
        
        input.addEventListener('blur', function() {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name=viewport]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1');
                }
            }
        });
    });
});

// Optimize scroll performance on mobile
let ticking = false;
function updateOnScroll() {
    // Throttle scroll events for better mobile performance
    if (!ticking) {
        requestAnimationFrame(() => {
            // Existing scroll functionality here
            ticking = false;
        });
        ticking = true;
    }
}

if (window.innerWidth <= 768) {
    window.addEventListener('scroll', updateOnScroll, { passive: true });
}
