socket.on("move", (data) => {
  board[data.index] = data.player;

  currentPlayer = data.player === "X" ? "O" : "X";

  updateTurn();
  checkWinner();
  createBoard();
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

  // ❌ REMOVE local update here
  // board[i] = mySymbol;

  socket.emit("move", { roomId, index: i, player: mySymbol });
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