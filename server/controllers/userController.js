import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const email = req.query.email;

        const user = await User.find({ email });

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error getting user info' });
    }
}

export const saveUser = async (req, res) => {
    try {
        let { email, userName } = req.body;

        if (!email || !userName) {
            return res.status(400).json({ success: false, error: "Email and userName are required" });
        }

        email = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).json({
                success: true,
                message: "User already exists",
                data: existingUser
            });
        }

        const newUser = await User.create({ email, userName });

        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error while saving user info'
        });
    }
};
