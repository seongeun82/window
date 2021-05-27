"use strict";
import Field from "./field.js";
import * as sound from "./sound.js";

// Builder Pattern
export class GameBulder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(this.gameDuration, this.carrotCount, this.bugCount);
  }
}

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.gameBtn = document.querySelector(".game__button");
    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBgm();
  }

  stop() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.playAlert();
    sound.stopBgm();
    // gameFinishBanner.showWithText("REPLAY?");
    this.onGameStop && this.onGameStop("cancel");
  }

  finish(win) {
    this.started = false;
    this.hideGameButton();
    sound.stopBgm();
    if (win) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    this.stopGameTimer();
    this.onGameStop && this.onGameStop(win ? "win" : "lose");
    // gameFinishBanner.showWithText(win ? "You Won!!" : "You Lost!!");
  }

  onItemClick = (itemName) => {
    // 빨리 리턴하는 것이 중요하다.
    if (!this.started) {
      return;
    }
    if (itemName === "carrot") {
      this.score++;
      this.updateScoreBoard();
      sound.playCarrot();
      if (this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (itemName === "bug") {
      this.finish(false);
    }
  };

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.score);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  showStartButton() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-play");
    icon.classList.remove("fa-stop");
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  initGame() {
    // 벌레와 당근을 생성한 뒤 field 에 추가해줌
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
}
