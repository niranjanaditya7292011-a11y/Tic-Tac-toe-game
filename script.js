const socket = io();

let room;
let name;
let symbol;

let board = ["","","","","","","","",""];
let turn = "X";

const boardDiv = document.getElementById("board");

for(let i=0;i<9;i++){

let cell = document.createElement("div");
cell.classList.add("cell");
cell.dataset.index=i;

cell.onclick = () => play(i);

boardDiv.appendChild(cell);

}

function join(){

name = document.getElementById("name").value;
room = document.getElementById("room").value;
symbol = document.getElementById("symbol").value;

socket.emit("joinRoom",{room,name,symbol});

document.getElementById("menu").style.display="none";

}

function play(i){

if(board[i] !== "") return;
if(turn !== symbol) return;

clickSound();

board[i]=symbol;

update();

socket.emit("move",{room,index:i,symbol});

checkWin();

turn = turn==="X" ? "O":"X";

}

socket.on("move",data=>{

board[data.index]=data.symbol;

update();

checkWin();

turn = turn==="X" ? "O":"X";

});

function update(){

document.querySelectorAll(".cell").forEach((c,i)=>{

c.textContent = board[i];

});

}

function checkWin(){

const wins = [

[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]

];

for(let w of wins){

let a=w[0],b=w[1],c=w[2];

if(board[a] && board[a]==board[b] && board[a]==board[c]){

winSound();

let winner = board[a]==symbol ? name : "Opponent";

let loser = board[a]==symbol ? "Opponent" : name;

speak(winner + " wins the game. " + loser + " loses.");

socket.emit("gameOver",{room,winner});

}

}

}