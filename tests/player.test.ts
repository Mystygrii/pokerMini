import { it, describe, expect } from "vitest";
import { Player, checkAction } from "../src/game/game";

const player: Player = {
  name: "Mystygrii",
  hand: [],
  balance: 100,
  hasPlayed:false,
  handCategory: {name:'Carte Haute', value:1}
};

describe("Testing the bet action", () => {
  it("must be 98", () => {
    expect(checkAction(player, "bet", 2)).toBe(98);
  });

  it("must be 98", () => {
    expect(checkAction(player, "bet", 10)).toBe(98);
  });

  it("must be 54", () => {
    player.balance = 55;
    expect(checkAction(player, "bet", 1)).toBe(54);
  });
});

describe("Testing the raise action", () => {
    it("must be 65", () => {
    player.balance = 66;
    expect(checkAction(player, "raise", 1)).toBe(65);
  });

  it("must be 82", () => {
    player.balance = 84; 
    expect(checkAction(player, "raise", 2)).toBe(82);
  });

});

describe("Testing the check action", () => {
  it("must be 88", () => {
    player.balance = 88
    expect(checkAction(player, "check")).toBe(88);
  });

  it("must be 50", () => {
    player.balance = 50
    expect(checkAction(player, "check")).toBe(50);
  });
});

describe("Testing the call action", () => {
    it("must be 88", () => {
        player.balance = 88
        expect(checkAction(player, "call")).toBe(88);
      });
    
      it("must be 50", () => {
        player.balance = 50
        expect(checkAction(player, "call")).toBe(50);
      });
});

describe("Testing the fold action", () => {
    it("must be 88", () => {
        player.balance = 88
        expect(checkAction(player, "fold")).toBe(88);
      });
    
      it("must be 50", () => {
        player.balance = 50
        expect(checkAction(player, "fold")).toBe(50);
      });
});
