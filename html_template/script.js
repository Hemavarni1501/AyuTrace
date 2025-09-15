// Main JavaScript for Ayurvedic Herb Traceability Website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ayurvedic Herb Traceability Website Loaded');
    
    // Initialize all animations and interactions
    initializeParticles();
    initializeLandingAnimation();
    initializeTimelineCards();
    initializeParallaxScrolling();
    initializeSmoothScrolling();
});

// Particle System
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    // Create new particles periodically
    setInterval(() => {
        if (particlesContainer.children.length < particleCount) {
            createParticle(particlesContainer);
        }
    }, 200);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation duration
    particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
    
    // Random delay
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 8000);
}

// Landing Animation
function initializeLandingAnimation() {
    const landingAnimation = document.getElementById('landingAnimation');
    const mainContent = document.getElementById('mainContent');
    
    // Hide landing animation after 3 seconds
    setTimeout(() => {
        landingAnimation.style.opacity = '0';
        landingAnimation.style.visibility = 'hidden';
        mainContent.style.opacity = '1';
    }, 3000);
}

// Timeline Cards Interaction
function initializeTimelineCards() {
    const timelineCards = document.querySelectorAll('.timeline-card');
    
    timelineCards.forEach((card, index) => {
        // Add click interaction
        card.addEventListener('click', () => {
            toggleCardFlip(card);
        });
        
        // Add keyboard interaction
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCardFlip(card);
            }
        });
        
        // Add focus capability
        card.setAttribute('tabindex', '0');
        
        // Staggered animation on scroll
        observeCardAnimation(card, index);
    });
}

function toggleCardFlip(card) {
    const cardInner = card.querySelector('.card-inner');
    const isFlipped = cardInner.style.transform === 'rotateY(180deg)';
    
    if (isFlipped) {
        cardInner.style.transform = 'rotateY(0deg)';
    } else {
        cardInner.style.transform = 'rotateY(180deg)';
    }
    
    // Add ripple effect
    createRippleEffect(card);
}

function createRippleEffect(card) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 255, 136, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    ripple.style.pointerEvents = 'none';
    
    card.style.position = 'relative';
    card.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for Card Animations
function observeCardAnimation(card, index) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    observer.observe(card);
}

// Parallax Scrolling
function initializeParallaxScrolling() {
    const parallaxBg = document.querySelector('.parallax-bg');
    const herbalPattern = document.querySelector('.herbal-pattern');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const patternRate = scrolled * -0.3;
        
        parallaxBg.style.transform = `translateY(${rate}px)`;
        herbalPattern.style.transform = `translateY(${patternRate}px)`;
    });
}

// Smooth Scrolling Enhancement
function initializeSmoothScrolling() {
    // Enhanced smooth scrolling for internal links
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
}

// Advanced 3D Card Interactions
function enhance3DEffects() {
    const cards = document.querySelectorAll('.timeline-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Initialize enhanced 3D effects after a delay
setTimeout(enhance3DEffects, 3500);

// QR Code Animation Enhancement
function enhanceQRCode() {
    const qrCode = document.querySelector('.qr-code');
    const qrSquares = document.querySelectorAll('.qr-square');
    
    // Add interactive hover effect
    qrCode.addEventListener('mouseenter', () => {
        qrSquares.forEach((square, index) => {
            setTimeout(() => {
                square.style.transform = 'scale(1.1)';
                square.style.background = '#00ff88';
            }, index * 50);
        });
    });
    
    qrCode.addEventListener('mouseleave', () => {
        qrSquares.forEach((square, index) => {
            setTimeout(() => {
                square.style.transform = 'scale(1)';
                square.style.background = '#000000';
            }, index * 30);
        });
    });
}

// Initialize QR code enhancements
setTimeout(enhanceQRCode, 4000);

// Performance Optimization
function optimizeAnimations() {
    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-motion');
        
        // Add reduced motion CSS
        const reducedMotionStyle = document.createElement('style');
        reducedMotionStyle.textContent = `
            .reduced-motion * {
                animation-duration: 0.5s !important;
                transition-duration: 0.3s !important;
            }
        `;
        document.head.appendChild(reducedMotionStyle);
    }
}

// Initialize performance optimizations
optimizeAnimations();

// Accessibility Enhancements
function enhanceAccessibility() {
    // Add ARIA labels
    const cards = document.querySelectorAll('.timeline-card');
    cards.forEach((card, index) => {
        const step = card.getAttribute('data-step');
        const title = card.querySelector('.card-front h3').textContent;
        card.setAttribute('aria-label', `Step ${step}: ${title}. Press Enter to view details.`);
        card.setAttribute('role', 'button');
    });
    
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

// Initialize accessibility enhancements
enhanceAccessibility();

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Application Error:', e.error);
});

// Resize Handler
window.addEventListener('resize', () => {
    // Recalculate particle positions on resize
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.left = Math.random() * 100 + '%';
    });
});

console.log('All systems initialized successfully! 🌿✨');