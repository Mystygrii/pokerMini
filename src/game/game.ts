//Joueur
export type Player = {
  name: string;
  hand: Array<Card>;
  jetons: number;
};

//cartes
export type Card = {
  color: string;
  rank: string;
  Family: string;
  value: number;
};
//Valeurs et familles des cartes
const cardValues: Array<string> = ["A", "K", "Q", "J", "10", "9"];
const cardFamilies: Array<string> = ["Coeur", "Pique"];
//Fonctions

//Créer les cartes et les ajoutes à la liste
export function makeDeck(families: Array<string>, ranks: Array<string>) {
  var deck: Array<Card> = [];

  for (const i in families) {
    var value = 6;
    for (const j in ranks) {
      if (families[i] === "Pique") {
        var card: Card = {
          color: "Noir",
          rank: ranks[j],
          Family: families[i],
          value: value,
        };
      } else {
        var card: Card = {
          color: "Rouge",
          rank: ranks[j],
          Family: families[i],
          value: value,
        };
      }
      value--;
      deck.push(card);
    }
  }
  return deck;
}

//mélange du deck
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

//distribue une carte à chaque joueur
export function dealCards(player: Player, deck: Array<Card>) {
  if (deck.length > 0) {
    var card = deck[-1];
    player.hand.push(card);
    deck.splice(-1, 1);
  }
}

//Vérifie la combinaison dans la main du joueur
export function checkHand(hand: Array<Card>) {
  hand.sort((a, b) => a.value - b.value);
  console.log(hand);
  var playerHand = "";

  //On regarde la main du joueur et on vérifie quelle est sa combinaison de cartes
  for (var i = 0; i < hand.length - 1; i++) {

    //Les 3 cartes se suivent et sont de la même famille
    if ((hand[i + 1].value === hand[i].value + 1 && hand[0].value === hand[i].value-1) && (hand[i].Family === hand[i+1].Family && hand[i].Family === hand[0].Family)) {
      playerHand = "Suite Flush";

      //Les 3 cartes se suivent
    }else if(hand[i + 1].value === hand[i].value + 1 && hand[0].value === hand[i].value-1){
      playerHand = "Suite";

      //Les 3 cartes sont de la même famille
    }else if(hand[i].Family === hand[i+1].Family && hand[i].Family === hand[0].Family){
      playerHand = "Flush";

      //2 cartes ont la même valeur
    }else if(hand[i + 1].rank === hand[i].rank || hand[0].rank === hand[i].rank ){
      playerHand = "Pair";
    
      //Aucun des cas précédents
    }else{
      playerHand = "Carte Haute";
    }
  }
  return playerHand;
}
