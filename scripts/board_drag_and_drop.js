let currentDraggedElement;


/**
 * Add's an animation for the current selected card wich is getting dragged and dropped
 * 
 * @param {number} cardIndex 
 */
function addCardAnimation(cardIndex) {
    document.getElementById(`card${cardIndex}`).classList.add('card-animation');
}


/**
 * Removes an animation for the current seleced card wich was getting dragged and dropped
 * 
 * @param {number} cardIndex 
 */
function removeCardAnimation(cardIndex) {
    document.getElementById(`card${cardIndex}`).classList.remove('card-animation');
}


/**
 * When the section is getting hovered with drag & drop, the empty box will be seen, to let the user know where to drop the card
 * 
 * @param {string} placeholder 
 */
function showDropBox(placeholder) {
    document.getElementById(`${placeholder}_drop_box`).classList.remove('o_hidden');
}


/**
 * Hides the empty box again, after the user leaves the section when Drag & Dropping
 * 
 * @param {string} placeholder 
 */
function hideDropBox(placeholder) {
    document.getElementById(`${placeholder}_drop_box`).classList.add('o_hidden');
}


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


