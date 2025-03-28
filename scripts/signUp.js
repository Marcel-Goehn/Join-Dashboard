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
}


function validateEmail(){
    if(!emailInput.checkValidity()){
        emailInput.style.outlineColor = "red";
        emailInput.focus();
        return false;
    }
}


function validatePasswords(){
    if(passwordInput.value != passwordConfirmationInput){
        passwordConfirmationInput.style.outlineColor = "red";
        passwordConfirmationInput.focus();
        return false;
    }
}

function validatePrivacy(){
    if(!checkbox.checked){
        checkbox.style.outlineColor = "red";
        return false;
    }
}

function validateForm(event){
    validateEmail();
    validatePasswords();
    validatePrivacy();
    if(validateEmail(), validatePasswords(), validatePrivacy()){
        createUser(event);
    }
}

function createUser(event){
    readInputData();
    setUser();
}

function readInputData(){
    const nameValue = nameInput.value;
    const emailValue = emailInput.value; 
    const passwordValue = passwordInput.value;
}


async function setUser(name, email, password){
    console.log("test");
   const request = await fetch(databaseLinkRef, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
      },
    body: JSON.stringify({name, email, password, "contacts": "placeholder"}),
   })

}

