let currentTime = new Date();
let hours = currentTime.getHours();
const greeting = document.getElementById('greeting');


/**
 * This function checks after the login if there is a registered user logged in or a guest user. 
 * 
 * @returns - If there is only a guest user logged in, the greetGuest() function will be called and after that the getName() function stops
 */
function getName() {
    let personName = sessionStorage.getItem('loggedIn');
    if(personName === null) {
        greetGuest();
        return;
    }
    let personNameParsed = JSON.parse(personName);
    console.log(personNameParsed);
    greetUser(personNameParsed.name);
}


/**
 * This function displays the current part of the day (morning, afternoon, evening and night) and greets the user who is logged in 
 * 
 * @param {string} userName - This is the name of the user who is currently logged in 
 */
function greetUser(userName) {
    if(hours >= 0 && hours < 6) {
        const night = "Gute Nacht";
        greeting.innerHTML = greetingTemp(night, userName);
    }
    else if(hours >= 6 && hours < 12) {
        const morning = "Guten Morgen";
        greeting.innerHTML = greetingTemp(morning, userName);
    }
    else if(hours >= 12 && hours < 18) {
        const afternoon = "Guten Nachmittag";
        greeting.innerHTML = greetingTemp(afternoon, userName);
    }
    else {
        const evening = "Guten Abend";
        greeting.innerHTML = greetingTemp(evening, userName);
    }
}


/**
 * This function greets the guest user with the current part of the day (morning, afternoon, evening and night)
 */
function greetGuest() {
    if(hours >= 0 && hours < 6) {
        const night = "Gute Nacht"; 
        greeting.innerHTML = greetingGuestTemp(night);
    }
    else if(hours >= 6 && hours < 12) {
        const morning = "Guten Morgen";
        greeting.innerHTML = greetingGuestTemp(morning);
    }
    else if(hours >= 12 && hours < 18) {
        const afternoon = "Guten Nachmittag";
        greeting.innerHTML = greetingGuestTemp(afternoon);
    }
    else {
        const evening = "Guten Abend";
        greeting.innerHTML = greetingGuestTemp(evening);
    }
}
