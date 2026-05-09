// TODO: Implementeer de app stap voor stap met de gids.
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const empty = document.getElementById('empty');

const STORAGE_KEY = 'itlearn.projects.todo-app.todos';

let todos = [];

function loadTodos() {
  // TODO: Laden uit localStorage
}

function saveTodos() {
  // TODO: Opslaan in localStorage
}

function render() {
  // TODO: Lijst renderen + empty state
}

function addTodo() {
  // TODO: Nieuw item uit input.value toevoegen
}

addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

loadTodos();
render();

