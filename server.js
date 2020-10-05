const express = require("express");
const app = express();

var http = require("http").createServer(app);

var io = require("socket.io")(http);

app.use(express.static(__dirname + "/public/"));

usersNumber = 0;
io.on("connection", (socket) => {
  usersNumber++;

  socket.broadcast.emit("user is connected", usersNumber);
});

io.on("connection", (socket) => {
  socket.on("disconnection", () => {
    usersNumber--;
    io.emit("user is disconnected", usersNumber);
  });

  socket.on("chat message", (message) => {
    console.log("message", message);
    const delay = setTimeout(myFunction, 000);
    function myFunction() {
      socket.broadcast.emit("chat message", message);
    }
  });
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

http.listen(3000, () => {
  console.log("Server bezi na porte 3000");
});
