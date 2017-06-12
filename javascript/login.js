/**/
window.onload = function(){
	document.getElementById("login").addEventListener("click", updateLabel);
}

function updateLabel(){
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
		login.setAttribute("class", "btn btn-md btn-success center-block");
		login.innerHTML = "Logging in";
		window.location.replace("./flashcards.html");
		
	}else{
		login.setAttribute("class", "btn btn-md btn-warning center-block");
		login.innerHTML = "Invalid Credentials";
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