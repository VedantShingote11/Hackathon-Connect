import express from 'express'
import {getEvent , getEvents} from '../controllers/eventController.js'

const eventRoute = express.Router();

eventRoute.get('/',getEvents);
eventRoute.get('/:hackathonId',getEvent)

export default eventRoute;