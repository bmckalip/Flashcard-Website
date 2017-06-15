window.onload = function(){
	document.getElementById("register").addEventListener("click", function(){validateInputs("all")});
	document.getElementById("usernameInput").addEventListener("keyup", function() {validateInputs("username")});
	document.getElementById("emailInput").addEventListener("keyup", function() {validateInputs("email")});
	document.getElementById("passwordInput").addEventListener("keyup", function() {validateInputs("password1")});
	document.getElementById("passwordConfirmInput").addEventListener("keyup", function() {validateInputs("password2")});
}

function validateInputs(field){
	//inputs
	var username = document.getElementById("usernameInput").value;
	var email = document.getElementById("emailInput").value;
	var password1 = document.getElementById("passwordInput").value;
	var password2 = document.getElementById("passwordConfirmInput").value;
	
	//output
	var label = document.getElementById("errorLabel");
	
	
	switch(field){
		case "username":
			validateUsername(username);
			break;
		case "email":
			validateEmail(email);
			break;
		case "password1":
			if(validatePassword(password1)){
				if(password1 != password2){
					setWarning("Passwords Don't Match");
				}else{
					setValid("Valid Strong Password");
				}
			}
			break;
		case "password2":
			if(validatePassword(password2)){
				if(password1 != password2){
					setWarning("Passwords Don't Match");
				}else{
					setValid("Valid Strong Password");
				}
			}
			break;
		case "all":
			if( validateUsername(username) && 
				validateEmail(email) &&
				validatePassword(password1) && 
				validatePassword(password2) &&
				password1 == password2
			   ){
				   //all fields valid, rredirect to login page
					window.location.replace("./login.html");
				}
			break;
		default:
			console.log("Invalid call to validateInputs(): improper field type");
	}
}

function validatePassword(password){
	var passLength = new RegExp("(?=.{8,})");
	var passLower = new RegExp("(?=.*[a-z])");
	var passUpper = new RegExp("(?=.*[A-Z])");
	var passNum = new RegExp("(?=.*[0-9])");
	var passSpec = new RegExp("(?=.*[!@#\$%\^&\*])");

	//if not 8 characters long
	if(!passLength.test(password)){
		setWarning("Password must be at least 8 characters long");
		return false;
	//if does not contain a lowercase letter
	}else if(!passLower.test(password)){
		setWarning("Password must contain a lowercase letter");
		return false;
	//if does not contain an uppercase letter
	}else if(!passUpper.test(password)){
		setWarning("Password must contain an uppercase letter");
		return false;
	//if does not contain a number
	}else if(!passNum.test(password)){
		setWarning("Password must contain a number");
		return false;
	//if does not contain a special character
	}else if(!passSpec.test(password)){
		setWarning("Password must contain a special character");
		return false;
	//otherwise password is valid, return true
	}else{
		setValid("Valid Password");
		return true;	
	}
}

function validateEmail(email){
	var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(!emailPattern.test(email)){
		setWarning("Invalid email address");
		return false;
	}else{
		setValid("Valid Email");
		return true;
	}
}

function validateUsername(username){
	if(username.length < 3){
		setWarning("Username must be at least 3 characters long");
		return false;
	}else{
		setValid("Valid Username");
		return true;
	}
}

function setWarning(warningString){
	var label = document.getElementById("errorLabel");
	label.setAttribute("class", "center-block label label-danger");
	label.innerHTML = warningString;
}

function setValid(validString){
	var label = document.getElementById("errorLabel");
	label.setAttribute("class", "center-block label label-success");
	label.innerHTML = validString;
}