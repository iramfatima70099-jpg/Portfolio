// ==========================================================================
//   LOADING SCREEN
// ==========================================================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Trigger home animations once loaded
            ScrollReveal();
        }, 500);
    }, 1500); // 1.5s simulated loading for effect
});

// ==========================================================================
//   CUSTOM CURSOR
// ==========================================================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .project-card, .cert-card');

// Check if device supports hover (ignore on touch devices)
if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Slight delay for follower
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        link.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

// ==========================================================================
//   SCROLL PROGRESS BAR
// ==========================================================================
const progressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// ==========================================================================
//   TYPING ANIMATION
// ==========================================================================
const typedTextSpan = document.querySelector(".typed-text");
const textArray = ["MCA Student", "Java Developer", "Frontend Developer", "Aspiring Full Stack Engineer"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// ==========================================================================
//   NAVIGATION & MOBILE MENU
// ==========================================================================
const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const navItems = document.querySelectorAll('.nav-links li a');

// Sticky Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});

// Close mobile menu on link click
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        }
    });
});

// ==========================================================================
//   ACTIVE LINK HIGHLIGHTING
// ==========================================================================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Adjust threshold
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href') === `#${current}`) {
            li.classList.add('active');
        }
    });
});

// ==========================================================================
//   SCROLL REVEAL ANIMATIONS
// ==========================================================================
function ScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', ScrollReveal);

// ==========================================================================
//   BACK TO TOP BUTTON
// ==========================================================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// ==========================================================================
//   CONTACT FORM HANDLING
// ==========================================================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form styling update on submit
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span>Sent Successfully!</span> <i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, var(--secondary-color), #1b8a5b)';
        
        // Reset form
        contactForm.reset();
        
        // Restore button after 3s
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 3000);
    });
}
