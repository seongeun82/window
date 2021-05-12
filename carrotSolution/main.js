"use strict";
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const carrotSize = 80;
const GAME_DURATION_SEC = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const popUp = document.querySelector(".pop-up");
const popUpText = document.querySelector(".pop-up__message");
const retryBtn = document.querySelector(".pop-up__refresh");

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFieldClick);

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

// retryBtn.addEventListener("click", (event) => {
//   startGame();
//   showStartButton();
// });

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  stopGameTimer();
  hideGameButton();
  showPopUpWithText("REPLAY?");
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove("pop-up--hide");
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showStopButton() {
  const icon = gameBtn.querySelector(".fa-play");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}

function showStartButton() {
  const icon = gameBtn.querySelector(".fa-stop");
  icon.classList.add("fa-play");
  icon.classList.remove("fa-stop");
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function initGame() {
  // 벌레와 당근을 생성한 뒤 field 에 추가해줌
  field.innerHTML = "";
  gameScore.innerText = CARROT_COUNT;
  addItem("carrot", 5, "img/carrot.png");
  addItem("bug", 5, "img/bug.png");
}

function onFieldClick(event) {
  // 빨리 리턴하는 것이 중요하다.
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    stopGameTimer();
    finishGame(false);
  }
}

function finishGame(win) {
  started = false;
  hideGameButton();
  showPopUpWithText(win ? "You Won!!" : "You Lost!!");
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

function randomNumber(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - carrotSize;
  const y2 = fieldRect.height - carrotSize;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}
