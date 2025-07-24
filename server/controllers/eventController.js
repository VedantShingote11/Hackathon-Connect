import Event from '../models/Event.js'

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json({ success: true, data: events });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error getting events' });
    }
}

export const getEvent = async (req, res) => {
    try {
        const id = req.params.hackathonId;

        const event = await Event.findById(id);

        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error getting events' });
    }
}

export const createEvent = async (req, res) => {
    try {
        const event = req.body;
        if (!event) {
            return res.status(400).json({ success: false, error: 'Team name and leader are required' });
        }
        const create = await Event.create(event);
        res.status(200).json({ success: true, data: create });

    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error creating event' });
    }
}

