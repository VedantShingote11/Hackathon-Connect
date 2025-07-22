import express from 'express'
import {getConnections} from '../controllers/connectionsOperation.js'

const connectionRoute = express.Router();

connectionRoute.get('/',getConnections);

export default connectionRoute;