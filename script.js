/**
 * Team Kaze - Rocket League Esports Website
 * Main JavaScript functionality
 */

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Team Kaze website initialized');
    
    // Initialize components
    initMobileMenu();
    initSmoothScrolling();
    initPlayersSlider();
    initFormHandling();
    initCounters();
    initHoverEffects();
    initScrollAnimations();
    initParallaxEffects();
});

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', function() {
            menu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('i');
            
            // Change icon based on menu state
            if (menu.classList.contains('hidden')) {
                lucide.createIcon(icon, 'menu');
            } else {
                lucide.createIcon(icon, 'x');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuBtn.contains(event.target) && !menu.contains(event.target)) {
                menu.classList.add('hidden');
                lucide.createIcon(menuBtn.querySelector('i'), 'menu');
            }
        });
    }
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty or same page links
            if (href === '#' || href === '#!') {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                const menuBtn = document.getElementById('mobile-menu-btn');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    lucide.createIcon(menuBtn.querySelector('i'), 'menu');
                }
            }
        });
    });
}

/**
 * Initialize players slider
 */
function initPlayersSlider() {
    const slider = document.getElementById('players-slider');
    const prevBtn = document.querySelector('.players-slider-prev');
    const nextBtn = document.querySelector('.players-slider-next');
    
    if (slider && prevBtn && nextBtn) {
        const slides = slider.querySelectorAll('.slide');
        let currentSlide = 0;
        
        // Function to update slider position
        function updateSlider() {
            const slideWidth = slides[0].offsetWidth;
            slider.scrollTo({
                left: slideWidth * currentSlide,
                behavior: 'smooth'
            });
        }
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updateSlider();
        });
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = slides.length - 1;
            }
            updateSlider();
        });
        
        // Auto slide every 5 seconds
        setInterval(function() {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updateSlider();
        }, 5000);
        
        // Update on window resize
        window.addEventListener('resize', updateSlider);
    }
}

/**
 * Handle form submissions
 */
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            const originalHTML = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = `
                <span class="flex items-center justify-center gap-2">
                    <i data-lucide="loader" class="w-5 h-5 animate-spin"></i>
                    SENDING...
                </span>
            `;
            lucide.createIcons();
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success state
                submitBtn.innerHTML = `
                    <span class="flex items-center justify-center gap-2">
                        <i data-lucide="check-circle" class="w-5 h-5"></i>
                    MESSAGE SENT!
                    </span>
                `;
                lucide.createIcons();
                submitBtn.classList.remove('from-purple-600', 'to-pink-600');
                submitBtn.classList.add('from-green-600', 'to-green-500');
                
                // Reset form
                contactForm.reset();
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    lucide.createIcons();
                    submitBtn.classList.remove('from-green-600', 'to-green-500');
                    submitBtn.classList.add('from-purple-600', 'to-pink-600');
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
}

/**
 * Animate counter numbers
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target.toLocaleString();
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current).toLocaleString();
                        }
                    }, 16);
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

/**
 * Add hover effects to cards
 */
function initHoverEffects() {
    // Add hover effect to glassmorphism cards
    document.querySelectorAll('.glassmorphism').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('neon-glow', 'shadow-2xl');
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('neon-glow', 'shadow-2xl');
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.ripple-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add specific animation classes based on data attributes
                const animation = entry.target.getAttribute('data-animation');
                if (animation) {
                    entry.target.classList.add(animation);
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-animation attribute
    document.querySelectorAll('[data-animation]').forEach(element => {
        observer.observe(element);
    });
    
    // Observe stats for counter animation
    document.querySelectorAll('.stats-counter').forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Initialize parallax effects
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

/**
 * Utility function to debounce events
 */
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Dark mode toggle functionality
 */
function initDarkModeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            
            // Update icon
            const icon = this.querySelector('i');
            if (document.documentElement.classList.contains('dark')) {
                lucide.createIcon(icon, 'sun');
            } else {
                lucide.createIcon(icon, 'moon');
            }
            
            // Save preference to localStorage
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('dark-mode', isDark);
        });
        
        // Check for saved preference
        const savedDarkMode = localStorage.getItem('dark-mode');
        if (savedDarkMode === 'true') {
            document.documentElement.classList.add('dark');
            const icon = darkModeToggle.querySelector('i');
            lucide.createIcon(icon, 'sun');
        }
    }
}

/**
 * Initialize match countdown timers
 */
function initMatchCountdowns() {
    const matchElements = document.querySelectorAll('.match-countdown');
    
    matchElements.forEach(element => {
        const dateStr = element.getAttribute('data-date');
        if (!dateStr) return;
        
        const matchDate = new Date(dateStr).getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = matchDate - now;
            
            if (distance < 0) {
                element.innerHTML = '<span class="text-green-400">LIVE NOW</span>';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
                        element.innerHTML = `
                            <div class="flex gap-2 justify-center">
                                <div class="text-center">
                                    <div class="text-2xl font-bold">${days}</div>
                                    <div class="text-xs text-gray-400">DAYS</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold">${hours}</div>
                                    <div class="text-xs text-gray-400">HOURS</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold">${minutes}</div>
                                    <div class="text-xs text-gray-400">MINUTES</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold">${seconds}</div>
                                    <div class="text-xs text-gray-400">SECONDS</div>
                                </div>
                            </div>
                        `;
                    }
                    
                    updateCountdown();
                    setInterval(updateCountdown, 1000);
                });
            }