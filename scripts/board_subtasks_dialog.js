/**
 * It changes the UI of the input field where you can add a new one to the card. 
 */
function checkSubtaskInputField(e, cardIndex) {
    const dialogSubtasks = document.getElementById('dialog_subtasks');
    if (dialogSubtasks.value.length >= 1) {
        showIcons();
    }
    else {
        hideIcons();
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
 * Shows the icons if the value of the input field is equal or longer than 1 
 */
function showIcons() {
    document.getElementById('plus_icon').classList.add('d_none');
    document.getElementById('x_icon').classList.remove('d_none');
    document.getElementById('check_icon').classList.remove('d_none');
    document.getElementById('icon_divider').classList.remove('d_none');
}


/**
 * Hides the icons if the value of the input field is equal to zero
 */
function hideIcons() {
    document.getElementById('x_icon').classList.add('d_none');
    document.getElementById('check_icon').classList.add('d_none');
    document.getElementById('icon_divider').classList.add('d_none');
    document.getElementById('plus_icon').classList.remove('d_none');
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