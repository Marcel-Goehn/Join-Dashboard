/**
 * 
 * @param {number} timeOfDay - Displays the current hour of the day 
 * @param {string} nameOfUser 
 * @returns 
 */
function greetingTemp(timeOfDay, nameOfUser) {
    return `<span class="greet-msg">${timeOfDay},</span>
            <span class="greet-name">${nameOfUser}</span>`
}


function greetingGuestTemp(timeOfDay) {
    return `<span class="greet-msg">${timeOfDay}</span>`
}