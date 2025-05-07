let currentDraggedElement;
let currentOpenedMobileOverlay;


/**
 * Add's an animation for the current selected card wich is getting dragged and dropped
 * 
 * @param {number} cardIndex 
 */
function addCardAnimation(cardIndex) {
    if(window.innerWidth <= 1000) {
        return;
    }
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
 * This function opens the mobile drag and drop container
 * 
 * @param {event} e  
 * @param {*} cardIndex - The index of the current selected card 
 */
function showMobileDragDropMenu(e, cardIndex) {
    e.stopPropagation();
    const dragDropMobileContainer = document.getElementById(`mobile_drag_drop_container_${cardIndex}`);
    dragDropMobileContainer.classList.remove('d_none');
    const backdrop = document.getElementById('mobile_backdrop');
    backdrop.classList.remove('d_none');
    backdrop.style.height = `${document.documentElement.scrollHeight}px`;
    currentOpenedMobileOverlay = cardIndex;
}


/**
 * This function closes the mobile drag and drop container
 * 
 * @param {event} e 
 */
function closeMobileDragDropMenu(e) {
    const dragDropMobileContainer = document.getElementById(`mobile_drag_drop_container_${currentOpenedMobileOverlay}`);
    if (!dragDropMobileContainer.contains(e.target)) {
        dragDropMobileContainer.classList.add('d_none');
        document.getElementById('mobile_backdrop').classList.add('d_none');
        currentOpenedMobileOverlay = undefined;
    }
    else if (dragDropMobileContainer.contains(e.target)) {
        e.stopPropagation();
        return;
    }
}


/**
 * This function will update the database and ui after the card get's dropped
 * 
 * @param {number} cardIndex - The index of the current selected card 
 * @param {string} placeholder - holds the value of where the card will be dropped
 * @param {event} e 
 */
function mobileDropTo(cardIndex, placeholder, e) {
    const array = getCurrentArray();
    array[cardIndex].value.currentStatus = placeholder;
    currentOpenedMobileOverlay = undefined;
    document.getElementById('mobile_backdrop').classList.add('d_none');
    renderCards(array);
    updateMobileDatabase(cardIndex, array[cardIndex].id);
    e.stopPropagation();
}


/**
 * This function updates the database.
 * 
 * @param {number} id - The id of the current card 
 * @param {string} cat - The new state/section in wich the card was dropped
 */
async function updateDatabase(id, cat) {
    const array = getCurrentArray();
    await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/kanban/${id}.json`, {
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


/**
 * This function will update the database after a card got drag and dropped in the mobile view
 * 
 * @param {number} cardIndex - The index of the current selected card 
 * @param {string} id - The key of the current selected card
 */
async function updateMobileDatabase(cardIndex, id) {
    const array = getCurrentArray();
    await fetch(`https://join---database-default-rtdb.europe-west1.firebasedatabase.app/kanban/${id}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            category: array[cardIndex].value.category,
            currentStatus: array[cardIndex].value.currentStatus,
            description: array[cardIndex].value.description,
            duedate: array[cardIndex].value.duedate,
            priority: array[cardIndex].value.priority,
            title: array[cardIndex].value.title,
            subtasks: array[cardIndex].value.subtasks,
            assigned: array[cardIndex].value.assigned
        })
    });
}


