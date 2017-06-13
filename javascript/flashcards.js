var sets = [];
var currCardIndex;
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
	document.getElementById("prevCard").addEventListener("click", nextCard);
	document.getElementById("nextCard").addEventListener("click", prevCard);
	
	//flip button
	document.getElementById("flipBtn").addEventListener("click", flipCard);
	
	//tab event listeners TODO: this will fail if original request for sets takes > 1 second
	setTimeout(addTabListeners, 1000);
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

function addTabListeners(){
	for(i in sets){
		document.getElementById(sets[i].name).addEventListener("click", function(){currSet=set[i]; currCardIndex = 0; displaySet(sets[i].name, currCardIndex)});
	}
}

function displaySet(setName, position){
	var head = document.getElementById("cardHead").innerHTML;
	var body = document.getElementById("cardBody").innerHTML;
	loadCard(setName, position);
}

function nextCard(){
	
}

function prevCard(){
	
}

function loadCard(){
	
}

function flipCard(){
	console.log("flipping");
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