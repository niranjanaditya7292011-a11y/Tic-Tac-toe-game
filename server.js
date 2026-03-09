const express = require("express")
const app = express()

const http = require("http").createServer(app)
const io = require("socket.io")(http)

app.use(express.static(__dirname))

io.on("connection",socket=>{

console.log("player connected")

socket.on("move",data=>{

socket.broadcast.emit("move",data)

})

})

http.listen(3000,()=>{

console.log("server running")

})