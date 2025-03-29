let currentTime = new Date();
let hours = currentTime.getHours();
const greeting = document.getElementById('greet_msg');


/**
 * This function greets the user after he logs into his account
 */
function greet() {
    if(hours >= 0 && hours < 6) {
        greeting.innerHTML = `Gute Nacht,`;
    }
    else if(hours >= 6 && hours < 12) {
        greeting.innerHTML = `Guten Morgen,`;
    }
    else if(hours >= 12 && hours < 18) {
        greeting.innerHTML = `Guten Nachmittag,`;
    }
    else {
        greeting.innerHTML = `Guten Abend,`;
    }
}
