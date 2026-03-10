const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");

let player={
x:100,
y:100,
color:"red"
};

let mapColor="#222";

function draw(){

ctx.fillStyle=mapColor;
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle=player.color;
ctx.fillRect(player.x,player.y,30,30);

requestAnimationFrame(draw);

}

draw();

document.addEventListener("keydown",e=>{

if(e.key=="w")player.y-=10;
if(e.key=="s")player.y+=10;
if(e.key=="a")player.x-=10;
if(e.key=="d")player.x+=10;

socket.emit("move",player);

});

socket.on("move",data=>{

ctx.fillStyle="blue";
ctx.fillRect(data.x,data.y,30,30);

});