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
	if (contactData != null || undefined) {
		const sortedContacts = Object.entries(contactData).sort(([, a], [, b]) =>
			a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
		);
		const sortedContactsObject = Object.fromEntries(sortedContacts);
		return sortedContactsObject;
	}
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
	document.getElementById(`shorthand${index}`).style.backgroundColor = color;
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
	getMobileIn(email, name, phone, color);
	
}

function getMobileIn(email, name, phone, color){
	const contactInfoContent = document.getElementById("contactInfo")
	if(!contactInfoContent.querySelector("#optionsBtn")){
		contactInfoContent.innerHTML += editMobileTemp(email, name, phone, color);
	}
	
}

function colorClickedContact(index) {
	const acutalContentDivs = document.querySelectorAll(".actualContactDiv");
	acutalContentDivs.forEach((div) => {
		div.classList.remove("clickedBackground");
		div.classList.add("whiteBackground");
	});
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
	if (document.getElementById("addContactDialContent")) {
		slideOut(document.getElementById("addContactDialContent"));
	} else {
		slideOut(document.getElementById("editContactDialContent"));
	}
	setTimeout(() => {
		addContactDial.close();
	}, 400);
}

function openEditContactDial(email, name, phone, color) {
	addContactDial.innerHTML = editContactDialTemp(email, name, phone);
	document.getElementById("editImgDiv").style.backgroundColor = color;
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
	openContact(
		editedContactData["email"],
		editedContactData["name"],
		editedContactData["phone"],
		indexAndColor[1],
		indexAndColor[0]
	);
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
	openContact(
		newContactData["email"],
		newContactData["name"],
		newContactData["phone"],
		indexAndColor[1],
		indexAndColor[0]
	);
	closeContactDial();
}

async function getContactId(name) {
	const contactData = await fetchContactData();
	const contactId = Object.entries(contactData).find(
		([, value]) => value.name === name
	)?.[0];
	return contactId;
}

function getNewContactData() {
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
	const editedContactEmail =
		document.getElementById("editDialEmailInput").value;
	const editedContactPhone =
		document.getElementById("editDialPhoneInput").value;
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
	setTimeout(() => {
		successDialBtn.classList.remove("slideMsgInAndOut");
	}, 2000);
	addContactDial.close();
}

function searchForIndexAndColor(newContactData) {
	const allContactDivs = document.querySelectorAll(".actualContactDiv");
	const searchedContactDiv = Array.from(allContactDivs).find((contactDiv) =>
		contactDiv.textContent.includes(`${newContactData["email"]}`)
	);
	let index = searchedContactDiv.id.replace(/\D/g, "");
	index = parseInt(index);
	const color = searchedContactDiv.children[0].style.backgroundColor;
	searchedContactDiv.scrollIntoView({
		behavior: "smooth",
		block: "center",
	});
	return [index, color];
}

function slideOut(contentDial) {
	contentDial.classList.remove("slideIn");
	contentDial.classList.add("slideOut");
}

function validateContactForm(addOrEdit, name, event) {
	const nameInput = document.getElementById(`${addOrEdit}DialNameInput`);
	const nameRefuseDiv = document.getElementById(`${addOrEdit}NameRefuseDiv`);
	const nameInputDiv = document.getElementById(`${addOrEdit}DialNameDiv`);
	const emailInput = document.getElementById(`${addOrEdit}DialEmailInput`);
	const emailRefuseDiv = document.getElementById(`${addOrEdit}EmailRefuseDiv`);
	const emailInputDiv = document.getElementById(`${addOrEdit}DialEmailDiv`);
	const phoneInput = document.getElementById(`${addOrEdit}DialPhoneInput`);
	const phoneRefuseDiv = document.getElementById(`${addOrEdit}PhoneRefuseDiv`);
	const phoneInputDiv = document.getElementById(`${addOrEdit}DialPhoneDiv`);
	if (
		validateName(nameInput, nameRefuseDiv, nameInputDiv) &&
		validateEmail(emailInput, emailRefuseDiv, emailInputDiv) &&
		validatePhone(phoneInput, phoneRefuseDiv, phoneInputDiv)
	) {
		if (addOrEdit === "add") {
			addContact();
			successMsg();
		} else {
			updateContact(name, event);
		}
	}
}

function validatePhone(phoneInput, refuseDiv, phoneInputDiv) {
	const pattern = /^\+\d{5,}$/;
	if (!pattern.test(phoneInput.value)) {
		refuseDiv.innerHTML = "Please enter the phonenumber starting with a +";
		showRefuseDiv(refuseDiv);
		setRedBorder(phoneInputDiv);
		revertBorderColor(phoneInputDiv);
		disableRefuseDiv(refuseDiv);
		return false;
	}
	return true;
}

function validateName(nameInput, refuseDiv, nameInputDiv) {
	const pattern = /^[a-zA-ZäöüÄÖÜß]+ [a-zA-ZäöüÄÖÜß]+$/;
	if (!pattern.test(nameInput.value)) {
		refuseDiv.innerHTML = "Enter first and lastname separated by a space.";
		showRefuseDiv(refuseDiv);
		setRedBorder(nameInputDiv);
		revertBorderColor(nameInputDiv);
		disableRefuseDiv(refuseDiv);
		return false;
	}
	return true;
}

function validateEmail(emailInput, refuseDiv, emailInputDiv) {
	const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!pattern.test(emailInput.value)) {
		refuseDiv.innerHTML = "Please enter your email.";
		showRefuseDiv(refuseDiv);
		setRedBorder(emailInputDiv);
		revertBorderColor(emailInputDiv);
		disableRefuseDiv(refuseDiv);
		return false;
	}
	return true;
}

function revertBorderColor(element) {
	setTimeout(() => {
		element.style.border = "";
		element.focus();
	}, 2000);
}

function disableRefuseDiv(element) {
	setTimeout(() => {
		element.classList.add("hideRefuseDiv");
		element.classList.remove("showRefuseDiv");
	}, 2000);
}

function showRefuseDiv(refuseDiv) {
	refuseDiv.classList.remove("hideRefuseDiv");
	refuseDiv.classList.add("showRefuseDiv");
}

function setRedBorder(element) {
	element.style.border = "1px solid red";
}


function switchToSingleView(contentLimiter, stickyContacts, addNewContactBtn, addNewFixed){
	if(!document.getElementById("stickyContactsContent").classList.contains("dnone")){
	contentLimiter.classList.add("dnone");
	contentLimiter.style.width = window.innerWidth + "px";
	stickyContacts.style.width = window.innerWidth + "px";
	addNewContactBtn.classList.add("dnone")
	addNewFixed.classList.remove("dnone");
}
}

function addResizeListener(){
window.addEventListener("resize", ()=>{
	const contentLimiter = document.getElementById("contentLimiter");
	const stickyContacts = document.getElementById("stickyContacts");
	const addNewContactBtn = document.getElementById("addNewContactBtn");
	const addNewFixed = document.getElementById("addContactFixed");
	if(window.innerWidth <= 650){
		switchToSingleView(contentLimiter, stickyContacts, addNewContactBtn, addNewFixed);
	}else if(window.innerWidth > 650){
		contentLimiter.classList.remove("dnone");
		stickyContacts.style.width = "auto";
		addNewContactBtn.classList.remove("dnone");
		addNewFixed.classList.add("dnone");
		contentLimiter.style.width = "auto";
		const stickyContactsContent = document.getElementById("stickyContactsContent");
		stickyContactsContent.classList.remove("dnone");
	}
});
}

function clickContactSmall(){
	if(window.innerWidth < 650){
		const stickyContactsContent = document.getElementById("stickyContactsContent");
		stickyContactsContent.classList.add("dnone");
		const contentLimiter = document.getElementById("contentLimiter");
		contentLimiter.classList.remove("dnone");
	}
}

function backSmall(){
	if(window.innerWidth < 650){
		const stickyContactsContent = document.getElementById("stickyContactsContent");
		stickyContactsContent.classList.remove("dnone");
		const contentLimiter = document.getElementById("contentLimiter");
		contentLimiter.classList.add("dnone");
	}
}

function openBurger(){
	const burgerDiv = document.getElementById("editBurger");
	burgerDiv.classList.remove("slideBurgerOut");
	burgerDiv.classList.add("slideBurgerIn");
	document.addEventListener("click", closeBurgerHandler);
}

const closeBurgerHandler = (event) => {
	const burgerDiv = document.getElementById("editBurger");
	if(!burgerDiv.contains(event.target)){
		 burgerDiv.classList.remove("slideBurgerIn");
		 burgerDiv.classList.add("slideBurgerOut");
		 document.removeEventListener("click", closeBurgerHandler);
	}
}
	
