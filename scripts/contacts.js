const databaseLinkRef =
	"https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/";
const contactDiv = document.getElementById("contactNameDiv");
const contactInfoDiv = document.getElementById("contactInfoInfo");
const addContactDial = document.getElementById("addContactDial");
const userObject = sessionStorage.getItem("loggedIn");
const user = JSON.parse(userObject);
console.log(user);
const testuser = "-OMj4ed3OtRMrfHIWpzD";

async function fetchContactData() {
	const response = await fetch(
		`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/${testuser}/contacts.json`
	);
	const contactData = await response.json();
	return contactData;
}

function sortContacts(contactData) {
	const sortedContacts = Object.entries(contactData).sort(([, a], [, b]) =>
		a.name.localeCompare(b.name)
	);
	const sortedContactsObject = Object.fromEntries(sortedContacts);
	return sortedContactsObject;
}

function renderContacts(contactData) {
	let previousLetter = "";
	let index = 0;
	contactDiv.innerHTML = "";
	for (const contact in contactData) {
		renderFirstLetter(contactData, contact, previousLetter);
		rgbArr = randomColor();
		contactDiv.innerHTML += contactTemp(
			contactData[contact].email,
			contactData[contact].name,
			contactData[contact].phone,
			index,
			rgbArr
		);
		styleBackgroundOfInitials(rgbArr, index);
		index++;
	}
}

function renderFirstLetter(contactData, contact, previousLetter) {
	if (contactData[contact].name.charAt(0).localeCompare(previousLetter) > 0) {
		contactDiv.innerHTML += letterTemp(
			contactData[contact].name.charAt(0).toUpperCase()
		);
		previousLetter = contactData[contact].name.charAt(0).toUpperCase();
	}
}

function styleBackgroundOfInitials(rgbArr, index) {
	document.getElementById(
		`shorthand${index}`
	).style.backgroundColor = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`;
}
function renderLetters() {}
function shorthandName(name) {
	return name
		.split(" ")
		.map((partName) => partName[0].toUpperCase())
		.join("");
}

async function showContacts() {
	const contactData = await fetchContactData();
	const sortedContacts = sortContacts(contactData);
	renderContacts(sortedContacts);
}

function openContact(email, name, phone, rgbArrJSON) {
	const colorArr = JSON.parse(rgbArrJSON);
	contactInfoDiv.innerHTML = contactInfoTemp(email, name, phone, rgbArrJSON);
	const initalsDivInfo = document.getElementById("initialsDivInfo");
	initalsDivInfo.style.backgroundColor = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
}

function randomColor() {
	let r = Math.floor(Math.random() * 210);
	if (r < 40) {
		r = 40;
	}
	let g = Math.floor(Math.random() * 210);
	if (g < 40) {
		g = 40;
	}
	let b = Math.floor(Math.random() * 210);
	if (b < 40) {
		b = 40;
	}
	let colorArr = [r, g, b];
	return colorArr;
}

function openAddContactDial() {
	addContactDial.innerHTML = addContactDialTemp();
	addContactDial.showModal();
}

function closeAddContactDial() {
	addContactDial.close();
}

function openEditContactDial(email, name, phone, color) {
	let colorArr = JSON.parse(color);
	addContactDial.innerHTML = editContactDialTemp(email, name, phone);
	document.getElementById(
		"editImgDiv"
	).style.backgroundColor = `rgb(${colorArr[0]},${colorArr[1]}, ${colorArr[2]})`;
	addContactDial.showModal();
}

function closeEditContactDial() {
	addContactDial.close();
	removeSlideIn();
}

async function deleteContact(name) {
	const contactId = getContactId(name);
	const request = await fetch(
		`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/${testuser}/contacts/${contactId}.json`,
		{
			method: "DELETE",
		}
	);
	showContacts();
}

async function updateContact(name) {
	const contactId = await getContactId(name);
	const editedContactData = getEditedContactData();
	console.log("test");
	const request = await fetch(
		`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/${testuser}/contacts/${contactId}.json`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(editedContactData),
		}
	);
	closeAddContactDial();
	showContacts();
}

async function addContact() {
	const newContactData = getEditedContactData();
	const request = await fetch(
		`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/${testuser}/contacts.json`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newContactData),
		}
	);
	closeAddContactDial();
	showContacts();
}

async function getContactId(name) {
	const contactData = await fetchContactData();
	const contactId = Object.entries(contactData).find(
		([, value]) => value.name === name
	)?.[0];
	return contactId;
}

function getEditedContactData() {
	const editedContactName = document.getElementById("dialNameInput").value;
	const editedContactEmail = document.getElementById("dialEmailInput").value;
	const editedContactPhone = document.getElementById("dialPhoneInput").value;
	const editedContactData = {
		name: `${editedContactName}`,
		email: `${editedContactEmail}`,
		phone: `${editedContactPhone}`,
	};
	return editedContactData;
}

function slideIn() {
	const editDialContent = document.getElementById("editContactDialContent");
	editDialContent.classList.toggle("slideIn");
}

function slideInAddContact() {
	const addContactDialContent = document.getElementById(
		"addContactDialContent"
	);
	addContactDialContent.classList.toggle("slideIn");
}
