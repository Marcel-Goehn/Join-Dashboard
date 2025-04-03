const nameInput = document.getElementById("signUpName");
const nameBorder = document.getElementById("signUpInputNameDiv");
const emailInput = document.getElementById("signUpEmail");
const emailBorder = document.getElementById("signUpInputEmailDiv");
const passwordInput = document.getElementById("signUpPassword");
const pwBorder = document.getElementById("signUpInputPasswordDiv");
const passwordConfirmationInput = document.getElementById("signUpConfirmPw");
const confPwBorder = document.getElementById("signUpInputConfirmPwDiv");
const checkbox = document.getElementById("privacyCheckbox");
const checkboxBorder = document.getElementById("checkboxBorder");
const dialog = document.getElementById("succesfulSignUpDial");


function checkValidation(){
    if(validateName() && validateEmail() && validatePassword && validateConfirmPassword()){
        
    }
}

function validatePassword(passwordInput){
    const pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
    if(!pattern.test(passwordInput.value)){
        return false;
    }
    return true;
}

function validatePhone(phoneInput){
    const pattern = /^\+\d{10,}$/
    if(!pattern.test(phoneInput.value)){
        return false;
    }
    return true;
}

function validateEmail(emailInput){
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!pattern.test(emailInput.value)){
        return false;
    }
    return true;
}

function validateName(){
    const pattern = /^[A-Za-z]+ [A-Za-z]+$/
    if(!pattern.test(nameInput.value)){
        return false;
    }
    return true;
}

function validateConfirmPassword(){
    if(passwordInput.value !== confirmPasswordInput.value){
        return false;
    }
    return true;
}