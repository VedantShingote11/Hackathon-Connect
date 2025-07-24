import Team from '../models/Team.js'

export const getTeams = async (req , res) => {
    try {
        const teams = await Team.find({});

        res.status(200).json({ success: true, data: teams });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error creating team' });
    }
}

export const createTeam = async (req, res) => {
    try {
        const team = req.body;
        if (!team) {
            return res.status(400).json({ success: false, error: 'Team name and leader are required' });
        }
        const newTeam = await Team.create(team);
        res.status(200).json({ success: true, data: newTeam });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error creating team' });
    }
}

export const deleteTeam = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, error: 'Incorrect team id' });
        }
        const deleteTeam = await Team.deleteOne({ _id: id });

        if (deleteTeam.deletedCount === 0) {
            return res.status(404).json({ success: false, error: 'Team not found' });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error creating team' });
    }
}

export const getTeam = async (req , res) => {
    try {
        const {chatId} = req.params;
        const team = await Team.findById(chatId);

        res.status(200).json({ success: true, data: team });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error while getting team' });
    }
}

