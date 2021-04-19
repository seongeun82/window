const target = document.querySelector(".target");
const xline = document.querySelector(".horizontal");
const yline = document.querySelector(".vertical");
const tag = document.querySelector(".tag");

addEventListener("load", () => {
  const targetRect = target.getBoundingClientRect();
  const targetHalfW = targetRect.width / 2;
  const targetHalfH = targetRect.height / 2;

  document.addEventListener("mousemove", (event) => {
    x = event.clientX;
    y = event.clientY;
    // 요소를 움직일 때는 translate 을 사용해서 쓴다.

    // target.style.top = `${y}px`;
    // target.style.left = `${x}px`;

    // tag.style.top = `${y}px`;
    // tag.style.left = `${x}px`;
    // xline.style.top = `${y}px`;
    // yline.style.left = `${x}px`;

    tag.style.transform = `translate(${x}px, ${y}px)`;
    target.style.transform = `translate(${x - targetHalfW}px,  ${
      y - targetHalfH
    }px)`;
    xline.style.transform = `translateY(${y}px)`;
    yline.style.transform = `translateX(${x}px)`;

    tag.innerHTML = `(${x}px, ${y}px)`;
  });
});
