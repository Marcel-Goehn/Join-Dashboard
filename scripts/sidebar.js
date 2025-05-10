const contactsDiv = document.getElementById("contactsSidebarDiv");
const addTaskDiv = document.getElementById("addTaskSidebarDiv");
const boardDiv = document.getElementById("boardSidebarDiv");
const summaryDiv = document.getElementById("summarySidebarDiv");
checkPrivacyAndLegalLogIn();


/**
 * This function checks wich side is currently active. The active side will receive a highlighted background color in the sidebar.
 */
function highlightSidebarLink() {
	const currentHtmlSite = window.location.pathname;
	switch (currentHtmlSite) {
		case "/Join/html/contacts.html":
			contactsDiv.classList.add("highlighted");
			break;

		case "/Join/html/summary.html":
			summaryDiv.classList.add("highlighted");
			break;

		case "/Join/html/board.html":
			boardDiv.classList.add("highlighted");
			break;

		case "/Join/html/addTask.html":
			addTaskDiv.classList.add("highlighted");
			break;

		default:
			addTaskDiv.classList.remove("highlighted");
			boardDiv.classList.remove("highlighted");
			summaryDiv.classList.remove("highlighted");
			contactsDiv.classList.remove("highlighted");
	}
}


/**
 * This function checks if the current active html page is either legalnotice or privacy policy. After it checks if there is any user logged in or not. In dependency to that the highlighting in the sidebar will be accorded to that.
 */
function checkPrivacyAndLegalLogIn() {
    const path = window.location.pathname;
	if (path.includes('legalNotice.html') || path.includes('privacyPolicy.html')) {
			if (sessionStorage.getItem("loggedIn") == null) {
		document.getElementById('loginSidebarDiv').classList.remove('hidden');
		document.getElementById('navLinksDiv').classList.add('hidden');
			} else {
		document.getElementById('loginSidebarDiv').classList.add('hidden');
		document.getElementById('navLinksDiv').classList.remove('hidden');
			}
	}
	if (path.includes('legal.html') || path.includes('privacy.html')) {
			if (sessionStorage.getItem("loggedIn") == null) {
		document.getElementById('loginSidebarDiv').classList.remove('hidden');
		document.getElementById('navLinksDiv').classList.add('hidden');
			} else {
		document.getElementById('loginSidebarDiv').classList.add('hidden');
		document.getElementById('navLinksDiv').classList.remove('hidden');
			}
	}

}