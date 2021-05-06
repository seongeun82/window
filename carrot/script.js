const playBtn = document.querySelector(".playBtn");
const timer = document.querySelector(".timer");
const counter = document.querySelector(".counter");
const bgm = document.querySelector(".bgm");
const winSound = document.querySelector(".win");
const bugPullSound = document.querySelector(".bugPull");
const carrotPullSound = document.querySelector(".carrotPull");
const field = document.querySelector(".field");
const bugs = document.querySelector(".bugs");
const carrots = document.querySelector(".carrots");

let carrotNumber = 10;
counter.innerHTML = carrotNumber;

playBtn.addEventListener("click", (event) => {
  if (event.target.nodeName === "I") {
    gameStartEvent();
    startTimer();
  }
});

field.addEventListener("click", (event) => {
  const targetClass = event.target.className;
  if (targetClass === "bug") {
    bugClickEvent();
  }

  if (targetClass === "carrot") {
    carrotClickEvent();
  }
});

function gameStartEvent() {
  // 1. 음악시작
  startMusic(bgm);
  // 1.1 pause btn
  // 3. 타이머 줄어들기 시작

  // 2. 당근과 벌레 배치
  setField();
  // 4. 남은 당근 수 등록
}

function bugClickEvent() {
  pauseMusic(bgm);
  startMusic(bugPullSound);
}

function carrotClickEvent() {
  startMusic(carrotPullSound);
  carrotNumber -= 1;
  counter.innerHTML = carrotNumber;
  if (!carrotNumber) {
    gameWinEvent();
  }
}

function gameWinEvent() {
  pauseMusic(bgm);
  startMusic(winSound);
}
function startMusic(audioElement) {
  audioElement.volume = 0.2;
  audioElement.play();
}

function pauseMusic(audioElement) {
  audioElement.pause();
}

function startTimer() {
  let time = 59;
  const timerId = setInterval(() => {
    remainderText = time < 10 ? "0" + time : time;
    timer.innerHTML = "00" + ":" + remainderText;
    time -= 1;
  }, 1000);

  setTimeout(() => {
    clearInterval(timerId);
  }, time * 1000);
}

function setField() {
  bugsHtml = "";
  carrotsHtml = "";

  for (let i = 0; i < carrotNumber; i++) {
    let id = i;
    carrotHtml = `<img src="./img/carrot.png" class="carrot active" data-id="${id}" alt="" />`;
    bugHtml = `<img src="./img/bug.png" data-id="${id}" class="bug" alt="" />`;

    bugsHtml += bugHtml;
    carrotsHtml += carrotHtml;
  }
  bugs.innerHTML = bugsHtml;
  carrots.innerHTML = carrotsHtml;
}
