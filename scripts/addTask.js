const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/";
let logged_user = {};
let currentStatus = "To Do";
let priority = "medium";
let assignedContacts = {};
let subtasks = {};
let subtask_id = 0;
let selectedContacts = document.getElementById('selected_contacts_div');
let Contacts = document.getElementById('contactsList');
let urgent_button = document.getElementById('urgent_btn');
let medium_button = document.getElementById('medium_btn');
let low_button = document.getElementById('low_btn');
let categorySelection = document.getElementById('category');
let subtaskInput = document.getElementById('subtask_input');
let title = document.getElementById('title_input');
let duedate = document.getElementById('duedate_input');
let selectedCategory = document.getElementById('btn_text');


async function init_addTask() {
    await fetchUser();
    logged_user.contacts ? getContacts() : null;
}

async function fetchUser() {
    let result = sessionStorage.getItem("loggedIn");
    let userID = await JSON.parse(result);
    const response = await fetch(databaseLinkRef + "users/" + userID + ".json");
    logged_user = await response.json();
}

function select(priority) {
    resetButtonsToDefault();
    switch (priority) {
        case 'urgent':
            priority = "urgent";
            urgent_button.classList.add('urgent', 'btn_bigFont');
            ['urgent_1', 'urgent_2'].forEach(id => document.getElementById(id).setAttribute("fill", "white"));
            break;
        case 'medium':
            priority = "medium";
            medium_button.classList.add('medium', 'btn_bigFont');
            ['medium_1', 'medium_2'].forEach(id => document.getElementById(id).setAttribute("fill", "white"));
            break;
        case 'low':
            priority = "low";
            low_button.classList.add('low', 'btn_bigFont');
            ['low_1', 'low_2'].forEach(id => document.getElementById(id).setAttribute("fill", "white"));
            break;
    }
}

function resetButtonsToDefault() {
    urgent_button.classList.remove('urgent','btn_bigFont');
    medium_button.classList.remove('medium','btn_bigFont');
    low_button.classList.remove('low', 'btn_bigFont');
    ['urgent_1', 'urgent_2'].forEach(id => document.getElementById(id).setAttribute("fill", "#fe3e00"));
    ['medium_1', 'medium_2'].forEach(id => document.getElementById(id).setAttribute("fill", "#fda807"));
    ['low_1', 'low_2'].forEach(id => document.getElementById(id).setAttribute("fill", "#7ae229"));
}

function toggleContacts() {
    Contacts.classList.toggle('hidden');
    selectedContacts.classList.toggle('hidden');
    rotateArrowIcon("assigned_icon");
}

function closeOpenSections(){
    Contacts.classList.add('hidden');
    selectedContacts.classList.remove('hidden');
    document.getElementById("assigned_icon").classList.remove('rotate');
    categorySelection.classList.add('hidden');
    document.getElementById("category_icon").classList.remove('rotate');
}

function Bubbling(event){
    event.stopPropagation();
}

function rotateArrowIcon(formularID) {
    document.getElementById(formularID).classList.toggle('rotate');
}

function getSelectedContacts() {
    selectedContacts.innerHTML = "";
    for (const [id, name] of Object.entries(assignedContacts)) {
        selectedContacts.innerHTML += renderSelectedContactsAsCircle(name, id);
    }
}

function getInitials(name) {
    let step_1 = name.split(" ");
    let step_2 = step_1.map(partName => partName[0].toUpperCase());
    return step_2.join("");
}

function toggleCheckmark(name, id) {
    document.getElementById(id).classList.toggle('highlight');
    document.getElementById(`${id}-unchecked`).classList.toggle('hidden');
    document.getElementById(`${id}-checked`).classList.toggle('hidden');
    editAssignedObject(name, id);
    getSelectedContacts();
}

function editAssignedObject(name, id) {
    if (document.getElementById(`${id}-checked`).classList != 'hidden') {
        assignedContacts[`${id}`] ? null : assignedContacts[`${id}`] = name;
    } else {
        delete assignedContacts[`${id}`];
    }
}

function search() {
    Contacts.classList.remove('hidden');
    selectedContacts.classList.add('hidden');
    let userInput = document.getElementById('searchbar').value.toLowerCase();
    let searchresult = Object.values(logged_user.contacts).filter(details => details.name.toLowerCase().includes(userInput));
    getContacts(Object.entries(searchresult));
}

function toggleHidden(id) {
    document.getElementById(id).classList.toggle('hidden');
}

function setCategory(category) {
    switch (category) {
        case "Technical Task":
            selectedCategory.innerHTML = "Technical Task";
            categorySelection.classList.add('hidden');
            break;
        case "User Story":
            selectedCategory.innerHTML = "User Story";
            categorySelection.classList.add('hidden');
            break;
    }
    checkUploadConditions();
}

function clearInput() {
    subtaskInput.value = "";
    ChangeSubtaskIcons();
}

function addSubtask() {
    let UserInput = subtaskInput.value;
    if (UserInput != "") {   
        document.getElementById('addedSubtasks').innerHTML += subtask_template(subtask_id, UserInput);
        subtasks[subtask_id] = UserInput;
        subtask_id += 1;
        subtaskInput.value = "";
    }
    ChangeSubtaskIcons();
}
function formcorrectDuedate() {
    eraseInvalidInput();
    if (duedate.value.length > 2 && !duedate.value.includes('/')) {
        duedate.value = duedate.value.slice(0, 2) + '/' + duedate.value.slice(2);
    }
    if (duedate.value.length > 5 && !duedate.value.slice(3).includes('/')) {
        duedate.value = duedate.value.slice(0, 5) + '/' + duedate.value.slice(5);
    }
}
function eraseInvalidInput() {
    let lastChar = duedate.value.slice(-1);
    if (isNaN(lastChar) == true) {
        duedate.value = duedate.value.slice(0, -1);
    }
}

function confirmSubtask(id) {
    document.getElementById(`edit_div${id}`).classList.toggle('hidden');
    document.getElementById(`edit_div${id}`).style = "background-color: white";
    document.getElementById(id).classList.toggle('hidden');
    document.getElementById(`subtask_row${id}`).innerHTML = document.getElementById(`edit_input${id}`).value;
    subtasks[`${id}`] = document.getElementById(`edit_input${id}`).value;
}

function deleteSubtask(event, id) {
    event.stopPropagation();
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

function checkUploadConditions() {
    if (title.value !== "" && duedate.value.length == 10 && selectedCategory.innerHTML !== "Select task category") {
        document.getElementById('confirm_btn').disabled = false;
        document.getElementById('confirm_btn_text').style.cursor = "pointer";
    } else {
        document.getElementById('confirm_btn').disabled = true;
        document.getElementById('confirm_btn_text').style.cursor = "not-allowed";
        
    }
}

function animationTaskAdded() {
    let confirmation = document.getElementById('confirmation');
    confirmation.classList.remove('hidden');
    confirmation.classList.add('animate');
    setTimeout(() => {
        window.location.href = "board.html";
    }, 2000);
}

function assembleTask() {
    return {
        "assigned" : assignedContacts,
        "category" : selectedCategory.innerHTML,
        "description" : document.getElementById('description').value,
        "duedate" : duedate.value,
        "currentStatus" : currentStatus,
        "priority" : priority,
        "subtasks" : subtasks,
        "title" : title.value
    }
}

async function uploadTask(object) {
    await fetch(databaseLinkRef + "addTasks(testarea).json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object)
    });
}

function ChangeSubtaskIcons() {
    let subtaskIcons = document.getElementById('subtask_input_icons');
    if (subtaskInput.value !== "") {
        subtaskIcons.innerHTML = subtaskIsNotBlank();
    } else {
        subtaskIcons.innerHTML = subtaskIsBlank();
    }
}

function getContacts(object = Object.entries(logged_user.contacts)) {
    Contacts.innerHTML = "";
        for (const [id, contactObject] of object) {
            Contacts.innerHTML += renderContacts(id, contactObject);
        }
}

function clearDialog() {
    title.value = null;
    document.getElementById('description').value = null;
    duedate.value = null;
    select('medium');
    selectedContacts.innerHTML = "";
    getContacts();
    assignedContacts = {};
    selectedCategory.innerHTML = "Select task category";
    document.getElementById('addedSubtasks').innerHTML = "";
}