 const socket = io();

let playerName;

function login(){

playerName = document.getElementById("name").value;

document.getElementById("login").style.display="none";

socket.emit("join",{name:playerName});

}

function sendChat(){

let msg = document.getElementById("msg").value;

socket.emit("chat",{
name:playerName,
text:msg
});

}

socket.on("chat",data=>{

let chat=document.getElementById("chatBox");

chat.innerHTML+=`<p><b>${data.name}</b>: ${data.text}</p>`;

});