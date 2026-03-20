const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("move", (data) => {
    socket.broadcast.emit("move", data);
  });
});

server.listen(3000, () => console.log("Server running"));