const duedateInput = document.getElementById("dueDateInput");
const shownDuedate = document.getElementById("correctDateFormat");

function showCorrectData(){
    console.log(duedateInput.value)
    const [year, month, day] = duedateInput.value.split("-");

    shownDuedate.value = `${day}/${month}/${year}`;
}