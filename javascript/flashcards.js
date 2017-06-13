var sets = [];
window.onload = function(){
	loadTabs();
}

function loadTabs(){
	var urls = ["https://api.myjson.com/bins/gj9tn"];
	for (i in urls){
		requestSet(urls[i]);
	}
}

function requestSet(url){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.send();
	xhr.onreadystatechange = function(){
		//ensure valid response
		if(xhr.readyState == 4 && xhr.status == 200){
			//add the card set to the global array of sets
			var cardSet = JSON.parse(xhr.responseText);
			sets.push(cardSet);
			addTab(cardSet);
		}
	}
}

function addTab(cardSet){
	var newTab = document.createElement("li");
	var newLink = document.createElement("a");
	
	newTab.setAttribute("role", "presentation");
	newTab.setAttribute("id", cardSet.name);
	
	newLink.setAttribute("role", "button");
	newLink.innerHTML = cardSet.name;
	newTab.appendChild(newLink);
	
	document.getElementById("sets").appendChild(newTab);
}