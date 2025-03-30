const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users.json";
const contactDiv = document.getElementById("contactNameDiv");

async function fetchData(){
    const response = await fetch(databaseLinkRef);
    const data = await response.json();
    console.log(data);
    return data;
}




async function sortContacts(user){
    const users = await fetchData();
    Object.entries(users[user].contacts).sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    return users;
}


function renderContacts(users, user){
    let previousLetter = "";
    Object.keys(users[user].contacts).forEach((contact)=>{
        if(contact.charAt(0).localeCompare(previousLetter) > 0){
            contactDiv.innerHTML += letterTemp(contact.charAt(0).toUpperCase);
            previousLetter = contact.charAt(0);
        }
        contactDiv.innerHTML += contactTemp(users[user][contact].email, contact, users[user][contact].phone);

    })
    
}

function shorthandName(name){
    return name.split(" ").map(partName => partName[0].toUpperCase()).join("");
}

function openContact(email, name, phone){

}

async function showContacts(user){
    const sortedUsers = await sortContacts(user);
    renderContacts(sortedUsers, user);
}