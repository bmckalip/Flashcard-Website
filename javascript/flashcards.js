//globals

// locations of flashcard sets - add more urls to add more sets
var urls = ["https://api.myjson.com/bins/r8wjf"];
//locally loaded flashcard sets
var sets = [];

//current loaded set information
var currCardIndex;
var currSet = {};

window.onload = function(){
	loadSets();
	addListeners();
}

function loadSets(){
	//request all sets from each url
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
	
	//set attributes of outer element
	newTab.setAttribute("role", "presentation");
	newTab.setAttribute("id", cardSet.name);
	
	//set attributes of child element 
	newLink.setAttribute("role", "button");
	newLink.innerHTML = cardSet.name;
	
	//nest elements
	newTab.appendChild(newLink);
	document.getElementById("sets").appendChild(newTab);
}

function addListeners(){
	//chevron event listners
	document.getElementById("prevCard").addEventListener("click", prevCard);
	document.getElementById("nextCard").addEventListener("click", nextCard);
	
	//flip button
	document.getElementById("flipBtn").addEventListener("click", flipCard);
	
	//reset Button
	document.getElementById("resetBtn").addEventListener("click", resetCardSet);
	
	//tab event listeners TODO: this will fail if original request for sets takes > 1 second
	setTimeout(addTabListeners, 1000);
}

function addTabListeners(){
	for(i in sets){
		document.getElementById(sets[i].name).addEventListener("click", function(){currSet=sets[i]; currCardIndex = -1; loadCard(sets[i], currCardIndex)});
	}
}

/* ------------ card DOM manipulation functions ---------------- */

//
function loadCard(set, position){
	var head = document.getElementById("cardHead");
	var body = document.getElementById("cardBody");
	var card = set.cards[position];

	//progress bar
	setProgressBar((position + 1), set.cards.length);
	
	//-1 denotes the "title" card (before the first question)
	if(position <= -1){
		head.innerHTML = set.name;
		body.innerHTML = "Press the next arrow to begin!"
	}else if(position >= set.cards.length){
		head.innerHTML = set.name;
		body.innerHTML = "Press the Restart button to begin again!"
	}else{
		head.innerHTML = "Question";
		//type error can be raised if the button is clicked and there is no cardset loaded
		try{
			body.innerHTML = card.question;
		}catch(TypeError){
			
		}		
	}
}

function nextCard(){
	//type error can be raised if the button is clicked and there is no cardset loaded
	try{
		if(currCardIndex < currSet.cards.length){
			currCardIndex++;
			loadCard(currSet, currCardIndex);
		}
	}catch(TypeError){}
	
}

function prevCard(){
	if(currCardIndex > -1){
		currCardIndex--;
		loadCard(currSet, currCardIndex);
	}
}

function flipCard(){
	var head = document.getElementById("cardHead");
	var body = document.getElementById("cardBody");
	
	//only load the card if within proper bounds (if it exists) to avoid IndexError
	if(currCardIndex >= 0 && currCardIndex <= currSet.cards.length){
		var card = currSet.cards[currCardIndex];
	}
	
	if(head.innerHTML.toLowerCase().includes("question")){
		head.innerHTML = "Answer";
		body.innerHTML = card.answer;
	}else if(head.innerHTML.toLowerCase().includes("answer")){
		head.innerHTML = "Question";
		body.innerHTML = card.question;
	}

}

function setProgressBar(complete, total){
	var bar = document.getElementById("progressBar");
	var percentage = complete / total * 100;
	
	//only add text value if it will "fit" (> 3% of the bar is filled)
	if(percentage > 5){
//		bar.innerHTML = complete + "/" + total;
		bar.innerHTML = percentage + "%";
	}else{
		bar.innerHTML = "";
	}
	//set the width of bar
	bar.setAttribute("style", "width: " + percentage + "%");
}

function resetCardSet(){
	//type error can be raised if the button is clicked and there is no cardset loaded
	try{
		currCardIndex = -1;
		setProgressBar((currCardIndex + 1), currSet.cards.length);
		loadCard(currSet, currCardIndex)
	}catch(TypeError){}
}