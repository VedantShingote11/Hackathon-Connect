import Connection from '../models/Connection.js';
import User from '../models/User.js'

export const getConnections = async (req, res) => {
    try {
        const email = req.query.email;

        const connections = await Connection.find({
            status:"Send",
            $or: [
                { senderEmail: email },
                { receiverEmail: email }
            ]
        });

        res.status(200).json({ success: true, data: connections });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error getting connections' });
    }
}

export const search = async (req, res) => {
    try {
        const query = req.query.query;

        let searchQuery = {};

        searchQuery = {
            $or: [
                { username: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
                { collegeName: { $regex: query, $options: "i" } },
                { skills: { $elemMatch: { $regex: query, $options: "i" } } }
            ]
        };

        const results = await User.find(searchQuery);

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error getting search results' });
    }
}

export const sendRequest = async (req, res) => {
    try {
        const request = req.body;
        
        if (!request) {
            return res.status(400).json({ success: false, error: 'Fail to send request' });
        }
        const send = await Connection.create(request);

        res.status(200).json({ success: true, data: send });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error while sending invitation' });
    }
}