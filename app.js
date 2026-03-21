const socket = io();

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "";
let mySymbol = "";
let roomId = "";
let gameActive = false;

const boardDiv = document.getElementById("board");

function createBoard() {
  boardDiv.innerHTML = "";
  board.forEach((cell, i) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.innerText = cell;
    div.onclick = () => makeMove(i);
    boardDiv.appendChild(div);
  });
}

function createRoom() {
  socket.emit("createRoom");
}

function joinRoom() {
  const input = document.getElementById("roomInput").value;
  socket.emit("joinRoom", input);
}

socket.on("roomCreated", (id) => {
  roomId = id;
  mySymbol = "X";
  document.getElementById("roomId").innerText = id;
  document.getElementById("turn").innerText = "Waiting for player...";
});

socket.on("startGame", () => {
  gameActive = true;

  if (!mySymbol) mySymbol = "O";

  currentPlayer = "X";

  document.getElementById("turn").innerText = "Game Started! Turn: X";
});

function makeMove(i) {
  if (!gameActive) return;
  if (board[i] !== "") return;
  if (currentPlayer !== mySymbol) return;

  board[i] = mySymbol;

  socket.emit("move", { roomId, index: i, player: mySymbol });

  currentPlayer = mySymbol === "X" ? "O" : "X";

  updateTurn();
  checkWinner();
  createBoard();
}

socket.on("move", (data) => {
  board[data.index] = data.player;

  currentPlayer = data.player === "X" ? "O" : "X";

  updateTurn();
  checkWinner();
  createBoard();
});

function updateTurn() {
  document.getElementById("turn").innerText = "Turn: " + currentPlayer;
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  wins.forEach(w => {
    if (board[w[0]] &&
        board[w[0]] === board[w[1]] &&
        board[w[1]] === board[w[2]]) {

      document.getElementById("winner").innerText =
        "Winner: " + board[w[0]];

      gameActive = false;
    }
  });
}

createBoard();