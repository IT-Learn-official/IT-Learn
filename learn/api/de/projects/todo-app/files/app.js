// TODO: Implementiere die App Schritt für Schritt mit der Anleitung.
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const empty = document.getElementById('empty');

const STORAGE_KEY = 'itlearn.projects.todo-app.todos';

let todos = [];

function loadTodos() {
  // TODO: Aus localStorage laden
}

function saveTodos() {
  // TODO: In localStorage speichern
}

function render() {
  // TODO: Liste rendern + Empty-State
}

function addTodo() {
  // TODO: Neues Item aus input.value hinzufügen
}

addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

loadTodos();
render();

