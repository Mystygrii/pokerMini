import { Router } from "express";
import {getAction, showGamePage, gameInit, getCurrentPlayer } from "./controller";

export const gameRouter = Router();

gameRouter.get('/', gameInit);
gameRouter.get('/game', showGamePage);
gameRouter.post('/play',getAction);
gameRouter.get('/current-player', getCurrentPlayer)