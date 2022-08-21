function crateAppTitle(title) {
  let appTitle = document.createElement("h2");
  appTitle.innerHTML = title;
  return appTitle;
}
// Создает форму
function createTopItemForm() {
  const form = document.createElement("form");
  const input = document.createElement("input");
  const buttonWrapper = document.createElement("div");
  const button = document.createElement("button");

  form.classList.add("input-group", "mb-3");
  input.classList.add("form-control");
  input.placeholder = "Введите название нового дела";
  buttonWrapper.classList.add("input-group-append");
  button.textContent = "Добавить дело";

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
}
//Создаем список ul
function createTodoList() {
  let list = document.createElement("ul");
  list.classList.add("list-group");
  return list;
}

function createTodoItemElement(todoItem, { onDone, onDelete }) {
  const doneClass = "list-group-item-success";

  /*Список из Li*/

  const item = document.createElement("li");
  const buttonGroup = document.createElement("div");
  const doneButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  item.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );

  if (todoItem.done) {
    item.classList.add(doneClass);
  }
  item.textContent = todoItem.name;

  buttonGroup.classList.add("btn-group", "btn-group-sm");
  doneButton.classList.add("btn", "btn-success");
  doneButton.textContent = "Готово";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = "Удалить";

  doneButton.addEventListener("click", () => {
    onDone({ todoItem, element: item });
    item.classList.toggle(doneClass, todoItem.done);
  });

  deleteButton.addEventListener("click", () => {
    onDelete({ todoItem, element: item });
  });

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return item;
}

/** Основная функция */

async function createTodoApp(container, title, owner) {
  const todoAppTitle = crateAppTitle(title);
  const todoItemForm = createTopItemForm();
  const todoList = createTodoList();

  const handlers = {
    onDone({ todoItem }) {
      todoItem.done = !todoItem.done;
      fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: "PATCH",
        body: JSON.stringify({ done: todoItem.done }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onDelete({ todoItem, element }) {
      if (!confirm("Вы уверены?")) {
        return;
      }
      element.remove();
      fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: "DELETE",
      });
    },
  };

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  const response = await fetch(
    `http://localhost:3000/api/todos?owner=${owner}`
  );
  const todoItemList = await response.json();

  todoItemList.forEach((todoItem) => {
    const todoItemElement = createTodoItemElement(todoItem, handlers);
    todoList.append(todoItemElement);
  });

  todoItemForm.form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!todoItemForm.input.value) {
      return;
    }

    const response = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      body: JSON.stringify({
        name: todoItemForm.input.value.trim(),
        owner,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const todoItem = await response.json();
    const todoItemElement = createTodoItemElement(todoItem, handlers);

    todoList.append(todoItemElement);

    todoItemForm.input.value = "";
  });
}
export { createTodoApp };
