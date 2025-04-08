const contactsDiv = document.getElementById("contactsSidebarDiv");
const addTaskDiv = document.getElementById("addTaskSidebarDiv");
const boardDiv = document.getElementById("boardSidebarDiv");
const summaryDiv = document.getElementById("summarySidebarDiv");

function highlightSidebarLink() {
	const currentHtmlSite = window.location.pathname;
	switch (currentHtmlSite) {
		case "/contacts.html":
			contactsDiv.classList.add("highlighted");
			break;

		case "/summary.html":
			summaryDiv.classList.add("hightlighted");
			break;

		case "/board.html":
			boardDiv.classList.add("hightlighted");
			break;

		case "/addTask.html":
			addTaskDiv.classList.add("hightlighted");
			break;

		default:
			addTaskDiv.classList.remove("hightlighted");
			boardDiv.classList.remove("hightlighted");
			summaryDiv.classList.remove("hightlighted");
			contactsDiv.classList.remove("hightlighted");
	}
}
