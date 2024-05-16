import { Router } from "express";
import {getAction, showGamePage, gameInit } from "./controller";

export const gameRouter = Router();

gameRouter.get('/', gameInit);
gameRouter.get('/game', showGamePage);
gameRouter.post('/play',getAction);