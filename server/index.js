const express = require("express");
const { db } = require("./config/db");
const app = express();
const { userRoutes } = require("./routes/userRoutes");
var cors = require("cors");
const http = require("http");
const Server = require("socket.io").Server;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

require("dotenv").config();

db.connect();

app.use(express.json());

app.use("/api/users", userRoutes);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("chatMessage", (data) => {
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3300, () => {
  console.log("Express is running...");
});
