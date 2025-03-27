const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users.json";

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
    console.log(allElementsExpectLogo);

    for (let index = 0; index < allElementsExpectLogo.length; index++) {
        const element = allElementsExpectLogo[index];
        element.classList.toggle("fadeIn");
    }    
}

/* async function postData(path="", data={}) {
    fetch(databaseLinkRef + path, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
} */

/* postData("", {
    email : "guest@join.com",
    password : "guest123"
    }
) */


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
    const response = await fetch(databaseLinkRef);
    const responseToJSON = await response.json();
    for (const id in responseToJSON) {
        if (responseToJSON[id].email == email && responseToJSON[id].password == password) {
            console.log("Valid login");
            window.location.href = "../html/summary.html";
            } else {
                console.log("Invalid login");
                }
        }
}

function loginAsGuest() {
    window.location.href = "../html/summary.html";
}