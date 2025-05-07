const dataBase = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/kanban.json";
const usersDatabase = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/"
const contactsDatabase = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/contacts.json"
let cards = [];
let user = [];
let contactsArr = [];
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
let foundTasks = [];
let originalCards = [];
let originalFoundTasks = [];


/**
 * Initializes the fetching
 */
async function init() {
        cards = [];
        contactsArr = [];
        await fetchData();
        await fetchContactsBoard();
        console.log("TEST");
        const array = getCurrentArray();
        console.log(array)
        renderCards(array);
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
}


/**
 * Fetches the contacts of all users
 */
async function fetchContactsBoard() {
    try {
        let response = await fetch(contactsDatabase);
        if(!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);    
        }
        let data = await response.json();
        pushContactsToArray(data);
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}


/**
 * This function pushes the fetched contacts into an empty array
 * 
 * @param {object} data - The contact object 
 */
function pushContactsToArray(data) {
    for (let [key, value] of Object.entries(data)) {
        if(key == "null") {
            continue;
        }
        contactsArr.push({id : key, value});
    }
    console.log(contactsArr);
}


/**
 * This function filters the cards array based on title and description
 */
function searchTasks(){
    const searchInput = document.getElementById("find_task").value;
    if(searchInput.length > 2){
        foundTasks = cards.filter(card => 
        card.value.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        card.value.description.toLowerCase().includes(searchInput.toLowerCase())
        )
        renderCards(foundTasks);
        checkSearchTaskInputValidation(searchInput);
        previousInput = searchInput.length;
    }else if(searchInput.length < 3 && previousInput > searchInput.length){
        renderCards(cards);   
    }
}


/**
 * If there is no card found, this function will trigger a validation error
 * 
 * @param {string} value - The value of the search input field 
 * @returns - If the user uses the backspace key, the validation should not be trigged, so this function returns here.
 */
function checkSearchTaskInputValidation(value) {
    if (value.length > 2 && previousInput > value.length) {
        return;
    }
    if (value.length > 2 && foundTasks.length === 0) {
        document.getElementById('search_input_field_board').classList.remove('d_none');
        setTimeout(removeInputValidation, 3000);
    }
}


/**
 * This function removes the validation of the input field after a certain amount of time
 */
function removeInputValidation() {
    document.getElementById('search_input_field_board').classList.add('d_none');
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
    addDropBox();
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
    if (array[index].value.currentStatus === "To-Do") {
        toDoMemory += getCardsTemplate(index, array);
    }
    else if (array[index].value.currentStatus === "Progress") {
        progressMemory += getCardsTemplate(index, array);
    }
    else if (array[index].value.currentStatus === "Feedback") {
        feedbackMemory += getCardsTemplate(index, array);
    }
    else if (array[index].value.currentStatus === "Done") {
        doneMemory += getCardsTemplate(index, array);
    }
}


/**
 * 
 * @param {number} index - The index of the current selected card
 * @returns - It returns the color for the card header
 */
function getHeaderBgColor(index) {
    const array = getCurrentArray();
    if (array[index].value.category === "User Story") {
        return `style="background-color: #0038FF"`;
    }
    else {
        return `style="background-color: #1FD7C1"`;
    }
}


/**
 * Add's at the end of every board section an empty card, to let the user know where he can drag and drop
 */
function addDropBox() {
    todo.innerHTML += getDropBoxTemplate('To-Do');
    progress.innerHTML += getDropBoxTemplate('Progress');
    feedback.innerHTML += getDropBoxTemplate('Feedback');
    done.innerHTML += getDropBoxTemplate('Done');
}


/**
 * This function calculates the length of the subtasks for a card
 * 
 * @param {number} index - The index of the current card
 * @returns - returns the amount of subtasks in the card
 */
function getSubtasksInformation(index) {
    const array = getCurrentArray();
    let subtaskLengthArr = [];
    let counter = 0;
    for (let [key, value] of Object.entries(array[index].value.subtasks)) {
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
    const array = getCurrentArray();
    let assignedContactsRef = ``;
    for(let [key, value] of Object.entries(array[index].value.assigned)) {
        if (key == "null") {
            continue;
        }
        let [firstName, lastName] = value.name.split(" ");
        firstLetterFName = firstName.slice(0,1);
        firstLetterLName = lastName.slice(0,1);
        assignedContactsRef += getAssignedUsersTemplate(firstLetterFName, firstLetterLName, value.color);
    }
    return assignedContactsRef;
}


/**
 * 
 * @param {number} cardIndex - The number of the current selected card 
 * @returns - It returns the html of the drag and drop container
 */
function checkMobileDragDropRenderConditions(cardIndex) {
    const array = getCurrentArray();
    if(array[cardIndex].value.currentStatus === "To-Do") {
        return getRenderMobileDragDropContainerTemplate('To-Do', 'Progress', cardIndex);
    }
    else if(array[cardIndex].value.currentStatus === 'Progress') {
        return getRenderMobileDragDropContainerTemplate('To-Do', 'Feedback', cardIndex);
    }
    else if(array[cardIndex].value.currentStatus === 'Feedback') {
        return getRenderMobileDragDropContainerTemplate('Progress', 'Done', cardIndex);
    }
    else {
        return getRenderMobileDragDropContainerTemplate('Feedback', 'Done', cardIndex);
    }
}


/**
 * 
 * @returns - It returns an array. If foundTasks.length is not 0, it will return the new filtered array. If it's zero, it will return the original card array.
 */
function getCurrentArray(){
    if(foundTasks.length === 0){
        return cards;
    }else{
        return foundTasks;
    }
}


// function checkScreenWidth() {
//     if (window.innerWidth <= 1000) {
//         document.querySelectorAll('.card').forEach(card => {
//             card.setAttribute('draggable', 'false');
//         });
//     } else {
//         document.querySelectorAll('.card').forEach(card => {
//             card.setAttribute('draggable', 'true');
//         });
//     }
// }


// window.addEventListener('resize', checkScreenWidth);