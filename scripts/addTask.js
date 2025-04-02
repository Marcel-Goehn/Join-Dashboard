const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/";
let logged_user = {};

function select(num) {
    resetButtons();
    switch (num) {
        case 0:
            document.getElementById(num).classList.add('urgent');
            document.getElementById('urgent_1').setAttribute("fill", "white");
            document.getElementById('urgent_2').setAttribute("fill", "white");
            break;
        case 1:
            document.getElementById(num).classList.add('medium')
            document.getElementById('medium_1').setAttribute("fill", "white");
            document.getElementById('medium_2').setAttribute("fill", "white");
            break;
        case 2:
            document.getElementById(num).classList.add('low')            
            document.getElementById('low_1').setAttribute("fill", "white");
            document.getElementById('low_2').setAttribute("fill", "white");
            break;
    }
}

function resetButtons() {
    document.getElementById(0).classList.remove('urgent');
    document.getElementById(1).classList.remove('medium');
    document.getElementById(2).classList.remove('low');
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
    const response = await fetch(databaseLinkRef + userID + ".json");
    logged_user = await response.json();
    tempContacts();
}

function tempContacts(array = Object.values(logged_user.contacts)) {
    document.getElementById('contactsList').innerHTML = "";
    for (let index = 0; index < array.length; index++) {
        const contact = array[index];
        console.log(contact);
        
        document.getElementById('contactsList').innerHTML +=
        `<div class="space-between contact" id="${contact.name}" onclick="highlightContact('${contact.name}')">
            <div class="indice_name">
                <div class="circle centered">${indices(contact.name)}</div>
                <span>${contact.name}</span>
            </div>
            <img id="${contact.name}-unchecked" src="../assets/img/Check button_unchecked.svg" alt="">
            <svg id="${contact.name}-checked" class="hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2a3547">
                <path d="M20 11V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H15" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path d="M8 12L12 16L20 4.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>`
    }
    highlighted_contacts.forEach(element => {
        document.getElementById(element).classList.toggle('highlight');  //Wortteil-Suche geht voll gar nicht steil :<
        document.getElementById(`${element}-unchecked`).classList.toggle('hidden');
        document.getElementById(`${element}-checked`).classList.toggle('hidden');})
}

function toggleContacts() {
    document.getElementById('contactsList').classList.toggle('hidden');
    document.getElementById('closed_contacts').classList.toggle('hidden');
    closedContacts();
}
function closedContacts() {
    document.getElementById('closed_contacts').innerHTML = "";
    for (let index = 0; index < highlighted_contacts.length; index++) {
        const element = highlighted_contacts[index];
        document.getElementById('closed_contacts').innerHTML += `<div class="circle centered">${indices(element)}</div>`;
    }
}

function indices(name) {
    let step_1 = name.split(" ");
    let step_2 = step_1.map(partName => partName[0].toUpperCase());
    return step_2.join("");
}

let highlighted_contacts = [];
function highlightContact(contact) {
    document.getElementById(contact).classList.toggle('highlight');
    document.getElementById(`${contact}-unchecked`).classList.toggle('hidden');
    document.getElementById(`${contact}-checked`).classList.toggle('hidden');
    currentlyHighlighted(contact);
}

function currentlyHighlighted(contact) {
    if (document.getElementById(`${contact}-checked`).classList != 'hidden') {
        highlighted_contacts.includes(contact) ? null : highlighted_contacts.push(contact);
    } else {
        highlighted_contacts.splice(highlighted_contacts.indexOf(contact), 1)
    }
}

function search() {
    document.getElementById('contactsList').classList.remove('hidden');
    document.getElementById('closed_contacts').classList.add('hidden');
    let search = document.getElementById('searchbar').value.toLowerCase();
    console.log(Object.values(logged_user.contacts));
    let result = Object.values(logged_user.contacts).filter(details => details.name.toLowerCase().includes(search));
    console.log(result);
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

function addSubtask() {
    let subtask = document.getElementById('subtask_input').value;
    let id = Math.random();
    document.getElementById('addedSubtasks').innerHTML += `
    <div class="space-between addedSubtask" id="${id}">
        <span>*${subtask}</span>
        <div class="addSubtask_btndiv">
            <button onclick="editSubtask(${id})" class="addedSubtask_btn">Edit</button>
            |
            <button onclick="deleteSubtask(${id})" class="addedSubtask_btn">Delete</button>
        </div>
    </div>`;
}

function deleteSubtask(id) {
    document.getElementById(id).remove();
}

function editSubtask(id) {

}

function createTask() {
    let form = document.getElementById('task_form');
    if (form.checkValidity() == true) {
        console.log("Form valid!");
    }
    if (document.getElementById('btn_text').innerHTML !=="Select task category") {
        console.log("valid");
        
    }
    
}

function test() {
    let test = document.getElementById('btn_text').innerHTML;
    console.log(test);
}