import Message from '../models/Message.js'
import { io } from '../services/socketService.js'

export const getMessage = async (req, res) => {
    try {
        const { chatId } = req.query;
        const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ success: false, error: 'Server error while getting messages' });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const messageData = req.body;

        if (!messageData.timestamp) {
            messageData.timestamp = new Date().toISOString();
        }

        const newMessage = await Message.create(messageData);

        io.to(messageData.chatId).emit('receive-message', newMessage);

        res.status(200).json({ success: true, data: newMessage });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, error: 'Server error while sending message' });
    }
}