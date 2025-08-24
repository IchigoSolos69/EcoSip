// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (toggle && navMenu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close on link click
        navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            toggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }));
    }
});

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
    if (scrolled > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.mission-card, .stat-item, .about-intro, .product-card, .testimonial-card, .highlight-item, .gallery-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation helpers
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

function animateRating(element, rating, max, duration = 1800) {
    let start = 0;
    const increment = rating / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= rating) {
            element.textContent = start.toFixed(1) + '/' + max;
            clearInterval(timer);
        } else {
            element.textContent = start.toFixed(1) + '/' + max;
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                // Handle special case for rating format (4.9/5)
                if (text.includes('/')) {
                    const parts = text.split('/');
                    if (parts.length === 2) {
                        const rating = parseFloat(parts[0]);
                        const maxRating = parseInt(parts[1]);
                        stat.dataset.suffix = '/' + maxRating;
                        animateRating(stat, rating, maxRating);
                        return;
                    }
                }
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
    if (statsSection) statsObserver.observe(statsSection);
    if (testimonialsStats) statsObserver.observe(testimonialsStats);
});

// Particle system - reduced on mobile
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
    setTimeout(() => { particle.remove(); }, 8000);
}

const isMobile = window.matchMedia('(max-width: 768px)').matches;
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(createFloatingParticle, isMobile ? 6000 : 3000);
}

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% { opacity: 0; transform: translateY(0) translateX(0) scale(0); }
        10% { opacity: 1; transform: translateY(-100px) translateX(20px) scale(1); }
        90% { opacity: 1; transform: translateY(-90vh) translateX(-20px) scale(1); }
        100% { opacity: 0; transform: translateY(-100vh) translateX(0) scale(0); }
    }
    .floating-particle { box-shadow: 0 0 10px rgba(0, 255, 136, 0.5); }
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
        this.capHinge = null;
        this.bottleGroup = null;
        this.container = document.getElementById('bottle-3d-container');
        this.canvas = document.getElementById('bottle-canvas');
        this.clock = new THREE.Clock();
        this.capOpenProgress = 0;
        
        if (this.container && this.canvas) {
            this.init();
            this.createBottle();
            this.createLogo();
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
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        
        // Create bottle group for easier manipulation
        this.bottleGroup = new THREE.Group();
        this.scene.add(this.bottleGroup);
        
        // Add subtle fog for depth
        this.scene.fog = new THREE.Fog(0x000000, 20, 40);
    }
    
    createBottle() {
        // Create a sleek, modern bottle shape
        const bottleGeometry = new THREE.CylinderGeometry(0.8, 0.9, 3.2, 32, 1, true);
        
        // Create glass material with realistic properties
        const bottleMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x00d4ff,
            metalness: 0.0,
            roughness: 0.0,
            transparent: true,
            opacity: 0.3,
            transmission: 0.95,
            thickness: 0.2,
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
        
        // Create bottle neck
        const neckGeometry = new THREE.CylinderGeometry(0.3, 0.8, 0.8, 32);
        const neckMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x00d4ff,
            metalness: 0.0,
            roughness: 0.0,
            transparent: true,
            opacity: 0.3,
            transmission: 0.95,
            thickness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.0
        });
        
        const neck = new THREE.Mesh(neckGeometry, neckMaterial);
        neck.position.y = 2.0;
        neck.castShadow = true;
        this.bottleGroup.add(neck);
        
        // Create bottle cap with realistic design
        this.createCap();
        
        // Add water inside bottle
        this.createWater();
        
        // Add smart technology elements
        this.createSmartElements();
        
        // Position bottle group
        this.bottleGroup.position.y = -0.5;
        this.bottleGroup.rotation.y = Math.PI * 0.2;
    }
    
    createCap() {
        // Cap body
        const capGeometry = new THREE.CylinderGeometry(0.32, 0.32, 0.6, 32);
        const capMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x00ff88,
            metalness: 0.8,
            roughness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });
        
        this.cap = new THREE.Mesh(capGeometry, capMaterial);
        this.cap.position.y = 2.4;
        this.cap.castShadow = true;
        this.bottleGroup.add(this.cap);
        
        // Cap top with grip texture
        const capTopGeometry = new THREE.CylinderGeometry(0.32, 0.32, 0.1, 32);
        const capTopMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x00ff88,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05
        });
        
        const capTop = new THREE.Mesh(capTopGeometry, capTopMaterial);
        capTop.position.y = 2.65;
        this.bottleGroup.add(capTop);
        
        // Create hinge for cap opening animation
        this.capHinge = new THREE.Group();
        this.capHinge.position.set(0, 2.4, 0.32);
        this.capHinge.add(this.cap);
        this.capHinge.add(capTop);
        this.bottleGroup.add(this.capHinge);
        
        // Reset cap position
        this.cap.position.y = 0;
        capTop.position.y = 0.25;
    }
    
    createWater() {
        // Water inside bottle
        const waterGeometry = new THREE.CylinderGeometry(0.75, 0.85, 2.8, 32);
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
        
        // Water surface with subtle ripples
        const surfaceGeometry = new THREE.CylinderGeometry(0.75, 0.75, 0.02, 32);
        const surfaceMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.6,
            transmission: 0.8,
            roughness: 0.1
        });
        
        const waterSurface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
        waterSurface.position.y = 1.6;
        this.bottleGroup.add(waterSurface);
    }
    
    createSmartElements() {
        // Smart temperature sensor (subtle ring)
        const sensorGeometry = new THREE.RingGeometry(0.85, 0.9, 32);
        const sensorMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.8
        });
        
        const sensor = new THREE.Mesh(sensorGeometry, sensorMaterial);
        sensor.position.y = -1.2;
        sensor.rotation.x = Math.PI / 2;
        this.bottleGroup.add(sensor);
        
        // LED indicator
        const ledGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const ledMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            emissive: 0x00ff88,
            emissiveIntensity: 0.5
        });
        
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.set(0.7, 0.5, 0.85);
        this.bottleGroup.add(led);
    }
    
    createLogo() {
        // Create EcoSip logo using texture from GitHub
        const textureLoader = new THREE.TextureLoader();
        
        textureLoader.load(
            'https://github.com/IchigoSolos69/EcoSip/blob/e307b84636a79fdfb8c3d61d3ecca27ec50bf7ba/public/logo.png?raw=true',
            (texture) => {
                // Create logo plane with the loaded texture
                const logoGeometry = new THREE.PlaneGeometry(1.0, 1.0);
                const logoMaterial = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.9
                });
                
                const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
                logoMesh.position.set(0, 0.5, 0.86);
                this.bottleGroup.add(logoMesh);
                
                // Add glow effect behind the logo
                const glowGeometry = new THREE.PlaneGeometry(1.2, 1.2);
                const glowMaterial = new THREE.MeshBasicMaterial({
                    color: 0x00ff88,
                    transparent: true,
                    opacity: 0.2,
                    emissive: 0x00ff88,
                    emissiveIntensity: 0.3
                });
                
                const logoGlow = new THREE.Mesh(glowGeometry, glowMaterial);
                logoGlow.position.set(0, 0.5, 0.85);
                this.bottleGroup.add(logoGlow);
                
                this.logoGroup = new THREE.Group();
                this.logoGroup.add(logoMesh);
                this.logoGroup.add(logoGlow);
                this.bottleGroup.add(this.logoGroup);
            },
            undefined,
            (error) => {
                console.warn('Could not load EcoSip logo texture, using fallback');
                // Fallback to simple geometric logo
                const fallbackGeometry = new THREE.RingGeometry(0.4, 0.5, 32);
                const fallbackMaterial = new THREE.MeshBasicMaterial({
                    color: 0x00ff88,
                    transparent: true,
                    opacity: 0.9
                });
                
                const fallbackLogo = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
                fallbackLogo.position.set(0, 0.5, 0.85);
                fallbackLogo.rotation.x = Math.PI / 2;
                this.bottleGroup.add(fallbackLogo);
                
                this.logoGroup = new THREE.Group();
                this.logoGroup.add(fallbackLogo);
            }
        );
    }
    
    setupLighting() {
        // Ambient light for overall illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
        
        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
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
        const neonLight1 = new THREE.PointLight(0x00ff88, 1.2, 15);
        neonLight1.position.set(-4, 3, 4);
        this.scene.add(neonLight1);
        
        const neonLight2 = new THREE.PointLight(0x00d4ff, 1.2, 15);
        neonLight2.position.set(4, -2, 4);
        this.scene.add(neonLight2);
        
        // Rim light for bottle edge highlighting
        const rimLight = new THREE.PointLight(0xffffff, 1.0, 12);
        rimLight.position.set(0, 0, 6);
        this.scene.add(rimLight);
        
        // Logo spotlight
        const logoLight = new THREE.SpotLight(0x00ff88, 0.8, 10, Math.PI / 6, 0.5);
        logoLight.position.set(0, 2, 4);
        logoLight.target.position.set(0, 0.5, 0.85);
        this.scene.add(logoLight);
        this.scene.add(logoLight.target);
        
        // Animate the lights
        this.neonLight1 = neonLight1;
        this.neonLight2 = neonLight2;
        this.logoLight = logoLight;
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
        
        // Scroll-based cap animation
        window.addEventListener('scroll', () => {
            const scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.5), 1);
            this.capOpenProgress = scrollProgress;
            
            // Cap opens smoothly as user scrolls
            if (this.capHinge) {
                this.capHinge.rotation.x = -scrollProgress * Math.PI * 0.4;
            }
            
            // Bottle tilts slightly
            if (this.bottleGroup) {
                this.bottleGroup.rotation.z = scrollProgress * 0.1;
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
            this.neonLight1.intensity = 1.2 + Math.sin(time * 3) * 0.4;
            this.neonLight2.intensity = 1.2 + Math.sin(time * 3 + Math.PI) * 0.4;
        }
        
        // Animate logo glow
        if (this.logoGroup) {
            this.logoGroup.children.forEach((child, index) => {
                if (child.material.emissive) {
                    child.material.emissiveIntensity = 0.3 + Math.sin(time * 2 + index) * 0.2;
                }
            });
        }
        
        // Subtle camera movement
        this.camera.position.x = Math.sin(time * 0.5) * 0.3;
        this.camera.position.z = 8 + Math.sin(time * 0.3) * 0.2;
        this.camera.lookAt(0, 0, 0);
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize 3D bottle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Three.js to load
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

// Desktop-only tilt for product cards
(function() {
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.product-card').forEach(card => {
            const inner = card.querySelector('.product-image') || card;
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const rotY = clamp((x - 0.5) * 20, -14, 14);
                const rotX = clamp((0.5 - y) * 14, -10, 10);
                inner.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => {
                inner.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0)';
            });
        });
    });
})();

// Ensure body doesn't expand on menu open
(function() {
    const mq = window.matchMedia('(max-width: 768px)');
    const navMenu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    if (!navMenu || !toggle) return;
    const lock = () => document.documentElement.style.setProperty('overflow', 'hidden', 'important');
    const unlock = () => document.documentElement.style.removeProperty('overflow');
    toggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) lock(); else unlock();
    });
    window.addEventListener('resize', () => { if (!mq.matches) unlock(); });
})();

// Enhanced About Section Animations
function initAboutAnimations() {
    // Animated counters
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 20);
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
    
    // Mission card animations
    const missionCards = document.querySelectorAll('.mission-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    missionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        cardObserver.observe(card);
    });
    
    // Orbit item animations
    const orbitItems = document.querySelectorAll('.orbit-item');
    const orbitObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(-50%) scale(1)';
                }, index * 300);
            }
        });
    }, { threshold: 0.5 });
    
    orbitItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50%) scale(0.5)';
        item.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        orbitObserver.observe(item);
    });
    
    // Center glow animation
    const centerGlow = document.querySelector('.center-glow');
    if (centerGlow) {
        const glowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'glowPulse 4s ease-in-out infinite';
                }
            });
        }, { threshold: 0.5 });
        glowObserver.observe(centerGlow);
    }
    
    // Particle animations
    const particles = document.querySelectorAll('.floating-particles .particle');
    particles.forEach((particle, index) => {
        particle.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Connecting lines animation
    const lines = document.querySelectorAll('.connecting-lines .line');
    const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'lineGlow 3s ease-in-out infinite';
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    lines.forEach(line => {
        line.style.opacity = '0';
        lineObserver.observe(line);
    });
}

// Enhanced scroll effects for About section
function initAboutScrollEffects() {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;
    
    const aboutVisual = document.querySelector('.eco-impact-visualization');
    const aboutText = document.querySelector('.about-text');
    
    window.addEventListener('scroll', () => {
        const rect = aboutSection.getBoundingClientRect();
        const scrollPercent = Math.max(0, Math.min(1, 1 - (rect.top + rect.height) / window.innerHeight));
        
        if (aboutVisual) {
            aboutVisual.style.transform = `scale(${1 + scrollPercent * 0.1}) rotate(${scrollPercent * 5}deg)`;
        }
        
        if (aboutText) {
            aboutText.style.transform = `translateX(${scrollPercent * -20}px)`;
            aboutText.style.opacity = 1 - scrollPercent * 0.3;
        }
    });
}

// Initialize all About section animations
document.addEventListener('DOMContentLoaded', function() {
    initAboutAnimations();
    initAboutScrollEffects();
});

// Gallery Slider Functionality
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.gallery-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider || !slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Function to show slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Function to go to next slide
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(index);
        });
    });
    
    // Auto-play functionality
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Pause auto-play on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
});
