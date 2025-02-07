"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // Allow frontend to connect
//     methods: ["GET", "POST"],
//   },
// });
// app.use(cors());
// app.get("/", (req: any, res: any) => {
//   res.send("Socket.io Server is running");
// });
// // Store online users (optional)
// let onlineUsers = new Map();
// io.on("connection", (socket: any) => {
//   console.log("A user connected:", socket.id);
//   // Receive and Broadcast Messages
//   socket.on("sendMessage", (messageData: any) => {
//     console.log("recieved : ", messageData);
//     io.emit("receiveMessage", messageData); // Broadcast to all users
//   });
//   // Handle User Disconnect
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });
// server.listen(5000, () => {
//   console.log("Socket.io Server running on port 5000");
// });
// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import mongoose from "mongoose";
// import userRoutes from "./routes/user.routes";
// import dotenv from "dotenv";
// dotenv.config();
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // Allow frontend to connect
//     methods: ["GET", "POST"],
//   },
// });
// // Middleware
// app.use(cors());
// app.use(express.json());
// // Connect MongoDB
// mongoose.connect(process.env.MONGODB_URL as string)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));
// // API Routes
// app.use("/api/user", userRoutes);
// // Test Route
// app.get("/", (req, res) => {
//   res.send("Socket.io Server is running");
// });
// // WebSocket Connection
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);
//   socket.on("sendMessage", (messageData) => {
//     console.log("Received message:", messageData);
//     io.emit("receiveMessage", messageData); // Broadcast to all users
//   });
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import mongoose from "mongoose";
// import userRoutes from "./routes/user.routes";
// import dotenv from "dotenv";
// import Message from "./model/Message";
// dotenv.config();
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });
// // Middleware
// app.use(cors());
// app.use(express.json());
// // Connect MongoDB
// mongoose
//   .connect(process.env.MONGODB_URL as string)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));
// // API Routes
// app.use("/api/user", userRoutes);
// // Fetch previous messages from MongoDB
// app.get("/api/messages", async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ createdAt: 1 }); // Oldest first
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch messages" });
//   }
// });
// // WebSocket Connection
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);
//   // Send stored messages when a user connects
//   Message.find()
//     .sort({ createdAt: 1 })
//     .then((messages: any) => {
//       socket.emit("previousMessages", messages);
//     });
//   // Handle new message
//   socket.on("sendMessage", async (messageData) => {
//     console.log("Received message:", messageData);
//     try {
//       const message = new Message(messageData);
//       await message.save();
//       // Send message to all connected clients
//       io.emit("receiveMessage", message);
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   });
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Message_1 = __importDefault(require("./model/Message"));
const user_routes_1 = __importDefault(require("../src/routes/user.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // Allow any frontend (Replace * with frontend URL in production)
        methods: ["GET", "POST"],
    },
});
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect MongoDB
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
app.use("/api/user", user_routes_1.default);
// API Route to get all messages
app.get("/api/messages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield Message_1.default.find().sort({ createdAt: 1 });
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
}));
// WebSocket Connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    // Send previous messages to the user when they connect
    Message_1.default.find()
        .sort({ createdAt: 1 })
        .then((messages) => {
        socket.emit("previousMessages", messages);
    });
    // Handle message sending
    socket.on("sendMessage", (messageData) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Received message:", messageData);
        try {
            const message = new Message_1.default(messageData);
            yield message.save();
            // Broadcast the message to all connected users
            io.emit("receiveMessage", message);
        }
        catch (error) {
            console.error("Error saving message:", error);
        }
    }));
    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
