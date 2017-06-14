window.onload = function(){
	document.getElementById("lookup").addEventListener("click", lookupSummoner);
}

function lookupSummoner(){
	var name = document.getElementById("nameInput").value;
	url = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + name;
	//append api key
	url += "?api_key=" + "408d9b94-ca89-4402-97c2-b43d66f43884" // make sure to regen this key after project presentation
	console.log(url);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	xhr.send();
	xhr.onreadystatechange = function(){
		//ensure valid response
		if(xhr.readyState == 4 && xhr.status == 200){
			//add the card set to the global array of sets
			var response = JSON.parse(xhr.responseText);
			console.log(response);
		}
	}
}