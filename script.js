// script.js

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initSmoothScrolling();
    initScrollReveal();
    initNavbarScroll();
    initHamburger();
    initParallax();
});

function initThemeToggle() {
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');

    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        themeBtn.childNodes[themeBtn.childNodes.length - 1].textContent = newTheme === 'dark' ? ' Try Light Mode' : ' Try Dark Mode';
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const target = document.querySelector(targetId);
            if(target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.menu-overlay');
    if (!hamburger || !navLinks) return;

    function close() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
    }

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
        if (overlay) overlay.classList.toggle('active', isOpen);
    });

    if (overlay) overlay.addEventListener('click', close);

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', close);
    });
}

function initParallax() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    const elements = document.querySelectorAll('[data-parallax]');
    if (!elements.length) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                elements.forEach(el => {
                    const speed = parseFloat(el.dataset.parallax);
                    const rect = el.getBoundingClientRect();
                    const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
                    el.style.transform = `translateY(${offset}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

