document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // MOBILE NAVIGATION MENU
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Toggle hamburger icon animation
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                body.classList.remove('menu-open');
                
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // ==========================================================================
    // SCROLL SPY (ACTIVE NAV HIGHLIGHTING)
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 120; // offset for sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
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
    };

    window.addEventListener('scroll', scrollSpy);

    // ==========================================================================
    // PROJECTS PORTFOLIO FILTER
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.classList.remove('hidden');
                    // Add fade-in animation
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.transition = 'all 0.3s ease';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================================================
    // CONTACT FORM HANDLING & VALIDATION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                showStatus('Please fill in all fields.', 'error');
                return;
            }

            // Disable submit button and show spinner
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').classList.add('hidden');
            submitBtn.querySelector('.btn-spinner').classList.remove('hidden');
            formStatus.className = 'form-status';
            formStatus.innerHTML = '';

            // Simulate API request (Docker-based Node.js backend feel!)
            setTimeout(() => {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').classList.remove('hidden');
                submitBtn.querySelector('.btn-spinner').classList.add('hidden');
                
                // Show success status
                showStatus('Success! Message sent successfully. Ankit will respond to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
            }, 1800);
        });
    }

    function showStatus(text, type) {
        formStatus.textContent = text;
        formStatus.className = `form-status ${type}`;
    }
});
