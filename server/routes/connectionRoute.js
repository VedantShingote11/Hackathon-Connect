import express from 'express'
import {getConnections, sendRequest} from '../controllers/connectionsOperation.js'

const connectionRoute = express.Router();

connectionRoute.get('/',getConnections);
connectionRoute.post('/',sendRequest)

export default connectionRoute;