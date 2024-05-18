import { RequestHandler } from "express";
import { Card, Player, checkAction, dealCards, makeDeck, shuffleDeck } from "./game";
import { gameRouter } from "./routes";

//la constante cardValues, et cardFamilies permettent d'ajouter des nouvelles cartes et familles si l'on décide de modifie les règles,
//Sans altérer le bon fonctionnement du reste du code
//constantes du jeu
const cardValues: string[] = ["A", "K", "Q", "J", "10", "9"];
const cardFamilies: string[] = ["Coeur", "Pique"];
const actions: string[] = ["bet", "raise", "check", "call"];
const initialBalance = 100;
const turns : string[] = ['blind', 'ante', 'showDown'];

//Variables de jeu
var playersNames: string[] = ["bot", "human"];
var players: Player[] = [];
var deck = makeDeck(cardFamilies, cardValues);
var currentTurn :string;
var isTurnFinished: boolean;

for (var name in playersNames) {
  var player: Player = {
    name: playersNames[name],
    hand: [],
    balance: 100,
    hasPlayed: false,
  };
  players.push(player);
}

var currentPlayer :Player;

//Initialisation des éléments du jeu
export const gameInit: RequestHandler = (req, res) => {
  deck = shuffleDeck(deck);
  players.forEach((player) => {
    player.hand = [];
    player.balance = initialBalance;
  });
  currentTurn = turns[0];
  currentPlayer = players[1];
  isTurnFinished = false;

  players.forEach((player) =>{
    player.hasPlayed = false;
  });

  currentTurn = turns[0];
  res.render("index");
};

//Affichage initial de la page du jeu
export const showGamePage: RequestHandler = (req, res) => {

  players.forEach((player)=>{
    if(player.hasPlayed){
      isTurnFinished = true;
    }else{
      isTurnFinished = false;
    }
  })

  if(isTurnFinished && currentTurn === 'blind'){
    players.forEach((player) =>{
      for(let i = 0; i < 2; i++){
        player.hand.push(dealCards(deck));
      }
      player.hasPlayed = false;
    });
    currentTurn = turns[1];

  }else if(isTurnFinished && currentTurn === 'ante'){
    players.forEach((player) =>{
      player.hand.push(dealCards(deck));
      player.hasPlayed = false;
    });
    currentTurn = turns[2];
  }

  //Le tour du bot
  if(currentPlayer === players[0]){
    setTimeout(() =>{
      currentPlayer.balance -= 2;
      currentPlayer = players[1];
    },1000)

  }

  currentPlayer.hasPlayed = true
  res.render("game", { players, currentTurn, currentPlayer });
};

//On regarde quelle action le joueur effectue, si le joueur mise ou relance, on réduit ses jetons et on actualise la page du jeu
//Si le joueur attend ou passe, on actualise la page
export const getAction: RequestHandler = (req, res) => {
  var action = req.body.action;
  var player = currentPlayer;

  //Si le joueur mise ou relance
  if ((action === actions[0] && player.balance > 0) || (action === actions[1] && player.balance > 0)) {
    player.balance = checkAction(player, action, req.body.amount);
  }

  //Si le joueur actuel est l'humain, c'est le tour du bot
  if(currentPlayer === players[1]){
    currentPlayer = players[0];
  }
  res.redirect('game')
};

export const getCurrentPlayer : RequestHandler = (req, res) => {
  res.json(currentPlayer);
}