const BASE_URL = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users.json";
const userDataset = [];
let shortHandName = document.querySelector(".short-hand-name");
let helpIcon = document.getElementById("headerInfoIcon");
let userButton = document.getElementById("shorthandNameDiv");


/**
 * Opens or closes the menu when clicking on the first characters of the logged in user
 */
function toggleMenu() {
	document.getElementById("menu").classList.toggle("hidden");
	document.getElementById(`menu`).classList.toggle("topToBottom");
}


function logout() {
	//loggedIn Pair löschen
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
	console.log("done");
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
	console.log("done");
}
