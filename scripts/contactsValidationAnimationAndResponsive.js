// VALIDATION FUNCTIONS //

/**
 * this function checks, if every validation is met and if so than it continues and starts the follow functions
 * 
 * @param {string} addOrEdit is chosing whether the add contact dial or the editcontact dial is beeing validated 
 * @param {string} name name of the specific contact 
 * @param {event} event click 
 */
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

/**
 * this function validates the phone input based on a regex
 * 
 * @param {number} phoneInput the phonenumber of the specific contact
 * @param {document} refuseDiv the specifc refuse div correlating the input 
 * @param {document} phoneInputDiv the specific input div for the phone input 
 * @returns a boolean
 */
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

/**
 * this function validates the nameinput based on a regex
 * 
 * @param {string} nameInput the name of the specific contact
 * @param {document} refuseDiv the specific refuse div correlating the input
 * @param {document} nameInputDiv the specific input div for the name input
 * @returns a boolean
 */
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

/**
 * this function validates the emailinput based on a regex
 * 
 * @param {string} emailInput 
 * @param {document} refuseDiv 
 * @param {document} emailInputDiv 
 * @returns a boolean
 */
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

/**
 * this function reverts the border color after 2 seconds to white
 * 
 * @param {document} element a div where the border should get reverted
 */
function revertBorderColor(element) {
	setTimeout(() => {
		element.style.border = "";
		element.focus();
	}, 2000);
}

/**
 * this function hides the refusediv after 2 seconds
 * 
 * @param {document} refuseDiv the refuseDiv that should get hidden 
 */
function disableRefuseDiv(refuseDiv) {
	setTimeout(() => {
		refuseDiv.classList.add("hideRefuseDiv");
		refuseDiv.classList.remove("showRefuseDiv");
	}, 2000);
}

/**
 * this function shows the refuse div
 * 
 * @param {document} refuseDiv the refuseDiv that should get shown 
 */
function showRefuseDiv(refuseDiv) {
	refuseDiv.classList.remove("hideRefuseDiv");
	refuseDiv.classList.add("showRefuseDiv");
}

/**
 * this function sets the border of a div red
 * 
 * @param {document} element the element that should get a red border 
 */
function setRedBorder(element) {
	element.style.border = "1px solid red";
}

// END VALIDATION FUNCTIONS //

// RESPONSIVE FUNCTIONS //

/**
 * this function adds the mobile template to to the contactInfoContent Div
 * 
 * @param {string} email the email of the specific contact
 * @param {string} name the name of the specific contact
 * @param {number} phone the phonenumber of the specific contact
 * @param {string} color the color of the specific contact 
 */
function getMobileIn(email, name, phone, color){
	const contactInfoContent = document.getElementById("contactInfo");
	const optionsBtn = contactInfoContent.querySelector("#optionsBtn");
	if (optionsBtn) {
		optionsBtn.remove();
	}
	contactInfoContent.innerHTML += editMobileTemp(email, name, phone, color);
}

/**
 * this function hides a part of the contacts page for responsiveness reasons
 * 
 * @param {document} contentLimiter the contentLimiter Div
 * @param {document} stickyContacts the stickyContacts Div
 * @param {document} addNewContactBtn the addNewContactBtn
 * @param {document} addNewFixed the addNewFixed Div
 */
function switchToSingleView(contentLimiter, stickyContacts, addNewContactBtn, addNewFixed){
	if(!document.getElementById("stickyContactsContent").classList.contains("dnone")){
	contentLimiter.classList.add("dnone");
	contentLimiter.style.width = window.innerWidth + "px";
	stickyContacts.style.width = window.innerWidth + "px";
	addNewContactBtn.classList.add("dnone")
	addNewFixed.classList.remove("dnone");
}
}

/**
 * this is a eventlistener which listens to the window innerwidth
 */
function addResizeListener(){
	window.addEventListener("resize", resizeHandler)
	}

/**
* this is the eventhandler for the resize listener, its checks if the innerwidth of the winfow is lower or higher than 650px. if its lower than 650px it starts the responsive functions, if its higher it reverts the responsive functions
*/
resizeHandler = () => {
		const contentLimiter = document.getElementById("contentLimiter");
		const stickyContacts = document.getElementById("stickyContacts");
		const addNewContactBtn = document.getElementById("addNewContactBtn");
		const addNewFixed = document.getElementById("addContactFixed");
		const stickyContactsContent = document.getElementById("stickyContactsContent");
		if(window.innerWidth <= 650){
			switchToSingleView(contentLimiter, stickyContacts, addNewContactBtn, addNewFixed);
		}else if(window.innerWidth > 650){
			contentLimiter.classList.remove("dnone");
			stickyContacts.style.width = "auto";
			addNewContactBtn.classList.remove("dnone");
			addNewFixed.classList.add("dnone");
			contentLimiter.style.width = "auto";
			stickyContactsContent.classList.remove("dnone");
			const optionsBtn = document.getElementById("optionsBtn");
			optionsBtn.classList.remove("show");
			closeBurger();
		}}
	
	/**
	 * this functions checks if the width of the viewport is smaller than 650px, and if so thann hides some elements of the contacts page
	 */
	function clickContactSmall(){
		if(window.innerWidth < 650){
			const stickyContactsContent = document.getElementById("stickyContactsContent");
			stickyContactsContent.classList.add("dnone");
			const contentLimiter = document.getElementById("contentLimiter");
			contentLimiter.classList.remove("dnone");
			const optionsBtn = document.getElementById("optionsBtn");
			optionsBtn.classList.add("show");
		}
	}
	/**
	 * this functions checks if the width of the viewport is smaller than 650px, and if so it shows a button on the contact page
	 */
	function backSmall(){
		if(window.innerWidth < 650){
			const stickyContactsContent = document.getElementById("stickyContactsContent");
			stickyContactsContent.classList.remove("dnone");
			const contentLimiter = document.getElementById("contentLimiter");
			contentLimiter.classList.add("dnone");
			const optionsBtn = document.getElementById("optionsBtn");
			optionsBtn.classList.remove("show");

		}
	}
	
	/**
	 * this function adds toggles a evenbt listener for a burger menu
	 * 
	 * @param {event} event click
	 */
	function toggleBurger(event) {
		event.stopPropagation();
		const burgerDiv = document.getElementById("editBurger");
		
		if (burgerDiv.classList.contains("slideBurgerIn")) {
		  closeBurger();
		} else {
		  openBurger();
		  document.addEventListener("click", closeBurgerHandler);
		}
	  }
	  
	  /**
	   * this function opens the burger menu
	   */
	  function openBurger() {
		const burgerDiv = document.getElementById("editBurger");
		burgerDiv.classList.remove("slideBurgerOut");
		burgerDiv.classList.add("slideBurgerIn");
	  }
	  
	  /**
	   * this function closes the burgermenu
	   */
	  function closeBurger() {
		const burgerDiv = document.getElementById("editBurger");
		if (burgerDiv) {
		  burgerDiv.classList.remove("slideBurgerIn");
		  burgerDiv.classList.add("slideBurgerOut");
		}
	  }
	  
	  /**
	   * this functions removes the burgerhandler if the conditions are met
	   * 
	   * @param {event} event click 
	   */
	  function closeBurgerHandler(event) {
		const burgerDiv = document.getElementById("editBurger");
		const optionsBtn = document.getElementById("optionsBtn");
		
		if (!burgerDiv.contains(event.target) && event.target !== optionsBtn) {
		  closeBurger();
		  document.removeEventListener("click", closeBurgerHandler);
		}
	  }

// END RESPONSIVE FUNCTIONS //

// ANIMATION FUNCTIONS //

/**
 * this functions adds the animation do the edit contact dial
 */
function slideIn() {
	const editDialContent = document.getElementById("editContactDialContent");
	editDialContent.classList.toggle("slideIn");
}

/**
 * this function adds a animation to the add contact dial
 */
function slideInAddContact() {
	const addContactDialContent = document.getElementById(
		"addContactDialContent"
	);
	addContactDialContent.classList.toggle("slideIn");
}

/**
 * this function adds a animation to the contactinfo
 */
function slideInContactInfo() {
	const contactInfoInfo = document.getElementById("contactInfoInfo");
	contactInfoInfo.classList.remove("slideInContactInfo");
	void contactInfoInfo.offsetWidth;
	contactInfoInfo.classList.add("slideInContactInfo");
}

/**
 * this function slides in the success div
 */
function successMsg() {
	const successDialBtn = document.getElementById("successBtn");
	successDialBtn.classList.add("slideMsgInAndOut");
	setTimeout(() => {
		successDialBtn.classList.remove("slideMsgInAndOut");
	}, 2000);
	addContactDial.close();
}

/**
 * this function adds the slideOut animation to one of the dials
 * 
 * @param {document} contentDial the add or edit contact dial 
 */
function slideOut(contentDial) {
	contentDial.classList.remove("slideIn");
	contentDial.classList.add("slideOut");
}

// END ANIMATION FUNCTIONS //