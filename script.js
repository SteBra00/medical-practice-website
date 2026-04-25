// ==================== NAVBAR SCROLL SPY ====================
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link
    updateActiveNavLink();
});

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Update Active Nav Link Based on Scroll Position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==================== SMOOTH SCROLL ====================
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

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class
            entry.target.classList.add('in-view');

            // Don't observe again if we want one-time animation
            // Uncomment the line below if you want animations to trigger only once
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.servizio-card, .info-card, .fade-in').forEach(el => {
    observer.observe(el);
});

// ==================== FORM VALIDATION & SUBMISSION ====================
const contactForm = document.getElementById('contactForm');
const successPopup = document.getElementById('successPopup');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const servizio = document.getElementById('servizio').value;
        const message = document.getElementById('message').value.trim();
        const privacy = document.getElementById('privacy').checked;

        // Validation
        if (!name || !email || !message || !privacy) {
            showError('Per favore compila tutti i campi obbligatori');
            return;
        }

        // Email validation (regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Per favore inserisci un email valido');
            return;
        }

        // Phone validation (if provided)
        if (phone) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone) || phone.length < 9) {
                showError('Per favore inserisci un numero di telefono valido');
                return;
            }
        }

        // Log form data (for demonstration)
        console.log('Form Data:', {
            name,
            email,
            phone,
            servizio,
            message,
            timestamp: new Date().toLocaleString('it-IT')
        });

        // Show success message
        showSuccessPopup();

        // Reset form
        contactForm.reset();

        // In production, you would send this data to a server
        // Example with Formspree or similar service:
        // fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email, phone, servizio, message })
        // });
    });
}

// Show Error Message
function showError(message) {
    alert(message); // Simple alert for demo
    // In production, you might want a nicer error notification
    console.error('Form Error:', message);
}

// Show Success Popup
function showSuccessPopup() {
    if (successPopup) {
        successPopup.classList.add('show');
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            successPopup.classList.remove('show');
        }, 5000);
    }
}

// Close Success Popup
function closePopup() {
    if (successPopup) {
        successPopup.classList.remove('show');
    }
}

// ==================== GLOW EFFECT ON MOUSE MOVE ====================
const glowElement = document.querySelector('.glow-element');

if (glowElement) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        // Only apply to hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const rect = heroSection.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                glowElement.style.transform = `translate(calc(-50% + ${x * 50}px), calc(-50% + ${y * 50}px))`;
            }
        }
    });
}

// ==================== RIPPLE EFFECT ON BUTTONS ====================
function addRippleEffect(button) {
    button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.8s ease';

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 800);
    });
}

// Apply ripple effect to buttons
document.querySelectorAll('.cta-button, .submit-button').forEach(button => {
    addRippleEffect(button);
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.scrollY;
        const elementOffset = element.offsetTop;
        const distance = scrollPosition - elementOffset;
        const parallaxSpeed = element.getAttribute('data-parallax') || 0.5;

        if (scrollPosition >= elementOffset - window.innerHeight && scrollPosition <= elementOffset + element.clientHeight) {
            element.style.transform = `translateY(${distance * parallaxSpeed}px)`;
        }
    });
});

// ==================== TYPING ANIMATION (Optional Enhancement) ====================
function typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ==================== SCROLL TO TOP BUTTON (Optional) ====================
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.textContent = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #d63447 0%, #d4af37 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        z-index: 999;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        font-weight: bold;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
        } else {
            button.style.opacity = '0';
            button.style.pointerEvents = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.4)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = 'none';
    });
}

// Create scroll to top button
createScrollToTopButton();

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.8s ease';
});

// ==================== LAZY LOAD IMAGES ====================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
}

lazyLoadImages();

// ==================== CONSOLE LOG ====================
console.log('%cDr.ssa Medica - Sito Web Ufficiale', 'color: #d4af37; font-size: 20px; font-weight: bold;');
console.log('%cTema Elegante Nero, Rosso e Oro', 'color: #d63447; font-size: 16px;');
console.log('%cPer prenotare una consulenza, compila il form nella sezione Contatti', 'color: #e0e0e0; font-size: 14px;');