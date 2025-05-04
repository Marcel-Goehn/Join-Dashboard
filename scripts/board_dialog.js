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


/**
 * It loops through all subtasks of the current card. 
 * 
 * @param {number} cardIndex - The index of the current card.
 * @returns - It returns the html template of the subtasks.
 */
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


/**
 * This function allows the user to check off a task or uncheck it if he still needs to do it.
 * 
 * @param {string} status - It holds one of the two values: "checked" or "unchecked".
 * @param {number} cardIndex - The index of the current card.
 * @param {string} subtaskKey - The key of the klicked subtask to get access to his value.
 */
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


/**
 * This function adds a "/" to the right spots when the user inserts numbers to the input field.
 * 
 * @param {event} e 
 * @returns - If the backspace key is pressed, the function will stop.
 */
function checkDuedateInputConditions(e) {
    if (e.key === "Backspace") {
        return;
    }
    const inputRef = document.getElementById('input_duedate');
    const inputRefValue = inputRef.value;
    typeof inputRefValue;

    if (inputRefValue.length === 2) {
        inputRef.value = `${inputRefValue}/`;
    }
    else if (inputRefValue.length === 5) {
        inputRef.value = `${inputRefValue}/`;
    }
}


// function checkDuedateInputConditions(e) {
//     if (e.key === "Backspace") {
//         return;
//     }
//     const inputRef = document.getElementById('input_duedate');
//     const inputRefValue = inputRef.value;
//     const cleanedValue = inputRefValue.replaceAll("/", "");
//     const onlyDigits = /^[0-9]*$/.test(cleanedValue);
//     if (!onlyDigits) {
//         console.log("Ungültige Eingabe: nur Ziffern (0–9) erlaubt");
//         return;
//     }
//     if (inputRefValue.length === 2 || inputRefValue.length === 5) {
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
 * It changes the css classes of the button wich got klicked
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


/**
 * This function opens the drop down menu of the contact list.
 * 
 * @param {event} e - It prevents the event bubbling.
 */
function openContactList(e) {
    e.stopPropagation();
    document.getElementById('arrow_down').classList.add('d_none');
    document.getElementById('arrow_up').classList.remove('d_none');
    document.getElementById('shorthand_contact_list').classList.add('d_none');
    document.getElementById('contact_list').classList.remove('d_none');
}


/**
 * This function closes the drop down menu of the contact list.
 */
function closeContactList() {
    document.getElementById('arrow_up').classList.add('d_none');
    document.getElementById('arrow_down').classList.remove('d_none');
    document.getElementById('contact_list').classList.add('d_none');
    document.getElementById('shorthand_contact_list').classList.remove('d_none');
}


/**
 * This function fetches the user data from the firebase database to get access to the contacts of the current logged in user.
 */
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


/**
 * This function pushes the contacts of the current user into a global array.
 * 
 * @param {object} contacts - It contains all the contacts of the current user.
 */
function pushContactList(contacts) {
    contactsNamesOfUser = [];
    for(let [key, value] of Object.entries(contacts)) {
        contactsNamesOfUser.push({id : key, value});
    }
    console.log(contactsNamesOfUser);
}


/**
 * This function gets the first characters of the firs and last name. Then it checks if the contact is assigned to the current card. In the last step it puts the informations into a html template.
 * 
 * @param {number} cardIndex - The index of the current card. 
 * @returns - It returns the html template of the contact list to the edit section of the dialog.
 */
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


/**
 * 
 * @param {number} cardIndex - The current index of the card. 
 * @returns - It returns an array with the contacts who are assigned to the current card.
 */
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


/**
 * It changes the UI of the input field where you can add a new one to the card. 
 */
function checkSubtaskInputField(e, cardIndex) {
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
    if (e == undefined) {
        return;
    }
    else if(e.key == 'Enter') {
        e.preventDefault();
        addInputToSubtasks(cardIndex);
    }
}


/**
 * With this function you can empty the input field where you could add a new subtask.
 */
function deleteSubtaskFromInput() {
    const dialogSubtasks = document.getElementById('dialog_subtasks');
    dialogSubtasks.value = '';
    document.getElementById('x_icon').classList.add('d_none');
    document.getElementById('check_icon').classList.add('d_none');
    document.getElementById('icon_divider').classList.add('d_none');
    document.getElementById('plus_icon').classList.remove('d_none');
}


/**
 * This function takes the user input and adds it to the subtasks as a new subtask
 * 
 * @param {number} cardIndex - The index of the current selected card 
 */
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


/**
 * This function updates the UI after a new subtask got added to the card
 * 
 * @param {number} cardIndex - The index of the current selected card 
 */
function renderUpdatedSutasksInEditDialog(cardIndex) {
    const subtasksListRef = document.getElementById('subtasks_list');
    subtasksListRef.innerHTML = ``;
    subtasksListRef.innerHTML = renderSubtasksintoEditDialog(cardIndex);
}


/**
 * Checks wich button to highlight when opening up the edit tab of the dialog
 * 
 * @param {number} index - The index of the current selected card 
 * @returns - It returns a function to render the right html
 */
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


/**
 * This functions extracts the first char of the first name and last name. After that it calls a template function where the variables are getting inserted.
 * 
 * @param {number} index - The index of the current selected card 
 * @returns - Returns the html to the template
 */
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


/**
 * 
 * @param {number} index - The index of the current selected card
 * @returns - It returns the html of the subtasks to the template
 */
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


/**
 * This function checks if a contact is assigned to the current selected card or not. You can assign or disassign them.
 * 
 * @param {number} contactIndex - The index of the contact 
 * @param {number} cardIndex - The index of the current selected card 
 * @param {string} contactID - The key of the contact to get access to it's value
 * @param {string} contactName - The name of the contact
 */
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


/**
 * 
 * @param {number} index - The index of the current selected card 
 * @returns - It returns an array of all the assigned contacts of a card
 */
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


/**
 * This function disassigns a contact from a list
 * 
 * @param {string} contactID - The key of the contact to get access to it's values 
 * @param {*} cardIndex - The index of the current selected card
 * @param {*} contactIndex - The index of the contact 
 */
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


/**
 * With this function you can assign contacts to a card
 * 
 * @param {number} contactIndex - The index of the contact 
 * @param {number} cardIndex - The index of the current selected card
 * @param {string} contactID - The key of the contact to get access to it's values
 * @param {string} contactName - The name of the contact
 */
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


/**
 * This function updates the ui with the first character of the first and last name, after a contact got assigned or disassigned.
 * 
 * @param {number} cardIndex - The index of the current selected card 
 */
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


/**
 * This function watches the input field where you can filter contacts in the edit dialog.
 * 
 * @param {number} cardIndex - The index of the current selected card. 
 */
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


/**
 * This function filters the contacts based of the given value from the input field.
 * 
 * @param {string} inputLetters - The value from the filter contact input field. 
 * @param {number} cardIndex - The index of the current selected card
 */
function filterContactsInEditDialog(inputLetters, cardIndex) {
    let filteredContacts = "";
    filteredContacts = contactsNamesOfUser.filter(contact => contact.value.name.toLowerCase().includes(inputLetters));
    console.log(filteredContacts);
    renderFilteredContactsIntoDialog(filteredContacts, cardIndex);
}


/**
 * This function renders the filtered contacts into the contact list of the edit dialog
 * 
 * @param {array} filteredContacts - The filtered array of the contact list 
 * @param {number} cardIndex - The index of the current selected card
 */
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


/**
 * Hovering over the html component will activate this function. It will show the customization button and the delete button.
 * 
 * @param {number} subtaskIndex - The index of the current subtask 
 */
function highlightChangeOptions(subtaskIndex) {
    document.getElementById(`edit_delete_container_${subtaskIndex}`).classList.remove('d_none');
    document.getElementById(`edit_delete_container_${subtaskIndex}`).classList.add('align-change-or-delete-btn');  
}


/**
 * When leaving the hover state of the component, the edit and delete button will be hidden again.
 * 
 * @param {number} subtaskIndex - The index of the current subtask
 */
function hideChangeOptions(subtaskIndex) {
    document.getElementById(`edit_delete_container_${subtaskIndex}`).classList.remove('align-change-or-delete-btn');
    document.getElementById(`edit_delete_container_${subtaskIndex}`).classList.add('d_none');  
}


/**
 * This function will delete the chosen subtask from the card.
 * 
 * @param {string} id - The key of the subtask to get access to it's values
 * @param {number} cardIndex - The index of the current selected card
 * @param {event} e 
 */
function deleteSubtaskFromEditDialog(id, cardIndex, e) {
    e.stopPropagation();
    const array = getCurrentArray();
    delete array[cardIndex].value.subtasks[id];
    const listOfSubtasksRef = document.getElementById('subtasks_list');
    listOfSubtasksRef.innerHTML = ``;
    listOfSubtasksRef.innerHTML = renderSubtasksintoEditDialog(cardIndex);
}


/**
 * This function let's you edit the current selected subtask
 * 
 * @param {string} id - The key of the subtask to get access to it's values 
 * @param {number} cardIndex - The index of the current selected card
 * @param {number} subtaskIndex - The index of the current selected subtask
 * @param {event} e 
 */
function editSubtaskInEditDialog(id, cardIndex, subtaskIndex, e) {
    e.stopPropagation();
    const array = getCurrentArray();
    document.getElementById(`number_of_subtask_${subtaskIndex}`).classList.add('d_none');
    document.getElementById(`edit_list_subtask_${subtaskIndex}`).classList.remove('d_none');
    document.getElementById(`edit_list_subtask_${subtaskIndex}`).classList.add('edit-list-subtask');
}


/**
 * This function will save the changes that the user makes to the subtasks
 * 
 * @param {number} cardIndex - The index of the current selected card 
 * @param {string} subtaskId - The key of the subtask to get access to it's values
 * @param {number} subtaskIndex - The index of the current selected subtask
 * @param {event} e 
 */
function saveChangesToSubtaskInEditDialog(cardIndex, subtaskId, subtaskIndex, e) {
    e.stopPropagation();
    const array = getCurrentArray();
    const inputRef = document.getElementById(`edit_list_subtask_input_${subtaskIndex}`);
    const inputRefValue = inputRef.value;
    array[cardIndex].value.subtasks[subtaskId].name = inputRefValue;
    document.getElementById('subtasks_list').innerHTML = renderSubtasksintoEditDialog(cardIndex);
}


/**
 * This function checks if the needed input fields are filled correctly
 * 
 * @param {number} cardIndex - The index of the current selected card 
 */
function checkValidationInEditDialog(cardIndex) {
    if (document.getElementById('input_title').value.length === 0) {
        highlightValidationError('title');
    }
    if (document.getElementById('input_duedate').value.length === 0) {
        highlightValidationError('duedate');
        return;
    }
    if (document.getElementById('input_duedate').value.length !== 10) {
        highlightValidationErrorLength('duedate');
        return;
    }
    if (checkIfDueDateInputAreNumbers()) {
        highlightValidationErrorWithString('duedate');
        return;
    }
    if (document.getElementById('input_title').value.length !== 0 && document.getElementById('input_duedate').value.length !== 0) {
        saveCardChangesToDatabase(cardIndex);
        closeDialog(event);
    }
}


/**
 * This function splits the value of the input field into dd mm and yyyy. After that it converts the input to numbers. If there is a string in between the numbers this function will catch the error and stops the form from sending this data.
 * 
 * @returns - either true or false
 */
function checkIfDueDateInputAreNumbers() {
    const inputRef = document.getElementById('input_duedate');
    const inputRefValue = inputRef.value;

    let [day, month, year] = inputRefValue.split('/');
    let dayToNumber = Number(day);
    let monthToNumber = Number(month);
    let yearToNumber = Number(year);

    if (isNaN(dayToNumber) || isNaN(monthToNumber) || isNaN(yearToNumber)) {
        return true;
    }
    else {
        return false;
    }
}


/**
 * This function will signalize the user that there is a validation error
 * 
 * @param {string} placeholder - holds the value of the input section (example: title or duedate)
 */
function highlightValidationError(placeholder) {
    document.getElementById(`error_${placeholder}`).classList.remove('d_none');
    document.getElementById(`container_input_${placeholder}`).classList.add('red-validation-border');
}


/**
 * This function will signalize the user that there is a validation error
 * 
 * @param {string} placeholder 
 */
function highlightValidationErrorWithString(placeholder) {
    document.getElementById(`container_input_${placeholder}`).classList.add('red-validation-border');
    document.getElementById(`error_string_${placeholder}`).classList.remove('d_none');
}


/**
 * This function will signalize the user that there is a validation error
 * 
 * @param {string} placeholder 
 */
function highlightValidationErrorLength(placeholder) {
    document.getElementById(`container_input_${placeholder}`).classList.add('red-validation-border');
    document.getElementById(`error_length_${placeholder}`).classList.remove('d_none');
}


/**
 * This function will check the lenght of the selected input field. If you are writing in it after a validation error, it will remove the error message.
 * 
 * @param {string} placeholder - holds the value of the input section (example: title or duedate)
 */
function checkTitleAndDateInputLength(placeholder) {
    const inputRef = document.getElementById(`input_${placeholder}`);
    const inputRefValue = inputRef.value;
    const errorText = document.getElementById(`error_${placeholder}`);
    const inputBorder = document.getElementById(`container_input_${placeholder}`);

    if(inputRefValue.length >= 1 && !errorText.classList.contains('d_none')) {
        errorText.classList.add('d_none');
        inputBorder.classList.remove('red-validation-border');
    }
}


/**
 * This function removes the highlighted validation error from the input field
 */
function removeValidationHighlightFromDueDate() {
    const inputRef = document.getElementById('input_duedate');
    const inputRefValue = inputRef.value;

    if(inputRefValue.length === 10) {
        document.getElementById('container_input_duedate').classList.remove('red-validation-border');
        document.getElementById('error_length_duedate').classList.add('d_none');
        document.getElementById('error_string_duedate').classList.add('d_none');
    }
}


/**
 * This function will update the database with the updated card.
 * 
 * @param {number} index - The index of the current selected card 
 */
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