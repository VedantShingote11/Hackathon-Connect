import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        trim: true,
    },
    teamLeader: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    teamEmails: {
        type: [String],
        required: true,
        default: [],
    },
    teamIds: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "User",
        default: [],
    },
}, {
    timestamps: true,
});

export default mongoose.models.Team || mongoose.model("Team", teamSchema);