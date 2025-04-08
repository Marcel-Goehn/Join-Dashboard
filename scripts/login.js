const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users";
let emailInput = document.getElementById('emailInput');
let passwordInput = document.getElementById('passwordInput');
let userInput = Array.from(document.getElementsByClassName('form-element'));
let PasswordIcon = document.getElementById('PasswordIcon');
let showPassword = "../assets/img/login/visibility.svg";
let hidePassword = "../assets/img/login/visibility-off.svg";

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

async function loginAsUser() {
    await compareToDatabase() ? null : invalidLogin();
}

async function compareToDatabase() {
    const response = await fetch(databaseLinkRef + ".json");
    const users = await response.json();
    for (const [id, userData] of Object.entries(users)) {
        if (userData.email == emailInput.value && userData.password == passwordInput.value) {
            sessionStorage.setItem("loggedIn", JSON.stringify(id));
            window.location.href = "../html/summary.html";
            return true;
        }
    }
}

function invalidLogin() {
    removeHiddenClass('invalid_login_hint');
    userInput.forEach(element => element.classList.add('invalid'));
}

function loginAsGuest() {
    sessionStorage.setItem("loggedIn", JSON.stringify("-ONBJjWWRRsraHeP8qRV"));
    window.location.href = "../html/summary.html";
}

function toggleVisibility() {
    switch (passwordInput.type) {
        case "text":
            passwordInput.type = "password";
            break;
        case "password":
            passwordInput.type = "text";
            break;
    }
}

function removeInvalidClass(num) {
    userInput[num].classList.remove('invalid');
    addHiddenClass('invalid_login_hint');
}

function passwordInputisEmpty() {
    passwordInput.value == "" ? PasswordIcon.src = "../assets/img/login/lock.svg" : checkVisibility();
}

function checkVisibility() {
    switch (passwordInput.type) {
        case "password":
            (PasswordIcon.src = hidePassword)
            break;
        case "text":
            (PasswordIcon.src = showPassword)
            break;
    }
}

function togglePasswordIcon() {
    passwordInput.type == "password" ? PasswordIcon.src = hidePassword : PasswordIcon.src = showPassword;
}
function removeHiddenClass(container) {
    document.getElementById(container).classList.remove('hidden');
}
function addHiddenClass(container) {
    document.getElementById(container).classList.add('hidden');
}