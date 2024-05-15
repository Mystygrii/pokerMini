//Joueur
export type Player = {
  name: string;
};

//cartes
export type Card = {
  color: string;
  value: string;
  Family: string;
};

//variables

//Fonctions
export function makeDeck(families: Array<string>, values: Array<string>) {
  var deck: Array<Card> = [];

  for (const i in families) {
    for (const j in values) {
      if (families[i] === "Pique") {
        var card: Card = {
          color: "Noir",
          value: values[j],
          Family: families[i],
        };
      } else {
        var card: Card = {
          color: "Rouge",
          value: values[j],
          Family: families[i],
        };
      }
      deck.push(card);
    }
  }
  return deck;
}

export function shuffleDeck(deck: Array<Card>) {
  var temporary: Card;
  for (const card in deck) {
    var currentIndex = parseInt(card);
    var randomIndex = Math.floor(Math.random() * currentIndex);
    temporary = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporary;
  }
  return deck;
}

export function dealCards(player: Player, deck: Array<Card>) {}

export function checkWin(player: Player) {}
