/* import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import connection from "./config/db";
import userRoutes from "./routes/user.routes";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true, // Allow credentials
    },
  });

const PORT = process.env.PORT;

// Connect MongoDB
connection();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("sendMessage", (message) => {
    console.log("Received message:", message);
    
    // Broadcast message to all clients
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 */



const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend to connect
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.get("/", (req: any, res: any) => {
  res.send("Socket.io Server is running");
});

// Store online users (optional)
let onlineUsers = new Map();

io.on("connection", (socket: any) => {
  console.log("A user connected:", socket.id);

  // Receive and Broadcast Messages
  socket.on("sendMessage", (messageData: any) => {
    console.log("recieved : ", messageData);
    
    io.emit("receiveMessage", messageData); // Broadcast to all users
  });

  // Handle User Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Socket.io Server running on port 5000");
});
