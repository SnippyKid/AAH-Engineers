// ===================================
// AAH Engineers - JavaScript
// ===================================

// ===================================
// LOADER FUNCTIONALITY (INDEX PAGE ONLY)
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const loaderOverlay = document.getElementById('loaderOverlay');
    const enterExperienceBtn = document.getElementById('enterExperience');
    const progressBar = document.getElementById('progressBar');
    
    if (loaderOverlay && enterExperienceBtn) {
        // Prevent scrolling while loader is active
        document.body.style.overflow = 'hidden';
        
        let sequenceStarted = false;
        let isLoaderDismissed = false;
        let progressInterval = null;
        
        // Function to dismiss loader
        function dismissLoader() {
            if (isLoaderDismissed) return;
            isLoaderDismissed = true;
            
            if (progressInterval) {
                clearInterval(progressInterval);
            }
            
            // Hide loader with fade out
            loaderOverlay.classList.add('fade-out');
            
            // Enable scrolling
            document.body.style.overflow = '';
            
            // Remove loader from DOM after animation completes
            setTimeout(() => {
                if (loaderOverlay.parentNode) {
                    loaderOverlay.remove();
                }
            }, 1000);
        }
        
        function startExperienceSequence() {
            if (sequenceStarted || isLoaderDismissed) return;
            sequenceStarted = true;
            
            // Trigger all visual effects - motor spins, energy rings appear
            loaderOverlay.classList.add('start');
            enterExperienceBtn.classList.add('activated');
            
            // Animate progress bar
            let progress = 0;
            if (progressBar) {
                progressBar.style.width = '0%';
                progressInterval = setInterval(() => {
                    progress += 2;
                    progressBar.style.width = Math.min(progress, 100) + '%';
                    
                    if (progress >= 100) {
                        clearInterval(progressInterval);
                    }
                }, 50); // Updates every 50ms for smooth animation (total 2.5 seconds)
            }
            
            // Dismiss loader after 2.5 seconds
            setTimeout(() => {
                dismissLoader();
            }, 2500);
        }
        
        // Handle button click
        enterExperienceBtn.addEventListener('click', startExperienceSequence);
    }
});

// ===================================
// CUSTOM CURSOR TRAIL
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Array of motor and energy emojis
    const trailEmojis = ['⚙️',  '🔧', '⚙️', '🔩',  '💨'];
    let lastTrailTime = 0;
    const trailDelay = 50; // Milliseconds between trail emissions
    
    // Create cursor trail effect
    document.addEventListener('mousemove', function(e) {
        const currentTime = Date.now();
        
        // Throttle trail creation for better performance
        if (currentTime - lastTrailTime < trailDelay) {
            return;
        }
        
        lastTrailTime = currentTime;
        
        // Random emoji from the array
        const emoji = trailEmojis[Math.floor(Math.random() * trailEmojis.length)];
        
        // Create trail element
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        
        // Randomly apply animation variants for variety
        const variant = Math.floor(Math.random() * 3);
        if (variant === 1) {
            trail.classList.add('variant-1');
        } else if (variant === 2) {
            trail.classList.add('variant-2');
        }
        
        trail.textContent = emoji;
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        
        // Random size variation
        const sizeVariation = 0.7 + Math.random() * 0.6; // Between 0.7 and 1.3
        trail.style.fontSize = (20 * sizeVariation) + 'px';
        
        // Add slight random offset for more organic feel
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        trail.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
        
        document.body.appendChild(trail);
        
        // Remove trail element after animation completes
        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 1300);
    });
});

// ===================================
// FOOTER UTILITIES
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});

// ===================================
// FULLSCREEN MENU FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const fullscreenMenu = document.getElementById('fullscreenMenu');
    const body = document.body;

    // Open menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            fullscreenMenu.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }

    // Close menu
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            fullscreenMenu.classList.remove('active');
            body.style.overflow = '';
        });
    }

    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            fullscreenMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && fullscreenMenu.classList.contains('active')) {
            fullscreenMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
        });
    }
});

// GSAP Registration (only if GSAP is loaded)
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Mobile Menu Toggle (if needed later)
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Smooth Scroll for Anchor Links (only on same page)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default for same-page anchors
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// HERO SECTION ANIMATIONS
// ===================================

function initHeroAnimations() {
    // Hero Title Animation with GSAP
    gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
    });

    // Hero Subtitle Animation
    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
    });

    // CTA Buttons Animation
    gsap.from('.hero-cta a', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.7
    });

    // Feature Cards Animation
    gsap.from('.feature-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.9,
        scrollTrigger: {
            trigger: '.hero-features',
            start: 'top 80%',
        }
    });

    // Parallax effect on hero background
    gsap.to('#hero', {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Initialize hero animations on page load
if (document.querySelector('#hero')) {
    initHeroAnimations();
}

// ===================================
// CONTACT FORM HANDLING
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            e.stopPropagation(); // Stop event bubbling
            
            // Get form data
            const nameInput = contactForm.querySelector('[name="name"]');
            const emailInput = contactForm.querySelector('[name="email"]');
            const phoneInput = contactForm.querySelector('[name="phone"]');
            const companyInput = contactForm.querySelector('[name="company"]');
            const subjectInput = contactForm.querySelector('[name="subject"]');
            const messageInput = contactForm.querySelector('[name="message"]');
            
            // Validate required fields
            if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
                alert('Please fill in all required fields.');
                return;
            }
            
            const name = nameInput.value;
            const email = emailInput.value;
            const phone = phoneInput.value || 'Not provided';
            const company = companyInput.value || 'Not provided';
            const subject = subjectInput.value;
            const message = messageInput.value;
            
            // Create mailto link with pre-filled content
            const emailSubject = encodeURIComponent(subject);
            const emailBody = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Phone: ${phone}\n` +
                `Company: ${company}\n\n` +
                `Message:\n${message}`
            );
            
            // Open email client
            window.location.href = `mailto:info@aahengineers.com?subject=${emailSubject}&body=${emailBody}`;
            
            // Show success message
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-check"></i> Email Client Opened!';
                submitButton.disabled = true;
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }
    
    // Prevent buttons inside forms from submitting unless they're submit buttons
    document.querySelectorAll('form button:not([type="submit"])').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.type !== 'submit') {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });
});

// Add custom animations and functionality below

// ===================================
// REVIEWS SWIPER SLIDER
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Reviews Swiper
    if (typeof Swiper !== 'undefined') {
        const reviewsSwiper = new Swiper('.reviewsSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            speed: 800,
            effect: 'slide',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    }
});

