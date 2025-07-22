import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
    {
        imgUrl: {
            type: String,
            required: [true, 'Image URL is required.'],
            // Optional: Add a regex to validate that it's a URL format
            // match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i, 'Please enter a valid URL for the image.'],
        },
        heading: {
            type: String,
            required: [true, 'Event heading is required.'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Event description is required.'],
            trim: true,
        },
        lastDate: {
            type: Date,
            required: [true, 'Last date for registration is required.'],
        },
        fee: {
            type: String,
            required: [true, 'Fee information is required (e.g., "Free" or a price).'],
            default: 'Free',
        },
        mode: {
            type: String,
            required: [true, 'Mode of event is required (e.g., "Online" or "Offline").'],
        },
        registrationLink: {
            type: String,
            required: [true, 'Registration link is required.'],
            // match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i, 'Please enter a valid URL for registration.'],
        },
    }
);

export default mongoose.models.Event || mongoose.model("Event", eventSchema);