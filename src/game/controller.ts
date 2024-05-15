import { RequestHandler } from "express";

export const showHomePage: RequestHandler = (req, res) => {
    res.render('index');
}

export const showGamePage: RequestHandler = (req, res) => {
    res.render('game');
}