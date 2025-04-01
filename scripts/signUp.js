const nameInput = document.getElementById("signUpName");
const nameBorder = document.getElementById("signUpInputNameDiv");
const emailInput = document.getElementById("signUpEmail");
const emailBorder = document.getElementById("signUpInputEmailDiv");
const passwordInput = document.getElementById("signUpPassword");
const pwBorder = document.getElementById("signUpInputPasswordDiv");
const passwordConfirmationInput = document.getElementById("signUpConfirmPw");
const confPwBorder = document.getElementById("signUpInputConfirmPwDiv");
const checkbox = document.getElementById("privacyCheckbox");
const checkboxBorder = document.getElementById("checkboxBorder");
const dialog = document.getElementById("succesfulSignUpDial");

const databaseLinkRef =
	"https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users.json";

async function fetchData() {
	const response = await fetch(databaseLinkRef);
	const data = await response.json();
	console.log(data);
	return data;
}

function validateName() {
	if (nameInput.value.length === 0) {
		nameBorder.style.borderColor = "red";
		revertBorderColor(nameBorder);
		return false;
	}
	return true;
}
function validateEmail() {
	if (!emailInput.checkValidity()) {
		emailBorder.style.borderColor = "red";
		emailInput.focus();
		revertBorderColor(emailBorder);
		return false;
	}
	return true;
}

function validatePasswords() {
	if (passwordInput.value.length === 0) {
		passwordInput.focus();
		pwBorder.style.borderColor = "red";
		revertBorderColor(pwBorder);
		return false;
	}
	if (passwordInput.value !== passwordConfirmationInput.value) {
		passwordConfirmationInput.focus();
		confPwBorder.style.borderColor = "red";
		revertBorderColor(confPwBorder);
		return false;
	}
	return true;
}

function validatePrivacy() {
	if (!checkbox.checked) {
		checkboxBorder.style.outline = "1px solid red";
		revertBorderColor(checkboxBorder);
		return false;
	}
	return true;
}

async function validateForm() {
	if (
		validateName() &&
		validateEmail() &&
		validatePasswords() &&
		validatePrivacy()
	) {
		if (await compareEmailWithData()) {
			postUser(nameInput.value, emailInput.value, passwordInput.value);
			nextPage();
		} else {
			emailTaken();
		}
	}
}

async function postUser(name, email, password) {
	const newUser = {
		name,
		email,
		password,
		contacts: {
			Service: {
				email: "service@join.de",
				name: "ServiceTeam",
				phone: "01889263923",
			},
		},
	};
	const request = await fetch(databaseLinkRef, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newUser),
	});
}

async function compareEmailWithData() {
	const users = await fetchData();
	const sameEmail = Object.values(users).find(
		(user) => user.email === emailInput.value
	);
	if (sameEmail) {
		return false;
	} else {
		return true;
	}
}

function emailTaken() {
	emailInput.style.outlineColor = "red";
	emailInput.focus();
	toggleEmailDiv();
	setTimeout(() => {
		toggleEmailDiv();
	}, 2000);
}

function revertBorderColor(element) {
	setTimeout(() => {
		element.style.border = "";
	}, 2000);
	if (element === checkboxBorder) {
		setTimeout(() => {
			element.style.outline = "";
		}, 2000);
	}
}

function toggleEmailDiv() {
	document.getElementById("emailTakenDiv").classList.toggle("hide");
	document.getElementById("emailTakenDiv").classList.toggle("show");
}

function nextPage() {
	dialog.showModal();
	document.getElementById("successDiv").classList.add("fadeInAndMoveUp");
	setTimeout(() => {
		window.location.href = "./login.html";
	}, 1000);
}
