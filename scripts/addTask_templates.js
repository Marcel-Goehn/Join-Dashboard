function subtask_template(id, subtask) {
    document.getElementById('addedSubtasks').innerHTML += `
        <li class="space-between addedSubtask" id="${id}">
            <span id="subtask_row${id}" class="listitem">${subtask}</span>
            <div class="addSubtask_btndiv">
                <img class="hover" onclick="editSubtask(${id})" src="../assets/img/addtask/edit.svg">
                |
                <img class="hover" onclick="deleteSubtask(${id})" src="../assets/img/addtask/delete.svg">
            </div>
        </li>
        <div id="edit_div${id}" class="space-between hidden edittedSubtask">
        <input id="edit_input${id}" type="text">
            <div class="addSubtask_btndiv">
                <img class="hover" onclick="deleteSubtask(${id})" src="../assets/img/addtask/delete.svg">
                |
                <img class="hover" onclick="confirmSubtask(${id})" src="../assets/img/addtask/done_black.svg">
            </div>
        </div>`;
}

function iconsDuringInput() {
    if (document.getElementById('subtask_input').value !== "") {
        document.getElementById('subtask_input_icons').innerHTML = `
        <img class="hover" onclick="clearInput()" src="../assets/img/addtask/x.svg"></img>
        |
        <img class="hover" onclick="addSubtask()" src="../assets/img/addtask/done_black.svg"></img>`
    } else {
        document.getElementById('subtask_input_icons').innerHTML = `
        <img class="hover" src="../assets/img/addtask/add.svg"></img>`
    }
}

function tempContacts(object = Object.entries(logged_user.contacts)) {
    document.getElementById('contactsList').innerHTML = "";
    for (const [id, contact] of object) {
        document.getElementById('contactsList').innerHTML +=
        `<div class="space-between contact" id="${id}" onclick="highlightContact('${contact.name}', '${id}')">
            <div class="indice_name">
                <div class="circle centered">${indices(contact.name)}</div>
                <span>${contact.name}</span>
            </div>
            <img id="${id}-unchecked" src="../assets/img/Check button_unchecked.svg" alt="">
            <svg id="${id}-checked" class="hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2a3547">
                <path d="M20 11V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H15" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path d="M8 12L12 16L20 4.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>`
    }
}