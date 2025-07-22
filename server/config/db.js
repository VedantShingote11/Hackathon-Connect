import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/HackathonConnect");
        return connect
    } catch (error) {
        process.exit(1);
    }
};

export default connectDB;