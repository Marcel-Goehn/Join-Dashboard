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
    console.log(responseToJSON);
    
    for (const id in responseToJSON) {
        if (responseToJSON[id].email == email && responseToJSON[id].password == password) {
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