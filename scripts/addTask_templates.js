function subtask_template(id, subtask) {
    return `<li class="addedSubtask" onclick="editSubtask(${id})" id="${id}">
                <span id="subtask_row${id}" class="listitem">${subtask}</span>
                <div class="addSubtask_btn_div hidden">
                    <img class="icon" src="../assets/img/addtask/edit.svg">
                    |
                    <img class="icon" onclick="deleteSubtask(event, ${id})" src="../assets/img/addtask/delete.svg">
                </div>
            </li>
            <div id="edit_div${id}" class="hidden edittedSubtask">
                <input id="edit_input${id}" type="text">
                    <div class="addSubtask_btn_div">
                        <img class="icon" onclick="deleteSubtask(event, ${id})" src="../assets/img/addtask/delete.svg">
                        |
                        <img class="icon" onclick="confirmSubtask(${id})" src="../assets/img/addtask/done_black.svg">
                    </div>
            </div>`;
}

function renderSelectedContactsAsCircle(name, id) {
    return `<div onclick="toggleCheckmark('${name}', '${id}')" class="circle">${getInitials(name)}</div>`
}

function subtaskIsNotBlank() {
    return `<img class="icon" onclick="clearInput()" src="../assets/img/addtask/x.svg"></img>
    |
    <img class="icon" onclick="addSubtask()" src="../assets/img/addtask/done_black.svg"></img>`
}

function subtaskIsBlank() {
    return `<img class="icon" src="../assets/img/addtask/add.svg"></img>`
}

function renderContacts(id, contactObject) {
    return `<div class="contact" id="${id}" onclick="toggleCheckmark('${contactObject.name}', '${id}'), Bubbling(event)">
                <div class="initial_name">
                    <div class="circle">${getInitials(contactObject.name)}</div>
                    <span>${contactObject.name}</span>
                </div>
                <img id="${id}-unchecked" src="../assets/img/Check_button_unchecked.svg">
                <svg id="${id}-checked" class="hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2a3547">
                    <path d="M20 11V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H15" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <path d="M8 12L12 16L20 4.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>`
}