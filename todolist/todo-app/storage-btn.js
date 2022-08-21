import { createTodoApp } from "./view.js";

export function storageBtn(container, owner) {
  async function load(link) {
    let say = await import(`./${link}.js`);
    const todoItemList = await say.getTodoList(owner);
    createTodoApp(document.getElementById("todo-app"), {
      title: owner,
      owner,
      todoItemList,
      onCreateFormSubmit: say.createTodoItem,
      onDoneClick: say.swtchTodoItemDone,
      onDeleteClick: say.deleteTodoItem,
    });
  }
  const STORAGE_NAME = `storage ${owner}`;

  const storageBtn = document.createElement("button");
  storageBtn.classList.add("btn", "btn-outline-primary");
  storageBtn.style.marginBottom = "30px";
  storageBtn.textContent = !localStorage.getItem(STORAGE_NAME)
    ? "Серверное хранилище"
    : JSON.parse(localStorage.getItem(STORAGE_NAME)).btnName;
  container.append(storageBtn);

  storageBtn.addEventListener("click", function () {
    const headr = document.querySelector("h2");
    const input = document.querySelector("form");
    const ul = document.querySelector("ul");

    if (!localStorage.getItem(STORAGE_NAME)) {
      const chooseStorage = {
        btnName: "Серверное хранилище",
        storageLink: "local",
      };
      localStorage.setItem(STORAGE_NAME, JSON.stringify(chooseStorage));
    }

    const newStor = JSON.parse(localStorage.getItem(STORAGE_NAME));

    if (newStor.storageLink != "api") {
      headr.remove();
      input.remove();
      ul.remove();
      newStor.storageLink = "api";
      newStor.btnName = "Локальное хранилище";
      storageBtn.textContent = newStor.btnName;

      localStorage.setItem(STORAGE_NAME, JSON.stringify(newStor));
      load(JSON.parse(localStorage.getItem(STORAGE_NAME)).storageLink);
    } else {
      headr.remove();
      input.remove();
      ul.remove();
      newStor.storageLink = "local";
      newStor.btnName = "Серверное хранилище";
      storageBtn.textContent = newStor.btnName;
      localStorage.setItem(STORAGE_NAME, JSON.stringify(newStor));
      load(JSON.parse(localStorage.getItem(STORAGE_NAME)).storageLink);
    }
  });

  load(
    !localStorage.getItem(STORAGE_NAME)
      ? "local"
      : JSON.parse(localStorage.getItem(STORAGE_NAME)).storageLink
  );
  return storageBtn;
}
