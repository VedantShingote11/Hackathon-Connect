import express from 'express'
import {acceptRequest, getConnections, getNotification, sendRequest} from '../controllers/connectionsOperation.js'

const connectionRoute = express.Router();

connectionRoute.get('/',getConnections);
connectionRoute.get('/:userId' , getNotification)
connectionRoute.post('/',sendRequest)
connectionRoute.post('/accept' , acceptRequest)

export default connectionRoute;