const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

function onAdd() {
  // 1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  if (text === "") {
    // 함수에서 나갈때는 input 에 포커싱을 해주는것이 좋다.
    input.focus();
    return;
  }
  console.log(text);
  // 2. 새로운 아이템을 만든다. (텍스트 + 삭제버튼 )
  const item = createItem(text);
  // 3. items 컨테이너안에 새로 만든 아이템을 추가한다.
  items.appendChild(item);
  // 4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: "center" });
  // 5. 인풋을 초기화 한다. , 포커스를 준다.
  input.value = "";
  input.focus();
}

function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");

  const item = document.createElement("div");
  item.setAttribute("class", "item");

  const name = document.createElement("span");
  name.setAttribute("class", "item__name");
  name.innerText = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "item__delete");
  deleteBtn.innerHTML = '<i class= "fas fa-trash-alt"></i>';
  // deleteBtn.addEventListener("click", () => {
  //   items.removeChild(itemRow);
  // });

  const itemDivider = document.createElement("div");
  itemDivider.setAttribute("class", "item__divider");
  item.appendChild(name);
  item.appendChild(deleteBtn);
  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);

  return itemRow;
}

addBtn.addEventListener("click", () => {
  onAdd();
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onAdd();
  }
});

// event 위임을 활용해서 클릭되었을 때 아이템 삭제하기

items.addEventListener("click", (event) => {
  // 문제점 고유한 id 를 찾아서 하는 법 : global id uuid 를 활용할 수 있다.
  // 현재의 상태는 아이템 간의 구분이 없는 상태가 맞음 오호!! 알 것이라고 생각했는데 모르네..
  console.log(event);
});
