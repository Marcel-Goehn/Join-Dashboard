let currentDraggedElement;


/**
 * 
 * @param {number} id - The index of the current dragged card
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * 
 * @param {Event} ev - Prevents the drag and drop from the standard behavior of the browser 
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * This function changes the current state of the card, after the re-rendering it will appear in the right section. This function also updates the database so the change of the drag and drop will be saved
 * 
 * @param {string} category - The state in wich the card will be dropped 
 */
function moveTo(category) {
        const array = getCurrentArray();
        array[currentDraggedElement].value.currentStatus = category;
        renderCards(array);
        updateDatabase(array[currentDraggedElement].id, category);
   
}


/**
 * This function updates the database.
 * 
 * @param {number} id - The id of the current card 
 * @param {string} cat - The new state/section in wich the card was dropped
 */
async function updateDatabase(id, cat) {
    const array = getCurrentArray();
    await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/test/${id}.json`, {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            category : array[currentDraggedElement].value.category,
            currentStatus : cat,
            description : array[currentDraggedElement].value.description,
            duedate : array[currentDraggedElement].value.duedate,
            priority : array[currentDraggedElement].value.priority,
            title : array[currentDraggedElement].value.title,
            subtasks : array[currentDraggedElement].value.subtasks,
            assigned : array[currentDraggedElement].value.assigned
        })
    })
}


