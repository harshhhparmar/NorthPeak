document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    document.body.style.overflowY = 'auto'; // Ensure scroll is enabled

    // 2. Custom Magnetic Cursor
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth follow animation using requestAnimationFrame
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        const interactives = document.querySelectorAll('a, button, input, textarea, select, .magnetic');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursorFollower.classList.add('active'));
            el.addEventListener('mouseleave', () => cursorFollower.classList.remove('active'));
        });
    }

    // 3. Scroll Progress & Sticky Navbar
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    const updateScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrolled + '%';
            scrollProgress.setAttribute('aria-valuenow', Math.round(scrolled));
        }

        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollTop > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };
    
    window.addEventListener('scroll', updateScroll, { passive: true });
    
    if(backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Mobile Menu
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('open');
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        });

        document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // 5. Scroll Spy Navigation
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a.nav-link');
    
    const scrollSpy = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 200;
            const sectionId = current.getAttribute('id');
            const navItem = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navItem && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(link => link.classList.remove('active'));
                navItem.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', scrollSpy, { passive: true });

    // 6. Intersection Observer for Scroll Reveals
    function initScrollAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Find children to stagger
                    const children = entry.target.querySelectorAll('.reveal-item');
                    children.forEach((child, index) => {
                        child.style.setProperty('--stagger-idx', index);
                        child.classList.add('active');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

        reveals.forEach(reveal => revealObserver.observe(reveal));
    }

    // 7. Number Counters
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 0;
                let startTime = null;

                const animateCounter = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    // Ease out expo
                    const easeOutProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    
                    counter.innerText = Math.floor(easeOutProgress * target);
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                requestAnimationFrame(animateCounter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));

    // 8. Typewriter Effect (Optimized)
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = ['transform', 'innovate', 'scale'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeTimeout;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 40 : 120;
            
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2500; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before new word
            }
            
            typeTimeout = setTimeout(typeEffect, typeSpeed);
        }
        
        setTimeout(typeEffect, 2500); // Initial delay after load
    }

    // 9. Premium Magnetic Button Effect
    const magnetics = document.querySelectorAll('.magnetic');
    
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            // Calculate center
            const hx = rect.left + rect.width / 2;
            const hy = rect.top + rect.height / 2;
            
            // Calculate distance from center
            const dx = e.clientX - hx;
            const dy = e.clientY - hy;
            
            // Apply subtle transform
            btn.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 10. Accessible FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Close all
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.style.maxHeight = null;
            });
            
            // Open clicked if it was closed
            if (!isExpanded) {
                question.setAttribute('aria-expanded', 'true');
                const answer = question.nextElementSibling;
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 11. Form Validation and Toast
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                const group = input.closest('.form-group');
                if (!input.value.trim() || (input.type === 'email' && !isValidEmail(input.value))) {
                    group.classList.add('error');
                    input.setAttribute('aria-invalid', 'true');
                    isValid = false;
                } else {
                    group.classList.remove('error');
                    input.setAttribute('aria-invalid', 'false');
                }
            });
            
            if (isValid) {
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerText;
                btn.innerText = 'Sending...';
                btn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    form.reset();
                    btn.innerText = originalText;
                    btn.disabled = false;
                    
                    if (toast) {
                        toast.innerText = 'Message sent successfully! We will contact you soon.';
                        toast.classList.add('show');
                        
                        setTimeout(() => {
                            toast.classList.remove('show');
                        }, 4000);
                    }
                }, 1500);
            }
        });

        // Clear error on input
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', () => {
                const group = input.closest('.form-group');
                group.classList.remove('error');
                input.setAttribute('aria-invalid', 'false');
            });
        });
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
