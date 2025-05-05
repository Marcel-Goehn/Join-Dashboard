const addTaskDial = document.getElementById("addTaskDial");

function openAddTask(section) {
	console.log(currentStatus);
	currentStatus = section;
	console.log(currentStatus);
	addTaskDial.showModal();
	addTaskDial.classList.remove("slideTaskDialOut");
	addTaskDial.classList.add("slideTaskDialIn");
}

function closeAddTask() {
	addTaskDial.classList.remove("slideTaskDialIn");
	addTaskDial.classList.add("slideTaskDialOut");
	setTimeout(() => {
		addTaskDial.close();
	}, 1000);
}