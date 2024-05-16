//Joueur
export type Player = {
  name: string;
  hand: Array<Card>;
  balance: number;
};

//cartes
export type Card = {
  color: string;
  rank: string;
  Family: string;
  value: number;
};

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
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
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

//players actions------------

export function checkAction(player: Player, action: string, amount?: number): number{
  var balance = player.balance;

  switch (action) {
    case 'bet':
      if(amount){
        if(amount > 2){
          balance -= 2;
        }
        else{
          balance -= amount;
        }
      }
      return balance;

      case 'raise':
        if(amount){
          if(amount > 2){
            balance -= 2;
          }
          else{
            balance -= amount;
          }
        }
        return balance;

    case 'check':
      return balance;

    case 'call':
        return balance;

      case 'fold':
        return balance;
  
    default:
      return balance;
  }

}