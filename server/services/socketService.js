import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
import Message from '../models/Message.js'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    // Handle joining a chat room
    socket.on('join-chat', async (chatId) => {
        try {
            console.log(`User ${socket.id} joining chat: ${chatId}`);

            // Join the room
            socket.join(chatId);

            // Send existing message history to the user
            const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
            socket.emit('message-history', messages);

            // Notify others in the room that user joined (optional)
            socket.to(chatId).emit('user-joined', {
                socketId: socket.id,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Error joining chat:', error);
            socket.emit('error', { message: 'Failed to join chat' });
        }
    });

    // Handle sending messages
    socket.on('send-message', async (messageData, callback) => {
        try {
            console.log('Received message:', messageData);

            // Validate message data
            if (!messageData.content || !messageData.chatId || !messageData.sender) {
                if (callback) callback({ error: 'Invalid message data' });
                return;
            }

            // Add timestamp if not present
            if (!messageData.timestamp) {
                messageData.timestamp = new Date().toISOString();
            }

            // Save message to database
            const newMessage = await Message.create(messageData);

            // Broadcast message to all users in the chat room
            io.to(messageData.chatId).emit('receive-message', newMessage);

            // Acknowledge successful sending
            if (callback) callback();

        } catch (error) {
            console.error('Error sending message:', error);
            if (callback) callback({ error: 'Failed to send message' });
        }
    });

    // Handle leaving a chat room
    socket.on('leave-chat', (chatId) => {
        console.log(`User ${socket.id} leaving chat: ${chatId}`);
        socket.leave(chatId);

        // Notify others in the room that user left (optional)
        socket.to(chatId).emit('user-left', {
            socketId: socket.id,
            timestamp: new Date().toISOString()
        });
    });

    // Handle typing indicators (optional feature)
    socket.on('typing', (data) => {
        socket.to(data.chatId).emit('user-typing', {
            userId: data.userId,
            userName: data.userName,
            isTyping: data.isTyping
        });
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected ", socket.id)
    })
})

export { io, app, server }