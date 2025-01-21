import "./db.js";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";

import Chat from "./models/chat.model.js";
import { PORT } from "./config.js";



const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection",async (socket) => {
  socket.on("message", async (data) => {
    io.emit("message", data);
    const { message, nickname } = data;
     await Chat.create({
      message,
      nickname,
    });
  });

  if(!socket.recovered){
    const chatsmessages = await Chat.find();
    for(const message of chatsmessages){
        socket.emit("message",message);
    }
  }

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });


});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});


