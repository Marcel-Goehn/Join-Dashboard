/**
 * Creates the html code for the task cards
 * 
 * @param {number} index - The index of the current card 
 * @returns - it returns the html code to the render function
 */
function getCardsTemplate(index) {
    return `<div draggable="true" ondragstart="startDragging(${index})" onclick="openDialog(${index})" class="card">
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


function getEmptySectionTemplate(placeholder) {
    return `<div class="empty-cards">
                <div>
                    <span>No tasks ${placeholder}</span>
                </div>
            </div>` 
}


/**
 * 
 * @returns - It returns the html code for the dialog of the task card
 */
function getDialogTemplate(index) {
    return `<div class="align-dialog-header">
                <div class="category">${cards[index].value.category}</div>
                <button onclick="closeDialog()" class="close-btn">X</button>
            </div>
            <h1 class="dialog-h1">${cards[index].value.title}</h1>
            <p class="dialog-p">${cards[index].value.description}</p>
            <div class="due-date-section">
                <span class="due-date-txt">Due date:</span>
                <span class="due-date">${cards[index].value.duedate}</span>
            </div>
            <div class="priority-section">
                <span class="priority-txt">Priority:</span>
                <div class="priority-icon-alignment">
                    <span class="icon-txt">${cards[index].value.priority}</span>
                    <img src="../assets/img/${cards[index].value.priority}.svg">
                </div>
            </div>
            <p class="assignment-txt">Assigned To:</p>
            <div class="task-member">
                ${assignedDialogUsers(index)}
            </div>
            <p class="assignment-txt">Subtasks</p>
            <div class="subtask-checkbox">
                ${renderSubtasksIntoDialog(index)}
            </div>
            <div class="delete-change-section">
                <div onclick="deleteCard(${index})" class="delete-change-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                        <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
                        </svg>
                    <span>Delete</span>
                </div>
                <div class="divider"></div>
                <div class="delete-change-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
                        </svg>
                    <span>Edit</span>
                </div>
            </div>`
}


/**
 * 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} firstLetterFName 
 * @param {string} firstLetterLName 
 * @returns - Adds the names and first letters of first- and lastname into the html snippet
 */
function getAssignedUsersDialogTemplate(firstName, lastName, firstLetterFName, firstLetterLName) {
    return `<div class="contact">
                <div class="contact-logo">${firstLetterFName}${firstLetterLName}</div>
                <span>${firstName} ${lastName}</span>
            </div>`
}


/**
 * 
 * @param {string} status 
 * @param {string} name 
 * @returns - Adds the status name to the svg so that the right one gets rendered and inserts the subtask into the html 
 */
function getSubtasksDialogTemplate(status, name) {
    return `<div class="align-checkbox">
                <img src="../assets/img/Check_button_${status}.svg">
                <p>${name}</p>
            </div>`
}


function getEditDialogTemplate(index) {
    return ``
}