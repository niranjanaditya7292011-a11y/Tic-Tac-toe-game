const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let players = {};

io.on("connection", socket => {

console.log("Player connected");

socket.on("join", player => {
players[socket.id] = player;
io.emit("players", players);
});

socket.on("move", data => {
socket.broadcast.emit("move", data);
});

socket.on("chat", msg => {
io.emit("chat", msg);
});

socket.on("disconnect", () => {
delete players[socket.id];
io.emit("players", players);
});

});

server.listen(3000, () => {
console.log("Server running http://localhost:3000");
});