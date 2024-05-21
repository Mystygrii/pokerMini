import { RequestHandler } from "express";
import { Game, Player, checkAction as changeBalance, checkHand, dealCard, getWinner, handsCat, makeDeck } from "./game";

//constantes du jeu
const cardValues: string[] = ["A", "K", "Q", "J", "10", "9"];
const cardFamilies: string[] = ["Coeur", "Pique"];
const initialBalance = 100;

//Actions
enum actions {
  bet,
  raise,
  call,
  check,
  fold

}

//Tours
enum turns {
  blind,
  ante,
  showDown,
  end
}

const hands: handsCat[] = [{ name: 'Suite Flush', value: 5 }, { name: 'Suite', value: 4 }, { name: 'Flush', value: 3 }, { name: 'Pair', value: 2 }, { name: 'Carte Haute', value: 1 }];

//Variables de jeu
var playersNames: string[] = ["bot", "human"];
var players: Player[] = [];
var deck = makeDeck(cardFamilies, cardValues);
var pot: number;
var winner: string;
var game: Game;

//Initialisation des éléments du jeu
export const gameInit: RequestHandler = (req, res) => {
  deck = makeDeck(cardFamilies, cardValues);

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
    currentPlayer: players[1],
    lastPlayer: players[0],
    pot: 0,
    isTurnFinished: false
  }

  res.render("index");
};

//Affichage initial de la page du jeu
export const showGamePage: RequestHandler = (req, res) => {

  if (game.currentPlayer.hasPlayed && game.lastPlayer.hasPlayed) {
    if(game.lastPlayer.lastAction == actions[4]){
      game.currentTurn == turns[2];
      game.isTurnFinished = true;

    }else{
      game.isTurnFinished = true;
    }
  } else {
    game.isTurnFinished = false;
  }

  if (game.isTurnFinished && game.currentTurn === turns[0]) {
    players.forEach((player) => {
      for (let i = 0; i < 2; i++) {
        player.hand.push(dealCard(deck));
      }
      player.hasPlayed = false;
    })
    game.pot += (game.currentPlayer.bets + game.lastPlayer.bets)
    game.currentTurn = turns[1];
    game.isTurnFinished = false;
    
  } else if (game.isTurnFinished && game.currentTurn === turns[1]) {
    players.forEach((player) => {
      player.hand.push(dealCard(deck));
      player.hasPlayed = false;
      player.handCategory = checkHand(player.hand);
      
    });
    game.pot += (game.currentPlayer.bets + game.lastPlayer.bets)
    game.winner = getWinner(players);
    game.winner.balance += game.pot;
    game.currentTurn = turns[2];

  } else if (game.isTurnFinished && game.currentTurn === turns[2]) {
    players.forEach((player) => {
      player.hand.push(dealCard(deck));
      player.hasPlayed = false;
    });
    game.pot += (game.currentPlayer.bets + game.lastPlayer.bets)
    game.isTurnFinished = false;
    game.currentTurn = turns[0];
  }

  //Le tour du bot
  if (game.currentPlayer === players[0]) {
    setTimeout(() => {
      var amount = 2
      game.currentPlayer.balance -= amount;
      game.currentPlayer.bets += amount;
      game.currentPlayer.lastAction = 'bet';
      game.lastPlayer = game.currentPlayer;
      game.currentPlayer.hasPlayed = true;
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
      if (req.body.amount > 2 || req.body.amount < 1) {
        throw new Error("Montant invalide");

      }
    }
    player.balance = changeBalance(player, action, req.body.amount);
    //Si le joueur actuel est l'humain, c'est le tour du bot
    if (game.currentPlayer === players[1]) {
      game.currentPlayer.hasPlayed = true;
      game.currentPlayer.bets += parseInt(req.body.amount);
      game.currentPlayer = players[0];
    }

    if (action === 'next turn') {
      game.currentPlayer = players[0];
      game.currentTurn === turns[0];
    }

  }
  player.lastAction = action;
  game.currentPlayer.hasPlayed = true;
  res.redirect('game');
};

export const getCurrentPlayer: RequestHandler = (req, res) => {
  res.json(game.currentPlayer);
}