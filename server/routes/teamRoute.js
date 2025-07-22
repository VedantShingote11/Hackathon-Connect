import express from 'express'
import {createTeam , deleteTeam , getTeams} from '../controllers/teamController.js'

const teamRoute = express.Router();

teamRoute.get('/' , getTeams);
teamRoute.post('/',createTeam);
teamRoute.delete('/',deleteTeam);

export default teamRoute;