document.addEventListener("DOMContentLoaded", checkIfLoggedIn);

function checkIfLoggedIn() {
    const userObjectForCheck = sessionStorage.getItem("loggedIn");

    if (!userObjectForCheck) {
        console.log("Not logged in – redirecting...");
        window.location.href = "../index.html";
    } else {
        console.log("User is logged in.");
    }
}