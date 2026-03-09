function speak(text){

let msg = new SpeechSynthesisUtterance(text);
msg.volume = 1;
msg.rate = 1;
msg.pitch = 1;

speechSynthesis.speak(msg);

}

function clickSound(){

let audio = new Audio("https://www.soundjay.com/button/sounds/button-16.mp3");
audio.play();

}

function winSound(){

let audio = new Audio("https://www.soundjay.com/human/sounds/applause-8.mp3");
audio.play();

}