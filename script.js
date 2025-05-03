let todos = [];
let filter = 'all';
let searchQuery = '';
let language = localStorage.getItem('language') || 'fr'; // Récupérer la langue choisie précédemment

// Fonction pour changer la langue
function setLanguage(lang) {
  language = lang;
  localStorage.setItem('language', lang); // Sauvegarder la langue dans localStorage
  updateTexts(); // Mettre à jour les textes de l'interface
  renderTodos(); // Rafraîchir les tâches pour s'assurer que les textes sont mis à jour
}

// Fonction pour mettre à jour tous les textes en fonction de la langue
function updateTexts() {
  const texts = {
    fr: {
      title: 'TodoLife',
      placeholderTask: "Ajouter une tâche...",
      placeholderDescription: "Ajouter une description...",
      addButton: "Ajouter",
      errorMessage: "Merci d’écrire une tâche avant de l’ajouter.",
      searchPlaceholder: "Rechercher une tâche...",
      filterAll: "Toutes",
      filterActive: "À faire",
      filterCompleted: "Complètes",
      sortByDate: "Trier par date",
      sortByPriority: "Trier par priorité",
      clearAllButton: "Supprimer toutes les tâches",
      notifLabel: "Activer les notifications pour les tâches en retard"
    },
    en: {
      title: 'TodoLife',
      placeholderTask: "Add a task...",
      placeholderDescription: "Add a description...",
      addButton: "Add",
      errorMessage: "Please write a task before adding.",
      searchPlaceholder: "Search a task...",
      filterAll: "All",
      filterActive: "Active",
      filterCompleted: "Completed",
      sortByDate: "Sort by date",
      sortByPriority: "Sort by priority",
      clearAllButton: "Clear all tasks",
      notifLabel: "Enable notifications for overdue tasks"
    }
  };

  // Appliquer les textes de la langue choisie
  const currentTexts = texts[language];
  document.getElementById("appTitle").textContent = currentTexts.title;
  document.getElementById("todoInput").placeholder = currentTexts.placeholderTask;
  document.getElementById("todoDescription").placeholder = currentTexts.placeholderDescription;
  document.getElementById("addButton").textContent = currentTexts.addButton;
  document.getElementById("error-message").textContent = currentTexts.errorMessage;
  document.getElementById("searchInput").placeholder = currentTexts.searchPlaceholder;
  document.getElementById("filter-all").textContent = currentTexts.filterAll;
  document.getElementById("filter-active").textContent = currentTexts.filterActive;
  document.getElementById("filter-completed").textContent = currentTexts.filterCompleted;
  document.getElementById("sortSelect").children[0].textContent = currentTexts.sortByDate;
  document.getElementById("sortSelect").children[1].textContent = currentTexts.sortByPriority;
  document.getElementById("clearAllButton").textContent = currentTexts.clearAllButton;
  document.getElementById("notifToggle").nextSibling.nodeValue = currentTexts.notifLabel;
}

function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const todoDescription = document.getElementById("todoDescription");
  const todoDate = document.getElementById("todoDate");
  const prioritySelect = document.getElementById("prioritySelect");
  const errorMessage = document.getElementById("error-message");

  const task = todoInput.value.trim();
  const description = todoDescription.value.trim();
  const date = todoDate.value;
  const priority = prioritySelect.value;

  if (!task) {
    errorMessage.style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  todos.push({ task, description, date, priority, completed: false });

  // Reset inputs
  todoInput.value = "";
  todoDescription.value = "";
  todoDate.value = "";
  prioritySelect.value = "low";

  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
}

function renderTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
  }).filter(todo => 
    todo.task.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""} ${todo.priority}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(index));
    li.appendChild(checkbox);

    const span = document.createElement("span");
    span.innerHTML = `<strong>${todo.task}</strong> - ${todo.date || "No date"} (${todo.priority})`;
    if (todo.description) {
      const desc = document.createElement("div");
      desc.textContent = todo.description;
      desc.style.fontSize = "0.9em";
      desc.style.color = "#555";
      li.appendChild(span);
      li.appendChild(desc);
    } else {
      li.appendChild(span);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.addEventListener("click", () => deleteTodo(index));
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function clearAllTodos() {
  todos = [];
  saveTodos();
  renderTodos();
}

function setFilter(newFilter) {
  filter = newFilter;
  document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(`filter-${newFilter}`).classList.add("active");
  renderTodos();
}

function searchTasks() {
  searchQuery = document.getElementById("searchInput").value;
  renderTodos();
}

document.getElementById("todoInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTodo();
});

document.getElementById("notifToggle").addEventListener("change", function() {
  if (this.checked) {
    alert("Notifications activées ! (Simulées)");
  } else {
    alert("Notifications désactivées.");
  }
});

loadTodos();
updateTexts();
renderTodos();