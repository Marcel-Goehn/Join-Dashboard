const userObjectForCheck = sessionStorage.getItem("loggedIn");
checkIfLoggedIn();


function checkIfLoggedIn(){
	if(userObjectForCheck === null || undefined){
		window.location.href = "../index.html";
	}
}