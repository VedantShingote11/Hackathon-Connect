import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        senderEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        receiverEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        isAccepted: {
            type: Boolean,
            default: false
        }
    }, {
    timestamps: true
}
);

const Connection = mongoose.models.Connection || mongoose.model("Connection", connectionSchema);

export default Connection;
