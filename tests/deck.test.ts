import { describe, expect, it } from "vitest";
import {
  Player,
  checkHand,
  dealCard,
  makeDeck,
} from "../src/game/game";

const cardFamilies: Array<string> = ["Coeur", "Pique"];
const cardValues: Array<string> = ["A", "K", "Q", "J", "10", "9"];
const players: Array<Player> = [];
const human: Player = {
  name: "Mystygrii",
  hand: [],
  balance: 100,
  handCategory: { name: 'Carte Haute', value: 1 },
  hasPlayed: false,
  lastAction: ''
};

const bot: Player = {
  name: "bot",
  hand: [],
  balance: 100,
  handCategory: { name: 'Carte Haute', value: 1 },
  hasPlayed:false,
  lastAction: ''
};

players.push(human);
players.push(bot);

//Deck par défaut, sans mélange appliqué
const exampleDeck = [
  { color: 'Rouge', rank: 'A', Family: 'Coeur', value: 6 },
  { color: 'Rouge', rank: 'K', Family: 'Coeur', value: 5 },
  { color: 'Rouge', rank: 'Q', Family: 'Coeur', value: 4 },
  { color: 'Rouge', rank: 'J', Family: 'Coeur', value: 3 },
  { color: 'Rouge', rank: '10', Family: 'Coeur', value: 2 },
  { color: 'Rouge', rank: '9', Family: 'Coeur', value: 1 },
  { color: 'Noir', rank: 'A', Family: 'Pique', value: 6 },
  { color: 'Noir', rank: 'K', Family: 'Pique', value: 5 },
  { color: 'Noir', rank: 'Q', Family: 'Pique', value: 4 },
  { color: 'Noir', rank: 'J', Family: 'Pique', value: 3 },
  { color: 'Noir', rank: '10', Family: 'Pique', value: 2 },
  { color: 'Noir', rank: '9', Family: 'Pique', value: 1 }
];

describe("A test to check all the pokerMini functions", () => {
  //Vérification de la création du deck
  it("must be equal to deck", () => {
    expect(makeDeck(cardFamilies, cardValues)).toStrictEqual(exampleDeck);
  });

  //Vérifcation que le deck soit bien mélangé
  it("must be different from original deck", () => {
    const deck = makeDeck(cardFamilies,cardValues);
    expect(deck !== exampleDeck).toBe(true);
  });

  it("must deal a card to each players", () => {
    const deck = makeDeck(cardFamilies,cardValues);
    for (const player in players) {
      players[player].hand.push(dealCard(deck));
      expect(players[player].hand.length).toBe(1);
    }
  });

});