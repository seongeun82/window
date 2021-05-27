"use strict";
import PopUp from "./popup.js";
import Game, { GameBulder } from "./game.js";

const gameFinishBanner = new PopUp();
const game = new GameBulder()
  .withGameDuration(5)
  .withCarrotCount(3)
  .withBugCount(3)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case "cancel":
      message = "Replay?";
      break;
    case "win":
      message = "You Won!!";
      break;
    case "lose":
      message = "You Lose!!";
      break;
    default:
      throw new Error("not valid reason");
  }

  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
