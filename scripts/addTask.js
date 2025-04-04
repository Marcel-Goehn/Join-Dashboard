const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/";
let logged_user = {};
let priority = "medium";
let assigned = {};
let subtasks = {};

function select(num) {
    resetButtons();
    switch (num) {
        case 0:
            priority = "urgent";
            document.getElementById(num).classList.add('urgent');
            document.getElementById(num).classList.add('btn_bigFont');
            document.getElementById('urgent_1').setAttribute("fill", "white");
            document.getElementById('urgent_2').setAttribute("fill", "white");
            break;
        case 1:
            priority = "medium";
            document.getElementById(num).classList.add('medium');
            document.getElementById(num).classList.add('btn_bigFont');
            document.getElementById('medium_1').setAttribute("fill", "white");
            document.getElementById('medium_2').setAttribute("fill", "white");
            break;
        case 2:
            priority = "low";         
            document.getElementById(num).classList.add('low');
            document.getElementById(num).classList.add('btn_bigFont');
            document.getElementById('low_1').setAttribute("fill", "white");
            document.getElementById('low_2').setAttribute("fill", "white");
            break;
    }
}

function resetButtons() {
    document.getElementById(0).classList.remove('urgent');
    document.getElementById(0).classList.remove('btn_bigFont');
    document.getElementById(1).classList.remove('medium');
    document.getElementById(1).classList.remove('btn_bigFont');
    document.getElementById(2).classList.remove('low');
    document.getElementById(2).classList.remove('btn_bigFont');
    document.getElementById('urgent_1').setAttribute("fill", "#fe3e00");
    document.getElementById('urgent_2').setAttribute("fill", "#fe3e00");
    document.getElementById('medium_1').setAttribute("fill", "#fda807");
    document.getElementById('medium_2').setAttribute("fill", "#fda807");
    document.getElementById('low_1').setAttribute("fill", "#7ae229");
    document.getElementById('low_2').setAttribute("fill", "#7ae229");
}

async function fetchUser() {
    let result = sessionStorage.getItem("loggedIn");
    let userID = await JSON.parse(result);
    const response = await fetch(databaseLinkRef + "users/" + userID + ".json");
    logged_user = await response.json();
    tempContacts();
}

function toggleContacts() {
    document.getElementById('contactsList').classList.toggle('hidden');
    document.getElementById('closed_contacts').classList.toggle('hidden');
    closedContacts();
    rotateIcon("assigned_icon");
}

function rotateIcon(id) {
    document.getElementById(id).classList.toggle('rotate'); 
}

function closedContacts() {
    document.getElementById('closed_contacts').innerHTML = "";
    for (const name of Object.values(assigned)) {
        document.getElementById('closed_contacts').innerHTML += `<div class="circle centered">${indices(name)}</div>`;
    }
}

function indices(name) {
    let step_1 = name.split(" ");
    let step_2 = step_1.map(partName => partName[0].toUpperCase());
    return step_2.join("");
}

function highlightContact(contact, id) {
    document.getElementById(id).classList.toggle('highlight');
    document.getElementById(`${id}-unchecked`).classList.toggle('hidden');
    document.getElementById(`${id}-checked`).classList.toggle('hidden');
    editAssignedObject(contact, id);
}

function editAssignedObject(contact, id) {
    if (document.getElementById(`${id}-checked`).classList != 'hidden') {
        assigned[`${id}`] ? null : assigned[`${id}`] = contact;
    } else {
        delete assigned[`${id}`];
    }
}

function search() {
    document.getElementById('contactsList').classList.remove('hidden');
    document.getElementById('closed_contacts').classList.add('hidden');
    let search = document.getElementById('searchbar').value.toLowerCase();
    let result = Object.values(logged_user.contacts).filter(details => details.name.toLowerCase().includes(search));
    tempContacts(Object.entries(result));
}

function toggleHidden(id) {
    document.getElementById(id).classList.toggle('hidden');
}

function setCategory(num) {
    switch (num) {
        case 1:
            document.getElementById('btn_text').innerHTML = "Technical Task";
            document.getElementById('category').classList.add('hidden');
            break;
        case 2:
            document.getElementById('btn_text').innerHTML = "User Story";
            document.getElementById('category').classList.add('hidden');
            break;
    }
}

function clearInput() {
    document.getElementById('subtask_input').value = "";
    iconsDuringInput();
}

function addSubtask() {
    let subtask = document.getElementById('subtask_input').value;
    document.getElementById('subtask_input').value = "";
    iconsDuringInput();
    let id = Math.random().toString().replace(".","");
    subtask_template(id, subtask);
    subtasks[`${id}`] = subtask;
}

function confirmSubtask(id) {
    document.getElementById(`edit_div${id}`).classList.toggle('hidden');
    document.getElementById(`edit_div${id}`).style = "background-color: white";
    document.getElementById(id).classList.toggle('hidden');
    document.getElementById(`subtask_row${id}`).innerHTML = document.getElementById(`edit_input${id}`).value;
    subtasks[`${id}`] = document.getElementById(`edit_input${id}`).value;
}

function deleteSubtask(id) {
    document.getElementById(id).remove();
    document.getElementById(`edit_div${id}`).remove();
    delete subtasks[`${id}`];
}

function editSubtask(id) {
    let current_subtask = document.getElementById(`subtask_row${id}`).innerHTML;
    document.getElementById(`edit_div${id}`).classList.toggle('hidden');
    document.getElementById(`edit_div${id}`).style = "background-color: white";
    document.getElementById(id).classList.toggle('hidden');
    document.getElementById(`edit_input${id}`).value = current_subtask;
}

function validate() {
    let title = document.getElementById('title_input').value;
    let duedate = document.getElementById('duedate_input').value;
    let category = document.getElementById('btn_text').innerHTML;
    
    if (title !== "" && duedate !== "" && category !== "Select task category") {
        uploadTask(assembleTask(duedate, category, title));
    } else {
        console.log("something is missing");
    }
}

function assembleTask(date, cat, header) {
    return {
        "assigned" : assigned,
        "category" : cat,
        "description" : document.getElementById('description').value,
        "duedate" : date,
        "currentStatus" : "To Do",
        "priority" : priority,
        "subtasks" : subtasks,
        "title" : header
    }
}

async function uploadTask(object) {
    console.log(object);
    fetch(databaseLinkRef + "test.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object)
    });
}

let TestObject = {
    "Feldversuch" : 5,
    "assigned" : null,
    "category" : "User Story",
    "description" : "this is a testObject",
    "duedate" : "24-12-2025",
    "currentStatus" : "To Do",
    "priority" : "low",
    "subtasks" : null,
    "title" : "This is a title"
}

function test() {
    let ran_num = Math.random().toString().replace(".","");
    console.log(ran_num);
    // TestObject[`${ran_num}`] = "Test";
    // uploadTask(TestObject);
}