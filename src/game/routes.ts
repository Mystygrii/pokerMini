import { Router } from "express";
import { showHelloPage } from "./controller";

export const gameRouter = Router();

gameRouter.get('/', showHelloPage)