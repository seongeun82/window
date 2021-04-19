const input = document.querySelector("input");
const items = document.querySelector(".items");

const addRemoveEvent = (itemdiv, itemNm, trash) => {
  // const addtrash = document.querySelector(".item > i");

  trash.addEventListener("click", () => {
    itemdiv.remove();
    itemNm.remove();
    trash.remove();
  });
};

const addNewItem = (itemName) => {
  const newItemDiv = document.createElement("div");
  const newItemNm = document.createElement("div");
  const trashImg = document.createElement("i");

  const firstItem = items.firstChild;

  newItemDiv.setAttribute("class", "item");
  newItemNm.setAttribute("class", "item__name");

  trashImg.setAttribute("class", "fas fa-trash-alt");

  items.insertBefore(newItemDiv, firstItem);
  newItemDiv.appendChild(newItemNm);
  newItemDiv.appendChild(trashImg);

  aa = document.querySelector(".item__name");
  aa.innerHTML = itemName;

  addRemoveEvent(newItemDiv, newItemNm, trashImg);
  input.value = "";
};

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    console.log(event);
    console.log(input.value);
    addNewItem(input.value);
  }
});
