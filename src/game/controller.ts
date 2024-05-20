import { RequestHandler } from "express";
import { Player, checkAction, checkHand, dealCards, getWinner, handsCat, makeDeck, shuffleDeck } from "./game";

//la constante cardValues, et cardFamilies permettent d'ajouter des nouvelles cartes et familles si l'on décide de modifie les règles,
//Sans altérer le bon fonctionnement du reste du code
//constantes du jeu
const cardValues: string[] = ["A", "K", "Q", "J", "10", "9"];
const cardFamilies: string[] = ["Coeur", "Pique"];
const actions: string[] = ["bet", "raise", "check", "call", "fold"];
const initialBalance = 100;
const turns: string[] = ['blind', 'ante', 'showDown', 'end'];
const hands: handsCat[] = [{ name: 'Suite Flush', value: 5 }, { name: 'Suite', value: 4 }, { name: 'Flush', value: 3 }, { name: 'Pair', value: 2 }, { name: 'Carte Haute', value: 1 }];

//Variables de jeu
var playersNames: string[] = ["bot", "human"];
var players: Player[] = [];
var deck = makeDeck(cardFamilies, cardValues);
var currentTurn: string;
var isTurnFinished: boolean;
var humanBets: number;
var botBets: number;
var pot: number;
var winner: string;

var currentPlayer: Player;

//Initialisation des éléments du jeu
export const gameInit: RequestHandler = (req, res) => {
  deck = shuffleDeck(deck);

  players = [];

  for (var name in playersNames) {
    var player: Player = {
      name: playersNames[name],
      hand: [],
      balance: 100,
      hasPlayed: false,
      handCategory: hands[4],
      bets: 0
    };
    players.push(player);
  }

  players.forEach((player) => {
    player.hand = [];
    player.balance = initialBalance;
    player.bets = 0;
  });
  currentTurn = turns[0];
  currentPlayer = players[1];
  isTurnFinished = false;
  humanBets = 0;
  botBets = 0;
  pot = 0;
  players.forEach((player) => {
    player.hasPlayed = false;
  });

  currentTurn = turns[0];
  res.render("index");
};

//Affichage initial de la page du jeu
export const showGamePage: RequestHandler = (req, res) => {


  players.forEach((player) => {
    if (player.hasPlayed) {
      pot += Number(player.bets);
      isTurnFinished = true;
    } else {
      isTurnFinished = false;
    }
  })

  if (isTurnFinished && currentTurn === 'blind') {
    players.forEach((player) => {
      for (let i = 0; i < 2; i++) {
        player.hand.push(dealCards(deck));
      }
      player.hasPlayed = false;
    });
    currentTurn = turns[1];

  } else if (isTurnFinished && currentTurn === 'ante') {
    players.forEach((player) => {
      player.hand.push(dealCards(deck));
      player.handCategory = checkHand(player.hand);
      player.hasPlayed = false;
    });

    winner = getWinner(players);
    currentTurn = turns[2];

  } else if (isTurnFinished && currentTurn === 'showDown') {
    players.forEach((player) => {
      player.hand.splice(0, player.hand.length);
      player.bets = 0;
      if (player.name === winner) {
        player.balance += Number(pot);
      }
    });

    if (currentPlayer === players[0]) {
      currentPlayer = players[1]
    } else {
      currentPlayer = players[0]
    }
    pot = 0;
    currentTurn = turns[0];
    deck = shuffleDeck(makeDeck(cardFamilies, cardValues));
  }

  //Le tour du bot
  if (currentPlayer === players[0]) {
    setTimeout(() => {
      var amount = 2
      currentPlayer.balance -= amount;
      currentPlayer.bets = amount;
      currentPlayer = players[1];
    }, 1000)

  }

  currentPlayer.hasPlayed = true
  res.render("game", { players, currentTurn, currentPlayer, pot, winner });
};

//On regarde quelle action le joueur effectue, si le joueur mise ou relance, on réduit ses jetons et on actualise la page du jeu
//Si le joueur attend ou passe, on actualise la page
export const getAction: RequestHandler = (req, res) => {
  var action = req.body.action;
  var player = currentPlayer;

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
      currentPlayer = players[0];
      currentTurn = turns[0];
    }

    if (action === 'next turn') {
      currentPlayer = players[0];
      currentTurn === turns[0];
    }
    //Si le joueur actuel est l'humain, c'est le tour du bot
    if (currentPlayer === players[1]) {
      currentPlayer = players[0];
    }

  }
  res.redirect('game');
};

export const getCurrentPlayer: RequestHandler = (req, res) => {
  res.json(currentPlayer);
}