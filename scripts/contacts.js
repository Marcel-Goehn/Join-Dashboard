const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/";
const contactDiv = document.getElementById("contactNameDiv");

async function fetchContactData(user){
    const response = await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/${user}/contacts.json`);
    const contactData = await response.json();
    console.log(contactData);
    return contactData;
}
async function sortContacts(contactData){
    const sortedContacts = Object.entries(contactData).sort(([a], [b]) => a.localeCompare(b));
    console.log(sortedContacts);
    const sortedContactsObject = Object.fromEntries(sortedContacts);
    console.log(sortedContactsObject);
    return sortedContactsObject;
 }


function renderContacts(contactData){
    let previousLetter = "";
    for(const contact in contactData){
        if(contact.charAt(0).localeCompare(previousLetter) > 0){
            contactLetter = contact.charAt(0).toUpperCase();
            console.log(contactLetter)
            contactDiv.innerHTML += letterTemp(contactLetter);
            previousLetter = contact.charAt(0);
        }
        console.log(contactData[contact].email, contact, contactData[contact].phone);
        contactDiv.innerHTML += contactTemp(contactData[contact].email, contact, contactData[contact].phone);
    }
}


function shorthandName(name){
    return name.split(" ").map(partName => partName[0].toUpperCase()).join("");
}

async function showContacts(user){
    const contactData = await fetchContactData(user);
    const sortedContacts = await sortContacts(contactData); //
    renderContacts(sortedContacts);
}

function openContact(email, name, phone){

}