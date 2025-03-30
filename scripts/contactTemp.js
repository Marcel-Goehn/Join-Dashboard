function letterTemp(letter){
    return `
        <div class="letterDiv">
            <span class="letterSpan">${letter}</span>
        </div>
    `
}

function contactTemp(email, name, phone){
    return `
        <div class="actualContactDiv" onclick="openContact(${email, name, phone})">
            <div id="shorthandLetters">
                <span>${shorthandName(name)}</span>
            </div>
            <div id="contactListNameAndEmailDiv">
                <span class="contactListName">${name}</span>
                <span class="contactListEmail">${email}</span>
            </div>
        </div>
    `
}