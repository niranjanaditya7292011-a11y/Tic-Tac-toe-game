const socket = io()

const cells = document.querySelectorAll(".cell")

let board = ["","","","","","","","",""]
let turn = "X"

cells.forEach((cell,index)=>{

cell.onclick=()=>{

if(board[index]!="") return

board[index]=turn
cell.innerHTML=turn

socket.emit("move",{index,turn})

checkWin()

turn = turn=="X" ? "O":"X"

}

})

socket.on("move",data=>{

board[data.index]=data.turn
cells[data.index].innerHTML=data.turn

})

function checkWin(){

const wins=[
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
]

wins.forEach(w=>{

if(board[w[0]] &&
board[w[0]]==board[w[1]] &&
board[w[1]]==board[w[2]]){

speak(board[w[0]]+" wins")

}

})

}

function speak(text){

let msg = new SpeechSynthesisUtterance(text)
speechSynthesis.speak(msg)

}