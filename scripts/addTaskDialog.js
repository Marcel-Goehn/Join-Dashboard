const addTaskDial = document.getElementById("addTaskDial");


/**
 * starts an animation to slide the addTask Dialog into frame
 * @param {string} section section from which the taskcard originates
 */
function openAddTask(section) {
	clearDialog();
	currentStatus = section;
	addTaskDial.showModal();
	addTaskDial.classList.remove("slideTaskDialOut");
	addTaskDial.classList.add("slideTaskDialIn");
}


/**
 * starts an animation to slide the addTask Dialog out of frame
 */
function closeAddTask() {
	addTaskDial.classList.remove("slideTaskDialIn");
	addTaskDial.classList.add("slideTaskDialOut");
	setTimeout(() => {
		addTaskDial.close();
	}, 1000);
}


/**
 * clears all content from the addtask-dialog
 */
function clearDialog() {
    title.value = null;
    document.getElementById('description').value = null;
    duedate.value = null;
    select('medium');
    selectedContacts.innerHTML = "";
    getContacts(contactData);
    assignedContacts = {};
    selectedCategory.innerHTML = "Select task category";
    document.getElementById('addedSubtasks').innerHTML = "";
	document.getElementById('confirm_btn').disabled = true;
}