import express from "express";
import { gameRouter } from "../src/game/routes";

const createApp = () => {
    
    const app = express();
    
    app.set("views", "./views");
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(express.urlencoded({extended:true}));
    app.use('/',gameRouter);

    return app;
}

export { createApp }