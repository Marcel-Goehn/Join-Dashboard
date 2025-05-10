const BASE_URL = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users.json";
const userDataset = [];
let shortHandName = document.querySelector(".short-hand-name");
let helpIcon = document.getElementById("headerInfoIcon");
let userButton = document.getElementById("shorthandNameDiv");
const backdrop = document.getElementById("menuBackdrop");


/**
 * Opens or closes the menu when clicking on the first characters of the logged in user
 */
function toggleMenu() {
	document.getElementById("menu").classList.toggle("hidden");
	document.getElementById(`menu`).classList.toggle("topToBottom");
	backdrop.classList.add("backdrop");
	backdrop.classList.remove("hidden");
}


/**
 * This function will log the user out
 */
function logout() {
	sessionStorage.removeItem("loggedIn");
}


/**
 * This function fetches the users from the database
 */
async function fetchNameInitials() {
	try {
		let response = await fetch(BASE_URL);
		if (!response.ok) {
			throw new Error(`HTTP Fehler! Status: ${response.status}`);
		}
		let data = await response.json();
		pushUserNames(data);
	} catch (error) {
		console.error(error);
	}
}


/**
 * Makes the user experience better, the user can click next to the menu button of the header so it will close automatically
 * 
 * @param {event} event 
 */
function closeMenu(event){
	if(!document.getElementById("menu").contains(event.target)){
		backdrop.classList.add("hidden");
		backdrop.classList.remove("backdrop");
		toggleMenu();
	}
}


/**
 * This function pushes the fetched json object into an array
 * 
 * @param {Object} data - json object
 */
function pushUserNames(data) {
	for(const [key, value] of Object.entries(data)) {
		userDataset.push({id : key, value});
	}
	findLoggedInUser();
}


/**
 * Iterates through the user array to find the logged in users
 */
function findLoggedInUser() {
	const sessionUser = sessionStorage.getItem("loggedIn");
	const parsedSessionUser = JSON.parse(sessionUser);
	const searchingForUser = userDataset.find(u => u.id === parsedSessionUser);
	getUserInitials(searchingForUser);
}


/**
 * 
 * @param {object} searchingForUser - The data for the logged in user
 * @returns - It return the first letter of the first- and lastname
 */
function getUserInitials(searchingForUser) {
	if(searchingForUser.value.name === "Guest Login") {
		shortHandName.innerHTML = "G";
		return;
	}
	let [firstName, lastName] = searchingForUser.value.name.split(" ");
	let slicedFName = firstName.slice(0,1);
	let slicedLName = lastName.slice(0,1);
	shortHandName.innerHTML = `${slicedFName}${slicedLName}`;
}
