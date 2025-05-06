const databaseLinkRef =
	"https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users/";
const contactDiv = document.getElementById("contactNameDiv");
const contactInfoDiv = document.getElementById("contactInfoInfo");
const addContactDial = document.getElementById("addContactDial");
const userObject = sessionStorage.getItem("loggedIn");
const user = JSON.parse(userObject);
const colors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E","#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B",  "#FF4646", "#FFBB2B"];


// FETCH FUNCTIONS //
/**
 * 
 * @returns - returns the fetched contact data from the firebase server
 * 
 */
async function fetchContactData() {
	const response = await fetch(
		`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/contacts.json`
	);
	const contactData = await response.json();
	return contactData;
}

/**
 * this functions deletes a contact based on a the name of the contact object, renders the contacts again after and than starts a function which deletes the user out of all tasks the user was assigned to
 * 
 * @param {string} name - Name Value of the Contact Object
 */
async function deleteContact(name) {
	const contactId = await getContactId(name);
	const request = await fetch(
		`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/contacts/${contactId}.json`,
		{
			method: "DELETE",
		}
	);
	showContacts();
	await deleteUserOutOfTask(contactId);
	contactInfoDiv.innerHTML = "";
}

/**
 * this functions deletes the a contact based on the contact id and the kanban object out of all assigned tasks, it is starting two more functions, the first gets the kanban object out of the database and the second one filters the kanban object for the issigned contactId
 * 
 * @param {string} contactId 
 */
async function deleteUserOutOfTask(contactId){
	const kanbanData = await fetchKanbanTasks();
	const taskIdArr = findTaskIdByAssignedContactId(kanbanData, contactId);
	for(let i = 0; i < taskIdArr.length; i++){
		await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/kanban/${taskIdArr[i]}/assigned/${contactId}.json`,
			{
				method: "DELETE",
			}
		);
	}
}

/**
 * this function gets the kanban object from the the firebase database
 * 
 * @returns the kanban Object from the firebase database
 */
async function fetchKanbanTasks(){
	const response = await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/kanban.json`);
	const kanbanData = await response.json();
	return kanbanData;
}

/**
 * this function edits a contact based on the values of the editinputs. It starts three functions, the first is getting the contact id via the value name of the contacts object, the second one reads the input values and the third one renders the contacts with the new values
 * 
 * @param {string} name 
 * @param {event} event 
 */
async function updateContact(name, event) {
	event.preventDefault();
	const contactId = await getContactId(name);
	const editedContactData = getEditedContactData();
	await fetch(
		`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/contacts/${contactId}.json`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(editedContactData),
		}
	);
	await renderChangedContacts(editedContactData)
}

/**
 * this function adds a new contact to the firebase database and is starting two functions, the first function reads the newContactInputs and puts them into a obj which gets returned. the second one renders the new contacts based on that new data.
 */
async function addContact() {
	const newContactData = await getNewContactData();
	await fetch(
		`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/contacts.json`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newContactData),
		}
	);
	await renderChangedContacts(newContactData);
}

// END FETCH FUNCTIONS //

// RENDER FUNCTIONS //

/**
 * this functions renders the new contactlist based on the newly added data, opens the specific contact and closes the dialog
 * 
 * @param {Object} newContactData those are the values of Inputs put into an Obj
 */
async function renderChangedContacts(contactObject){
	await showContacts();
	const indexAndColor = searchForIndexAndColor(contactObject);
	openContact(
		contactObject["email"],
		contactObject["name"],
		contactObject["phone"],
		indexAndColor[1],
		indexAndColor[0]
	);
	closeContactDial();
}

/**
 * this function renders the contactlist, it uses the sorted contacts and compares if the previous startinglette of the contactname is the same letter or a new on to the current contactname. if the letter is a new one, it renders this letter into the list.
 * 
 * @param {Array} sortedContacts the sorted contacts objects put into an array
 */
function renderContacts(sortedContacts) {
	let previousLetter = "";
	contactDiv.innerHTML = "";
	for(let i = 0; i < sortedContacts.length; i++){
		if(sortedContacts[i].name.charAt(0).localeCompare(previousLetter) > 0){
			contactDiv.innerHTML += letterTemp(
				sortedContacts[i].name.charAt(0).toUpperCase()
			);
			previousLetter = sortedContacts[i].name.charAt(0).toUpperCase();
		}
		const color = sortedContacts[i].color;
		const phone = checkIfUndefined(sortedContacts[i].phone);
		contactDiv.innerHTML += contactTemp(
			sortedContacts[i].email,
			sortedContacts[i].name,
			phone,
			i,
			color
		);
		styleBackgroundOfInitials(color, i);
	}
}

/**
 * this function starts 3 functions, the first is fetching the contactdataobject from the firebase database, the second one is sorting this object and the third one renders the data
 */
async function showContacts() {
	const contactData = await fetchContactData();
	const sortedContacts = sortContacts(contactData);
	renderContacts(sortedContacts);
}

/**
 * this function renders the data from the contact that got clicked in the contact list in a bigger format 
 * 
 * @param {string} email the email of the specific sorted contact
 * @param {string} name the name of the specific sorted contact
 * @param {number} phone the phonenumber of the specific sorted contact
 * @param {string} color the color of the specific sorted contact
 * @param {number} index the index of the specific sorted contact
 */
function openContact(email, name, phone, color, index) {
    email = decodeURIComponent(email);
    name = decodeURIComponent(name);
    phone = decodeURIComponent(phone);
    color = decodeURIComponent(color);
    colorClickedContact(index);
    contactInfoDiv.innerHTML = contactInfoTemp(email, name, phone, color);
    const placeholder = document.getElementById("editMobileButtonPlaceholder");
    if (placeholder) {
        placeholder.innerHTML = editMobileTemp(email, name, phone, color);
    }
    const initialsDivInfo = document.getElementById("initialsDivInfo");
    if (initialsDivInfo) {
        initialsDivInfo.style.backgroundColor = color;
    }
}

/**
 * this functions opens the dialog and renders the editContactDIal via the tempplate.
 * 
 * @param {*} email the email of the specific contact
 * @param {*} name the name of the specific contact
 * @param {*} phone the phone of the specific contact
 * @param {*} color the color of the specific contact
 */
function openEditContactDial(email, name, phone, color) {
	addContactDial.innerHTML = editContactDialTemp(email, name, phone);
	document.getElementById("editImgDiv").style.backgroundColor = color;
	addContactDial.showModal();
}

/**
 * this function open the dialog and renders the addContactDial via the template.
 */
function openAddContactDial() {
	addContactDial.innerHTML = addContactDialTemp();
	addContactDial.showModal();
}
// END RENDER FUNCTIONS //

// HELP FUNCTIONS //

/**
 * this functions closes the the dialogs and starts the closing animation
 */
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

/**
 * this functions sorts the contactObject while using object entries to convert that object into an array and destructures that array to only sort the values. after that it maps the sortedArray and removes the key pairs from object entries, so only the values are left and returns that array
 * 
 * @param {Object} contactData this is the fetches contact object from the firebase database
 * @returns an sorted array, which got build from object entries out of the contacts object
 */
function sortContacts(contactData) {
	if (contactData != null || undefined) {
		const sortedContacts = Object.entries(contactData).sort(([, a], [, b]) =>
			a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
		);
		const sortedContactsArray = sortedContacts.map(([, value]) => value);
		return sortedContactsArray
	}
}

/**
 * 
 * @param {number/undifined} phone the phonenumber of a specific contact 
 * @returns the phonenumber, or "No number assigned" if phone is undifined
 */
function checkIfUndefined(phone) {
	if(phone === undefined){
		phone = "No number assigned";
		return phone;
	}
	return phone;
}

/**
 *  this function colors the background of the initalDiv based on the color of the contact 
 *  
 * @param {string} color the color of the specific contact
 * @param {number} index the index of the of the specific contact 
 */
function styleBackgroundOfInitials(color, index) {
	document.getElementById(`shorthand${index}`).style.backgroundColor = color;
}

/**
 * this function converts the surname and the lastname of the contact into the initals of that name
 * 
 * @param {string} name name of a specific contact 
 * @returns the initials of that name
 */
function shorthandName(name) {
	return name
		.split(" ")
		.map((partName) => partName[0].toUpperCase())
		.join("");
}

/**
 * this function colors the contact which got clicked in the contactlist and sets the background color of the other contacts to white
 * 
 * @param {number} index index of the specific contact 
 */
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

/**
 * this function checks which color the next contact will get. It uses a index or the length of the current contacts object to determine which color to pick out of the colors array. Its using the modulu operator to reassign the first color, if the index/length is bigger than the color array
 * 
 * @param {number} index this can be the index of the contact or the length of the contacts object
 * @returns the color out of the colors array
 */
function getColor(index){
	const color = colors[index % colors.length];
	return color;
  }

/**
 * this function con converts the kanban object into an array and searches the assigned value for the contactid, everytime the contactId is assigned to a task, it pushes the taskId into an array which gest returned
 * 
 * @param {Object} kanbanData the fetched kanaban object from the firebase database
 * @param {number/string} contactId the id of the specific contact
 * @returns an array of tasks where the contactId is assigned to
 */
function findTaskIdByAssignedContactId(kanbanData, contactId) {
	const assignedArray = [];
	for (const [taskId, taskData] of Object.entries(kanbanData)) {
	  if (!taskData.assigned) continue;
	  const isAssigned = Object.keys(taskData.assigned).includes(contactId);
	  if (isAssigned) {
		assignedArray.push(taskId);
	  }
	}
	return assignedArray;
  }

  /**
   * this function fetches the contactdata and searches the object for a specific name, if the name is found it returns the id of that contact
   * 
   * @param {string} name the name of a specific contact 
   * @returns the contact id corresponding to that name
   */
  async function getContactId(name) {
	const contactData = await fetchContactData();
	const contactId = Object.entries(contactData).find(
		([, value]) => value.name === name
	)?.[0];
	return contactId;
}

/**
 * this function is reading the input values of the new contact inputs and converts them into an object
 * 
 * @returns returns an object consisting of the input values of the add contact inputs
 */
async function getNewContactData() {
	const newContactName = document.getElementById("addDialNameInput").value;
	const newContactEmail = document.getElementById("addDialEmailInput").value;
	const newContactPhone = document.getElementById("addDialPhoneInput").value;
	const contactData = await fetchContactData();
	const color = getColor(Object.keys(contactData).length);
	const newContactData = {
		name: `${newContactName}`,
		email: `${newContactEmail}`,
		phone: `${newContactPhone}`,
		color,
	};
	return newContactData;
}

/**
 * this function is reading the input values of the edit contact inputs and converts them into an object
 * 
 * @returns an object consisting of the input values of the edit inputs
 */
function getEditedContactData() {
	const editedContactName = document.getElementById("editDialNameInput").value;
	const editedContactEmail =
		document.getElementById("editDialEmailInput").value;
	const editedContactPhone =
		document.getElementById("editDialPhoneInput").value;
		const backgroundColor = document.getElementById("initialsDivInfo").style.backgroundColor;
	const editedContactData = {
		name: `${editedContactName}`,
		email: `${editedContactEmail}`,
		phone: `${editedContactPhone}`,
		color: backgroundColor,
	};
	return editedContactData;
}

/**
 * this function searches for the index and the color of a specific contact and returns it
 * 
 * @param {Object} newContactData its an object that contains name, email, phone and color of a specific contact 
 * @returns the index of that contact and the color fo that contact
 */
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
// END HELP FUNCTIONS //




























