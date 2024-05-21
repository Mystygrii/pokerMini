//Joueur
export type Player = {
  name: string;
  hand: Array<Card>;
  balance: number;
  bets ?:number;
  hasPlayed : boolean;
  handCategory :handsCat;
  lastAction :string;
};

//Partie
export type Game = {
  currentTurn :string;
  currentPlayer :Player;
  lastPlayer :Player;
  pot :Number;
  winner :Player;
  isTurnFinished :boolean;
}

//cartes
export type Card = {
  color: string;
  rank: string;
  Family: string;
  value: number;
};

//Types de mains
export type handsCat = {
  name :string;
  value :number;
}

const hands: handsCat[] = [{name : 'Suite Flush', value: 5},{name : 'Suite', value: 4},{name : 'Flush', value: 3},{name : 'Pair', value: 2},{name : 'Carte Haute', value: 1}];

//Créer les cartes et les ajoutes au deck, puis mélange du deck
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

  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
}

//distribue une carte à chaque joueur
export function dealCard(deck: Array<Card>) :Card{
  var card = deck[0];
  deck.splice(0,1);
  return card;
}

//Vérifie la combinaison dans la main du joueur
export function checkHand(hand: Array<Card>) {
  hand.sort((a, b) => a.value - b.value);
  var playerHand :handsCat = hands[0];

  //On regarde la main du joueur et on vérifie quelle est sa combinaison de cartes
  for (var i = 0; i < hand.length - 1; i++) {

    //Les 3 cartes se suivent et sont de la même famille
    if ((hand[i + 1].value === hand[i].value + 1 && hand[0].value === hand[i].value-1) && (hand[i].Family === hand[i+1].Family && hand[i].Family === hand[0].Family)) {
      playerHand = hands[0];

      //Les 3 cartes se suivent
    }else if(hand[i + 1].value === hand[i].value + 1 && hand[0].value === hand[i].value-1){
      playerHand = hands[1];


      //Les 3 cartes sont de la même famille
    }else if(hand[i].Family === hand[i+1].Family && hand[i].Family === hand[0].Family){
      playerHand = hands[2];


      //2 cartes ont la même valeur
    }else if(hand[i + 1].rank === hand[i].rank || hand[0].rank === hand[i].rank ){
      playerHand = hands[3];

    
      //Aucun des cas précédents
    }else{
      playerHand = hands[4];
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
        if(amount > 2 || amount <=0 || amount === undefined){
          balance -= 2;
        }
        else{
          balance -= amount;
        }
      }
      return balance;

      case 'raise':
        if(amount){
          if(amount > 2 || amount <=0 || amount === undefined){
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

export function getWinner(players :Player[]) :Player{
  var winner :Player = players[0];

  if(players[0].handCategory.value > players[1].handCategory.value){
    winner = players[0];

  }else if(players[1].handCategory.value > players[0].handCategory.value){
    winner = players[1];
  
  }

  return winner;
}