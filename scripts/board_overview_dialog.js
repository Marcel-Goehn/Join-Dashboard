const dialog = document.getElementById('overlay');
const wrapper = document.querySelector('.wrapper');
let isFetchingOpen = false;

/**
 * This function opens the dialog of the card
 */
async function openDialog(i) {
    if (wasDragging) {
        wasDragging = false;
        return;
    }
    if(isFetchingOpen) return;
     isFetchingOpen = true;
    try{
    await init();
    const array = getCurrentArray();
    wrapper.innerHTML = getDialogTemplate(i, array);
    dialog.showModal();
    }
    finally{
        isFetchingOpen = false;
    }
}


/**
 * This function closes the dialog of the card
 */
function closeDialog(e) {
    if(document.getElementById("container_input_title")){
        closeEditTaskDialog(e)
    }else{
        e.stopPropagation();
        currentPriority = "";
        dialog.close();
        const array = getCurrentArray();
        renderCards(array);
    }
    checkScreenWidth();
}


/**
 * This function closes the dialog and awaits the init funtcion
 */
async function closeDialogAfterSafe(){
        currentPriority = "";
        dialog.close();
        await init();
    }


/**
 * This function closes the edit dialog 
 * @param {event} e 
 */
function closeEditTaskDialog(e){
    e.stopPropagation();
    currentPriority = "";
    dialog.close();
    const array = getCurrentArray();
    if(array === foundTasks){
        foundTasks = structuredClone(originalFoundTasks);
        renderCards(foundTasks);
        originalFoundTasks = [];
    }else{
        cards = structuredClone(originalCards);
        renderCards(cards);
        originalCards = [];
    }
}


/**
 * This function closes the dialog if the user clicks next to the dialog
 * 
 * @param {*} e - resembles the event 
 */
dialog.onclick = function (e) {
    const contactWrapper = document.getElementById('contact-list-wrapper');
    if (!wrapper.contains(e.target)) {
        if(document.getElementById("container_input_title")){
            closeEditTaskDialog(e);
            return;
        }else{
            closeDialog(e);
            return;
        }
       
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
    saveOriginalArrayState();
    e.stopPropagation();
    const array = getCurrentArray();
    wrapper.innerHTML = getEditDialogTemplate(array ,index);
    currentPriority = array[index].value.priority;
    dialog.showModal();
}


/**
 * This function saves the original state of the current array
 */
function saveOriginalArrayState(){
    const array = getCurrentArray();
    if(array === foundTasks){
        originalFoundTasks = structuredClone(foundTasks);
    }else{
        originalCards = structuredClone(cards);
    }
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
        assignedContactsRef += getAssignedUsersDialogTemplate(firstName, lastName, firstLetterFName, firstLetterLName, value.color);
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
    }
    else {
        array[cardIndex].value.subtasks[subtaskKey].status = "checked";
    }
    await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/kanban/${array[cardIndex].id}/subtasks.json`, {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(array[cardIndex].value.subtasks)
    });
    openDialog(cardIndex);
}


/**
 * This function calls the deleteFromDatabase function. After that it re-renders the page.
 * 
 * @param {number} i - The index of the current card 
 */
async function deleteCard(i, e) {
    const array = getCurrentArray();
    await deleteFromDatabase(i);
    array.splice(i, 1);
    closeDialog(e);
    await init();
}


/**
 * This function deletes the chosen card.
 * 
 * @param {i} i - The index of the current card 
 */
async function deleteFromDatabase(i) {
    const array = getCurrentArray();
    let cardToDelete = array[i].id;
    await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/kanban/${cardToDelete}.json`, {
        method: "DELETE"
    });
}


