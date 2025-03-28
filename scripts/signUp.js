const nameInput = document.getElementById("signUpName");
const emailInput = document.getElementById("signUpEmail");
const passwordInput = document.getElementById("signUpPassword");
const passwordConfirmationInput = document.getElementById("signUpConfirmPw");
const checkbox = document.getElementById("privacyCheckbox");

const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users.json";

async function fetchData(){
    const response = await fetch(databaseLinkRef);
    const data = await response.json();
    console.log(data);
    return data;
}

function validateEmail(){
    if(!emailInput.checkValidity()){
        emailInput.style.outlineColor = "red";
        emailInput.focus();
        return false;
    }
    return true;
}

function validatePasswords(){
    
    if(passwordInput.value !== passwordConfirmationInput.value){
        passwordConfirmationInput.style.outlineColor = "red";
        passwordConfirmationInput.focus();
        return false;   
    }
    return true; 
}

function validatePrivacy(){
    if(!checkbox.checked){
        checkbox.style.boxShadow = "0 0 0 1px red";
        checkbox.focus();
        return false;
    }
    return true;
}

async function validateForm(){
    if(validateEmail() && validatePasswords() && validatePrivacy()){
        if(await compareEmailWithData()){
        setUser(nameInput.value, emailInput.value, passwordInput.value)
    }else{
        emailTaken();
    }
    }
}

async function setUser(name, email, password){
   const request = await fetch(databaseLinkRef, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
      },
    body: JSON.stringify({name, email, password}),
   })
}

async function compareEmailWithData(){
    const users = await fetchData();
    const sameEmail = Object.values(users).find((user) => user.email === emailInput.value);
    if(sameEmail){
        return false;
    }else{
        return true;
    }
}

function emailTaken(){
    emailInput.style.outlineColor = "red";
    emailInput.focus()
    setTimeout()
}

