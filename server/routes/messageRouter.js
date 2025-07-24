import express from 'express'
import {getMessage , sendMessage} from '../controllers/messageController.js'

const messageRoute = express.Router();

messageRoute.get('/',getMessage);
messageRoute.post('/',sendMessage);

export default messageRoute