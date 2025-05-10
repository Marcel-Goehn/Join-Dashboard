document.addEventListener("DOMContentLoaded", checkIfLoggedIn);

function checkIfLoggedIn() {
    const userObjectForCheck = sessionStorage.getItem("loggedIn");

    if (!userObjectForCheck) {
        window.location.href = "../index.html";
    }

}