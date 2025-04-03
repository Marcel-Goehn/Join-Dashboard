const databaseLinkRef =
	"https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/";
const contactDiv = document.getElementById("contactNameDiv");
const contactInfoDiv = document.getElementById("contactInfoInfo");
const addContactDial = document.getElementById("addContactDial");
const userObject = sessionStorage.getItem("loggedIn");
const user = JSON.parse(userObject);

async function fetchContactData() {
	const response = await fetch(
		`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/${user}/contacts.json`
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
		if (contactData[contact].name.charAt(0).localeCompare(previousLetter) > 0) {
			contactDiv.innerHTML += letterTemp(
				contactData[contact].name.charAt(0).toUpperCase()
			);
			previousLetter = contactData[contact].name.charAt(0).toUpperCase();
		}
		color = randomColor();
		contactDiv.innerHTML += contactTemp(
			contactData[contact].email,
			contactData[contact].name,
			contactData[contact].phone,
			index,
			color
		);
		styleBackgroundOfInitials(color, index);
		index++;
	}
}

function styleBackgroundOfInitials(color, index) {
	document.getElementById(
		`shorthand${index}`
	).style.backgroundColor = color;
}

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

function openContact(email, name, phone, color, index) {
	colorClickedContact(index);
	contactInfoDiv.innerHTML = contactInfoTemp(email, name, phone, color);
	const initalsDivInfo = document.getElementById("initialsDivInfo");
	initalsDivInfo.style.backgroundColor = color;
}

function colorClickedContact(index){
	const acutalContentDivs = document.querySelectorAll(".actualContactDiv");
	acutalContentDivs.forEach((div) => {
		div.classList.remove("clickedBackground");
		div.classList.add("whiteBackground");
	})
	const clickedContentDiv = document.getElementById(`actualContactDiv${index}`);
	clickedContentDiv.classList.remove("whiteBackground");
	clickedContentDiv.classList.add("clickedBackground");
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
	let color = `rgb(${r}, ${g}, ${b})`;
	return color;
}

function openAddContactDial() {
	addContactDial.innerHTML = addContactDialTemp();
	addContactDial.showModal();
}

function closeContactDial() {
	if(document.getElementById("addContactDialContent")){
		slideOut(document.getElementById("addContactDialContent"));
	}else{
		slideOut(document.getElementById("editContactDialContent"))
	}
	setTimeout(()=>{
		addContactDial.close();
	}, 1000)
}

function openEditContactDial(email, name, phone, color) {
	let colorArr = JSON.parse(color);
	addContactDial.innerHTML = editContactDialTemp(email, name, phone);
	document.getElementById(
		"editImgDiv"
	).style.backgroundColor = `rgb(${colorArr[0]},${colorArr[1]}, ${colorArr[2]})`;
	addContactDial.showModal();
}

async function deleteContact(name) {
	const contactId = await getContactId(name);
	const request = await fetch(
		`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/${user}/contacts/${contactId}.json`,
		{
			method: "DELETE",
		}
	);
	showContacts();
	contactInfoDiv.innerHTML = "";
}

async function updateContact(name, event) {
	event.preventDefault();
	const contactId = await getContactId(name);
	const editedContactData = getEditedContactData();
	await fetch(
		`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/${user}/contacts/${contactId}.json`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(editedContactData),
		}
	);
	
	await showContacts();
	const indexAndColor = searchForIndexAndColor(editedContactData);
	openContact(editedContactData["email"], editedContactData["name"], editedContactData["phone"], indexAndColor[0], indexAndColor[1]);
	closeContactDial();
}

async function addContact() {
	const newContactData = getNewContactData();
	await fetch(
		`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/${user}/contacts.json`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newContactData),
		}
	);
	
	await showContacts();
	const indexAndColor = searchForIndexAndColor(newContactData);
	openContact(newContactData["email"], newContactData["name"], newContactData["phone"], indexAndColor[1], indexAndColor[0]);
	closeContactDial();
}

async function getContactId(name) {
	const contactData = await fetchContactData();
	const contactId = Object.entries(contactData).find(
		([, value]) => value.name === name
	)?.[0];
	return contactId;
}

function getNewContactData(){
	const newContactName = document.getElementById("addDialNameInput").value;
	const newContactEmail = document.getElementById("addDialEmailInput").value;
	const newContactPhone = document.getElementById("addDialPhoneInput").value;
	const newContactData = {
		name: `${newContactName}`,
		email: `${newContactEmail}`,
		phone: `${newContactPhone}`,
	};
	return newContactData;
}

function getEditedContactData() {
	const editedContactName = document.getElementById("editDialNameInput").value;
	const editedContactEmail = document.getElementById("editDialEmailInput").value;
	const editedContactPhone = document.getElementById("editDialPhoneInput").value;
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

function slideInContactInfo() {
	const contactInfoInfo = document.getElementById("contactInfoInfo");
	contactInfoInfo.classList.remove("slideInContactInfo");
	void contactInfoInfo.offsetWidth;
	contactInfoInfo.classList.add("slideInContactInfo");
}

function successMsg() {
	const successDialBtn = document.getElementById("successBtn");
	successDialBtn.classList.add("slideMsgInAndOut");
	setTimeout(()=>{
		successDialBtn.classList.remove("slideMsgInAndOut")
	}, 2000)
	addContactDial.close();
}

function searchForIndexAndColor(newContactData){
	const allContactDivs = document.querySelectorAll(".actualContactDiv");
	const searchedContactDiv = Array.from(allContactDivs).find(contactDiv => contactDiv.textContent.includes(`${newContactData["email"]}`));
	let index = searchedContactDiv.id.replace(/\D/g, "");
	index = parseInt(index);
	const color = searchedContactDiv.children[0].style.backgroundColor;
	searchedContactDiv.scrollIntoView({
		behavior: "smooth",
		block: "center"
	});
	return [index, color]
}

function slideOut(contentDial){
	contentDial.classList.remove("slideIn");
	contentDial.classList.add("slideOut");
}