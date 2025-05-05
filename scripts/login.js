const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users";
let emailInput = document.getElementById('emailInput');
let passwordInput = document.getElementById('passwordInput');
let userInput = Array.from(document.getElementsByClassName('form-element'));
let PasswordIcon = document.getElementById('PasswordIcon');
let showPassword = "../assets/img/login/visibility.svg";
let hidePassword = "../assets/img/login/visibility-off.svg";

/**
 * calls necessary functions for start the Logo-Animation
 */
function init() {
    animateLogo();
    fadeAllElementsIn();
}

/**
 * moves the Logo into its final destination
 */
function animateLogo(){
    const logoRef = document.getElementById("logo");
    logoRef.classList.toggle("animate");
}

/**
 * slowly raises the opacity of all elements to 1
 */
function fadeAllElementsIn(){
    const allElementsExpectLogo = document.getElementsByTagName('div');
    for (let index = 0; index < allElementsExpectLogo.length; index++) {
        const element = allElementsExpectLogo[index];
        element.classList.toggle("fadeIn");
    }
}

/**
 * awaits validation and acts on invalid input 
 */
async function loginAsUser() {
    await compareToDatabase() ? null : invalidLogin();
}

emailInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        emailInput.blur();
        loginAsUser();
    }});

passwordInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      passwordInput.blur();
      loginAsUser();
    }});

/**
 * 
 * @returns true and relocates to the summary-page, if the userinput was found in the database.
 * the user's ID will be logged in the sessionstorage for further interactions.
 */
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

/**
 * marks all inputs as invalid in case of a flawed attempt to login
 */
function invalidLogin() {
    removeHiddenClass('invalid_login_hint');
    userInput.forEach(element => element.classList.add('invalid'));
}

/**
 * bypasses the validation and relocates to the summary-page as a guest-account 
 */
function loginAsGuest() {
    sessionStorage.setItem("loggedIn", JSON.stringify("-ONBJjWWRRsraHeP8qRV"));
    window.location.href = "../html/summary.html";
}

/**
 * toggles userinput between readable and encrypted (stars)
 */
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

/**
 * resets formular after a flawed login-attempt
 * @param {either 0 or 1; 0 is emailinput, 1 is passwordinput} num 
 */
function removeInvalidClass(num) {
    userInput[num].classList.remove('invalid');
    addHiddenClass('invalid_login_hint');
}

/**
 * toggles icon between lock-icon (input is empty) and eye-icon (input contains characters)
 */
function passwordInputisEmpty() {
    passwordInput.value == "" ? PasswordIcon.src = "../assets/img/login/lock.svg" : checkVisibility();
}

/**
 * changes the password-icon to the last used visibility-setting
 */
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

/**
 * toggles password-icon between opened eye-icon (input is readable) and closed eye-icon (input is encrypted)
 */
function togglePasswordIcon() {
    passwordInput.type == "password" ? PasswordIcon.src = hidePassword : PasswordIcon.src = showPassword;
}

/**
 * removes the hidden-class, making the div visible / accessable
 * @param {name of div as string} container 
 */
function removeHiddenClass(container) {
    document.getElementById(container).classList.remove('hidden');
}

/**
 * adds the hidden-class, making the div invisible / unaccessable
 * @param {name of div as string} container 
 */
function addHiddenClass(container) {
    document.getElementById(container).classList.add('hidden');
}