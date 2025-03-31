const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/";
const contactDiv = document.getElementById("contactNameDiv");
const contactInfoDiv = document.getElementById("contactInfoInfo");
const dial = document.getElementById("dial");
const dialStyleDiv = document.getElementById("styleDivDial");
const dialInfoDiv = document.getElementById("infoDivDial");

async function fetchContactData(user){
    const response = await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/${user}/contacts.json`);
    const contactData = await response.json();
    console.log(contactData);
    return contactData;
}

async function sortContacts(contactData){
    const sortedContacts = Object.entries(contactData).sort(([a], [b]) => a.localeCompare(b));
    const sortedContactsObject = Object.fromEntries(sortedContacts);
    return sortedContactsObject;
 }

function renderContacts(contactData){
    let previousLetter = "";
    let index = 0;
    for(const contact in contactData){
        if(contact.charAt(0).localeCompare(previousLetter) > 0){
            contactDiv.innerHTML += letterTemp(contact.charAt(0).toUpperCase());
            previousLetter = contact.charAt(0).toUpperCase();
        }
        rgbArr = randomColor();
        contactDiv.innerHTML += contactTemp(contactData[contact].email, contact, contactData[contact].phone, index, rgbArr);
        document.getElementById(`shorthand${index}`).style.backgroundColor = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`;
        index++;
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

function openContact(email, name, phone, rgbArrJSON){
    const colorArr = JSON.parse(rgbArrJSON);
    contactInfoDiv.innerHTML = contactInfoTemp(email, name, phone);
    const initalsDivInfo = document.getElementById("initialsDivInfo");
    initalsDivInfo.style.backgroundColor = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`
    
}

function randomColor(){
    let r = Math.floor(Math.random()*210);
        if(r < 40){
            r = 40;
        }
    let g = Math.floor(Math.random()*210);
        if(g < 40){
           g = 40;
        }
    let b = Math.floor(Math.random()*210);
        if(b < 40){
           b = 40;
        }
    let colorArr = [r, g, b]
    return colorArr;
}

function openDial(){
    dial.showModal();
}

function closeDial(){
    dial.close();
}

function addNewContact(){
    console.log("Test");
    openDial();
    renderContactDial();
}

function renderContactDial(){
    dialStyleDiv.innerHTML = addContactDialStyleTemp();
    dialInfoDiv.innerHTML = addContactDialInfoTemp();
}