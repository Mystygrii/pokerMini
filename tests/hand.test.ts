import { describe, expect, it } from "vitest";
import { Player, checkHand, getWinner,handsCat } from "../src/game/game";

const players: Array<Player> = [];
const human: Player = {
  name: "Mystygrii",
  hand: [],
  balance: 100,
  handCategory : {name:'Carte Haute', value:1},
  lastAction : ''
};

const bot: Player = {
  name: "bot",
  hand: [],
  balance: 100,
  handCategory : {name:'Carte Haute', value:1},
  lastAction : ''
};

players.push(human);
players.push(bot);

describe('Testing the handCheck funtion', ()=>{
    it("must be Suite Flush", () => {
      (human.hand = [
        { color: "Rouge", rank: "A", Family: "Coeur",value:6 },
        { color: "Rouge", rank: "K", Family: "Coeur",value:5 },
        { color: 'Rouge', rank: 'Q', Family: 'Coeur', value: 4 },
      ]),
        expect(checkHand(human.hand)).toStrictEqual({name:"Suite Flush", value:5});
    });
  
    it("must be Suite", () => {
      (human.hand = [
        { color: "Rouge", rank: "K", Family: "Coeur",value:5 },
        { color: "Rouge", rank: "A", Family: "Coeur",value:6 },
        { color: 'Rouge', rank: 'Q', Family: 'Pique', value: 4 },
      ]),
        expect(checkHand(human.hand)).toStrictEqual({name:"Suite", value:4});
    });
  
    it("must be Flush", () => {
      (human.hand = [
        { color: "Noir", rank: "10", Family: "Coeur",value:2 },
        { color: "Rouge", rank: "K", Family: "Coeur",value:5 },
        { color: 'Rouge', rank: 'J', Family: 'Coeur', value: 3 },
      ]),
        expect(checkHand(human.hand)).toStrictEqual({name:"Flush", value:3});
    });
  
    it("must be Pair", () => {
      (human.hand = [
        { color: "Rouge", rank: "A", Family: "Coeur",value:6 },
        { color: "Noir", rank: "A", Family: "Pique",value:6 },
        { color: 'Noir', rank: '9', Family: 'Pique', value: 1 },
      ]),
        expect(checkHand(human.hand)).toStrictEqual({name:"Pair", value:2});
    });
  
    it("must be Carte Haute", () => {
      (human.hand = [
        { color: "Rouge", rank: "A", Family: "Coeur",value:6 },
        { color: "Noir", rank: "10", Family: "Pique",value:2 },
        { color: 'Noir', rank: 'K', Family: 'Pique', value: 5 },
      ]),
        expect(checkHand(human.hand)).toStrictEqual({name:"Carte Haute", value:1});
    });
  })

describe('It must compare the winners', ()=>{
  it('must be human', ()=>{
    players[0].handCategory = {name:'Suite Flush', value:5}
    players[1].handCategory = {name:'Carte Haute', value:1}
    expect (getWinner(players)).toBe(human.name)
  });

  it('must be bot', ()=> {
    players[0].handCategory = {name:'Pair', value:2}
    players[1].handCategory = {name:'Flush', value:3}
    expect (getWinner(players)).toBe(bot.name);
  });

  it('must be none', ()=> { 
      players[0].handCategory = {name:'Suite', value:4}
      players[1].handCategory = {name:'Suite', value:4}
    expect (getWinner(players)).toBe('none')
  });
}) 