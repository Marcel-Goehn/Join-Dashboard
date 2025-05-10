const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users";
let emailInput = document.getElementById('emailInput');
let passwordInput = document.getElementById('passwordInput');
let userInput = Array.from(document.getElementsByClassName('form-element'));
let PasswordIcon = document.getElementById('PasswordIcon');
let showPassword = "../Join/assets/img/login/visibility.svg";
let hidePassword = "../Join/assets/img/login/visibility-off.svg";


/**
 * calls necessary functions for start the Logo-Animation
 */
function init() {
    if(window.innerWidth > 620){
         animateLogo();
        fadeAllElementsIn();
    }else{
        animateLogoMobile();
        blackAllElementsIn();
    }
   
}


/**
 * moves the Logo into its final destination
 */
function animateLogo(){
    const logoRef = document.getElementById("logo");
    logoRef.classList.toggle("animate"); 
}


/**
 * 
 */
function animateLogoMobile(){
    const logoRef = document.getElementById("logo");
    logoRef.classList.toggle("mobileAnimation");
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
 * Sets the background color of all elements from black to white
 */
function blackAllElementsIn(){
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


/**
 * Enables the function to log in if the user presses the enter key
 */
emailInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        emailInput.blur();
        loginAsUser();
    }});


/**
 * Enables the function to log in if the user presses the enter key
 */
passwordInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      passwordInput.blur();
      loginAsUser();
    }});


/**
 * checks, if the used login is present within the database. If so, relocates to the summary-page and logs the user's ID in the sessionstorage
 * @returns true
 */
async function compareToDatabase() {
    const response = await fetch(databaseLinkRef + ".json");
    const users = await response.json();
    for (const [id, userData] of Object.entries(users)) {
        if (userData.email == emailInput.value && userData.password == passwordInput.value) {
            sessionStorage.setItem("loggedIn", JSON.stringify(id));
            window.location.href = "../Join/html/summary.html";
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
    sessionStorage.setItem("loggedIn", JSON.stringify("-OPjkntrc8LdNwD7XTjA"));
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
    passwordInput.value == "" ? PasswordIcon.src = "../Join/assets/img/login/lock.svg" : checkVisibility();
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


/**
 * This function clears the session storage
 */
function clearStorage(){
    sessionStorage.clear();
}