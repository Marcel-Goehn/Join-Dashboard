const contactsDiv = document.getElementById("contactsSidebarDiv");
const addTaskDiv = document.getElementById("addTaskSidebarDiv");
const boardDiv = document.getElementById("boardSidebarDiv");
const summaryDiv = document.getElementById("summarySidebarDiv");

function highlightSidebarLink() {
	const currentHtmlSite = window.location.pathname;
	switch (currentHtmlSite) {
		case "/html/contacts.html":
			contactsDiv.classList.add("highlighted");
			break;

		case "/html/summary.html":
			summaryDiv.classList.add("highlighted");
			break;

		case "/html/board.html":
			boardDiv.classList.add("highlighted");
			break;

		case "/html/addTask.html":
			addTaskDiv.classList.add("highlighted");
			break;

		default:
			addTaskDiv.classList.remove("hightlighted");
			boardDiv.classList.remove("hightlighted");
			summaryDiv.classList.remove("hightlighted");
			contactsDiv.classList.remove("hightlighted");
	}
}
