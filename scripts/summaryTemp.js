/**
 * 
 * @param {number} timeOfDay - Displays the current hour of the day 
 * @param {string} nameOfUser 
 * @returns - Writes the html markup for the user and the time of the day
 */
function greetingTemp(timeOfDay, nameOfUser) {
    return `<span class="greet-msg">${timeOfDay},</span>
            <span class="greet-name">${nameOfUser}</span>`
}


/**
 * 
 * @param {number} timeOfDay - Displays the current hour of the day 
 * @returns - Writes html markup for the guest and the time of the day
 */
function greetingGuestTemp(timeOfDay) {
    return `<span class="greet-msg">${timeOfDay}</span>`
}


/**
 * 
 * @returns - It returns the html for the task in the board
 */
function getTaskInBoardTemplate() {
    return `Task in Board`;
}


/**
 * 
 * @returns - It returns the html for the tasks in the board
 */
function getTasksInBoardTemplate() {
    return `Tasks in Board`;
}