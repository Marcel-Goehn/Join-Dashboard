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



// const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users.json";

function tempContacts() {
    let userObject = sessionStorage.getItem("loggedIn");
    let user = JSON.parse(userObject);
    for (const name in user.contacts) {
        if (Object.prototype.hasOwnProperty.call(user.contacts, name)) {
            const contact = user.contacts[name];
            console.log(name);
            console.log(contact);
            
            document.getElementById('contactsList').innerHTML += `<div class="space-between"><span>IMG</span><span>${name}</span><span>Checkbox</span></div>`
            
        }
    }
}
