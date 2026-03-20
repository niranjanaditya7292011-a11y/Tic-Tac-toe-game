const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Serve frontend files
app.use(express.static(path.join(__dirname)));

// When someone opens site
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Socket connection
io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("move", (data) => {
    socket.broadcast.emit("move", data);
  });
});

// IMPORTANT for Render
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});