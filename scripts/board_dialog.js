const dialog = document.getElementById('overlay');
const wrapper = document.querySelector('.wrapper');
const contactList = document.getElementById('contact_list');
const dialogSubtasks = document.getElementById('dialog_subtasks');
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
function closeDialog(e) {
    e.stopPropagation();
    currentPriority = "";
    dialog.close();
    cards = [];
    user = [];
    contactsNamesOfUser = [];
    foundTasks = [];
    document.getElementById("find_task").value = "";
    init();
}


/**
 * This function closes the dialog if the user clicks next to the dialog
 * 
 * @param {*} e - resembles the event 
 */
dialog.onclick = function (e) {
    const contactWrapper = document.getElementById('contact-list-wrapper');
    if (!wrapper.contains(e.target)) {
        dialog.close();
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
    wrapper.innerHTML = getEditDialogTemplate(index);
    currentPriority = cards[index].value.priority;
    dialog.showModal();
}


/**
 * 
 * @param {number} index - The index of the current card 
 * @returns - It returns the assigned users to the card dialog
 */
function assignedDialogUsers(index) {
    let assignedContactsRef = ``;
    for (let [key, value] of Object.entries(cards[index].value.assigned)) {
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
 * 
 * @param {number} index - The index of the current card 
 * @returns - It returns the subtasks to the card dialog
 */
function renderSubtasksIntoDialog(index) {
    let subtasksRef = ``;
    for (let [key, value] of Object.entries(cards[index].value.subtasks)) {
        if (key == "null") {
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
        method: "DELETE"
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
        //renderContactList(data.contacts);
        pushContactList(data.contacts);
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}


function pushContactList(contacts) {
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
            contactsRef += renderAssignedContactsIntoEditDialog(firstNameFirstChar, lastNameFirstChar, i, cardIndex);
        }
        else {
            contactsRef += renderContactsIntoEditDialog(firstNameFirstChar, lastNameFirstChar, i, cardIndex);
        }
    }
    return contactsRef;
}


function getAssignmentList(cardIndex) {
    let assignedTo = [];
    for (let [key, value] of Object.entries(cards[cardIndex].value.assigned)) {
        if (key === "null") {
            continue;
        }
        assignedTo.push({id : key, value});
    } 
    return assignedTo;
}


function checkSubtaskInputField() {
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
    dialogSubtasks.value = '';
    document.getElementById('x_icon').classList.add('d_none');
    document.getElementById('check_icon').classList.add('d_none');
    document.getElementById('icon_divider').classList.add('d_none');
    document.getElementById('plus_icon').classList.remove('d_none');
}


function checkWichBtnToHighlight(index) {
    if (cards[index].value.priority === 'urgent') {
        return renderUrgent();
    }
    else if (cards[index].value.priority === 'medium') {
        return renderMedium();
    }
    else {
        return renderLow();
    }
}


function renderAssignedContactsToEditDialog(index) {
    let assignedContactsRef = ``;
    for (let [key, value] of Object.entries(cards[index].value.assigned)) {
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


function renderSubtasksintoEditDialog(index) {
    let subtasksRef = ``;
    for(let [key, value] of Object.entries(cards[index].value.subtasks)) {
        if (key == "null") {
            continue;
        }
        subtasksRef += getSubtasksEditDialogTemplate(value.name);
    }
    return subtasksRef;
}


function assignOrDisassignContact(contactIndex, cardIndex) {
    let iteratedAssignments = getAssignmentList(cardIndex);
    let searchForAssignment = iteratedAssignments.find(element => element.id == contactsNamesOfUser[contactIndex].id);
    if(searchForAssignment != undefined) {
        disAssignUserFromCard(searchForAssignment.id, cardIndex, contactIndex);
    }
    else {
        assignUserToCard(contactIndex, cardIndex);
    }
}


function getAssignmentList(index) {
    let assignedTo = [];
    for(let [key, value] of Object.entries(cards[index].value.assigned)) {
        if (key == "null") {
            continue;
        }
        assignedTo.push({id : key, value});
    }
    return assignedTo;
}


function disAssignUserFromCard(contactId, cardIndex, contactIndex) {
    delete cards[cardIndex].value.assigned[contactId];
    document.getElementById(`contact_container_${contactIndex}`).classList.remove('assigned-contact-background');
    document.getElementById(`contact_container_${contactIndex}`).classList.add('align-contact-list');
    document.getElementById(`full_name_${contactIndex}`).classList.remove('full-name-white');
    document.getElementById(`full_name_${contactIndex}`).classList.add('full-name-dark');
    document.getElementById(`checked_image_${contactIndex}`).classList.add('d_none');
    document.getElementById(`unchecked_image_${contactIndex}`).classList.remove('d_none');
    // console.log(cards);
}


async function saveCardChangesToDatabase(index) {
    /*await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/test/${cards[index].id}.json`, {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            title : document.getElementById(`input_title_${index}`).value,
            description : document.getElementById(`input_descr_${index}`).value,
            priority : currentPriority,

        })
    })*/
}