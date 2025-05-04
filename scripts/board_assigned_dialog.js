const contactList = document.getElementById('contact_list');
let contactsNamesOfUser = [];


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