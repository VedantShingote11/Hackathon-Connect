import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import teamRoute from './routes/teamRoute.js'
import connectionRoute from './routes/connectionRoute.js'
import eventRoute from './routes/eventRoute.js';
import searchRoute from './routes/searchRoute.js'
import userRoute from './routes/userRoute.js'
import messageRoute from './routes/messageRouter.js'
import { app , server } from './services/socketService.js';

dotenv.config();

connectDB();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/team', teamRoute);
app.use('/api/connection', connectionRoute);
app.use('/api/event', eventRoute);
app.use('/api/search', searchRoute);
app.use('/api/user', userRoute)
app.use('/api/chat',messageRoute)

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});