const dialog = document.getElementById('overlay');
const wrapper = document.querySelector('.wrapper');
const contactList = document.getElementById('contact_list');
let contactsNamesOfUser = [];
let currentPriority = "";


/**S
 * This function opens the dialog of the card
 */
function openDialog(i) {
    const array = getCurrentArray();
    wrapper.innerHTML = getDialogTemplate(i, array);
    dialog.showModal();
}


/**
 * This function closes the dialog of the card
 */
async function closeDialog(e) {
    e.stopPropagation();
    currentPriority = "";
    dialog.close();
    cards = structuredClone(originalCards);
    foundTasks = structuredClone(originalFoundTasks);
    const array = getCurrentArray();
    renderCards(array);
   
}


/**
 * This function closes the dialog if the user clicks next to the dialog
 * 
 * @param {*} e - resembles the event 
 */
dialog.onclick = function (e) {
    const contactWrapper = document.getElementById('contact-list-wrapper');
    if (!wrapper.contains(e.target)) {
        //dialog.close();
        closeDialog(e);
        return;
    }
    if (contactWrapper === null) {
        return;
    }
    if (!contactWrapper.contains(e.target)) {
        closeContactList();
    }
}


/**
 * Renders the edit tab of the current card
 * 
 * @param {number} index - The current index of the card  
 * @param {event} e - Prevents the event bubbling 
 */
function openEditDialog(index, e) {
    e.stopPropagation();
    const array = getCurrentArray();
    wrapper.innerHTML = getEditDialogTemplate(array ,index);
    currentPriority = array[index].value.priority;
    dialog.showModal();
}


/**
 * 
 * @param {number} index - The index of the current card 
 * @returns - It returns the assigned users to the card dialog
 */
function assignedDialogUsers(index) {
    let assignedContactsRef = ``;
    const array = getCurrentArray();
    for (let [key, value] of Object.entries(array[index].value.assigned)) {
        if (key == "null") {
            continue;
        }
        let [firstName, lastName] = value.name.split(" ");
        firstLetterFName = firstName.slice(0, 1);
        firstLetterLName = lastName.slice(0, 1);
        assignedContactsRef += getAssignedUsersDialogTemplate(firstName, lastName, firstLetterFName, firstLetterLName);
    }
    return assignedContactsRef;
}


function renderSubtasksIntoDialog(cardIndex) {
    let subtasksRef = ``;
    const array = getCurrentArray();
    const entries = Object.entries(array[cardIndex].value.subtasks);
    for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i];
        if (key == "null") {
            continue;
        }
        subtasksRef += getSubtasksDialogTemplate(value.status, value.name, cardIndex, key);
    }
    return subtasksRef;
}


async function checkOrUncheckSubtask(status, cardIndex, subtaskKey) {
    const array = getCurrentArray();
    if(status === "checked") {
        array[cardIndex].value.subtasks[subtaskKey].status = "unchecked";
        console.log(array[cardIndex].value.subtasks[subtaskKey].status)
    }
    else {
        array[cardIndex].value.subtasks[subtaskKey].status = "checked";
        console.log(array[cardIndex].value.subtasks[subtaskKey].status + "checked")
    }
    await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/test/${array[cardIndex].id}/subtasks.json`, {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(array[cardIndex].value.subtasks)
    });
    init();
    openDialog(cardIndex);
}


/**
 * This function calls the deleteFromDatabase function. After that it re-renders the page.
 * 
 * @param {number} i - The index of the current card 
 */
function deleteCard(i) {
    const array = getCurrentArray();
    deleteFromDatabase(i);
    array.splice(i, 1);
    closeDialog();
    renderCards();
}


/**
 * This function deletes the chosen card.
 * 
 * @param {i} i - The index of the current card 
 */
async function deleteFromDatabase(i) {
    const array = getCurrentArray();
    let cardToDelete = array[i].id;
    await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/test/${cardToDelete}.json`, {
        method: "DELETE"
    });
}


// function checkDuedateInputConditions(cardIndex) {
//     const inputRef = document.getElementById('input_duedate');
//     const inputRefValue = inputRef.value;
//     typeof inputRefValue;

//     if (inputRefValue.length === 2) {
//         inputRef.value = `${inputRefValue}/`;
//     }
//     else if (inputRefValue.length === 5) {
//         inputRef.value = `${inputRefValue}/`;
//     }
// }


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
    currentPriority = btnOne;
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
        if (!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        let data = await response.json();
        pushContactList(data.contacts);
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}


function pushContactList(contacts) {
    contactsNamesOfUser = [];
    for(let [key, value] of Object.entries(contacts)) {
        contactsNamesOfUser.push({id : key, value});
    }
    console.log(contactsNamesOfUser);
}


function renderContactList(cardIndex) {
    let assignmentList = getAssignmentList(cardIndex);
    let contactsRef = ``;
    for (let i = 0; i < contactsNamesOfUser.length; i++) {
        let [firstNameFirstChar, lastNameFirstChar] = contactsNamesOfUser[i].value.name.split(" ");
        firstNameFirstChar = firstNameFirstChar.charAt(0);
        lastNameFirstChar = lastNameFirstChar.charAt(0);
        const checkAssignment = assignmentList.find(element => element.id == contactsNamesOfUser[i].id);
        if(checkAssignment != undefined) {
            contactsRef += renderAssignedContactsIntoEditDialog(firstNameFirstChar, lastNameFirstChar, i, cardIndex, contactsNamesOfUser);
        }
        else {
            contactsRef += renderContactsIntoEditDialog(firstNameFirstChar, lastNameFirstChar, i, cardIndex, contactsNamesOfUser);
        }
    }
    return contactsRef;
}


function getAssignmentList(cardIndex) {
    const array = getCurrentArray();
    let assignedTo = [];
    for (let [key, value] of Object.entries(array[cardIndex].value.assigned)) {
        if (key === "null") {
            continue;
        }
        assignedTo.push({id : key, value});
    } 
    return assignedTo;
}


function checkSubtaskInputField() {
    const dialogSubtasks = document.getElementById('dialog_subtasks');
    if (dialogSubtasks.value.length >= 1) {
        document.getElementById('plus_icon').classList.add('d_none');
        document.getElementById('x_icon').classList.remove('d_none');
        document.getElementById('check_icon').classList.remove('d_none');
        document.getElementById('icon_divider').classList.remove('d_none');
    }
    else {
        document.getElementById('x_icon').classList.add('d_none');
        document.getElementById('check_icon').classList.add('d_none');
        document.getElementById('icon_divider').classList.add('d_none');
        document.getElementById('plus_icon').classList.remove('d_none');
    }
}


function deleteSubtaskFromInput() {
    const dialogSubtasks = document.getElementById('dialog_subtasks');
    dialogSubtasks.value = '';
    document.getElementById('x_icon').classList.add('d_none');
    document.getElementById('check_icon').classList.add('d_none');
    document.getElementById('icon_divider').classList.add('d_none');
    document.getElementById('plus_icon').classList.remove('d_none');
}


function addInputToSubtasks(cardIndex) {
    const array = getCurrentArray();
    const dialogSubtasks = document.getElementById('dialog_subtasks');
    let randomId = Math.round(Math.random() * 100000);
    for (let [key, value] of Object.entries(array[cardIndex].value.subtasks)) {
        if(randomId == key) {
            addInputToSubtasks(array, cardIndex);
            break;
        }
    }
    array[cardIndex].value.subtasks[randomId] = {name : dialogSubtasks.value, status : "unchecked"};
    dialogSubtasks.value = ``;
    checkSubtaskInputField();
    renderUpdatedSutasksInEditDialog(cardIndex);
}


function renderUpdatedSutasksInEditDialog(cardIndex) {
    const subtasksListRef = document.getElementById('subtasks_list');
    subtasksListRef.innerHTML = ``;
    subtasksListRef.innerHTML = renderSubtasksintoEditDialog(cardIndex);
}


function checkWichBtnToHighlight(index) {
    const array = getCurrentArray();
    if (array[index].value.priority === 'urgent') {
        return renderUrgent();
    }
    else if (array[index].value.priority === 'medium') {
        return renderMedium();
    }
    else {
        return renderLow();
    }
}


function renderAssignedContactsToEditDialog(index) {
    const array = getCurrentArray();
    let assignedContactsRef = ``;
    for (let [key, value] of Object.entries(array[index].value.assigned)) {
        if (key == "null") {
            continue;
        }
        let [firstName, lastName] = value.name.split(" ");
        firstLetterFName = firstName.slice(0, 1);
        firstLetterLName = lastName.slice(0, 1);
        assignedContactsRef += getAssignedUsersEditTemplate(firstLetterFName, firstLetterLName);
    }
    return assignedContactsRef;
}


// function renderSubtasksintoEditDialog(index) {
//     const array = getCurrentArray();
//     let subtasksRef = ``;
//     for(let [key, value] of Object.entries(array[index].value.subtasks)) {
//         if (key == "null") {
//             continue;
//         }
//         subtasksRef += getSubtasksEditDialogTemplate(value.name, i);
//     }
//     return subtasksRef;
// }


function renderSubtasksintoEditDialog(index) {
    const array = getCurrentArray();
    let subtasksRef = ``;
    const subtasks = Object.entries(array[index].value.subtasks);
    for (let i = 0; i < subtasks.length; i++) {
        const [key, value] = subtasks[i];
        if (key === "null") {
            continue;
        }
        subtasksRef += getSubtasksEditDialogTemplate(key, index, value.name, i);
    }
    return subtasksRef;
}


function assignOrDisassignContact(contactIndex, cardIndex, contactID, contactName) {
    let iteratedAssignments = getAssignmentList(cardIndex);
    let searchForAssignment = iteratedAssignments.find(element => element.id == contactID);
    if(searchForAssignment != undefined) {
        disAssignUserFromCard(searchForAssignment.id, cardIndex, contactIndex);
    }
    else {
        assignUserToCard(contactIndex, cardIndex, contactID, contactName);
    }
}


function getAssignmentList(index) {
    const array = getCurrentArray();
    let assignedTo = [];
    for(let [key, value] of Object.entries(array[index].value.assigned)) {
        if (key == "null") {
            continue;
        }
        assignedTo.push({id : key, value});
    }
    return assignedTo;
}


function disAssignUserFromCard(contactID, cardIndex, contactIndex) {
    const array = getCurrentArray();
    delete array[cardIndex].value.assigned[contactID];
    document.getElementById(`contact_container_${contactIndex}`).classList.remove('assigned-contact-background');
    document.getElementById(`contact_container_${contactIndex}`).classList.add('align-contact-list');
    document.getElementById(`full_name_${contactIndex}`).classList.remove('full-name-white');
    document.getElementById(`full_name_${contactIndex}`).classList.add('full-name-dark');
    document.getElementById(`checked_image_${contactIndex}`).classList.add('d_none');
    document.getElementById(`unchecked_image_${contactIndex}`).classList.remove('d_none');
    updateShortHandNames(cardIndex);
}


function assignUserToCard(contactIndex, cardIndex, contactID, contactName) {
    const array = getCurrentArray();
    array[cardIndex].value.assigned[contactID] = {name : contactName};
    document.getElementById(`contact_container_${contactIndex}`).classList.add('assigned-contact-background');
    document.getElementById(`contact_container_${contactIndex}`).classList.remove('align-contact-list');
    document.getElementById(`full_name_${contactIndex}`).classList.add('full-name-white');
    document.getElementById(`full_name_${contactIndex}`).classList.remove('full-name-dark');
    document.getElementById(`checked_image_${contactIndex}`).classList.remove('d_none');
    document.getElementById(`unchecked_image_${contactIndex}`).classList.add('d_none');
    updateShortHandNames(cardIndex);
}


function updateShortHandNames(cardIndex) {
    const array = getCurrentArray();
    let assignedUsers = "";
    let shortHandRef = document.getElementById('shorthand_contact_list');
    shortHandRef.innerHTML = ``;
    for(let [key, value] of Object.entries(array[cardIndex].value.assigned)) {
        if (key == "null") {
            continue;
        }
        let [firstName, lastName] = value.name.split(" ");
        firstLetterFName = firstName.slice(0, 1);
        firstLetterLName = lastName.slice(0, 1);
        assignedUsers += getAssignedUsersEditTemplate(firstLetterFName, firstLetterLName);
    }
    shortHandRef.innerHTML = assignedUsers;
}


function checkFilterContactConditions(cardIndex) {
    let inputLetters = document.getElementById('dialog_assigned_to').value;
    let inputLettersLength = inputLetters.trim().length;
    if (inputLettersLength >= 2) {
        filterContactsInEditDialog(inputLetters.toLowerCase(), cardIndex);
    }
    else if (inputLettersLength === 0) {
        renderFilteredContactsIntoDialog(contactsNamesOfUser, cardIndex);
    }
}


function filterContactsInEditDialog(inputLetters, cardIndex) {
    let filteredContacts = "";
    filteredContacts = contactsNamesOfUser.filter(contact => contact.value.name.toLowerCase().includes(inputLetters));
    console.log(filteredContacts);
    renderFilteredContactsIntoDialog(filteredContacts, cardIndex);
}


function renderFilteredContactsIntoDialog(filteredContacts, cardIndex) {
    let assignmentList = getAssignmentList(cardIndex);
    let contactListRef = document.getElementById('contact-list-wrapper');
    let contactsRef = "";
    contactListRef.innerHTML = ``;
    for (let i = 0; i < filteredContacts.length; i++) {
        let [firstNameFirstChar, lastNameFirstChar] = filteredContacts[i].value.name.split(" ");
        firstNameFirstChar = firstNameFirstChar.charAt(0);
        lastNameFirstChar = lastNameFirstChar.charAt(0);
        const checkAssignment = assignmentList.find(element => element.id == filteredContacts[i].id);
        if(checkAssignment != undefined) {
            contactsRef += renderAssignedContactsIntoEditDialog(firstNameFirstChar, lastNameFirstChar, i, cardIndex, filteredContacts);
        }
        else {
            contactsRef += renderContactsIntoEditDialog(firstNameFirstChar, lastNameFirstChar, i, cardIndex, filteredContacts);
        }
    }
    contactListRef.innerHTML = contactsRef;
    console.log(contactsNamesOfUser);
}


function highlightChangeOptions(subtaskIndex) {
    document.getElementById(`edit_delete_container_${subtaskIndex}`).classList.remove('d_none');
    document.getElementById(`edit_delete_container_${subtaskIndex}`).classList.add('align-change-or-delete-btn');  
}


function hideChangeOptions(subtaskIndex) {
    document.getElementById(`edit_delete_container_${subtaskIndex}`).classList.remove('align-change-or-delete-btn');
    document.getElementById(`edit_delete_container_${subtaskIndex}`).classList.add('d_none');  
}


function deleteSubtaskFromEditDialog(id, cardIndex, e) {
    e.stopPropagation();
    const array = getCurrentArray();
    delete array[cardIndex].value.subtasks[id];
    const listOfSubtasksRef = document.getElementById('subtasks_list');
    listOfSubtasksRef.innerHTML = ``;
    listOfSubtasksRef.innerHTML = renderSubtasksintoEditDialog(cardIndex);
}


function editSubtaskInEditDialog(id, cardIndex, subtaskIndex, e) {
    e.stopPropagation();
    const array = getCurrentArray();
    document.getElementById(`number_of_subtask_${subtaskIndex}`).classList.add('d_none');
    document.getElementById(`edit_list_subtask_${subtaskIndex}`).classList.remove('d_none');
    document.getElementById(`edit_list_subtask_${subtaskIndex}`).classList.add('edit-list-subtask');
}


function saveChangesToSubtaskInEditDialog(cardIndex, subtaskId, subtaskIndex, e) {
    e.stopPropagation();
    const array = getCurrentArray();
    const inputRef = document.getElementById(`edit_list_subtask_input_${subtaskIndex}`);
    const inputRefValue = inputRef.value;
    array[cardIndex].value.subtasks[subtaskId].name = inputRefValue;
    document.getElementById('subtasks_list').innerHTML = renderSubtasksintoEditDialog(cardIndex);
}


function checkValidationInEditDialog(cardIndex) {
    const array = getCurrentArray();
    if (document.getElementById('input_title').value.length === 0) {
        highlightValidationError(array, cardIndex, 'title');
    }
    if (document.getElementById('input_duedate').value.length === 0) {
        highlightValidationError(array, cardIndex, 'duedate');
    }
    if (document.getElementById('input_title').value.length !== 0 && document.getElementById('input_duedate').value.length !== 0) {
        saveCardChangesToDatabase(cardIndex);
    }
}


function highlightValidationError(array, cardIndex, placeholder) {
    document.getElementById(`error_${placeholder}`).classList.remove('d_none');
    document.getElementById(`container_input_${placeholder}`).classList.add('red-validation-border');
}


function checkTitleAndDateInputLength(placeholder) {
    const inputRef = document.getElementById(`input_${placeholder}`);
    const inputRefValue = inputRef.value;
    const errorText = document.getElementById(`error_${placeholder}`);
    const inputBorder = document.getElementById(`container_input_${placeholder}`)

    if(inputRefValue.length >= 1 && !errorText.classList.contains('d_none')) {
        errorText.classList.add('d_none');
        inputBorder.classList.remove('red-validation-border');
    }
}


async function saveCardChangesToDatabase(index) {
    const array = getCurrentArray();
    await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/test/${array[index].id}.json`, {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            title : document.getElementById('input_title').value,
            description : document.getElementById('input_descr').value,
            priority : currentPriority,
            duedate : document.getElementById('input_duedate').value,
            currentStatus : array[index].value.currentStatus,
            category : array[index].value.category,
            subtasks : array[index].value.subtasks,
            assigned : array[index].value.assigned
        })
    })
}