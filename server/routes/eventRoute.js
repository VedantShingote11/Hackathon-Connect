import express from 'express'
import {createEvent, getEvent , getEvents} from '../controllers/eventController.js'

const eventRoute = express.Router();

eventRoute.get('/',getEvents);
eventRoute.get('/:hackathonId',getEvent)
eventRoute.post('/', createEvent)

export default eventRoute;