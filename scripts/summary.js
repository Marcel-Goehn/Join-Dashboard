let currentTime = new Date();
let hours = currentTime.getHours();
const userData = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users.json";
const dataBaseUrl = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/test.json";
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
const cards = [];
const userArray = [];
let urgentLength = 0;
let todoLength = 0;
let doneLength = 0;
let progressLength = 0;
let feedbackLength = 0;


/**
 * This function initializes functions that render elements into the page when opening it
 */
async function init() {
    await fetchData();
    getName();
}


/**
 * Fetches the data from the database and transforms the json to an array
 */
async function fetchData() {
    try {
        let response = await fetch(dataBaseUrl);
        if (!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        let data = await response.json();
        for (const [key, value] of Object.entries(data)) {
            cards.push({ id: key, value });
        }
        await fetchUsers();
        calculateTasks();
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}

/**
 * Fetches the users from the database and transforms the json to an array
 */
async function fetchUsers() {
    try {
        let response = await fetch(userData);
        if(!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        let data = await response.json();
        for(let [key, value] of Object.entries(data)) {
            userArray.push({Id : key, value}
            );
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}


/**
 * This function calculates the amount of tasks in each category
 */
function calculateTasks() {
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].value.priority === "urgent") {
            urgentLength++;
        }
        if (cards[i].value.currentStatus === "todo") {
            todoLength++;
        }
        else if (cards[i].value.currentStatus === "done") {
            doneLength++;
        }
        else if (cards[i].value.currentStatus === "progress") {
            progressLength++;
        }
        else if (cards[i].value.currentStatus === "feedback") {
            feedbackLength++;
        }
    }
    renderTasks();
}


/**
 * This function renders the amount of the tasks into the html
 */
function renderTasks() {
    urgent.innerHTML = urgentLength;
    todo.innerHTML = todoLength;
    done.innerHTML = doneLength;
    progress.innerHTML = progressLength;
    feedback.innerHTML = feedbackLength;
    board.innerHTML = cards.length - 1;
    checkBoardAmount();
}


/**
 * If there is exactly one card, it sets the text to "Task in Board",
 * otherwise to "Tasks in Board".
 */
function checkBoardAmount() {
    if(cards.length -1 === 1) {
        boardAmount.innerHTML = getTaskInBoardTemplate();//`Task in Board`;
    }
    else {
        boardAmount.innerHTML = getTasksInBoardTemplate()//`Tasks in Board`;
    }
    checkProgressAmount();
}


/**
 * If there is exactly one card, it sets the text to "Task in Board",
 * otherwise to "Tasks in Board".
 */
function checkProgressAmount() {
    if(progress.length === 1) {
        progressAmount.innerHTML = getTaskInBoardTemplate()//`Task in Board`;
    }
    else {
        progressAmount.innerHTML = getTasksInBoardTemplate()//`Tasks in Board`;
    }
    nextUrgentDate();
}


/**
 * This function checks after the login if there is a registered user logged in or a guest user. 
 * 
 * @returns - If there is only a guest user logged in, the greetGuest() function will be called and after that the getName() function stops
 */
function getName() {
    let personName = sessionStorage.getItem('loggedIn');
    let personNameParsed = JSON.parse(personName);
    const findUser = userArray.find(u => u.Id === personNameParsed);
    if (findUser.value.name === "Guest Login") {
        greetGuest();
        return;
    }
    greetUser(findUser.value.name);
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


/**
 * This function converts the duedates of the urgent cards to milliseconds.
 * After that they will be compared to each other wich is the closest one to the current time.
 * When the check is done the closest duedate will be shown in the summary page
 */
function nextUrgentDate() {
    let count = 0;
    let miliseconds;
    let index;
    for (let i = 0; i < cards.length; i++) {
        if(cards[i].value.duedate === undefined || cards[i].value.priority != "urgent") {
            continue;
        }
        let [day, month, year] = cards[i].value.duedate.split("/");
        let sortArr = `${month}/${day}/${year}`;
        miliseconds = Date.parse(sortArr);
        if (count === 0) {
            count = miliseconds;
            index = i;
        }
        if (miliseconds < count) {
            count = miliseconds;
            index = i;
        }
    }
    renderUrgentDate(index);
}


/**
 * This function writes the closest duedate into the html 
 * 
 * @param {number} index - the index of the closest duedate 
 */
function renderUrgentDate(index) {
    urgentDate.innerHTML = cards[index].value.duedate;
}