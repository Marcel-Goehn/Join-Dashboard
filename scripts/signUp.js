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
let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let confirmPWValidation = false;
let privacyValidation = false;
const colors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E","#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B",  "#FF4646", "#FFBB2B"];
const databaseLinkRef = "https://join---database-default-rtdb.europe-west1.firebasedatabase.app/users.json";


/**
 * 
 * @returns - It returns the fetched registered users of the dashboard
 */
async function fetchData() {
	const response = await fetch(databaseLinkRef);
	const data = await response.json();
	return data;
}


/**
 * this funktion checks if a regex is met, its for the name and requieres only letters with a space between
 * 
 * @returns returns a boolean to check if requirments are met
 */
function validateName() {
	const pattern = /^[A-Za-z]+ [A-Za-z]+$/;
	if (!pattern.test(nameInput.value)) {
		nameRefuseDiv.innerHTML = "Enter first and lastname separated by a space.";
		setRedBorder(nameBorder);
		showRefuseDiv(nameRefuseDiv);
		nameValidation = false;
		enableButtonAfterValidation();
		return false;
	}
	nameValidation = true;
	enableButtonAfterValidation();
	revertBorderColor(nameBorder);
	disableRefuseDiv(nameRefuseDiv);
	return true;
}


/**
 * this function checks if a regex is met, its for the email and searches for a input + a @ + a . and atleast 2 letters at the end
 * 
 * @returns returns a boolean to check if requirments are met
 */
function validateEmail() {
	const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!pattern.test(emailInput.value)) {
		emailRefuseDiv.innerHTML = "Please enter your email";
		setRedBorder(emailBorder);
		showRefuseDiv(emailRefuseDiv);
		emailValidation = false;
		enableButtonAfterValidation();
		return false;
	}
	emailValidation = true;
	enableButtonAfterValidation();
	revertBorderColor(emailBorder);
	disableRefuseDiv(emailRefuseDiv);
	return true;
}


/**
 * this functions checks if a regex is met, its for the passwort and requieres atleast 8 chars with min one letter and min 1 number
 * 
 * @returns returns a boolean to check if requirments are met
 */
function validatePassword() {
	const pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
	if (!pattern.test(passwordInput.value)) {
		passwordRefuseDiv.innerHTML = "Min. 8 Characters, 1 Letter and 1 Number";
		setRedBorder(pwBorder);
		showRefuseDiv(passwordRefuseDiv);
		passwordValidation = false;
		enableButtonAfterValidation();
		return false;
	}
	passwordValidation = true;
	enableButtonAfterValidation();
	revertBorderColor(pwBorder);
	disableRefuseDiv(passwordRefuseDiv);
	return true;
}


/**
 * this functions checks if the passwort input value matches the confirm password value
 * 
 * @returns returns a boolean to check if requirments are met
 */
function validateConfirmPassword() {
	if (passwordInput.value !== passwordConfirmationInput.value) {
		confirmRefuseDiv.innerHTML = "Your passwords dont match. Try again.";
		setRedBorder(confPwBorder);
		showRefuseDiv(confirmRefuseDiv);
		confirmPWValidation = false;
		enableButtonAfterValidation();
		return false;
	}
	confirmPWValidation = true;
	enableButtonAfterValidation();
	revertBorderColor(confPwBorder);
	disableRefuseDiv(confirmRefuseDiv);
	return true;
}


/**
 * this function checks if the checkbox is checked or not
 * 
 * @returns returns a boolean to check if requirments are met
 */
function validatePrivacy() {
	if (!checkbox.checked) {
		toggleBorder();
		setTimeout(() => {
			toggleBorder();
		}, 2000);
		privacyValidation = false;
		enableButtonAfterValidation();
		return false;
	}
	privacyValidation = true;
	enableButtonAfterValidation();
	return true;
}


/**
 * this function checks if all validations are met and if so redirect to the login page and uploads the new contact to the server
 * 
 * @returns undifined
 */

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


/**
 * makes the button clickable after after validations are met
 */
function enableButtonAfterValidation(){
	if(nameValidation && passwordValidation && confirmPWValidation && emailValidation && privacyValidation){
		document.getElementById("signUpBtn").disabled = false;
	}else{
		document.getElementById("signUpBtn").disabled = true;
	}
}


/**
 * reverts the border color of a element
 * 
 * @param {document} element - the element which border color should get reverted 
 */
function revertBorderColor(element) {
		element.style.border = "";
		element.focus();
}


/**
 * hides a refuse dif
 * 
 * @param {document} refuseDiv a refuse div
 */
function disableRefuseDiv(refuseDiv) {
		refuseDiv.classList.add("hideRefuseDiv");
		refuseDiv.classList.remove("showRefuseDiv");
}


/**
 * shows a refuse div
 * 
 * @param {document} refuseDiv a refuse div
 */
function showRefuseDiv(refuseDiv) {
	refuseDiv.classList.remove("hideRefuseDiv");
	refuseDiv.classList.add("showRefuseDiv");
}


/**
 * colors the border of an element red
 * 
 * @param {document} element the element which border hsould get colored
 */
function setRedBorder(element) {
	element.style.border = "1px solid red";
}


/**
 * this function delets the value of an input, if its not a number
 * 
 * @param {event} event input
 */
function revertNotLetters(event){
	event.target.value = event.target.value.replace(/[^A-Za-zÄäÖöÜüß\s\-]/g, '');
}


/**
 * this function gets a specific color out of the colors array based on how many users are in the database
 * 
 * @returns the color that is searched
 */

async function getColor(){
	const userDataColor = await fetchData();
	const color = colors[Object.keys(userDataColor).length % colors.length];
	return color;
  }


/**
 * this function posts the user to the database
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 */
async function postUser(name, email, password) {
	const userColor = await getColor();
	const newUser = {
		name,
		email: email.toLowerCase(),
		password,
		contacts: null,
		color: userColor,
	};
	const request = await fetch(databaseLinkRef, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newUser),
	});
	await addSelfToContacts(name, email)
}


/**
 * this function posts the user into the contacts in the database
 * 
 * @param {string} name 
 * @param {string} email 
 */
async function addSelfToContacts(name, email){
	const newContactData = {
	name,
	email: email.toLowerCase(),
	color: await getColor(),
	phone: "+4911111111",
	}
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
}


/**
 * this function gets the userID based on the name
 * 
 * @param {object} data contacts/users object out of the database
 * @param {string} name the name of the specific user/contact
 * @returns the user id
 */
async function getUserId(data, name) {
	const userId = Object.entries(data).find(
		([, value]) => value.name === name
	)?.[0];
	return userId;
}


/**
 * this function checks if the emailadress is already taken
 * 
 * @returns a boolean to check if requierements are met
 */
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


/**
 * this function checks if the email is taken
 */
function emailTaken() {
	emailRefuseDiv.innerHTML = "Email is already taken.";
	setRedBorder(emailBorder);
	showRefuseDiv(emailRefuseDiv);
	setTimeout( ()=>{
		revertBorderColor(emailBorder);
	},2000)
	setTimeout(()=>{
		disableRefuseDiv(emailRefuseDiv);
	},2000)
	
}


/**
 * this function reverts the border color of an element
 * 
 * @param {document} element the element which border color should get reverted
 */
function revertBorderColor(element) {
		element.style.border = "";
		element.focus();
	if (element === checkboxBorder) {
			element.style.outline = "";
			element.focus();
	}
}


/**
 * this function redirects to the index page
 */
function nextPage() {
	dialog.showModal();
	document.getElementById("successDiv").classList.add("fadeInAndMoveUp");
	setTimeout(() => {
		window.location.href = "../index.html";
	}, 1000);
}


/**
 * this functions toggles the border color from red to normal and back
 */
function toggleBorder() {
	checkboxBorder.classList.toggle("redBorder");
	checkboxBorder.classList.toggle("normalBorder");
}


/**
 * this function switches the icons in the password input
 * 
 * @param {number} id 
 */
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


/**
 * this function switches the icons in the password input
 * 
 * @param {number} id 
 */
function switchToLock(id) {
	id === "PW" ? (input = passwordInput) : (input = passwordConfirmationInput);
	document.getElementById(`lockIcon${id}`).classList.remove("hideIcon");
	document.getElementById(`eyeOpen${id}`).classList.add("hideIcon");
	document.getElementById(`eyeClosed${id}`).classList.add("hideIcon");
	input.type = "password";
}


/**
 * this function allows to see the password in the input field
 * 
 * @param {number} id 
 */
function toggleVisibility(id) {
	id === "PW" ? (input = passwordInput) : (input = passwordConfirmationInput);
	document.getElementById(`eyeClosed${id}`).classList.toggle("hideIcon");
	document.getElementById(`eyeOpen${id}`).classList.toggle("hideIcon");
	document.getElementById(`eyeClosed${id}`).classList.contains("hideIcon")
		? (input.type = "text")
		: (input.type = "password");
}


/**
 * this function switches icons based on the input
 * 
 * @param {number} id 
 */
function switchIcons(id) {
	id === "PW" ? (input = passwordInput) : (input = passwordConfirmationInput);
	input.value.length > 0 ? switchToClosedEye(id) : switchToLock(id);
}
