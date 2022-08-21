let localMassive = [];

export function createTodoItem({ name, owner }) {
  const localItem = {
    name,
    owner,
    done: false,
    id: Math.floor(Math.random() * 300),
  };
  localMassive.push(localItem);
  localStorage.setItem(`${owner}`, JSON.stringify(localMassive));
  return localItem;
}

export function swtchTodoItemDone({ todoItem }) {
  todoItem.done = !todoItem.done;
  const todosLocalMassive = JSON.parse(
    localStorage.getItem(`${todoItem.owner}`)
  );
  const todoItemIndex = todosLocalMassive.findIndex(
    (el) => el.id === todoItem.id
  );
  todosLocalMassive[todoItemIndex].done =
    !todosLocalMassive[todoItemIndex].done;
  localStorage.setItem(`${todoItem.owner}`, JSON.stringify(todosLocalMassive));
}

export function deleteTodoItem({ element, todoItem }) {
  if (!confirm("Вы уверены?")) {
    return;
  }
  console.log(element);
  element.remove();
  const todosLocalMassive = JSON.parse(
    localStorage.getItem(`${todoItem.owner}`)
  );
  const todoItemIndex = todosLocalMassive.findIndex(
    (el) => el.id === todoItem.id
  );
  todosLocalMassive.splice(todoItemIndex, 1);
  localStorage.setItem(`${todoItem.owner}`, JSON.stringify(todosLocalMassive));
}

export function getTodoList(owner) {
  if (localStorage.getItem(`${owner}`)) {
    return JSON.parse(localStorage.getItem(`${owner}`));
  }
}
