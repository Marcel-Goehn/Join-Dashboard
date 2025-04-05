/**
 * Creates the html code for the task cards
 * 
 * @param {number} index - The index of the current card 
 * @returns - it returns the html code to the render function
 */
function getCardsTemplate(index) {
    return `<div onclick="openDialog(${index})" class="card">
                            <h2>
                                <span class="card-header">${cards[index].value.category}</span>
                            </h2>
                            <h3>${cards[index].value.title}</h3>
                            <p>${cards[index].value.description}</p>
                            <div id="subtasks${index}" class="subtasks">
                            ${getSubtasksInformation(index)}
                            </div>
                            <div class="users">
                                <div class="user-icons">
                                    ${getAssignedUsers(index)}
                                </div>
                                <img src="../assets/img/${cards[index].value.priority}.svg">
                            </div>
                        </div>`; // Dann muss noch aus dem Dialog kontrolliert werden ob schon subtasks abgehakt wurden oder nicht.
}


/**
 * 
 * @param {string} first - Inserts the first letter of the first name 
 * @param {string} last - Inserts the first letter of the last name
 * @returns - returns the html code to the getCardsTemplate function
 */
function getAssignedUsersTemplate(first, last) {
    return `<div class="user-1 user">${first}${last}</div>`
}


/**
 * Creates the progressbar
 * 
 * @param {number} progress - percent value for the width of the progressbar
 * @param {number} checkedTasks - number of cheked tasks
 * @param {number} subtasklength - length of all subtasks
 * @returns - it returns the html code to the getCardsTemplate function
 */
function getSubtasksTemplate(progress, checkedTasks, subtasklength) {
    return `<div class="progress-bar">
                <div class="progress" style="width: ${progress}%;"></div>
            </div>
            <span class="subtask-txt">${checkedTasks}/${subtasklength} Subtasks</span>`
}