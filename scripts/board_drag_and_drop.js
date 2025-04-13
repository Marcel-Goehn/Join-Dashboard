let currentDraggedElement;


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(category) {
    cards[currentDraggedElement].value.currentStatus = category;
    renderCards();
}


