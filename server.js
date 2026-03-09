const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

let rooms = {};

io.on("connection", socket => {

socket.on("joinRoom", data => {

const {room, name, symbol} = data;

socket.join(room);

if(!rooms[room]) rooms[room] = [];

rooms[room].push({
id: socket.id,
name: name,
symbol: symbol
});

io.to(room).emit("players", rooms[room]);

});

socket.on("move", data => {

io.to(data.room).emit("move", data);

});

socket.on("gameOver", data => {

io.to(data.room).emit("gameOver", data);

});

socket.on("disconnect", () => {

for(let room in rooms){
rooms[room] = rooms[room].filter(p => p.id !== socket.id);
}

});

});

http.listen(3000, () => {
console.log("Server running on http://localhost:3000");
});