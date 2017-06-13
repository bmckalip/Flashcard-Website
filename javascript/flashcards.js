var sets = [];
var xhr = new XMLHttpRequest();
window.onload = function(){
	loadSets();
}

function loadSets(){
	var urls = ["https://api.myjson.com/bins/gj9tn"];
	for (i in urls){
		requestSet(urls[i]);
	}
	
	//chevron event listners
	document.getElementById("").addEventListener("click", nextCard);
	document.getElementById("").addEventListener("click", prevCard);
	
	//tab event listeners
	for(){
		document.getElementById("").addEventListener("click", nextCard);
	}
	document.getElementById("").addEventListener("click", nextCard);
	document.getElementById("").addEventListener("click", nextCard);

}

function requestSet(url){
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

function setProgressBar(complete, total){
	var bar = document.getElementById("progressBar");
	var percentage = complete / total;
	//only add text value if it will "fit" (> 3% of the bar is filled)
	if(percentage > 5){
		bar.innerHTML = complete + "/" + total;
	}
	//set the width of bar
	bar.setAttribute("style", "width: " + percentage + "%");
}