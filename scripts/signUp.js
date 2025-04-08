const nameInput = document.getElementById("signUpName");
const nameBorder = document.getElementById("signUpInputNameDiv");
const nameRefuseDiv = document.getElementById("nameRefuseDiv");
const emailInput = document.getElementById("signUpEmail");
const emailBorder = document.getElementById("signUpInputEmailDiv");
const emailRefuseDiv = document.getElementById("emailRefuseDiv");
const passwordInput = document.getElementById("signUpPassword");
const pwBorder = document.getElementById("signUpInputPasswordDiv");
const passwordRefuseDiv = document.getElementById("passwordRefuseDiv");
const passwordConfirmationInput = document.getElementById("signUpConfirmPw");
const confPwBorder = document.getElementById("signUpInputConfirmPwDiv");
const confirmRefuseDiv = document.getElementById("confirmRefuseDiv");
const checkbox = document.getElementById("privacyCheckbox");
const checkboxBorder = document.getElementById("checkboxBorder");
const dialog = document.getElementById("succesfulSignUpDial");
let previousLength = 0;

const databaseLinkRef =
	"https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users.json";

async function fetchData() {
	const response = await fetch(databaseLinkRef);
	const data = await response.json();
	console.log(data);
	return data;
}

/** Validation start */

function validateName() {
	const pattern = /^[A-Za-z]+ [A-Za-z]+$/;
	if (!pattern.test(nameInput.value)) {
		nameRefuseDiv.innerHTML = "Enter first and lastname separated by a space.";
		setRedBorder(nameBorder);
		showRefuseDiv(nameRefuseDiv);
		revertBorderColor(nameBorder);
		disableRefuseDiv(nameRefuseDiv);
		return false;
	}
	return true;
}

function validateEmail() {
	const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!pattern.test(emailInput.value)) {
		emailRefuseDiv.innerHTML = "Please enter your email";
		setRedBorder(emailBorder);
		showRefuseDiv(emailRefuseDiv);
		revertBorderColor(emailBorder);
		disableRefuseDiv(emailRefuseDiv);
		return false;
	}
	return true;
}

function validatePassword() {
	const pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
	if (!pattern.test(passwordInput.value)) {
		passwordRefuseDiv.innerHTML = "Min. 8 Characters, 1 Letter and 1 Number";
		setRedBorder(pwBorder);
		showRefuseDiv(passwordRefuseDiv);
		revertBorderColor(pwBorder);
		disableRefuseDiv(passwordRefuseDiv);
		return false;
	}
	return true;
}

function validateConfirmPassword() {
	if (passwordInput.value !== passwordConfirmationInput.value) {
		confirmRefuseDiv.innerHTML = "Your passwords dont match. Try again.";
		setRedBorder(confPwBorder);
		showRefuseDiv(confirmRefuseDiv);
		revertBorderColor(confPwBorder);
		disableRefuseDiv(confirmRefuseDiv);
		return false;
	}
	return true;
}

function validatePrivacy() {
	if (!checkbox.checked) {
		toggleBorder();
		setTimeout(() => {
			toggleBorder();
		}, 2000);
		return false;
	}
	return true;
}

async function validateForm() {
	if (
		validateName() &&
		validateEmail() &&
		validatePassword() &&
		validateConfirmPassword() &&
		validatePrivacy()
	) {
		if (!(await compareEmailWithData())) {
			emailTaken();
			return;
		}
		postUser(nameInput.value, emailInput.value, passwordInput.value);
		nextPage();
	}
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

/* --------------------- > Validation end ----------------------------- */

async function postUser(name, email, password) {
	const newUser = {
		name,
		email: email.toLowerCase(),
		password,
		contacts: null,
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
		emailTaken();
		return false;
	}
	return true;
}

function emailTaken() {
	emailRefuseDiv.innerHTML = "Email is already taken.";
	setRedBorder(emailBorder);
	showRefuseDiv(emailRefuseDiv);
	revertBorderColor(emailBorder);
	disableRefuseDiv(emailRefuseDiv);
}

function revertBorderColor(element) {
	setTimeout(() => {
		element.style.border = "";
		element.focus();
	}, 2000);
	if (element === checkboxBorder) {
		setTimeout(() => {
			element.style.outline = "";
			element.focus();
		}, 2000);
	}
}

function nextPage() {
	dialog.showModal();
	document.getElementById("successDiv").classList.add("fadeInAndMoveUp");
	setTimeout(() => {
		window.location.href = "./login.html";
	}, 1000);
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
	element.style.border = "1px solid #FF001F";
}

function toggleBorder() {
	checkboxBorder.classList.toggle("redBorder");
	checkboxBorder.classList.toggle("normalBorder");
}

function switchToClosedEye(id) {
	if (input.value.length > 0 && input.type === "password") {
		document.getElementById(`eyeOpen${id}`).classList.add("hideIcon");
		document.getElementById(`lockIcon${id}`).classList.add("hideIcon");
		document.getElementById(`eyeClosed${id}`).classList.remove("hideIcon");
	} else {
		document.getElementById(`lockIcon${id}`).classList.add("hideIcon");
		document.getElementById(`eyeClosed${id}`).classList.add("hideIcon");
		document.getElementById(`eyeOpen${id}`).classList.remove("hideIcon");
	}
}

function switchToLock(id) {
	id === "PW" ? (input = passwordInput) : (input = passwordConfirmationInput);
	document.getElementById(`lockIcon${id}`).classList.remove("hideIcon");
	document.getElementById(`eyeOpen${id}`).classList.add("hideIcon");
	document.getElementById(`eyeClosed${id}`).classList.add("hideIcon");
	input.type = "password";
}

function toggleVisibility(id) {
	id === "PW" ? (input = passwordInput) : (input = passwordConfirmationInput);
	document.getElementById(`eyeClosed${id}`).classList.toggle("hideIcon");
	document.getElementById(`eyeOpen${id}`).classList.toggle("hideIcon");
	document.getElementById(`eyeClosed${id}`).classList.contains("hideIcon")
		? (input.type = "text")
		: (input.type = "password");
}

function switchIcons(id) {
	id === "PW" ? (input = passwordInput) : (input = passwordConfirmationInput);
	input.value.length > 0 ? switchToClosedEye(id) : switchToLock(id);
}
