import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    skills: {
        type: [String],
        default: [],
    },
    collegeName: {
        type: String,
        default: "",
        trim: true,
    },
    achievements: {
        type: [String],
        default: [],
    },
    linkedIn: {
        type: String,
        default: "",
        trim: true,
    },
    github: {
        type: String,
        default: "",
        trim: true,
    },
    instagram: {
        type: String,
        default: "",
        trim: true,
    },
    highestQualification: {
        type: String,
        default: "",
        trim: true,
    },
    profilePicture: {
        type: String,
        default: "",
        trim: true,
    },
}, {
    timestamps: true,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
