/**
 * Initializes the cheIfLoggedIn function when the html page get's opened
 */
checkIfLoggedIn();


/**
 * Checks if the user is logged in before the html get's rendered. If he is not logged in he ain't getting permission to access the page and gets redirected to the login page.
 */
function checkIfLoggedIn(){
	const userObjectForCheck = sessionStorage.getItem("loggedIn");
	if(userObjectForCheck === null || userObjectForCheck === undefined){
		window.location.href = "../index.html";
		console.log("NOT CHECKING")
	}

}