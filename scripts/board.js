const dataBase = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/test.json";
const usersDatabase = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/"
let cards = [];
let user = [];
const findTask = document.getElementById('find_task');
const todo = document.getElementById('to_do');
const progress = document.getElementById('progress');
const feedback = document.getElementById('feedback');
const done = document.getElementById('done');
let toDoMemory = ``;
let progressMemory = ``;
let feedbackMemory = ``;
let doneMemory = ``;
let previousInput = 0;


/**
 * Initializes the fetching
 */
async function init() {
    await fetchData();
    renderCards(cards);
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
 * This function filters the cards array based on title and description
 */
function searchTasks(){
    const searchInput = document.getElementById("find_task").value;
    if(searchInput.length > 2){
    let foundTasks = cards.filter(card => 
        card.value.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        card.value.description.toLowerCase().includes(searchInput.toLowerCase())
        )
        renderCards(foundTasks);
        previousInput = searchInput.length;
    }else if(searchInput.length < 3 && previousInput > searchInput.length){
        renderCards(cards);
    }

}


/**
 * This function renders the task cards into the HTML
 */
function renderCards(array) {
    toDoMemory = ``;
    progressMemory = ``;
    feedbackMemory = ``;
    doneMemory = ``;
    todo.innerHTML = ``;
    progress.innerHTML = ``;
    feedback.innerHTML = ``;
    done.innerHTML = ``;

    for (let i = 0; i < array.length; i++) {
        checkRenderConditions(i, array);   
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
function checkRenderConditions(index, array) {
    if (array[index].value.currentStatus === "todo") {
        toDoMemory += getCardsTemplate(index);
    }
    else if (array[index].value.currentStatus === "progress") {
        progressMemory += getCardsTemplate(index);
    }
    else if (array[index].value.currentStatus === "feedback") {
        feedbackMemory += getCardsTemplate(index);
    }
    else if (array[index].value.currentStatus === "done") {
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


// function getInputTitleValue(i) {
//     return ;
// }

















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