const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// ✅ Serve static files (VERY IMPORTANT)
app.use(express.static(__dirname));

// ✅ Default route (FIX FOR "Not Found")
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Socket
io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("move", (data) => {
    socket.broadcast.emit("move", data);
  });
});

// ✅ Render PORT fix
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});