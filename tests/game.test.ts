import { describe, expect, it } from "vitest";
import { makeDeck, shuffleDeck } from "../src/game/game";

const cardFamilies: Array<string> = ["Coeur", "Pique"];
const cardValues: Array<string> = ["A", "K", "Q", "J", "10", "9"];

//Deck par défaut, sans mélange appliqué
const exampleDeck = [
  { color: "Rouge", value: "A", Family: "Coeur" },
  { color: "Rouge", value: "K", Family: "Coeur" },
  { color: "Rouge", value: "Q", Family: "Coeur" },
  { color: "Rouge", value: "J", Family: "Coeur" },
  { color: "Rouge", value: "10", Family: "Coeur" },
  { color: "Rouge", value: "9", Family: "Coeur" },
  { color: "Noir", value: "A", Family: "Pique" },
  { color: "Noir", value: "K", Family: "Pique" },
  { color: "Noir", value: "Q", Family: "Pique" },
  { color: "Noir", value: "J", Family: "Pique" },
  { color: "Noir", value: "10", Family: "Pique" },
  { color: "Noir", value: "9", Family: "Pique" },
];

describe("A test to check all the pokerMini functions", () => {
  //Vérification de la création du deck
  it("must be equal to deck", () => {
    expect(makeDeck(cardFamilies, cardValues)).toStrictEqual(exampleDeck);
  });

  //Vérifcation que le deck soit bien mélangé
  it("must be different from original deck", () => {
    const deck = exampleDeck;
    const shuffledDeck = shuffleDeck(deck);
    for (const card in shuffledDeck) {
      expect(shuffledDeck[card] !== deck[card]).toBeFalsy();
    }
  });
});
