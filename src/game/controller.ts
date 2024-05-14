import { RequestHandler } from "express";

export const showHelloPage: RequestHandler = (req:any, res:any) => {
    res.render('index');
}