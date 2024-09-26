import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer"; // Import multer for file handling
import cors from "cors"; // Import cors
import { sendMessage } from './controllers/message.controller.js'; // Import the sendMessage controller

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import { getUsersByRole } from './controllers/user.controller.js';

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

// Multer configuration for file uploads
const storage = multer.memoryStorage(); // Store files in memory (for quick setup; adjust as needed)
const upload = multer({ storage }); // Initialize multer with the storage engine

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.get('/api/users/:role', getUsersByRole);
app.post('/api/messages/send/:conversationId', sendMessage);


// Static file serving for frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// File upload route (example)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Handle file saving logic here (e.g., save to disk, cloud storage, etc.)
    console.log("File uploaded:", file.originalname);

    res.status(200).json({ message: "File uploaded successfully", file: file.originalname });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Catch-all route for serving the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start server and connect to MongoDB
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
