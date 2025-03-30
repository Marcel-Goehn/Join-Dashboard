const dialog = document.getElementById('overlay');
const wrapper = document.querySelector('.wrapper');


function openDialog() {
    dialog.showModal();
}


function closeDialog() {
    dialog.close();
}


dialog.onclick = function(e) {
    if(!wrapper.contains(e.target)) {
        dialog.close();
    }
}