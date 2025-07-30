import Connection from '../models/Connection.js';
import User from '../models/User.js'

export const getConnections = async (req, res) => {
    try {
        const email = req.query.email;

        const connections = await Connection.find({
            status: "Send",
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

export const getNotification = async (req, res) => {
    try {
        const id = req.params.userId;

        const notification = await Connection.find({
            $or: [
                { senderEmail: id },
                { receiverEmail: id }
            ],
            status: "Send"
        })

        res.status(200).json({ success: true, data: notification });

    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error while getting notifications' });
    }
}

export const acceptRequest = async (req, res) => {
    try {
        const id = req.body.id;
        if (!id) {
            return res.status(400).json({ success: false, error: 'Error while accepting request' });
        }
        const accept = await Connection.findByIdAndUpdate(id , { status: "Accepted" }, { new: true })
        res.status(200).json({ success: true, data: accept });

    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error while accepting request' });
    }
}
