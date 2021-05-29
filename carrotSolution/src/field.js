"use strict";
import * as sound from "./sound.js";

const carrotSize = 80;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    // this binding !!!
    // 클래스 안에 있는 어떤 함수를 다른 콜백으로 전달할 때는 !!!!
    // 1.
    // this.onClick = this.onClick.bind(this);
    // 2. arrow function 은 this 가 유지됨
    // 3.
    this.field.addEventListener("click", this.onClick);
  }

  init() {
    this.field.innerHTML = "";
    this.__addItem("carrot", this.carrotCount, "img/carrot.png");
    this.__addItem("bug", this.bugCount, "img/bug.png");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  __addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - carrotSize;
    const y2 = this.fieldRect.height - carrotSize;

    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

function randomNumber(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

// this 라는 것은 다른 곳에서 쓰일 때는 함수와 바인딩 !! 에로우 펑션으로 함수를 정의하면 바인딩이 자동으로 된다.
