import express from "express";
import { gameRouter } from "../src/game/routes";
import { makeDeck, shuffleDeck } from "./game/game";
import { shuffle } from "vitest/utils.js";

const app = express();

const cardFamilies: Array<string> = ["Coeur", "Pique"];
const cardValues: Array<string> = ["A", "K", "Q", "J", "10", "9"];

const deck = makeDeck(cardFamilies, cardValues);
console.log(shuffleDeck(deck));

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/index", gameRouter);
app.use("/game", gameRouter);

app.listen(3000, () => {
  console.log("My app listening on port 3000!");
});
