const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

let rooms = {};

io.on("connection", (socket) => {

  socket.on("createRoom", () => {
    const roomId = Math.random().toString(36).substr(2, 5);
    rooms[roomId] = [socket.id];

    socket.join(roomId);
    socket.emit("roomCreated", roomId);
  });

  socket.on("joinRoom", (roomId) => {
    if (rooms[roomId] && rooms[roomId].length < 2) {
      rooms[roomId].push(socket.id);
      socket.join(roomId);

      io.to(roomId).emit("startGame", {
        players: rooms[roomId]
      });
    } else {
      socket.emit("errorMsg", "Room full or not exist");
    }
  });

socket.on("move", ({ roomId, index, player }) => {
  io.to(roomId).emit("move", { index, player });
});

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running");
});