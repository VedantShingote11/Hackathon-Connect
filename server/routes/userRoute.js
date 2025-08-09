import express from 'express';
import {getUser, saveUser} from '../controllers/userController.js'

const userRoute = express.Router();

userRoute.get('/',getUser);
userRoute.post('/',saveUser)

export default userRoute