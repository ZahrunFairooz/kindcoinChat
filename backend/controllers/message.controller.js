import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	console.log("Received message data:", req.body); 
  try {
    const { message } = req.body; 
    const { id: receiverId } = req.params; 
    const senderId = req.user._id; 

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);
    console.log("Received message data:", req.body);

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: "Message is required and must be a non-empty string." });
    }

    // Find or create conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
      console.log("New conversation created");
    }

    // Create a new message with the text
    const newMessage = new Message({
      senderId,
      receiverId,
      message: message.trim(),
    });

    console.log("New message:", newMessage);

    // Add the message to the conversation
    conversation.messages.push(newMessage._id);

    // Save both the message and the conversation
    await Promise.all([newMessage.save(), conversation.save()]);
    console.log("Message and conversation saved");

    // Socket.IO functionality
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("Message sent via Socket.IO to:", receiverSocketId);
    }

    // Send back the new message
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    console.log("Getting messages between sender:", senderId, "and receiver:", userToChatId);

    // Find conversation between sender and receiver
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      console.log("No conversation found");
      return res.status(200).json([]); // No conversation yet
    }

    console.log("Found conversation with messages:", conversation.messages);

    res.status(200).json(conversation.messages); // Return the messages
  } catch (error) {
    console.error("Error in getMessages controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
