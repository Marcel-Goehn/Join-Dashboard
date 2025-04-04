function getToDoTemplate(index) {
    return `<div onclick="openDialog(${index})" class="card">
                            <h2>
                                <span class="card-header">${cards[index].value.category}</span>
                            </h2>
                            <h3>${cards[index].value.title}</h3>
                            <p>${cards[index].value.description}</p>
                            <div class="subtasks">
                                <div class="progress-bar">
                                    <div class="progress" style="width: 50%;"></div>
                                </div>
                                <span class="subtask-txt">1/2 Subtasks</span>
                            </div>
                            <div class="users">
                                <div class="user-icons">
                                    ${getAssignedUsers(index)}
                                </div>
                                <img src="../assets/img/${cards[index].value.priority}.svg">
                            </div>
                        </div>`; // Progressbar muss noch ausgerechnet werden.
}


/*function getProgressTemplate() {
    return ``;
}


function getFeedbackTemplate() {
    return ``;
}


function getDoneTemplate() {
    return ``;
}*/


function getAssignedUsersTemplate(first, last) {
    return `<div class="user-1 user">${first}${last}</div>`
}