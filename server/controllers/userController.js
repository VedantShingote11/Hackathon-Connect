import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const email = req.query.email;

        const user = await User.find({email});

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error getting user info' });
    }
}