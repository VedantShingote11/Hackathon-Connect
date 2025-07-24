import express from 'express'
import {createTeam , deleteTeam , getTeam, getTeams} from '../controllers/teamController.js'

const teamRoute = express.Router();

teamRoute.get('/' , getTeams);
teamRoute.post('/',createTeam);
teamRoute.delete('/',deleteTeam);

teamRoute.get('/:chatId' ,getTeam);

export default teamRoute;