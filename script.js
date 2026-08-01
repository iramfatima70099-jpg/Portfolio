// =======================
// Loading Screen
// =======================

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.transition = "0.6s";
    }, 1200);
});

// =======================
// Typing Animation
// =======================

const words = [
    "Java Developer",
    "Frontend Developer",
    "MCA Student",
    "Future Full Stack Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect(){

    const current = words[wordIndex];

    if(!deleting){

        typing.textContent = current.substring(0,charIndex++);

        if(charIndex > current.length){

            deleting = true;

            setTimeout(typeEffect,1500);

            return;
        }

    }else{

        typing.textContent = current.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex == words.length){

                wordIndex = 0;
            }

        }

    }

    setTimeout(typeEffect,deleting?60:120);

}

typeEffect();

// =======================
// Dark / Light Mode
// =======================

const theme = document.getElementById("theme-toggle");

theme.onclick = ()=>{

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        theme.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }else{

        theme.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }

};

// =======================
// Navbar Active Link
// =======================

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=window.scrollY;

const offset=section.offsetTop-200;

const height=section.offsetHeight;

if(top>=offset && top<offset+height){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

// =======================
// Scroll Reveal Animation
// =======================

const revealElements =
document.querySelectorAll(
".card,.project-card,.skill,.about-box"
);

function reveal(){

revealElements.forEach(el=>{

const windowHeight=window.innerHeight;

const top=el.getBoundingClientRect().top;

if(top<windowHeight-100){

el.style.opacity="1";

el.style.transform="translateY(0)";

}

});

}

window.addEventListener("scroll",reveal);

reveal();

// =======================
// Scroll To Top Button
// =======================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";

topBtn.style.right="20px";

topBtn.style.bottom="20px";

topBtn.style.padding="12px 16px";

topBtn.style.border="none";

topBtn.style.borderRadius="50%";

topBtn.style.background="#7F5AF0";

topBtn.style.color="white";

topBtn.style.cursor="pointer";

topBtn.style.display="none";

topBtn.style.fontSize="20px";

topBtn.style.zIndex="999";

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// =======================
// Hover Tilt Effect
// =======================

const cards=document.querySelectorAll(".project-card");

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const x=e.offsetX;

const y=e.offsetY;

const rotateY=(-1/5*x+20);

const rotateX=(1/5*y-20);

card.style.transform=
`perspective(500px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0) rotateY(0)";

});

});

// =======================
// Contact Form
// =======================

const form=document.querySelector("form");

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Thank you! Your message has been received.");

form.reset();

});
