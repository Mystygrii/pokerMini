import { RequestHandler } from "express";
import { Player, checkAction, makeDeck, shuffleDeck } from "./game";

var playersNames: string[] = ["bot", "human"];
var players: Player[] = [];

for (var name in playersNames) {
  var player: Player = {
    name: playersNames[name],
    hand: [],
    balance: 100,
  };
  players.push(player);
}

//constantes du jeu
const actions: string[] = ["bet", "raise", "check", "call"];
const initialBalance = 100;

//la constante cardValues, et cardFamilies permettent d'ajouter des nouvelles cartes et familles si l'on décide de modifie les règles,
//Sans altérer le bon fonctionnement du reste du code
const cardValues: string[] = ["A", "K", "Q", "J", "10", "9"];
const cardFamilies: string[] = ["Coeur", "Pique"];
var deck = makeDeck(cardFamilies, cardValues);

//Variables de jeu

//Initialisation des éléments du jeu
export const gameInit: RequestHandler = (req, res) => {
  deck = shuffleDeck(deck);
  players.forEach((player) => {
    player.hand = [];
    player.balance = initialBalance;
  });
  res.render("index");
};

//Affichage initial de la page du jeu
export const showGamePage: RequestHandler = (req, res) => {
  res.render("game", { players });
};

//On regarde quelle action le joueur effectue, si le joueur mise ou relance, on réduit ses jetons et on actualise la page du jeu
//Si le joueur attend ou passe, on actualise la page
export const getAction: RequestHandler = (req, res) => {
  var action = req.body.action;
  if ((action === actions[0] && player.balance > 0) || (action === actions[1] && player.balance > 0)) {
    player.balance = checkAction(player, action, req.body.amount);
  }
  res.redirect("game");
};
