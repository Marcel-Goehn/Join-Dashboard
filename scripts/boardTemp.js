/**
 * Creates the html code for the task cards
 * 
 * @param {number} index - The index of the current card 
 * @returns - it returns the html code to the render function
 */
function getCardsTemplate(index, array) {
    return `<div draggable="true" ondragstart="startDragging(${index})" onclick="openDialog(${index})" onmousedown="addCardAnimation(${index})" onmouseleave="removeCardAnimation(${index})" class="card" id="card${index}">
                            <h2>
                                <span class="card-header">${array[index].value.category}</span>
                            </h2>
                            <h3>${array[index].value.title}</h3>
                            <p>${array[index].value.description}</p>
                            <div id="subtasks${index}" class="subtasks">
                            ${getSubtasksInformation(index)}
                            </div>
                            <div class="users">
                                <div class="user-icons">
                                    ${getAssignedUsers(index)}
                                </div>
                                <img src="../assets/img/board/${array[index].value.priority}.svg">
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


/**
 * 
 * @param {string} placeholder - The placeholder text of the placeholder card 
 * @returns - It returns the card 
 */
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
function getDialogTemplate(index, array) {
    return `<div class="align-dialog-header">
                <div class="category">${array[index].value.category}</div>
                <img onclick="closeDialog(event)" class="close-btn" src="../assets/img/addtask/x.svg">
            </div>
            <h1 class="dialog-h1">${array[index].value.title}</h1>
            <p class="dialog-p">${array[index].value.description}</p>
            <div class="due-date-section">
                <span class="due-date-txt">Due date:</span>
                <span class="due-date">${array[index].value.duedate}</span>
            </div>
            <div class="priority-section">
                <span class="priority-txt">Priority:</span>
                <div class="priority-icon-alignment">
                    <span class="icon-txt">${array[index].value.priority}</span>
                    <img src="../assets/img/board/${array[index].value.priority}.svg">
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
                <div onclick="openEditDialog(${index}, event)" class="delete-change-container">
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
    return `<div class="contact-board-dialog">
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
function getSubtasksDialogTemplate(status, name, cardIndex, key) {
    return `<div class="align-checkbox">
                <img onclick="checkOrUncheckSubtask('${status}', ${cardIndex}, '${key}')" src="../assets/img/board/Check_button_${status}.svg">
                <p>${name}</p>
            </div>`
}


/**
 * 
 * @param {number} index - The index of the current card
 * @returns - It returns the changeable content of the current card
 */
function getEditDialogTemplate(array, index) {
    return `<div class="align-edit-dialog-close-btn">
                <img onclick="closeDialog(event)" class="close-btn" src="../assets/img/addtask/x.svg">
            </div>
            <form class="form-space-top" onsubmit="return false">
                <label class="title-label" for="input_title">Title</label>
                 <div class="align-title-input" id="container_input_title">
                    <input onkeyup="checkTitleAndDateInputLength('title')" value="${array[index].value.title}" type="text" name="input_title" id="input_title" placeholder="Enter a title">
                </div>
                <p id="error_title" class="error-required d_none">This field is required</p>
                <div class="align-descr-input">
                    <label for="input_descr">Description</label>
                    <textarea name="input_descr" id="input_descr" rows="4" placeholder="Enter a description">${array[index].value.description}</textarea>
                </div>
                <label class="duedate-input" for="input_duedate">Duedate</label>
                <div class="align-duedate-input" id="container_input_duedate">
                    <input onkeyup="checkTitleAndDateInputLength('duedate'); removeValidationHighlightFromDueDate(); checkDuedateInputConditions(event)" value="${array[index].value.duedate}" type="text" name="input_duedate" id="input_duedate" placeholder="dd/mm/yyyy">
                    <img src="../assets/img/addtask/calendar.svg">
                </div>
                <p id="error_duedate" class="error-required d_none">This field is required</p>
                <p id="error_string_duedate" class="error-required d_none">Only numbers are allowed</p>
                <p id="error_length_duedate" class="error-required d_none">Missing at least 1 number</p>
                <div class="align-priority-btn-section">
                    <p>Priority</p>
                    <div class="btn-flexbox">
                        ${checkWichBtnToHighlight(index)}
                    </div>
                </div>
                <div class="align-assigned-to-section">
                    <label for="dialog_assigned_to">Assigned to</label>
                    <div class="diaolog-dropdown-menu">
                        <input onkeyup="checkFilterContactConditions(${index})" type="text" id="dialog_assigned_to" name="dialog_assigned_to" placeholder="Select contacts to assign">
                        <img onclick="openContactList(event)" id="arrow_down" class="dropdown-icon" src="../assets/img/addtask/arrow_drop_downaa.svg">
                        <img onclick="closeContactList()" id="arrow_up" class="dropdown-icon d_none" src="../assets/img/addtask/arrow_drop_down.svg">
                    </div>
                </div>
                <div id="shorthand_contact_list" class="align-shorthand-container">
                    ${renderAssignedContactsToEditDialog(index)}
                </div>
                <div id="contact_list" class="contact-list d_none">
                    <div id="contact-list-wrapper">
                        ${renderContactList(index)}
                    </div>
                </div>
                <div class="align-subtasks-section">
                    <label for="dialog_subtasks">Subtasks</label>
                    <div class="diaolog-dropdown-menu">
                        <input onkeyup="checkSubtaskInputField(event, ${index})" type="text" id="dialog_subtasks" name="dialog_subtasks" placeholder="Add new subtask">
                        <img id="plus_icon" class="subtask-icons" src="../assets/img/addtask/add.svg">
                        <div class="align-subtask-icons">
                            <img onclick="deleteSubtaskFromInput()" id="x_icon" class="d_none subtask-icons" src="../assets/img/addtask/x.svg">
                            <div id="icon_divider" class="subtask-icon-divider d_none"></div>
                            <img onclick="addInputToSubtasks(${index})" id="check_icon" class="d_none subtask-icons" src="../assets/img/addtask/done_black.svg">
                        </div>
                    </div>
                </div>
                <ul id="subtasks_list">
                    ${renderSubtasksintoEditDialog(index)}
                </ul>
                <div class="align-save-btn">
                    <button onclick="checkValidationInEditDialog(${index})">
                        Ok
                        <img src="../assets/img/addtask/done.svg">
                    </button>
                </div>
            </form>`
}


/**
 * 
 * @returns - It returns the html with the urgent button highlighted
 */
function renderUrgent() {
    return `<button id="urgent_button" class="flexbtn urgent_button_klicked" onclick="choosePriority('urgent', 'medium', 'low')">
                            Urgent
                            <img id="urgent_img" src="../assets/img/board/urgent.svg" class="d_none">
                            <img id="urgent_white_img" src="../assets/img/board/urgent_white.svg">
                        </button>
                        <button id="medium_button" class="flexbtn medium_button_unklicked" onclick="choosePriority('medium', 'urgent', 'low')">
                            Medium
                            <img id="medium_white_img" src="../assets/img/board/medium_white.svg" class="d_none">
                            <img id="medium_img" src="../assets/img/board/Prio media.svg">
                        </button>
                        <button id="low_button" class="flexbtn low_button_unklicked" onclick="choosePriority('low', 'urgent', 'medium')">
                            Low
                            <img id="low_img" src="../assets/img/board/low.svg">
                            <img id="low_white_img" src="../assets/img/board/low_white.svg" class="d_none">
                        </button>`
}


/**
 * 
 * @returns - It returns the html with the medium button highlighted
 */
function renderMedium() {
    return `<button id="urgent_button" class="flexbtn urgent_button_unklicked" onclick="choosePriority('urgent', 'medium', 'low')">
                            Urgent
                            <img id="urgent_img" src="../assets/img/board/urgent.svg">
                            <img id="urgent_white_img" src="../assets/img/board/urgent_white.svg" class="d_none">
                        </button>
                        <button id="medium_button" class="flexbtn medium_button_klicked" onclick="choosePriority('medium', 'urgent', 'low')">
                            Medium
                            <img id="medium_white_img" src="../assets/img/board/medium_white.svg">
                            <img id="medium_img" src="../assets/img/board/Prio media.svg" class="d_none">
                        </button>
                        <button id="low_button" class="flexbtn low_button_unklicked" onclick="choosePriority('low', 'urgent', 'medium')">
                            Low
                            <img id="low_img" src="../assets/img/board/low.svg">
                            <img id="low_white_img" src="../assets/img/board/low_white.svg" class="d_none">
                        </button>`
}


/**
 * 
 * @returns - It returns the html with the low button highlighted
 */
function renderLow() {
    return `<button id="urgent_button" class="flexbtn urgent_button_unklicked" onclick="choosePriority('urgent', 'medium', 'low')">
                            Urgent
                            <img id="urgent_img" src="../assets/img/board/urgent.svg">
                            <img id="urgent_white_img" src="../assets/img/board/urgent_white.svg" class="d_none">
                        </button>
                        <button id="medium_button" class="flexbtn medium_button_unklicked" onclick="choosePriority('medium', 'urgent', 'low')">
                            Medium
                            <img id="medium_white_img" src="../assets/img/board/medium_white.svg" class="d_none">
                            <img id="medium_img" src="../assets/img/board/Prio media.svg">
                        </button>
                        <button id="low_button" class="flexbtn low_button_klicked" onclick="choosePriority('low', 'urgent', 'medium')">
                            Low
                            <img id="low_img" src="../assets/img/board/low.svg" class="d_none">
                            <img id="low_white_img" src="../assets/img/board/low_white.svg">
                        </button>`
}


/**
 * 
 * @param {string} firstLetterFName - First char of the firstname
 * @param {string} firstLetterLName - First char of the lastname
 * @returns - It returns the html for the first characters of the first and lastname
 */
function getAssignedUsersEditTemplate(firstLetterFName, firstLetterLName) {
    return `<div onclick="openContactList(event)" class="short-name-dialog">${firstLetterFName}${firstLetterLName}</div>`
}


/**
 * 
 * @param {string} firstNameFirstChar - The first character of the first name
 * @param {string} lastNameFirstChar - The first character of the last name
 * @param {number} contactIndex - The index of the current contact who is getting rendered into the html template
 * @param {number} cardIndex - The index of the current selected card
 * @param {array} contactArr - This array holds the informations about the contacts
 * @returns - It returns the html for the contact list 
 */
function renderContactsIntoEditDialog(firstNameFirstChar, lastNameFirstChar, contactIndex, cardIndex, contactArr) {
    return `<div id="contact_container_${contactIndex}" class="align-contact-list" onclick="assignOrDisassignContact(${contactIndex}, ${cardIndex}, '${contactArr[contactIndex].id}', '${contactArr[contactIndex].value.name}')">
                            <div class="combine-name-and-shorthand">
                                <div class="short-name-dialog">${firstNameFirstChar}${lastNameFirstChar}</div>
                                <span id="full_name_${contactIndex}" class="full-name-dark">${contactArr[contactIndex].value.name}</span>
                            </div>
                            <img id="unchecked_image_${contactIndex}" src="../assets/img/board/Check_button_unchecked.svg">
                            <img id="checked_image_${contactIndex}" class="d_none" src="../assets/img/board/Check button_white.svg">
                        </div>`
}


/**
 * 
 * @param {string} firstNameFirstChar - The first character of the first name 
 * @param {string} lastNameFirstChar - The first character of the last name
 * @param {number} contactIndex - The index of the current contact who is getting rendered into the html template
 * @param {number} cardIndex - The index of the current selected card
 * @param {array} contactArr - This array holds the informations about the contacts
 * @returns - It returns the html for the assigned contacts in the contact list
 */
function renderAssignedContactsIntoEditDialog(firstNameFirstChar, lastNameFirstChar, contactIndex, cardIndex, contactArr) {
    return `<div id="contact_container_${contactIndex}" class="assigned-contact-background" onclick="assignOrDisassignContact(${contactIndex}, ${cardIndex}, '${contactArr[contactIndex].id}', '${contactArr[contactIndex].value.name}')">
                            <div class="combine-name-and-shorthand">
                                <div class="short-name-dialog">${firstNameFirstChar}${lastNameFirstChar}</div>
                                <span id="full_name_${contactIndex}" class="full-name-white">${contactArr[contactIndex].value.name}</span>
                            </div>
                            <img id="unchecked_image_${contactIndex}" class="d_none" src="../assets/img/board/Check_button_unchecked.svg">
                            <img id="checked_image_${contactIndex}" src="../assets/img/board/Check button_white.svg">
                        </div>`
}


/**
 * 
 * @param {string} id - The key of the current selected subtask 
 * @param {number} cardIndex - The index of the current selected card 
 * @param {string} name - The information that the subtask holds
 * @param {number} subtaskIndex - The index of the current subtask
 * @returns - It returns the html for the subtasks
 */
function getSubtasksEditDialogTemplate(id, cardIndex, name, subtaskIndex) {
    return `<li id="number_of_subtask_${subtaskIndex}" ondblclick="editSubtaskInEditDialog('${id}', ${cardIndex}, ${subtaskIndex}, event)" onmouseover="highlightChangeOptions(${subtaskIndex})" onmouseout="hideChangeOptions(${subtaskIndex})" class="subtasks-list-items">
                <div class="dot-name-gap">
                    <span>&bull;</span>${name}
                </div>
                <div id="edit_delete_container_${subtaskIndex}" class="d_none">
                    <img onclick="editSubtaskInEditDialog('${id}', ${cardIndex}, ${subtaskIndex}, event)" src="../assets/img/addtask/edit.svg">
                    <div class="change-delete-divider"></div>
                    <img onclick="deleteSubtaskFromEditDialog('${id}', ${cardIndex}, event)" src="../assets/img/addtask/delete.svg">
                </div>
            </li>
            <div id="edit_list_subtask_${subtaskIndex}" class="d_none">
                <input id="edit_list_subtask_input_${subtaskIndex}" type="text" value="${name}">
                <div class="align-change-or-delete-btn">
                    <img onclick="deleteSubtaskFromEditDialog('${id}', ${cardIndex}, event)" class="subtask-icons" src="../assets/img/addtask/delete.svg">
                    <div class="change-delete-divider"></div>
                    <img onclick="saveChangesToSubtaskInEditDialog(${cardIndex}, '${id}', ${subtaskIndex}, event)" class="subtask-icons" src="../assets/img/addtask/done_black.svg">
                </div>
            </div>`
}