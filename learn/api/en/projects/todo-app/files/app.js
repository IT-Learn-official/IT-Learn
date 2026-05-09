// TODO: Implement the app step by step using the guide.
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const empty = document.getElementById('empty');

const STORAGE_KEY = 'itlearn.projects.todo-app.todos';

let todos = [];

function loadTodos() {
  // TODO: Read from localStorage
}

function saveTodos() {
  // TODO: Save to localStorage
}

function render() {
  // TODO: Render list items + empty state
}

function addTodo() {
  // TODO: Add a new item from input.value
}

addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

loadTodos();
render();
