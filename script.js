
var background = null;
var navToggler = null;
var navMenu = null;
var navLinks = null;
var maximumDist = 25;
var ratio = 1;

window.onload = () => {

    var windowWidth = window.innerWidth;
    ratio = windowWidth/700;
    if(ratio > 1){
      ratio = 1;
    }
    maximumDist = maximumDist * ratio;
    console.log(maximumDist)

    // Seletor de todos os links âncora dentro do menu
    const Links = document.querySelectorAll('nav ul li a');

    // Adiciona o evento de clique a cada link
    Links.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    const logo_link = document.getElementById("logo_link");
    logo_link.addEventListener('click', smoothScroll);

    // define all UI variable
    navToggler = document.querySelector('.nav-toggler');
    navMenu = document.querySelector('.site-navbar ul');
    navLinks = document.querySelectorAll('.site-navbar a');

    // load all event listners
    allEventListners();

    
    document.body.onscroll = function(){

        reveal();

        const t = document.body.getBoundingClientRect().top;
        let value = t*-0.006*ratio;
        if(value > maximumDist){
            value = maximumDist;
        }
        if(background == null){
            background = VANTA.NET({
                el: "#bg",
                mouseControls: false,
                touchControls: false,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0xffffff,
                backgroundColor: 0x141229,
                maxDistance: value
            });
        }else{
            background.options.maxDistance=value;
        }
    }
};

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}


// Função de rolagem suave
function smoothScroll(event) {
  event.preventDefault();
  const targetId = this.getAttribute('href');
  const targetPosition = document.querySelector(targetId).offsetTop;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}




// functions of all event listners
function allEventListners() {
  // toggler icon click event
  navToggler.addEventListener('click', togglerClick);
  // nav links click event
  navLinks.forEach( elem => elem.addEventListener('click', navLinkClick));
}

// togglerClick function
function togglerClick() {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('open');
}

// navLinkClick function
function navLinkClick() {
  if(navMenu.classList.contains('open')) {
    navToggler.click();
  }
}
