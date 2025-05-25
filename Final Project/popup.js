document.getElementById("add-btn").addEventListener("click", () => {
  const input = document.getElementById("todo-input");
  const task = input.value.trim();
  if (task) {
    chrome.storage.local.get({ todos: [] }, function (result) {
      const todos = result.todos;
      todos.push(task);
      chrome.storage.local.set({ todos }, function () {
        location.reload();
      });
    });
  }
});

window.onload = function () {
  chrome.storage.local.get({ todos: [] }, function (result) {
    const list = document.getElementById("todo-list");
    result.todos.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task;
      li.addEventListener("click", () => {
        result.todos.splice(index, 1);
        chrome.storage.local.set({ todos: result.todos }, () => location.reload());
      });
      list.appendChild(li);
    });
  });
};