import Event from '../models/Event.js'

export const getEvents = async (req , res) => {
    try {
        const events = await Event.find({});
        res.status(200).json({ success: true, data: events });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error getting events' });
    }
}

export const getEvent = async (req , res) => {
    try {
        const id = req.params.hackathonId;

        const event = await Event.findById(id);
        
        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error getting events' });
    }
}

