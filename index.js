const PORT = 3000;
const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

const activeUsers = new Set();

io.on("connection", (socket) => {
  console.log(
    `New connection from ${socket.handshake.address}, ${socket.handshake.time}`
  );

  socket.on("new user connected", (data) => {
    socket.data.user = data + Date.now();
    activeUsers.add(socket.data.user);
    io.emit("new user connected", [...activeUsers]);
  });

  socket.on("chat", (data) => {
    let messageFromUser = `${socket.data.user}: ${data}`;
    io.emit("chat", messageFromUser)
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
