const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/";
let currentStatus = "To-Do";
let priority = "medium";
let assignedContacts = {};
let subtasks = {};
let subtask_id = 0;
let selectedContacts = document.getElementById('selected_contacts_div');
let Contacts = document.getElementById('contactsList');
let urgent_button = document.getElementById('urgent_btn');
let medium_button = document.getElementById('medium_btn');
let low_button = document.getElementById('low_btn');
let categorySelection = document.getElementById('category');
let subtaskInput = document.getElementById('subtask_input');
let title = document.getElementById('title_input');
let duedate = document.getElementById('duedate_input');
let selectedCategory = document.getElementById('btn_text');
let contactData = [];

/// --------------------------------- PATRICK FUNKTIONEN ----------------------------////
async function init_addTask(){
    await fetchContacts();
    getContacts(contactData);
}

async function fetchContacts(){
    const response = await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/contacts.json`);
    const contactDataObj = await response.json();
    const contactDataArr = Object.entries(contactDataObj)
    contactData = contactDataArr;
}

function postTask() {
    const assembledTaskObj = assembleTask();
    uploadTask(assembledTaskObj);
}
/// ------------ ENDE PATRIUCK FUNKTIONEN -------------------------------- //
/**
 * resets all buttons and highlights the corresponding button of the picked urgency afterwards
 * @param {string} priority value of priority, selected by user
 */
function select(chosenPriority) {
    resetButtonsToDefault();
    switch (chosenPriority) {
        case 'urgent':
            priority = "urgent";
            urgent_button.classList.add('urgent', 'btn_bigFont');
            ['urgent_1', 'urgent_2'].forEach(id => document.getElementById(id).setAttribute("fill", "white"));
            console.log(priority);
            break;
        case 'medium':
            priority = "medium";
            medium_button.classList.add('medium', 'btn_bigFont');
            ['medium_1', 'medium_2'].forEach(id => document.getElementById(id).setAttribute("fill", "white"));
            console.log(priority);
            break;
        case 'low':
            priority = "low";
            low_button.classList.add('low', 'btn_bigFont');
            ['low_1', 'low_2'].forEach(id => document.getElementById(id).setAttribute("fill", "white"));
            console.log(priority);
            break;
    }
}

/**
 * resets all buttons to the "not pressed"-state
 */
function resetButtonsToDefault() {
    urgent_button.classList.remove('urgent','btn_bigFont');
    medium_button.classList.remove('medium','btn_bigFont');
    low_button.classList.remove('low', 'btn_bigFont');
    ['urgent_1', 'urgent_2'].forEach(id => document.getElementById(id).setAttribute("fill", "#fe3e00"));
    ['medium_1', 'medium_2'].forEach(id => document.getElementById(id).setAttribute("fill", "#fda807"));
    ['low_1', 'low_2'].forEach(id => document.getElementById(id).setAttribute("fill", "#7ae229"));
}

/**
 * opens & closes the dropdown-menu of the contacts
 */
function toggleContacts() {
    Contacts.classList.toggle('hidden');
    selectedContacts.classList.toggle('hidden');
    rotateArrowIcon("assigned_icon");
}

/**
 * closes all currently open dropdown-menus
 */
function closeOpenSections() {
    Contacts.classList.add('hidden');
    selectedContacts.classList.remove('hidden');
    document.getElementById("assigned_icon").classList.remove('rotate');
    categorySelection.classList.add('hidden');
    document.getElementById("category_icon").classList.remove('rotate');
}
/**
 * prevents events from unwanted triggering
 * @param {event} event
 */
function Bubbling(event){
    event.stopPropagation();
}

/**
 * rotates the arrow-icon for better user-comprehension
 * @param {string} formularID either contacts or category
 */
function rotateArrowIcon(formularID) {
    document.getElementById(formularID).classList.toggle('rotate');
}

/**
 * extracts all selected contacts from an object and calls function for rendering those
 */
function getSelectedContacts() {
    selectedContacts.innerHTML = "";
    for (const [id, value] of Object.entries(assignedContacts)) {
        selectedContacts.innerHTML += renderSelectedContactsAsCircle(value.name, id, value.color);
    }
}

/**
 *
 * @param {string} name name of the contact
 * @returns the initials of an username
 */
function getInitials(name) {
    let step_1 = name.split(" ");
    let step_2 = step_1.map(partName => partName[0].toUpperCase());
    return step_2.join("");
}
/**
 * toggles the checkmark-icon of the selected user between checked & unchecked
 * @param {string} name name of the contact
 * @param {string} id id of the contact
 */
function toggleCheckmark(name, id, color) {
    document.getElementById(id).classList.toggle('highlight');
    document.getElementById(`${id}-unchecked`).classList.toggle('hidden');
    document.getElementById(`${id}-checked`).classList.toggle('hidden');
    editAssignedObject(name, id, color);
    getSelectedContacts();
}
/**
 * edits the content of assignedContacts, a variable used for keeping track of previous selected contacts
 * @param {string} name name of the contact
 * @param {string} id id of the contact
 */
function editAssignedObject(name, id, color) {
    if (document.getElementById(`${id}-checked`).classList != 'hidden') {
        assignedContacts[`${id}`] ? null : assignedContacts[`${id}`] = {"name" : name, "color" : color};
    } else {
        delete assignedContacts[`${id}`];
    }
}
/**
 * reads within all contacts and returns results based on the current searchinput
 */
function search() {
    Contacts.classList.remove('hidden');
    selectedContacts.classList.add('hidden');
    let userInput = document.getElementById('searchbar').value.toLowerCase();
    let searchresult = contactData.filter(contact => contact[1].name.toLowerCase().includes(userInput));
    getContacts(searchresult);
}
/**
 * toggles the hidden-class, making the corresponding div either visible or invisible
 * @param {string} id id of the div
 */
function toggleHidden(id) {
    document.getElementById(id).classList.toggle('hidden');
}

/**
 * shows the user-selection und hides the other options
 * @param {string} category either Technical Task or User Story
 */
function setCategory(category) {
    switch (category) {
        case "Technical Task":
            selectedCategory.innerHTML = "Technical Task";
            categorySelection.classList.add('hidden');
            break;
        case "User Story":
            selectedCategory.innerHTML = "User Story";
            categorySelection.classList.add('hidden');
            break;
    }
    checkUploadConditions();
}

/**
 * resets the subtask-inputspace
 */
function clearInput() {
    subtaskInput.value = "";
    ChangeSubtaskIcons();
}

/**
 * adds the currently written Subtask-prompt as an unique & editable line beneath the subtask-inputfield
 */
function addSubtask() {
    let UserInput = subtaskInput.value;
    if (UserInput != "") {   
        document.getElementById('addedSubtasks').innerHTML += subtask_template(subtask_id, UserInput);
        subtasks[subtask_id] = {name : UserInput, status : "unchecked"};
        subtask_id += 1;
        subtaskInput.value = "";
    }
    ChangeSubtaskIcons();
}

/**
 * adds "/" after the second and fifth character
 */
function formcorrectDuedate() {
    eraseInvalidInput();
    if (duedate.value.length > 2 && !duedate.value.includes('/')) {
        duedate.value = duedate.value.slice(0, 2) + '/' + duedate.value.slice(2);
    }
    if (duedate.value.length > 5 && !duedate.value.slice(3).includes('/')) {
        duedate.value = duedate.value.slice(0, 5) + '/' + duedate.value.slice(5);
    }
    if(duedate.value.length > 10){
        duedate.value = duedate.value.slice(0, -1);
    }
}

/**
 * accepts only numbers, therefore removes invalid input from user
 */
function eraseInvalidInput() {
    let lastChar = duedate.value.slice(-1);
    if (isNaN(lastChar) == true) {
        duedate.value = duedate.value.slice(0, -1);
    }
}

/**
 * closes the "edit"-Mode of the currently eddited subtask, adding it back as a line beneath the subtask-input
 * @param {string} id id of the subtask
 */
function confirmSubtask(id) {
    document.getElementById(`edit_div${id}`).classList.toggle('hidden');
    document.getElementById(`edit_div${id}`).style = "background-color: white";
    document.getElementById(id).classList.toggle('hidden');
    document.getElementById(`subtask_row${id}`).innerHTML = document.getElementById(`edit_input${id}`).value;
    subtasks[`${id}`] = document.getElementById(`edit_input${id}`).value;
}

/**
 * deletes the selected subtask entirely
 * @param {event} event 
 * @param {string} id id of the subtask
 */
function deleteSubtask(event, id) {
    event.stopPropagation();
    document.getElementById(id).remove();
    document.getElementById(`edit_div${id}`).remove();
    delete subtasks[`${id}`];
}

/**
 * opens "edit"-mode of the selected subtask, making it possible to change previous settings
 * @param {string} id id of the subtask
 */
function editSubtask(id) {
    let current_subtask = document.getElementById(`subtask_row${id}`).innerHTML;
    document.getElementById(`edit_div${id}`).classList.toggle('hidden');
    document.getElementById(`edit_div${id}`).style = "background-color: white";
    document.getElementById(id).classList.toggle('hidden');
    document.getElementById(`edit_input${id}`).value = current_subtask;
}

/**
 * validates all necessary inputs for a new task and enables the upload-button, if valid
 */
function checkUploadConditions() {
    if (title.value !== "" && duedate.value.length == 10 && selectedCategory.innerHTML !== "Select task category") {
        document.getElementById('confirm_btn').disabled = false;
        document.getElementById('confirm_btn_text').style.cursor = "pointer";
    } else {
        document.getElementById('confirm_btn').disabled = true;
        document.getElementById('confirm_btn_text').style.cursor = "not-allowed";
        
    }
}

/**
 * starts an animation after a successful Task Creation
 */
function animationTaskAdded() {
    let confirmation = document.getElementById('confirmation');
    confirmation.classList.remove('hidden');
    confirmation.classList.add('animate');
    setTimeout(() => {
        window.location.href = "board.html";
    }, 2000);
}

/**
 * collects various information and creates an taskcard for further interactions
 * @returns an object with key:value pairs
 */
function assembleTask() {
    console.log(priority);
    return {
        "assigned" : checkAssignedContactsLength(),
        "category" : selectedCategory.innerHTML,
        "description" : document.getElementById('description').value,
        "duedate" : duedate.value,
        "currentStatus" : currentStatus,
        "priority" : priority,
        "subtasks" : checkSubtasksLength(),
        "title" : title.value
    }
}

/**
 * This function checks if the value is empty or not. If the value is empty there will be a placeholder inserted so it is not getting deleted from firebase.
 * 
 * @returns - It returns an object
 */
function checkAssignedContactsLength() {
    let getSize = Object.keys(assignedContacts);
    if(getSize.length === 0) {
        assignedContacts = {"null" : "null"};
    }
    else {
        assignedContacts['null'] = 'null';
    }
    return assignedContacts;
}

/**
 * This function checks if the value is empty or not. If the value is empty there will be a placeholder inserted so it is not getting deleted from firebase.
 * 
 * @returns - It returns an object 
 */
function checkSubtasksLength() {
    let getSize = Object.keys(subtasks);
    if(getSize.length === 0) {
        subtasks = {"null" : "null"};
    }
    else {
        subtasks['null'] = 'null';
    }
    return subtasks;
}

/**
 * uploads tasks to the database
 * @param {object} assembledTaskObj object with necessary information for the taskcard
 */
async function uploadTask(assembledTaskObj) {
    console.log(priority);
    await fetch("https://join---database-default-rtdb.europe-west1.firebasedatabase.app/kanban.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assembledTaskObj)
    });
}

/**
 * changes the subtask-Icon while creating a subtask
 */
function ChangeSubtaskIcons() {
    let subtaskIcons = document.getElementById('subtask_input_icons');
    if (subtaskInput.value !== "") {
        subtaskIcons.innerHTML = subtaskIsNotBlank();
    } else {
        subtaskIcons.innerHTML = subtaskIsBlank();
    }
}

/**
 * renders contacts from the logged user
 * @param {object} contactData object with contact information
 */
function getContacts(contactData) {
    Contacts.innerHTML = "";
        for(let i = 0; i < contactData.length ; i++){
            Contacts.innerHTML += renderContacts(i, contactData);
        }
}