import { Router } from "express";
import {showGamePage, showHomePage, test } from "./controller";

export const gameRouter = Router();

gameRouter.get('/', showHomePage);
gameRouter.get('/game', showGamePage);
gameRouter.post('/play',test);