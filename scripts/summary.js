let currentTime = new Date();
let hours = currentTime.getHours();
const dataBaseUrl = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/kanban.json"
const greeting = document.getElementById('greeting');
const todo = document.getElementById('to_do');
const done = document.getElementById('done');
const urgent = document.getElementById('urgent');
const urgentDate = document.getElementById('urgent_date');
const board = document.getElementById('board');
const boardAmount = document.getElementById('board_amount');
const progress = document.getElementById('progress');
const progressAmount = document.getElementById('progress_amount');
const feedback = document.getElementById('feedback');
let cards = [];


/**
 * This function initializes functions that render elements into the page when opening it
 */
function init() {
    fetchBoard();
    getName();
}


/**
 * Fetches the data from the database and transforms the json to a array
 */
async function fetchBoard() {
    try {
        let response = await fetch(dataBaseUrl);
        if (!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        let data = await response.json();
        for (const [key, value] of Object.entries(data)) {
            cards.push({ id: key, value });
        }
        console.log(cards);
        renderTasks();
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}


/**
 * This function adds the amount of tasks in each category to the html
 */
function renderTasks() {
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].value.priority === "Urgent") {
            urgent.innerHTML++;
        }
        if (cards[i].value.currentStatus === "To-do") {
            todo.innerHTML++;
        }
        else if (cards[i].value.currentStatus === "Done") {
            done.innerHTML++;
        }
        else if (cards[i].value.currentStatus === "Progress") {
            progress.innerHTML++;
        }
        else if (cards[i].value.currentStatus === "Feedback") {
            feedback.innerHTML++;
        }
    }
    board.innerHTML = cards.length -1;
    checkBoardAmount();
}


function checkBoardAmount() {
    if(cards.length -1 === 1) {
        boardAmount.innerHTML = `Task in Board`;
    }
    else {
        boardAmount.innerHTML = `Tasks in Board`;
    }
    checkProgressAmount();
}


function checkProgressAmount() {
    if(progress.length === 1) {
        progressAmount.innerHTML = `Task in Board`;
    }
    else {
        progressAmount.innerHTML = `Tasks in Board`
    }
}


/**
 * This function checks after the login if there is a registered user logged in or a guest user. 
 * 
 * @returns - If there is only a guest user logged in, the greetGuest() function will be called and after that the getName() function stops
 */
function getName() {
    let personName = sessionStorage.getItem('loggedIn');
    if (personName === null) {
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
    if (hours >= 0 && hours < 6) {
        const night = "Gute Nacht";
        greeting.innerHTML = greetingTemp(night, userName);
    }
    else if (hours >= 6 && hours < 12) {
        const morning = "Guten Morgen";
        greeting.innerHTML = greetingTemp(morning, userName);
    }
    else if (hours >= 12 && hours < 18) {
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
    if (hours >= 0 && hours < 6) {
        const night = "Gute Nacht";
        greeting.innerHTML = greetingGuestTemp(night);
    }
    else if (hours >= 6 && hours < 12) {
        const morning = "Guten Morgen";
        greeting.innerHTML = greetingGuestTemp(morning);
    }
    else if (hours >= 12 && hours < 18) {
        const afternoon = "Guten Nachmittag";
        greeting.innerHTML = greetingGuestTemp(afternoon);
    }
    else {
        const evening = "Guten Abend";
        greeting.innerHTML = greetingGuestTemp(evening);
    }
}