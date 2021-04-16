const target = document.querySelector(".target");
const xline = document.querySelector(".horizontal");
const yline = document.querySelector(".vertical");
const tag = document.querySelector(".tag");

document.addEventListener("mousemove", (event) => {
  x = event.clientX;
  y = event.clientY;

  target.style.top = `${y}px`;
  target.style.left = `${x}px`;
  tag.style.top = `${y}px`;
  tag.style.left = `${x}px`;
  xline.style.top = `${y}px`;
  yline.style.left = `${x}px`;

  tag.innerHTML = `(${x}px, ${y}px)`;
});
