const dataBase = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/test.json";
const usersDatabase = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/"
const cards = [];
const user = [];
const findTask = document.getElementById('find_task');
const todo = document.getElementById('to_do');
const progress = document.getElementById('progress');
const feedback = document.getElementById('feedback');
const done = document.getElementById('done');
const dialog = document.getElementById('overlay');
const wrapper = document.querySelector('.wrapper');
const contactList = document.getElementById('contact_list');
const contactWrapper = document.getElementById('contact-list-wrapper');
let toDoMemory = ``;
let progressMemory = ``;
let feedbackMemory = ``;
let doneMemory = ``;


/**
 * Initializes the fetching
 */
async function init() {
    await fetchData();
    renderCards();
    await fetchUserData();
}


/**
 * This function fetches the cards from the database and call the function to push the data to an array
 */
async function fetchData() {
    try {
        let response = await fetch(dataBase);
        if(!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);    
        }
        let data = await response.json();
        pushDataToCardsArray(data);
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}


/**
 * This function converts the json to an iterable array of objects and pushes it to an empty array
 * 
 * @param {object} cardData - This is the fetched json from the database 
 */
function pushDataToCardsArray(cardData) {
    for(let [key, value] of Object.entries(cardData)) {
        if (key == "null") {
            continue;
        }
        cards.push({id : key, value});
    }
    console.log(cards);
}


/**
 * This function renders the task cards into the HTML
 */
function renderCards() {
    toDoMemory = ``;
    progressMemory = ``;
    feedbackMemory = ``;
    doneMemory = ``;
    todo.innerHTML = ``;
    progress.innerHTML = ``;
    feedback.innerHTML = ``;
    done.innerHTML = ``;

    for (let i = 0; i < cards.length; i++) {
        checkRenderConditions(i);   
    }
    checkIfBoxIsEmpty();
}


/**
 * Checks if one of the following section are empty, so it will insert a placeholder. If not empty it renders the content into the sections.
 */
function checkIfBoxIsEmpty() {
    if(toDoMemory === "") {
        todo.innerHTML = getEmptySectionTemplate("to do");
    }
    else {
        todo.innerHTML = toDoMemory;
    }
    if(progressMemory === "") {
        progress.innerHTML = getEmptySectionTemplate("in progress");
    }
    else {
        progress.innerHTML = progressMemory;
    }
    if(feedbackMemory === "") {
        feedback.innerHTML = getEmptySectionTemplate("in feedback");
    }
    else {
        feedback.innerHTML = feedbackMemory;
    }
    if(doneMemory === "") {
        done.innerHTML = getEmptySectionTemplate("are done");
    }
    else {
        done.innerHTML = doneMemory;
    }
}


/**
 * This function checks in wich category the card belongs and saves the html code into the right variable
 * 
 * @param {number} index - The index of the current card
 */
function checkRenderConditions(index) {
    if (cards[index].value.currentStatus === "todo") {
        toDoMemory += getCardsTemplate(index);
    }
    else if (cards[index].value.currentStatus === "progress") {
        progressMemory += getCardsTemplate(index);
    }
    else if (cards[index].value.currentStatus === "feedback") {
        feedbackMemory += getCardsTemplate(index);
    }
    else if (cards[index].value.currentStatus === "done") {
        doneMemory += getCardsTemplate(index);
    }
}


/**
 * This function calculates the length of the subtasks for a card
 * 
 * @param {number} index - The index of the current card
 * @returns - returns the amount of subtasks in the card
 */
function getSubtasksInformation(index) {
    let subtaskLengthArr = [];
    let counter = 0;
    for (let [key, value] of Object.entries(cards[index].value.subtasks)) {
        if(key === "null") {
            continue;
        }
        subtaskLengthArr.push({id : key, value});
        if (value.status === "checked") {
            counter++;
        }
    }
    const progress = calculateProgressBar(counter, subtaskLengthArr);
    return getSubtasksTemplate(progress, counter, subtaskLengthArr.length);    
}


/**
 * This function calculates the % width for the progressbar
 * 
 * @param {number} counter - This counts the cheked tasks
 * @param {Array} subtaskLengthArr - This gives back the length of all subtasks
 * @returns - It returns the rounded percent for the progressbar
 */
function calculateProgressBar(counter, subtaskLengthArr) {
    if (counter === 0 && subtaskLengthArr.length === 0) {
        let progressbarPercent = 0;
        return progressbarPercent;
    }
    let calculatedAmount = counter / subtaskLengthArr.length * 100;
    let roundedAmount = Math.round(calculatedAmount);
    return roundedAmount;
}


/**
 * 
 * @param {number} index - The index of the current card
 * @returns - It return the first letters of the first and last name
 */
function getAssignedUsers(index) {
    let assignedContactsRef = ``;
    for(let [key, value] of Object.entries(cards[index].value.assigned)) {
        if (key == "null") {
            continue;
        }
        let [firstName, lastName] = value.name.split(" ");
        firstLetterFName = firstName.slice(0,1);
        firstLetterLName = lastName.slice(0,1);
        assignedContactsRef += getAssignedUsersTemplate(firstLetterFName, firstLetterLName);
    }
    return assignedContactsRef;
}


/**
 * This function opens the dialog of the card
 */
function openDialog(i) {
    //wrapper.innerHTML = getDialogTemplate(i);
    dialog.showModal();
}


/**
 * This function closes the dialog of the card
 */
function closeDialog() {
    dialog.close();
}


/**
 * This function closes the dialog if the user clicks next to the dialog
 * 
 * @param {*} e - resembles the event 
 */
dialog.onclick = function(e) {
    if(!wrapper.contains(e.target)) {
        dialog.close();
    }
    if(!contactWrapper.contains(e.target)) {
        closeContactList();
    }
}


/**
 * 
 * @param {number} index - The index of the current card 
 * @returns - It returns the assigned users to the card dialog
 */
function assignedDialogUsers(index) {
    let assignedContactsRef = ``;
    for(let [key, value] of Object.entries(cards[index].value.assigned)) {
        if (key == "null") {
            continue;
        }
        let [firstName, lastName] = value.name.split(" ");
        firstLetterFName = firstName.slice(0,1);
        firstLetterLName = lastName.slice(0,1);
        assignedContactsRef += getAssignedUsersDialogTemplate(firstName, lastName, firstLetterFName, firstLetterLName);
    }
    return assignedContactsRef;
}


/**
 * 
 * @param {number} index - The index of the current card 
 * @returns - It returns the subtasks to the card dialog
 */
function renderSubtasksIntoDialog(index) {
    let subtasksRef = ``;
    for(let [key, value] of Object.entries(cards[index].value.subtasks)) {
        if(key == "null") {
            continue;
        }
        subtasksRef += getSubtasksDialogTemplate(value.status, value.name);
    }
    return subtasksRef;
}


/**
 * This function calls the deleteFromDatabase function. After that it re-renders the page.
 * 
 * @param {number} i - The index of the current card 
 */
function deleteCard(i) {
    deleteFromDatabase(i);
    cards.splice(i, 1);
    closeDialog();
    renderCards();    
}


/**
 * This function deletes the chosen card.
 * 
 * @param {i} i - The index of the current card 
 */
async function deleteFromDatabase(i) {
    let cardToDelete = cards[i].id;
    await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/test/${cardToDelete}.json`, {
        method : "DELETE"
    });
}


/**
 * This function calls the three functions that change the css of the buttons in the edit field
 * 
 * @param {string} btnOne - The name of the button wich got klicked 
 * @param {string} btnTwo - The second button name
 * @param {string} btnThree - The third button name
 */
function choosePriority(btnOne, btnTwo, btnThree) {
    changeClassesOfBtnOne(btnOne);
    changeClassesOfBtnTwoAndThree(btnTwo);
    changeClassesOfBtnTwoAndThree(btnThree);  
}


/**
 * 
 * @param {string} btnOne - This is the button wich got klicked 
 */
function changeClassesOfBtnOne(btnOne) {
    document.getElementById(`${btnOne}_button`).classList.remove(`${btnOne}_button_unklicked`);
    document.getElementById(`${btnOne}_button`).classList.add(`${btnOne}_button_klicked`);
    document.getElementById(`${btnOne}_img`).classList.add('d_none');
    document.getElementById(`${btnOne}_white_img`).classList.remove('d_none');
}


/**
 * 
 * @param {string} btnTwoAndThree - These are the other two buttons who get their default class assigned
 */
function changeClassesOfBtnTwoAndThree(btnTwoAndThree) {
    document.getElementById(`${btnTwoAndThree}_button`).classList.remove(`${btnTwoAndThree}_button_klicked`);
    document.getElementById(`${btnTwoAndThree}_button`).classList.add(`${btnTwoAndThree}_button_unklicked`);
    document.getElementById(`${btnTwoAndThree}_img`).classList.remove('d_none');
    document.getElementById(`${btnTwoAndThree}_white_img`).classList.add('d_none');
}


function openContactList(e) {
    e.stopPropagation();
    document.getElementById('arrow_down').classList.add('d_none');
    document.getElementById('arrow_up').classList.remove('d_none');
    document.getElementById('shorthand_contact_list').classList.add('d_none');
    document.getElementById('contact_list').classList.remove('d_none');
}


function closeContactList() {
    document.getElementById('arrow_up').classList.add('d_none');
    document.getElementById('arrow_down').classList.remove('d_none');
    document.getElementById('contact_list').classList.add('d_none');
    document.getElementById('shorthand_contact_list').classList.remove('d_none');
}


async function fetchUserData() {
    let activeUser = sessionStorage.getItem('loggedIn');
    let parsedActiveUser = JSON.parse(activeUser);
    try {
        let response = await fetch(usersDatabase + parsedActiveUser + '.json');
        if(!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);    
        }
        let data = await response.json();
        //renderContactList(data.contacts);
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}


function renderContactList(contacts) {
    for (let value of Object.values(contacts)) {
        console.log(value.name);
    }
}

















// Hab diese Funktion nur gebaut um Test Objekte in die Datenbank zu laden, lösche sie sobald alles glatt läuft


/*async function sendDataToFirebase(data) {
    await fetch("https://join---database-default-rtdb.europe-west1.firebasedatabase.app/test.json", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(data)
    });
}

function testUpload() {
    let obj = {
        "title" : "CSS Architecture Planning",
        "priority" : "medium",
        "duedate" : "20/06/2025",
        "description" : "Define CSS naming conventions and structure",
        "currentStatus" : "done",
        "category" : "Technical Task",
        "subtasks" : {"null" : "null"},
        "assigned" : {"null" : "null"}
    };
    sendDataToFirebase(obj);
}

testUpload();*/