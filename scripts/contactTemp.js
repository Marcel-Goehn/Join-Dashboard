function letterTemp(letter) {
	return `
        <div class="letterDiv">
            <span class="letterSpan">${letter}</span>
        </div>
        <div class="contactDivider"></div>
    `;
}

function contactTemp(email, name, phone, index, color) {
	return `
        <div class="actualContactDiv" id="actualContactDiv${index}"onclick="openContact('${email}', '${name}', '${phone}', '${color}', ${index}), slideInContactInfo(), clickContactSmall()">
            <div class="shorthandLetters" id="shorthand${index}">
                <span>${shorthandName(name)}</span>
            </div>
            <div class="contactListNameAndEmailDiv">
                <span class="contactListName">${name}</span>
                <span class="contactListEmail">${email}</span>
            </div>
        </div>
    `;
}

function contactInfoTemp(email, name, phone, color) {
	return `
        <div id="contactInfoInfoHeadline">
            <div id="initialsDivInfo">${shorthandName(name)}</div>
            <div id="nameAndEditDiv">
                <h3>${name}</h3>
                <div id="editDiv">
                    <div class="editBlock" onclick="openEditContactDial('${email}', '${name}', '${phone}', '${color}'), slideIn()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
<path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
</svg>
                        <span>Edit</span>
                    </div>
                    <div class="editBlock" onclick="deleteContact('${name}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
<path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
</svg>
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="contactInformationDiv">
        <p class="contactInformationP">Contact Information</p>
        </div>
        <div id="actualContactInformation">
            <div class="actualInfoBlock">
                <p>Email</p>
                <span class="emailInfo">${email}</span>
            </div>
            <div class="actualInfoBlock">
                <p>Phone</p>
                <span>${phone}</span>
            </div>
        </div>
    `;
}

function editContactDialTemp(email, name, phone) {
	return `
        <div id="editContactDialContent" class="slidedOut">
            <div id="editContactLogoAndTextDiv">
                <img src="../assets/img/sidebar/logoReversed.svg" alt="joinLogo">
                <div id="editContactTextDiv">
                    <h3>Edit contact</h3>
                </div>
            </div>
            <div id="editContactInfoDiv">
                <div id="closeDialBtnDiv">
                    <button id="closeDialBtn" onclick="closeContactDial()"><img src="../assets/img/close.png" alt="closeImg"></button>
                </div>
                <div id="contactImgAndFormDiv">
                    <div id="editImgDiv">
                       ${shorthandName(name)}
                    </div>
                    <div id="contactFormDiv">
                        <form id="editForm" novalidate>
                            <div class="formInputWrapper">
                                <div id="editDialNameDiv" class="formDiv">
                                    <input id="editDialNameInput" placeholder="Name" value="${name}" required type="text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM14 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z" fill="#A8A8A8"/>
                                    </svg>
                                </div>
                                <div id="editNameRefuseDiv" class="refuseDiv hideRefuseDiv"></div>
                            </div>
                            <div class="formInputWrapper">
                                <div id="editDialEmailDiv" class="formDiv">
                                    <input id="editDialEmailInput" placeholder="Email" value="${email}" type="email" required>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                                        <path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM18 4L10.525 8.675C10.4417 8.725 10.3542 8.7625 10.2625 8.7875C10.1708 8.8125 10.0833 8.825 10 8.825C9.91667 8.825 9.82917 8.8125 9.7375 8.7875C9.64583 8.7625 9.55833 8.725 9.475 8.675L2 4V14H18V4ZM10 7L18 2H2L10 7ZM2 4.25V2.775V2.8V2.7875V4.25Z" fill="#A8A8A8"/>
                                    </svg>
                                </div>
                                <div id="editEmailRefuseDiv" class="refuseDiv hideRefuseDiv"></div>
                            </div>
                            <div class="formInputWrapper">
                                <div id="editDialPhoneDiv" class="formDiv">
                                    <input id="editDialPhoneInput" placeholder="Phone" value="${phone}" type="tel" required>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                        <path d="M16.95 18.5C14.8667 18.5 12.8083 18.0458 10.775 17.1375C8.74167 16.2292 6.89167 14.9417 5.225 13.275C3.55833 11.6083 2.27083 9.75833 1.3625 7.725C0.454167 5.69167 0 3.63333 0 1.55C0 1.25 0.1 1 0.3 0.8C0.5 0.6 0.75 0.5 1.05 0.5H5.1C5.33333 0.5 5.54167 0.579167 5.725 0.7375C5.90833 0.895833 6.01667 1.08333 6.05 1.3L6.7 4.8C6.73333 5.06667 6.725 5.29167 6.675 5.475C6.625 5.65833 6.53333 5.81667 6.4 5.95L3.975 8.4C4.30833 9.01667 4.70417 9.6125 5.1625 10.1875C5.62083 10.7625 6.125 11.3167 6.675 11.85C7.19167 12.3667 7.73333 12.8458 8.3 13.2875C8.86667 13.7292 9.46667 14.1333 10.1 14.5L12.45 12.15C12.6 12 12.7958 11.8875 13.0375 11.8125C13.2792 11.7375 13.5167 11.7167 13.75 11.75L17.2 12.45C17.4333 12.5167 17.625 12.6375 17.775 12.8125C17.925 12.9875 18 13.1833 18 13.4V17.45C18 17.75 17.9 18 17.7 18.2C17.5 18.4 17.25 18.5 16.95 18.5Z" fill="#A8A8A8"/>
                                    </svg>
                                </div>
                                <div id="editPhoneRefuseDiv" class="refuseDiv hideRefuseDiv"></div>
                            </div>
                        </form>
                        <div id="dialButtonDiv">
                            <button id="deleteButton" onclick="deleteContact('${name}')">Delete</button>
                            <button id="saveBtn" onclick="validateContactForm('edit', '${name}', event)">Save
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                                    <path d="M5.55057 9.15L14.0256 0.675..." fill="white" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function addContactDialTemp() {
	return `
        <div id="addContactDialContent">
            <div id="addContactLogoAndTextDiv">
                <img src="../assets/img/sidebar/logoReversed.svg" alt="joinLogo">
                <div id="addContactTextDiv">
                <h3>Add contact</h3>
                <p><span id="afterSpan">Tasks</span> are better with a team!</p>
            </div>
            </div>
            <div id="addContactInfoDiv">
            <div id="closeDialBtnDiv">
                <button id="closeDialBtn" onclick="closeContactDial()"><img src="../assets/img/close.png" alt="closeImg"></button>
            </div>
                <div id="contactImgAndFormDiv">
                    <div id="contactImgDiv">
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                            <path d="M22.0001 22.0001C19.0667 22.0001 16.5556 20.9556 14.4667 18.8667C12.3779 16.7779 11.3334 14.2667 11.3334 11.3334C11.3334 8.40008 12.3779 5.88897 14.4667 3.80008C16.5556 1.71119 19.0667 0.666748 22.0001 0.666748C24.9334 0.666748 27.4445 1.71119 29.5334 3.80008C31.6223 5.88897 32.6667 8.40008 32.6667 11.3334C32.6667 14.2667 31.6223 16.7779 29.5334 18.8667C27.4445 20.9556 24.9334 22.0001 22.0001 22.0001ZM38.0001 43.3334H6.00008C4.53341 43.3334 3.27786 42.8112 2.23341 41.7668C1.18897 40.7223 0.666748 39.4668 0.666748 38.0001V35.8667C0.666748 34.3556 1.05564 32.9667 1.83341 31.7001C2.61119 30.4334 3.64453 29.4667 4.93341 28.8001C7.68897 27.4223 10.489 26.389 13.3334 25.7001C16.1779 25.0112 19.0667 24.6667 22.0001 24.6667C24.9334 24.6667 27.8223 25.0112 30.6667 25.7001C33.5112 26.389 36.3112 27.4223 39.0667 28.8001C40.3556 29.4667 41.389 30.4334 42.1667 31.7001C42.9445 32.9667 43.3334 34.3556 43.3334 35.8667V38.0001C43.3334 39.4668 42.8112 40.7223 41.7668 41.7668C40.7223 42.8112 39.4668 43.3334 38.0001 43.3334ZM6.00008 38.0001H38.0001V35.8667C38.0001 35.3779 37.8779 34.9334 37.6334 34.5334C37.389 34.1334 37.0667 33.8223 36.6667 33.6001C34.2668 32.4001 31.8445 31.5001 29.4001 30.9001C26.9556 30.3001 24.489 30.0001 22.0001 30.0001C19.5112 30.0001 17.0445 30.3001 14.6001 30.9001C12.1556 31.5001 9.73341 32.4001 7.33342 33.6001C6.93341 33.8223 6.61119 34.1334 6.36675 34.5334C6.1223 34.9334 6.00008 35.3779 6.00008 35.8667V38.0001ZM22.0001 16.6667C23.4667 16.6667 24.7223 16.1445 25.7668 15.1001C26.8112 14.0556 27.3334 12.8001 27.3334 11.3334C27.3334 9.86675 26.8112 8.61119 25.7668 7.56675C24.7223 6.5223 23.4667 6.00008 22.0001 6.00008C20.5334 6.00008 19.2779 6.5223 18.2334 7.56675C17.189 8.61119 16.6667 9.86675 16.6667 11.3334C16.6667 12.8001 17.189 14.0556 18.2334 15.1001C19.2779 16.1445 20.5334 16.6667 22.0001 16.6667Z" fill="white"/> </svg>
                    </div>
                    <div id="contactFormDiv">
                    <form>
                    <div class="formInputWrapper">
                        <div id="addDialNameDiv" class="formDiv">
                            <input id="addDialNameInput" placeholder="Name">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM14 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z" fill="#A8A8A8"/></svg>
                        </div>
                        <div id="addNameRefuseDiv" class="refuseDiv hideRefuseDiv"></div>
                        </div>
                             <div class="formInputWrapper">
                        <div id="addDialEmailDiv" class="formDiv">
                            <input id="addDialEmailInput" placeholder="Email">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                                <path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM18 4L10.525 8.675C10.4417 8.725 10.3542 8.7625 10.2625 8.7875C10.1708 8.8125 10.0833 8.825 10 8.825C9.91667 8.825 9.82917 8.8125 9.7375 8.7875C9.64583 8.7625 9.55833 8.725 9.475 8.675L2 4V14H18V4ZM10 7L18 2H2L10 7ZM2 4.25V2.775V2.8V2.7875V4.25Z" fill="#A8A8A8"/></svg>
                        </div>
                        <div id="addEmailRefuseDiv" class="refuseDiv hideRefuseDiv"></div>
                        </div>
                             <div class="formInputWrapper">
                        <div id="addDialPhoneDiv" class="formDiv">
                            <input id="addDialPhoneInput" placeholder="Phone">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                    <path d="M16.95 18.5C14.8667 18.5 12.8083 18.0458 10.775 17.1375C8.74167 16.2292 6.89167 14.9417 5.225 13.275C3.55833 11.6083 2.27083 9.75833 1.3625 7.725C0.454167 5.69167 0 3.63333 0 1.55C0 1.25 0.1 1 0.3 0.8C0.5 0.6 0.75 0.5 1.05 0.5H5.1C5.33333 0.5 5.54167 0.579167 5.725 0.7375C5.90833 0.895833 6.01667 1.08333 6.05 1.3L6.7 4.8C6.73333 5.06667 6.725 5.29167 6.675 5.475C6.625 5.65833 6.53333 5.81667 6.4 5.95L3.975 8.4C4.30833 9.01667 4.70417 9.6125 5.1625 10.1875C5.62083 10.7625 6.125 11.3167 6.675 11.85C7.19167 12.3667 7.73333 12.8458 8.3 13.2875C8.86667 13.7292 9.46667 14.1333 10.1 14.5L12.45 12.15C12.6 12 12.7958 11.8875 13.0375 11.8125C13.2792 11.7375 13.5167 11.7167 13.75 11.75L17.2 12.45C17.4333 12.5167 17.625 12.6375 17.775 12.8125C17.925 12.9875 18 13.1833 18 13.4V17.45C18 17.75 17.9 18 17.7 18.2C17.5 18.4 17.25 18.5 16.95 18.5ZM3.025 6.5L4.675 4.85L4.25 2.5H2.025C2.10833 3.18333 2.225 3.85833 2.375 4.525C2.525 5.19167 2.74167 5.85 3.025 6.5ZM11.975 15.45C12.625 15.7333 13.2875 15.9583 13.9625 16.125C14.6375 16.2917 15.3167 16.4 16 16.45V14.25L13.65 13.775L11.975 15.45Z" fill="#A8A8A8"/></svg>
                        </div>
                        <div id="addPhoneRefuseDiv" class="refuseDiv hideRefuseDiv"></div>
                        </div>
                    </form>
                    <div id="dialButtonDiv">
                    <button id="cancelButton" onclick="closeContactDial()">Cancel <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                        <path d="M7.001 6.50008L12.244 11.7431M1.758 11.7431L7.001 6.50008L1.758 11.7431ZM12.244 1.25708L7 6.50008L12.244 1.25708ZM7 6.50008L1.758 1.25708L7 6.50008Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                    <button id="createContactBtn" onclick="validateContactForm('add')">Create contact <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                        <path d="M5.55057 9.15L14.0256 0.675C14.2256 0.475 14.4631 0.375 14.7381 0.375C15.0131 0.375 15.2506 0.475 15.4506 0.675C15.6506 0.875 15.7506 1.1125 15.7506 1.3875C15.7506 1.6625 15.6506 1.9 15.4506 2.1L6.25057 11.3C6.05057 11.5 5.81724 11.6 5.55057 11.6C5.28391 11.6 5.05057 11.5 4.85057 11.3L0.550573 7C0.350573 6.8 0.25474 6.5625 0.263073 6.2875C0.271407 6.0125 0.375573 5.775 0.575573 5.575C0.775573 5.375 1.01307 5.275 1.28807 5.275C1.56307 5.275 1.80057 5.375 2.00057 5.575L5.55057 9.15Z" fill="white"/></svg></button>
                </dialButtonDiv>
                </div>
                </div>
            </div>
        </div>
    `;
}

function editMobileTemp(email, name, phone, color){
    return `<div id="optionsBtn" onclick="openBurger()"><img src="../assets/img/contacts/more_vert.png"></div>
            <div id="editBurger">  
                <div id="editDivMobile">
                    <div class="editBlock" onclick="openEditContactDial('${email}', '${name}', '${phone}', '${color}'), slideIn()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
<path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
</svg>
                        <span>Edit</span>
                    </div>
                    <div class="editBlock" onclick="deleteContact('${name}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
<path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
</svg>
                        <span>Delete</span>
                    </div>
                </div> 
            </div>`
    
    
}