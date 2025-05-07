const scrollContainers = document.querySelectorAll('.scroll-container');
let wasDragging = false;


/**
 * This function enables the drag to scroll function in the mobile view for the cards in the board
 */
scrollContainers.forEach(container => {
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    isDown = true;
    container.classList.add('dragging');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', (e) => {
    e.stopPropagation();
    isDown = false;
    container.classList.remove('dragging');
  });

  container.addEventListener('mouseup', (e) => {
    e.stopPropagation();
    isDown = false;
    container.classList.remove('dragging');
  });

  container.addEventListener('mousemove', (e) => {
    e.stopPropagation();
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
        wasDragging = true;
    }
    container.scrollLeft = scrollLeft - walk;
  });
  checkScreenWidth();
});