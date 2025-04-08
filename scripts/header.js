const BASE_URL = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users.json";
const userDataset = [];
let shortHandName = document.querySelector(".short-hand-name");
let helpIcon = document.getElementById("headerInfoIcon");
let userButton = document.getElementById("shorthandNameDiv");

function toggleMenu() {
	document.getElementById("menu").classList.toggle("hidden");
	document.getElementById(`menu`).classList.toggle("topToBottom");
}

function logout() {
	//loggedIn Pair löschen
}


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


function pushUserNames(data) {
	for(const [key, value] of Object.entries(data)) {
		userDataset.push({id : key, value});
	}
	findLoggedInUser();
}


function findLoggedInUser() {
	const sessionUser = sessionStorage.getItem("loggedIn");
	const parsedSessionUser = JSON.parse(sessionUser);
	const searchingForUser = userDataset.find(u => u.id === parsedSessionUser);
	getUserInitials(searchingForUser);
}


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

//fetchNameInitials();
