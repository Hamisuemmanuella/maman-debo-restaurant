// Initialize Lucide Icons
lucide.createIcons();

// Preloader & Dynamic Greeting
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('fade-out');

    // Greeting Logic
    const greeting = document.getElementById('greeting');
    const hour = new Date().getHours();
    let text = "Welcome to";
    if (hour < 12) text = "Good Morning,";
    else if (hour < 18) text = "Good Afternoon,";
    else text = "Good Evening,";
    greeting.innerText = text;
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.getElementById('nav-links');

if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        const isOpen = navLinksContainer.classList.contains('active');
        if (icon) {
            icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
            if (window.lucide) lucide.createIcons();
        }
    });
}

// Sticky Navbar, Scroll Progress & Back to Top
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";

    // Back to Top visibility
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Back to Top Click
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        console.log('Newsletter subscription for:', email);
        
        // Show success message
        newsletterForm.style.display = 'none';
        newsletterMessage.style.display = 'block';
    });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Menu Filtering Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        menuItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                // Trigger a small animation
                item.style.animation = 'fadeInUp 0.5s ease-out forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navLinksContainer) navLinksContainer.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if (icon) icon.setAttribute('data-lucide', 'menu');
            }
            if (window.lucide) lucide.createIcons();

            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for sticky nav
                behavior: 'smooth'
            });
        }
    });
});

// Add to Order Feedback
const orderButtons = document.querySelectorAll('.add-to-order');
orderButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');
        const originalIconName = icon.getAttribute('data-lucide');
        
        // Change icon to checkmark
        icon.setAttribute('data-lucide', 'check');
        btn.style.background = '#2ecc71';
        lucide.createIcons();

        setTimeout(() => {
            icon.setAttribute('data-lucide', originalIconName);
            btn.style.background = 'var(--primary)';
            lucide.createIcons();
        }, 2000);
    });
});
