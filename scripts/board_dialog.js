/**
 * This function checks if the needed input fields are filled correctly
 * 
 * @param {number} cardIndex - The index of the current selected card 
 */
async function checkValidationInEditDialog(cardIndex) {
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
        await saveCardChangesToDatabase(cardIndex);
        closeDialogAfterSafe();
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
    await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/kanban/${array[index].id}.json`, {
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