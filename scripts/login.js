const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users";

function init() {
    animateLogo();
    fadeAllElementsIn();
}

function animateLogo(){
    const logoRef = document.getElementById("logo");
    logoRef.classList.toggle("animate");
}

function fadeAllElementsIn(){
    const allElementsExpectLogo = document.getElementsByTagName('div');
    for (let index = 0; index < allElementsExpectLogo.length; index++) {
        const element = allElementsExpectLogo[index];
        element.classList.toggle("fadeIn");
    }    
}

function validate() {
    const form = document.getElementById('login_data');
    if (form.checkValidity() == true) {
        loginAsUser();
    } else {
        form.reportValidity();
    }
}

async function loginAsUser() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    const response = await fetch(databaseLinkRef + ".json");
    const userDB = await response.json();
    for (const id in userDB) {
        if (userDB[id].email == email && userDB[id].password == password) {
            console.log(typeof(id) + ": " + id);
            sessionStorage.setItem("loggedIn", JSON.stringify(id));
            window.location.href = "../html/summary.html";
            } else {
                Array.from(document.getElementsByClassName('singleinput_div')).forEach(element => element.classList.add('invalid'));
                }
        }
}

function loginAsGuest() {
    window.location.href = "../html/summary.html";
}

function showPassword() {
    let type = document.getElementById('password').type;
    switch (type) {
        case "text":
            document.getElementById('password').type = "password";
            break;
        case "password":
            document.getElementById('password').type = "text";
            break;
    }
}

function removeInvalidClass(num) {
    document.getElementsByClassName('singleinput_div')[num].classList.remove('invalid');
}

function switchIcon() {
    let current = document.getElementById('lock_img');
    let readable = "../assets/img/login/visibility.svg";
    let ciphered = "../assets/img/login/visibility-off.svg";
    document.getElementById('password').type == "password" ? current.src = ciphered : current.src = readable;
}