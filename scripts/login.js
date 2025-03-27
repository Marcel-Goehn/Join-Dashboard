function animateLogo(){
    const logoRef = document.getElementById("logo");
    logoRef.classList.toggle("animate");
}

function fadeAllElementsIn(){
    const allElementsExpectLogo = document.getElementsByTagName('div');
    console.log(allElementsExpectLogo);

    for (let index = 0; index < allElementsExpectLogo.length; index++) {
        const element = allElementsExpectLogo[index];
        element.classList.toggle("fadeIn");
    }    
}

function init() {
    animateLogo();
    fadeAllElementsIn();
}