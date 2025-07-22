import express from 'express'
import {search} from '../controllers/connectionsOperation.js'

const searchRoute = express.Router();

searchRoute.get('/',search);

export default searchRoute;