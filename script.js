// ==========================
// TYPING ANIMATION
// ==========================

const typing = document.getElementById("typing");

const words = [
  "Java Developer",
  "Frontend Developer",
  "MCA Student",
  "Aspiring Full Stack Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    let current = words[wordIndex];

    if (!deleting) {

        typing.textContent = current.substring(0, charIndex++);
        
        if (charIndex > current.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    }

    else {

        typing.textContent = current.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 60 : 120);

}

typeEffect();


// ==========================
// MOBILE MENU
// ==========================

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


// ==========================
// ACTIVE NAVBAR
// ==========================

const sections = document.querySelectorAll("section");

const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = window.scrollY;

        const offset = section.offsetTop - 150;

        const height = section.offsetHeight;

        if (top >= offset && top < offset + height) {

            current = section.getAttribute("id");

        }

    });

    links.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") == "#" + current) {

            link.classList.add("active");

        }

    });

});


// ==========================
// HEADER SHADOW
// ==========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    }

    else {

        header.style.boxShadow = "none";

    }

});


// ==========================
// SCROLL REVEAL
// ==========================

const reveal = document.querySelectorAll(

".about-card,.skill-card,.project-card,.timeline-item,.intern-card,.certificate-card,.contact-box"

);

function revealElements() {

    const windowHeight = window.innerHeight;

    reveal.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < windowHeight - 80) {

            item.style.opacity = "1";

            item.style.transform = "translateY(0)";

        }

    });

}

window.addEventListener("scroll", revealElements);

reveal.forEach(item => {

    item.style.opacity = "0";

    item.style.transform = "translateY(40px)";

    item.style.transition = ".7s";

});

revealElements();


// ==========================
// BACK TO TOP BUTTON
// ==========================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";

topBtn.style.bottom = "25px";

topBtn.style.right = "25px";

topBtn.style.width = "50px";

topBtn.style.height = "50px";

topBtn.style.borderRadius = "50%";

topBtn.style.border = "none";

topBtn.style.background = "#7F5AF0";

topBtn.style.color = "#fff";

topBtn.style.fontSize = "22px";

topBtn.style.cursor = "pointer";

topBtn.style.display = "none";

topBtn.style.zIndex = "999";

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.style.display = "block";

    }

    else {

        topBtn.style.display = "none";

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};


// ==========================
// CONTACT FORM
// ==========================

const form = document.querySelector(".contact-form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Thank you! Your message has been sent.");

    form.reset();

});


// ==========================
// SMOOTH SCROLL
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior: "smooth"

        });

    });

});
