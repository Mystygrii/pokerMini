import { Router } from "express";
import {showGamePage, showHomePage } from "./controller";

export const gameRouter = Router();

gameRouter.get('/', showHomePage);
gameRouter.post('/', showGamePage);