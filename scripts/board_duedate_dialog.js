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