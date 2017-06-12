/**/
window.onload = function(){
	//reset button when either input is focused
	document.getElementById("usernameInput").addEventListener("focus", resetButton);
	document.getElementById("passwordInput").addEventListener("focus", resetButton);
	
	//conditionally color button when it's is clicked
	document.getElementById("login").addEventListener("click", updateButton);
}

function resetButton(){
	var login = document.getElementById("login");
	login.setAttribute("class", "btn btn-md btn-primary center-block");
	login.innerHTML = ("Login");
}

function updateButton(){
	var xhr = new XMLHttpRequest();
	url = "https://api.myjson.com/bins/f19dn"
	xhr.open("GET", url);
	var response = xhr.send();
	
	xhr.onreadystatechange = function(){
		//ensure valid response
		if(xhr.readyState == 4 && xhr.status == 200){
			var response = JSON.parse(xhr.responseText);
			displayLabel(response);
		}
	}
}

function displayLabel(response){
	var login = document.getElementById("login");
	if(isValidCredentials(response)){
		window.location.replace("./flashcards.html");
	}else{
		login.setAttribute("class", "btn btn-md btn-danger center-block");
		login.innerHTML = "Invalid Credentials";
		document.getElementById("passwordInput").value = "";
	}
}

function isValidCredentials(response){
	var username = document.getElementById("usernameInput").value;
	var password = document.getElementById("passwordInput").value;
	
	if(username.toLowerCase() == response.username && password == response.password){
		return true;
	}else{
		return false;
	}
}