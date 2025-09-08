(function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const headerLinks = document.querySelectorAll('.nav-links a');
    const backToTop = document.getElementById('backToTop');
    const yearSpan = document.getElementById('year');
    const contactForm = document.getElementById('contact-form');
    const navbar = document.querySelector('.navbar');

    // Set year
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Mobile nav toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navLinks.classList.toggle('show');
        });
        // Close menu on link click
        headerLinks.forEach((link) => link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            navToggle.setAttribute('aria-expanded', 'false');
        }));
    }

    // Smooth scrolling and active link handling
    const sections = Array.from(document.querySelectorAll('section[id]'));

    function setActiveLink() {
        const scrollPos = window.scrollY + 120;
        let currentId = 'home';
        for (const section of sections) {
            if (section.offsetTop <= scrollPos) {
                currentId = section.id;
            }
        }
        headerLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (!href) return;
            const id = href.replace('#', '');
            link.classList.toggle('active', id === currentId);
        });
    }
    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('load', setActiveLink);

    // Navbar scrolled state
    function updateNavbarScrolled() {
        if (!navbar) return;
        const scrolled = window.scrollY > 8;
        navbar.classList.toggle('is-scrolled', scrolled);
    }
    window.addEventListener('scroll', updateNavbarScrolled);
    window.addEventListener('load', updateNavbarScrolled);

    // Back to top visibility
    function handleBackToTop() {
        if (!backToTop) return;
        const show = window.scrollY > 400;
        backToTop.classList.toggle('show', show);
    }
    window.addEventListener('scroll', handleBackToTop);
    window.addEventListener('load', handleBackToTop);
    if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Basic form validation
    function showError(input, message) {
        const field = input.closest('.form-field');
        const small = field ? field.querySelector('.error') : null;
        if (small) small.textContent = message || '';
        input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.name;
            const email = contactForm.email;
            const message = contactForm.message;

            let valid = true;
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                valid = false;
            } else { showError(name, ''); }
            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                valid = false;
            } else if (!validateEmail(email.value.trim())) {
                showError(email, 'Enter a valid email');
                valid = false;
            } else { showError(email, ''); }
            if (!message.value.trim()) {
                showError(message, 'Please enter a message');
                valid = false;
            } else { showError(message, ''); }

            const feedback = contactForm.querySelector('.form-feedback');
            if (valid) {
                feedback.textContent = 'Thanks! Your message was validated locally. Implement sending on your backend or email API.';
                feedback.style.color = 'var(--success)';
                contactForm.reset();
            } else {
                feedback.textContent = 'Please fix the errors above.';
                feedback.style.color = 'var(--danger)';
            }
        });
    }
})();