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

function tempContacts() {
    let userObject = sessionStorage.getItem("loggedIn");
    let user = JSON.parse(userObject);
    document.getElementById('contactsList').innerHTML = "";
    document.getElementById('contactsList').classList.toggle('hidden');
    for (const name in user.contacts) {
            document.getElementById('contactsList').innerHTML +=
            `<div class="space-between contact">
                <div>
                    <span>${indices(name)}</span>
                    <span>${name}</span>
                </div>
                <input type="checkbox" id=${name}>
            </div>`
    }
}

function indices(name) {
    let step_1 = name.split(" ");
    let step_2 = step_1.map(partName => partName[0].toUpperCase());
    return step_2.join("");
}

function highlightContact() {
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(element => element.style.background)
}