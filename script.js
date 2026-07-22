// ==========================
// Mobile Menu
// ==========================

const menu = document.querySelector(".menu");
const navLinks = document.querySelector(".nav-links");

menu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ==========================
// Close Menu on Link Click
// ==========================

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});

// ==========================
// Navbar Shadow on Scroll
// ==========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.top = "10px";
        header.style.transition = ".3s";

    } else {

        header.style.top = "20px";

    }

});

// ==========================
// Scroll Reveal Animation
// ==========================

const reveals = document.querySelectorAll(

".section,.hero,.project-card,.skill-card,.achievement-card,.experience-card"

);

const observer = new IntersectionObserver(

(entries) => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:0.15

}

);

reveals.forEach(el=>{

observer.observe(el);

});

// ==========================
// Active Navbar
// ==========================

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-150;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navItems.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

// ==========================
// Floating Glass Card
// ==========================

const glass=document.querySelector(".glass-card");

if(glass){

window.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.pageX)/35;

const y=(window.innerHeight/2-e.pageY)/35;

glass.style.transform=

`rotateY(${x}deg) rotateX(${-y}deg)`;

});

}

// ==========================
// Button Hover Animation
// ==========================

document.querySelectorAll("a").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transition=".3s";

});

});

// ==========================
// Smooth Fade
// ==========================

document.body.style.opacity="0";

window.onload=()=>{

document.body.style.transition="1s";

document.body.style.opacity="1";

};