document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    const themeToggle = document.getElementById('theme-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const detailsToggle = document.querySelector('.toggle-details');
    const projectDetails = document.querySelector('.project-details');
    const startProjectBtn = document.getElementById('startProject');
    const translateElements = document.querySelectorAll('.translate');
    const html = document.documentElement;
    const contactForm = document.querySelector('.contact-form');
    
    // Check if device is touch-enabled
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
    
    // Custom cursor (only for non-touch devices)
    if (!isTouchDevice()) {
        const cursorFollower = document.querySelector('.cursor-follower');
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        document.body.appendChild(cursorDot);
        
        const cursorText = document.createElement('div');
        cursorText.classList.add('cursor-text');
        document.body.appendChild(cursorText);
        
        const interactiveElements = document.querySelectorAll('a, button, .btn, .social-icon, .hamburger, .scroll-to-top, .price-card, .feature-card, .project-card, input[type="checkbox"] + .slider');
        
        document.addEventListener('mousemove', (e) => {
            cursorFollower.style.opacity = '1';
            cursorFollower.style.left = `${e.clientX}px`;
            cursorFollower.style.top = `${e.clientY}px`;
            
            cursorDot.style.opacity = '1';
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            
            cursorText.style.left = `${e.clientX}px`;
            cursorText.style.top = `${e.clientY}px`;
        });
        
        document.addEventListener('mousedown', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        
        document.addEventListener('mouseup', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.transform = 'translate(-50%, -50%)';
        });
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('cursor-grow');
                
                if (element.classList.contains('btn')) {
                    cursorText.textContent = 'Click';
                    cursorText.style.opacity = '1';
                } else if (element.classList.contains('social-icon')) {
                    cursorText.textContent = 'Visit';
                    cursorText.style.opacity = '1';
                } else if (element.classList.contains('price-card')) {
                    cursorText.textContent = 'Select';
                    cursorText.style.opacity = '1';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('cursor-grow');
                cursorText.style.opacity = '0';
            });
        });
        
        document.addEventListener('mouseleave', () => {
            cursorFollower.style.opacity = '0';
            cursorDot.style.opacity = '0';
            cursorText.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursorFollower.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });
        
        // Add special effects for images
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('mouseenter', () => {
                cursorFollower.style.mixBlendMode = 'normal';
                cursorFollower.style.backdropFilter = 'none';
                cursorFollower.style.backgroundColor = 'rgba(138, 110, 255, 0.2)';
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
            });
            
            img.addEventListener('mouseleave', () => {
                cursorFollower.style.mixBlendMode = 'difference';
                cursorFollower.style.backdropFilter = 'invert(1)';
                cursorFollower.style.backgroundColor = 'rgba(138, 110, 255, 0.5)';
                cursorFollower.style.width = '20px';
                cursorFollower.style.height = '20px';
            });
        });
    } else {
        // Hide cursor elements on touch devices
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursorFollower) {
            cursorFollower.style.display = 'none';
        }
        // Reset cursor styling for touch devices
        document.body.style.cursor = 'auto';
        document.querySelectorAll('a, button, .btn, .social-icon, .hamburger, .scroll-to-top, .price-card, .feature-card, .project-card').forEach(el => {
            el.style.cursor = 'pointer';
        });
    }

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Scroll events
    window.addEventListener('scroll', () => {
        // Navbar style on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active nav item based on scroll position
        updateActiveNavItem();

        // Reveal sections on scroll
        revealSections();
    });

    // Reveal sections on initial load
    revealSections();
    updateActiveNavItem();

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    languageToggle.addEventListener('change', () => {
        const lang = languageToggle.checked ? 'id' : 'en';
        html.setAttribute('data-lang', lang);
        changeLanguage(lang);
        localStorage.setItem('language', lang);
    });

    detailsToggle.addEventListener('click', () => {
        projectDetails.classList.toggle('active');
        if (projectDetails.classList.contains('active')) {
            detailsToggle.textContent = html.getAttribute('data-lang') === 'en' ? 'Hide Details' : 'Sembunyikan Detail';
        } else {
            detailsToggle.textContent = html.getAttribute('data-lang') === 'en' ? 'Project Details' : 'Detail Proyek';
        }
    });

    if (startProjectBtn) {
        startProjectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const subject = html.getAttribute('data-lang') === 'en' ? 'Website Project Inquiry' : 'Pertanyaan Proyek Website';
            const mailtoLink = `mailto:edgar.vidysto@gmail.com?subject=${subject}`;
            
            window.location.href = mailtoLink;
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        html.setAttribute('data-lang', savedLanguage);
        languageToggle.checked = savedLanguage === 'id';
        changeLanguage(savedLanguage);
    }

    // Update active navigation item based on scroll position
    function updateActiveNavItem() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    }

    // Reveal sections when scrolled into view
    function revealSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('visible');
            }
        });
    }

    function createVoidBackground() {
        const hero = document.querySelector('.hero');
        
        if (!hero) return;
        
        const canvas = document.createElement('canvas');
        canvas.classList.add('network-bg');
        hero.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let width, height;
        
        function init() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            
            particles = [];
            const particleCount = Math.floor(width * height / 15000);
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: Math.random() * 0.5 - 0.25,
                    vy: Math.random() * 0.5 - 0.25,
                    size: Math.random() * 2 + 1
                });
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            ctx.fillStyle = html.getAttribute('data-theme') === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.2)';
            ctx.strokeStyle = html.getAttribute('data-theme') === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                
                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dx = p.x - p2.x;
                    let dy = p.y - p2.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        window.addEventListener('resize', init);
        init();
        animate();
    }
    
    createVoidBackground();

    function changeLanguage(lang) {
        translateElements.forEach(element => {
            if (element.dataset[lang]) {
                element.textContent = element.dataset[lang];
            }
        });

        if (projectDetails.classList.contains('active')) {
            detailsToggle.textContent = lang === 'en' ? 'Hide Details' : 'Sembunyikan Detail';
        } else {
            detailsToggle.textContent = lang === 'en' ? 'Project Details' : 'Detail Proyek';
        }

        document.querySelectorAll('input, textarea').forEach(input => {
            if (input.placeholder) {
                if (lang === 'en') {
                    if (input.id === 'name') input.placeholder = 'Your Name';
                    if (input.id === 'email') input.placeholder = 'Your Email';
                    if (input.id === 'message') input.placeholder = 'Your Message';
                } else {
                    if (input.id === 'name') input.placeholder = 'Nama Anda';
                    if (input.id === 'email') input.placeholder = 'Email Anda';
                    if (input.id === 'message') input.placeholder = 'Pesan Anda';
                }
            }
        });

        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            const firstOption = serviceSelect.options[0];
            firstOption.text = lang === 'en' ? 'Select Service' : 'Pilih Layanan';
            
            for (let i = 1; i < serviceSelect.options.length; i++) {
                const option = serviceSelect.options[i];
                if (option.value === 'basic') {
                    option.text = lang === 'en' ? 'Basic ($20)' : 'Dasar ($20)';
                } else if (option.value === 'pro') {
                    option.text = lang === 'en' ? 'Pro ($35)' : 'Pro ($35)';
                } else if (option.value === 'business') {
                    option.text = lang === 'en' ? 'Business ($50)' : 'Bisnis ($50)';
                }
            }
        }
    }

    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
        card.style.animationDelay = `${Math.random() * 1}s`;
    });

    // Testimonial slider functionality
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active', 'prev');
            if (i === index) {
                card.classList.add('active');
            } else if (i === (index === 0 ? testimonialCards.length - 1 : index - 1)) {
                card.classList.add('prev');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });

    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentTestimonial = i;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Pause auto-rotation when hovering over testimonials
    const testimonialContainer = document.querySelector('.testimonial-container');
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    });

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            const subject = `Website Project Inquiry from ${name}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AService: ${service}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            
            window.location.href = `mailto:edgar.vidysto@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Show success message
            contactForm.innerHTML = `<div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>${html.getAttribute('data-lang') === 'en' ? 'Thank you for your message!' : 'Terima kasih atas pesan Anda!'}</h3>
                <p>${html.getAttribute('data-lang') === 'en' ? 'Your email has been prepared. Please send it from your email client.' : 'Email Anda telah disiapkan. Silakan kirim dari klien email Anda.'}</p>
            </div>`;
        });
    }
}); 