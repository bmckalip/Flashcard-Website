var sets = [];
var currCardIndex;
var currSet = {};
var xhr = new XMLHttpRequest();
window.onload = function(){
	loadSets();
}

function loadSets(){
	var urls = ["https://api.myjson.com/bins/r8wjf"];
	for (i in urls){
		requestSet(urls[i]);
	}
	
	//chevron event listners
	document.getElementById("prevCard").addEventListener("click", prevCard);
	document.getElementById("nextCard").addEventListener("click", nextCard);
	
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
		document.getElementById(sets[i].name).addEventListener("click", function(){currSet=sets[i]; currCardIndex = -1; displaySet(sets[i], currCardIndex)});
	}
}

function displaySet(set, position){
	loadCard(set, position);
}

function nextCard(){
	try{
		if(currCardIndex < currSet.cards.length){
			currCardIndex++;
			loadCard(currSet, currCardIndex);
		}
		console.log("next: " + currCardIndex + " / " + currSet.cards.length);
	}catch(TypeError){}
	
}

function prevCard(){
	if(currCardIndex > -1){
		currCardIndex--;
		loadCard(currSet, currCardIndex);
	}
	console.log("prev: " + currCardIndex);
}

function loadCard(set, position){
	var head = document.getElementById("cardHead");
	var body = document.getElementById("cardBody");
	var card = set.cards[position];
	
	console.log(card);
	//progress bar
	setProgressBar((position + 1), set.cards.length);
	if(position <= -1){
		head.innerHTML = set.name;
		body.innerHTML = "Press the next arrow to begin!"
	}else if(position >= set.cards.length){
		head.innerHTML = set.name;
		body.innerHTML = "Press the Restart button to begin again!"
	}else{
		head.innerHTML = "Question";
		try{
			body.innerHTML = card.question;
		}catch(TypeError){
			
		}		
	}
}

function flipCard(){
	var head = document.getElementById("cardHead");
	var body = document.getElementById("cardBody");
	
	if(currCardIndex >= 0 && currCardIndex <= currSet.cards.length){
		var card = currSet.cards[currCardIndex];
		console.log("flipping");
	}
	if(head.innerHTML.toLowerCase().includes("question")){
		head.innerHTML = "Answer";
		body.innerHTML = card.answer;
	}else if(head.innerHTML.toLowerCase().includes("answer")){
		head.innerHTML = "Question";
		console.log(card);
		body.innerHTML = card.question;
	}

}

function setProgressBar(complete, total){
	var bar = document.getElementById("progressBar");
	var percentage = complete / total * 100;
	console.log(complete + " / " + total + " | " + percentage);
	
	//only add text value if it will "fit" (> 3% of the bar is filled)
	if(percentage > 5){
		bar.innerHTML = complete + "/" + total;
	}else{
		bar.innerHTML = "";
	}
	//set the width of bar
	bar.setAttribute("style", "width: " + percentage + "%");
}