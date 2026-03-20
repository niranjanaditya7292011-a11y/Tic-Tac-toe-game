let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

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

function makeMove(i) {
  if (board[i] === "" && gameActive) {
    board[i] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    checkWinner();
    createBoard();
  }
}

function playAI() {
  resetGame();
  document.getElementById("status").innerText = "Playing vs Computer";
}

function aiMove() {
  let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
  let random = empty[Math.floor(Math.random() * empty.length)];
  board[random] = "O";
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  wins.forEach(w => {
    if (board[w[0]] && board[w[0]] === board[w[1]] && board[w[1]] === board[w[2]]) {
      document.getElementById("winner").innerText = "Winner: " + board[w[0]];
      gameActive = false;
    }
  });
}

function resetGame() {
  board = ["","","","","","","","",""];
  gameActive = true;
  createBoard();
}

createBoard();