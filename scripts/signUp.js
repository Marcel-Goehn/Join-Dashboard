const nameInput = document.getElementById("signUpName");
const emailInput = document.getElementById("signUpEmail");
const passwordInput = document.getElementById("signUpPassword");
const passwordConfirmationInput = document.getElementById("signUpConfirmPw");

const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users.json";

async function fetchData(){
    const response = await fetch(databaseLinkRef);
    if(!response.ok){
        throw new Error("couldnt fetch")
    }
    console.log(response);
}

function validatePasswords(event){
    alert("Test");
    if(passwordInput.value != passwordConfirmationInput){
        alert("passwords are not matching");
    }
}