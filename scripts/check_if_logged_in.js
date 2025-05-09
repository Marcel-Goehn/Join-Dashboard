checkIfLoggedIn();


function checkIfLoggedIn(){
	const userObjectForCheck = sessionStorage.getItem("loggedIn");
		console.log("test;")
	if(userObjectForCheck === null || userObjectForCheck === undefined){
		window.location.href = "../index.html";
		console.log("NOT CHECKING")
	}

}