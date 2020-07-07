var track = new Object;

const giflinks = ["https://media.giphy.com/media/4oMoIbIQrvCjm/source.gif", 
"https://media.giphy.com/media/tqfS3mgQU28ko/source.gif",
"https://media.giphy.com/media/tbapfDZ4mZJn2/source.gif",
"https://media.giphy.com/media/blSTtZehjAZ8I/source.gif",
"https://media.giphy.com/media/pa37AAGzKXoek/source.gif"];

// const ADDRESS = "http://localhost:8000/"
const ADDRESS = "https://skyhoffert-backend.com/"
const SHOULD_RELOAD = true;

const checkPasscode = function(guess){
    const xhr = new XMLHttpRequest();
	const pass_addr = ADDRESS+"check_passcode";
	console.log("using "+pass_addr);
    xhr.open("GET", pass_addr);
    xhr.setRequestHeader('guess', guess);
    
    xhr.onload = function(){
        if (xhr.status >= 400){
            document.querySelector("#someError p").innerHTML = "Error with passcode check "+xhr.responseText;
            someError.style.display = "block";
            console.log(xhr.response);
		if (SHOULD_RELOAD) {
            		location.reload();
		}
        } else{
            var json = JSON.parse(xhr.response)
            if(json.success === 'false'){
		    if (SHOULD_RELOAD) {
                	location.reload();
		    }
                console.log(xhr.response)
            };

        }
    };

    xhr.onerror = function(){
        document.querySelector("#someError p").innerHTML = "Error with passcode check "+xhr.responseText;
        someError.style.display = "block";
        console.log(xhr.response);
	    if (SHOULD_RELOAD) {
        	location.reload();
	    }
    };

    xhr.send();
};

const performRequest = function(){
    confirmSong.style.display = "none";

    const xhr = new XMLHttpRequest();
    const pass_addr = ADDRESS+"perform_request";
    console.log("using "+pass_addr);
    xhr.open("POST", pass_addr);
    xhr.setRequestHeader('track', track.id);

    xhr.onload = function(){
        if (xhr.status >= 400){
            document.querySelector("#someError p").innerHTML = "Error adding song to queue :(";
            someError.style.display = "block";
            console.log(xhr.response)
            
        } else{
            document.querySelector("#successGiph p").innerHTML = "Success! '" +track.name+ "' has been added to the queue.";
            document.querySelector("#successGiph img").src = giflinks[Math.floor(Math.random() * giflinks.length)];
            successGiph.style.display = "block";
        }
    };

    xhr.onerror = function(){
        document.querySelector("#someError p").innerHTML = "Error adding song to the queue :(";
        someError.style.display = "block";
        console.log(xhr.response)
    };

    xhr.send();
};

function getSearch() {
    confirmSong.style.display = "none";
    someError.style.display = "none";
    successGiph.style.display = "none";

    const xhr = new XMLHttpRequest();
    const pass_addr = ADDRESS+"search";
    console.log("using "+pass_addr);
    xhr.open("GET", pass_addr);

    var input = document.getElementById("myText").value;
    var inputData = encodeURIComponent(input);
    xhr.setRequestHeader('input', inputData);

    xhr.onload = function(){
        if (xhr.status >= 400){
            document.querySelector("#someError p").innerHTML = "Error with passcode check "+xhr.responseText;
            someError.style.display = "block";
            console.log(xhr.response);
        } else {
            var json = JSON.parse(xhr.response)
            track.name = json.body.tracks.items[0].name;
            track.id = json.body.tracks.items[0].id;
            track.artist = json.body.tracks.items[0].artists[0].name;
            document.querySelector("#confirmSong p").innerHTML = "Do you want to listen to '" +track.name+ "' by "+track.artist+" ?";
            confirmSong.style.display = "block";
        }
    };
        
    xhr.onerror = function(){
        document.querySelector("#someError p").innerHTML = "Error with passcode check "+xhr.responseText;
        someError.style.display = "block";
        console.log(xhr.response);   
    };

    xhr.send()
};

var passcode = prompt("Please enter passcode", "");

if (passcode == null || passcode == "") {
  location.reload(true);
  console.log("User cancelled the prompt.");
} else {
  checkPasscode(passcode)
};

var input = document.getElementById("myText");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   getSearch()
  }
});