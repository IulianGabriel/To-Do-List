const input = document.querySelector(".toDoInput");
const inputButton = document.querySelector(".inputButton");
const addToDoHere = document.querySelector(".dynamicallyAddToDo");
let storeToDo = JSON.parse(localStorage.getItem("todos")) || [];
displayToDo();
inputButton.addEventListener("click", function (e) {
  addToList(e);
});

function addToList(e) {
    e.preventDefault();
    if (input.value.trim() === "") {
        return;
    }
    storeToDo.push({
        title: input.value,
        id: storeToDo.length,
        isChecked: false,
    });
    input.value = "";
    localStorage.setItem("todos", JSON.stringify(storeToDo));
  displayToDo();
}

function displayToDo() {
  addToDoHere.innerHTML = "";
  storeToDo.forEach((el) => {
    const todoItem = document.createElement("div");
    todoItem.className = "todoItem";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = el.isChecked;

    const todoText = document.createElement("span");
    todoText.className = "todoText";
    todoText.textContent = el.title;

    const deleteButton = document.createElement("button");
    deleteButton.className = "todoDeleteButton";
    deleteButton.innerHTML = "&#10006";

    if (el.isChecked) {
      todoText.classList.add("checked");
    }

    todoItem.appendChild(checkBox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);

    addToDoHere.appendChild(todoItem);

    deleteButton.addEventListener("click", function (e) {
      deleteToDo(el.id);
    });

    checkBox.addEventListener("click", function (e) {
      checkToDo(el.id);
    });
  });
}

function deleteToDo(id) {
  storeToDo = storeToDo.filter((el) => el.id !== id);
  localStorage.setItem("todos", JSON.stringify(storeToDo));
  displayToDo();
}

function checkToDo(id) {
  storeToDo.forEach((el) => {
    if (el.id === id) {
      el.isChecked = !el.isChecked;
      localStorage.setItem("todos", JSON.stringify(storeToDo));
      displayToDo();
    }
  });
}
