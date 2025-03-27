


function animateLogo(){
    const logoRef = document.getElementById("logo");
    logoRef.classList.toggle("animate");
}

function fadeAllElementsIn(){
    const allElementsExpectLogo = document.querySelectorAll("*:not(#logo)");
    allElementsExpectLogo.forEach((element) => element.classList.toggle("fadeIn"))
    const btn = document.getElementById("animateBtn")
    btn.classList.toggle("fadeIn");
}