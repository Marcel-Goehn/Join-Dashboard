checkIfLoggedIn();


/**
 * This function checks if a user is logged in before the DOM get's rendered. If there is no user logged in, the DOM will not get loaded and the the user will get redirected to the login page.
 */
function checkIfLoggedIn(){
	const userObjectForCheck = sessionStorage.getItem("loggedIn");
	if(userObjectForCheck === null || undefined){
		window.location.href = "../index.html";
	}
}