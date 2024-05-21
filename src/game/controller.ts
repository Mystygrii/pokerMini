import { RequestHandler } from "express";
import { Game, Player, checkAction, checkHand, dealCard, getWinner, handsCat, makeDeck } from "./game";

//constantes du jeu
const cardValues: string[] = ["A", "K", "Q", "J", "10", "9"];
const cardFamilies: string[] = ["Coeur", "Pique"];
const actions: string[] = ["bet", "raise", "call", "check", "fold"];
const initialBalance = 100;
const turns: string[] = ['blind', 'ante', 'showDown', 'end'];
const hands: handsCat[] = [{ name: 'Suite Flush', value: 5 }, { name: 'Suite', value: 4 }, { name: 'Flush', value: 3 }, { name: 'Pair', value: 2 }, { name: 'Carte Haute', value: 1 }];

//Variables de jeu
var playersNames: string[] = ["bot", "human"];
var players: Player[] = [];
var deck = makeDeck(cardFamilies, cardValues);
var isTurnFinished: boolean;
var pot: number;
var winner: string;
var game: Game;

//Initialisation des éléments du jeu
export const gameInit: RequestHandler = (req, res) => {
  deck = makeDeck(cardFamilies,cardValues);

  players = [];

  for (var name in playersNames) {
    var player: Player = {
      name: playersNames[name],
      hand: [],
      balance: initialBalance,
      handCategory: hands[4],
      bets: 0,
      hasPlayed: false,
      lastAction: '',
    };
    players.push(player);
  }
  
  game = {
    currentTurn: turns[0],
    currentPlayer: players[0],
    lastPlayer: players[0],
    pot: 0,
    winner: players[0],
    isTurnFinished: false
  }

  res.render("index");
};

//Affichage initial de la page du jeu
export const showGamePage: RequestHandler = (req, res) => {

  for(var player in players){
    if(players[player].hasPlayed && (players[player].lastAction !== actions[0] || players[player].lastAction !== actions[1])){
      game.isTurnFinished = true
    }
  }

  if (game.isTurnFinished && game.currentTurn === 'blind') {
    players.forEach((player)=>{
      for(let i = 0; i < 2; i++){
        player.hand.push(dealCard(deck));
      }
    })
    game.currentTurn = turns[2];
  } else if (game.currentTurn === 'ante') {
    players.forEach((player)=>{
      player.hand.push(dealCard(deck));
    });
    game.currentTurn = turns[2];

  } else if (game.currentTurn === 'showDown') {

  }

  //Le tour du bot
  if (game.currentPlayer === players[0]) {
    setTimeout(() => {
      var amount = 2
      game.currentPlayer.balance -= amount;
      game.currentPlayer.bets = amount;
      game.currentPlayer.lastAction = 'bet';
      game.lastPlayer = game.currentPlayer
      game.currentPlayer = players[1];
    }, 1000)

  }

  res.render("game", { players, game, winner });
};

//On regarde quelle action le joueur effectue, si le joueur mise ou relance, on réduit ses jetons et on actualise la page du jeu
//Si le joueur attend ou passe, on actualise la page
export const getAction: RequestHandler = (req, res) => {
  var action = req.body.action;
  var player = game.currentPlayer;

  //Si le joueur mise ou relance
  if (player.name === 'human') {
    if ((action === actions[0] && player.balance > 0) || (action === actions[1] && player.balance > 0)) {
      player.balance = checkAction(player, action, req.body.amount);

      if (req.body.amount > 2) {
        player.bets = 2;
      } else if (req.body.amount < 1) {
        player.bets = 1;

      }
      player.bets = req.body.amount;
      //Si le joueur attend
    } else if (action === actions[3]) {
      player.bets = 0;
      //Si le joueur se couche
    } else if (action === actions[4]) {
      //toDo
      game.currentPlayer = players[0];
      game.currentTurn = turns[0];
    }

    if (action === 'next turn') {
      game.currentPlayer = players[0];
      game.currentTurn === turns[0];
    }
    //Si le joueur actuel est l'humain, c'est le tour du bot
    if (game.currentPlayer === players[1]) {
      game.currentPlayer = players[0];
    }

  }
  player.lastAction = action;
  res.redirect('game');
};

export const getCurrentPlayer: RequestHandler = (req, res) => {
  res.json(game.currentPlayer);
}