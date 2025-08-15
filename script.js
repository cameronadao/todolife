
        document.addEventListener('DOMContentLoaded', () => {
            // DOM Elements
            const taskForm = document.getElementById('task-form');
            const taskList = document.getElementById('task-list');
            const emptyState = document.getElementById('empty-state');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const languageSelector = document.getElementById('language-selector');
            const themeToggle = document.getElementById('theme-toggle');
            const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
            const editTaskForm = document.getElementById('edit-task-form');
            const saveTaskChangesBtn = document.getElementById('save-task-changes');
            const notificationContainer = document.getElementById('notification-container');
            
            // Stats Elements
            const totalTasksEl = document.getElementById('total-tasks');
            const pendingTasksEl = document.getElementById('pending-tasks');
            const completedTasksEl = document.getElementById('completed-tasks');
            const overdueTasksEl = document.getElementById('overdue-tasks');
            
            // App State
            let tasks = [];
            let currentFilter = 'all';
            let currentLanguage = 'fr';
            let darkTheme = false;
            let editingTaskId = null;
            let notificationInterval = null;
            
            // Translations
            const translations = {
                fr: {
                    totalTasks: "Total des tâches",
                    pendingTasks: "Tâches en cours",
                    completedTasks: "Tâches terminées",
                    overdueTasks: "Tâches en retard",
                    addNewTask: "Ajouter une nouvelle tâche",
                    taskTitle: "Titre de la tâche",
                    category: "Catégorie",
                    work: "Travail",
                    personal: "Personnel",
                    shopping: "Courses",
                    health: "Santé",
                    other: "Autre",
                    priority: "Priorité",
                    low: "Basse",
                    medium: "Moyenne",
                    high: "Haute",
                    dueDate: "Date d'échéance",
                    description: "Description",
                    addTask: "Ajouter la tâche",
                    myTasks: "Mes tâches",
                    all: "Toutes",
                    active: "En cours",
                    completed: "Terminées",
                    overdue: "En retard",
                    noTasks: "Aucune tâche trouvée. Ajoutez une nouvelle tâche pour commencer !",
                    editTask: "Modifier la tâche",
                    cancel: "Annuler",
                    saveChanges: "Enregistrer les modifications",
                    overdueNotificationTitle: "Tâches en retard",
                    overdueNotificationMessage: "Vous avez {count} tâche(s) en retard !",
                    markAsCompleted: "Marquer comme terminée",
                    dismiss: "Fermer",
                    daysOverdue: "Retard de {days} jour(s)"
                },
                en: {
                    totalTasks: "Total Tasks",
                    pendingTasks: "Pending Tasks",
                    completedTasks: "Completed Tasks",
                    overdueTasks: "Overdue Tasks",
                    addNewTask: "Add New Task",
                    taskTitle: "Task Title",
                    category: "Category",
                    work: "Work",
                    personal: "Personal",
                    shopping: "Shopping",
                    health: "Health",
                    other: "Other",
                    priority: "Priority",
                    low: "Low",
                    medium: "Medium",
                    high: "High",
                    dueDate: "Due Date",
                    description: "Description",
                    addTask: "Add Task",
                    myTasks: "My Tasks",
                    all: "All",
                    active: "Active",
                    completed: "Completed",
                    overdue: "Overdue",
                    noTasks: "No tasks found. Add a new task to get started!",
                    editTask: "Edit Task",
                    cancel: "Cancel",
                    saveChanges: "Save Changes",
                    overdueNotificationTitle: "Overdue Tasks",
                    overdueNotificationMessage: "You have {count} overdue task(s)!",
                    markAsCompleted: "Mark as Completed",
                    dismiss: "Dismiss",
                    daysOverdue: "{days} day(s) overdue"
                },
                es: {
                    totalTasks: "Total de Tareas",
                    pendingTasks: "Tareas Pendientes",
                    completedTasks: "Tareas Completadas",
                    overdueTasks: "Tareas Vencidas",
                    addNewTask: "Agregar Nueva Tarea",
                    taskTitle: "Título de la Tarea",
                    category: "Categoría",
                    work: "Trabajo",
                    personal: "Personal",
                    shopping: "Compras",
                    health: "Salud",
                    other: "Otro",
                    priority: "Prioridad",
                    low: "Baja",
                    medium: "Media",
                    high: "Alta",
                    dueDate: "Fecha de Vencimiento",
                    description: "Descripción",
                    addTask: "Agregar Tarea",
                    myTasks: "Mis Tareas",
                    all: "Todas",
                    active: "Activas",
                    completed: "Completadas",
                    overdue: "Vencidas",
                    noTasks: "¡No se encontraron tareas. Agrega una nueva tarea para comenzar!",
                    editTask: "Editar Tarea",
                    cancel: "Cancelar",
                    saveChanges: "Guardar Cambios",
                    overdueNotificationTitle: "Tareas Vencidas",
                    overdueNotificationMessage: "¡Tienes {count} tarea(s) vencida(s)!",
                    markAsCompleted: "Marcar como Completada",
                    dismiss: "Descartar",
                    daysOverdue: "{days} día(s) vencido(s)"
                },
                de: {
                    totalTasks: "Gesamtaufgaben",
                    pendingTasks: "Ausstehende Aufgaben",
                    completedTasks: "Abgeschlossene Aufgaben",
                    overdueTasks: "Überfällige Aufgaben",
                    addNewTask: "Neue Aufgabe Hinzufügen",
                    taskTitle: "Aufgabentitel",
                    category: "Kategorie",
                    work: "Arbeit",
                    personal: "Persönlich",
                    shopping: "Einkaufen",
                    health: "Gesundheit",
                    other: "Andere",
                    priority: "Priorität",
                    low: "Niedrig",
                    medium: "Mittel",
                    high: "Hoch",
                    dueDate: "Fälligkeitsdatum",
                    description: "Beschreibung",
                    addTask: "Aufgabe Hinzufügen",
                    myTasks: "Meine Aufgaben",
                    all: "Alle",
                    active: "Aktiv",
                    completed: "Abgeschlossen",
                    overdue: "Überfällig",
                    noTasks: "Keine Aufgaben gefunden. Fügen Sie eine neue Aufgabe hinzu, um zu beginnen!",
                    editTask: "Aufgabe Bearbeiten",
                    cancel: "Abbrechen",
                    saveChanges: "Änderungen Speichern",
                    overdueNotificationTitle: "Überfällige Aufgaben",
                    overdueNotificationMessage: "Sie haben {count} überfällige Aufgabe(n)!",
                    markAsCompleted: "Als Abgeschlossen Markieren",
                    dismiss: "Verwerfen",
                    daysOverdue: "{days} Tag(e) überfällig"
                }
            };
            
            // Initialize App
            function initApp() {
                loadTasks();
                loadSettings();
                updateLanguage();
                updateTheme();
                renderTasks();
                updateStats();
                checkOverdueTasks();
                
                // Start notification interval (check every hour)
                notificationInterval = setInterval(checkOverdueTasks, 3600000);
                
                // Event Listeners
                taskForm.addEventListener('submit', addTask);
                filterButtons.forEach(button => {
                    button.addEventListener('click', () => setFilter(button.dataset.filter));
                });
                languageSelector.addEventListener('change', (e) => setLanguage(e.target.value));
                themeToggle.addEventListener('click', toggleTheme);
                saveTaskChangesBtn.addEventListener('click', saveTaskChanges);
            }
            
            // Task Management
            function addTask(e) {
                e.preventDefault();
                
                const newTask = {
                    id: Date.now(),
                    title: document.getElementById('task-title').value,
                    category: document.getElementById('task-category').value,
                    priority: document.getElementById('task-priority').value,
                    dueDate: document.getElementById('task-due-date').value,
                    description: document.getElementById('task-description').value,
                    completed: false,
                    createdAt: new Date().toISOString()
                };
                
                tasks.unshift(newTask);
                saveTasks();
                renderTasks();
                updateStats();
                checkOverdueTasks();
                taskForm.reset();
                
                // Show success notification
                showNotification(translations[currentLanguage].addTask + '!', 'success');
            }
            
            function toggleTask(id) {
                tasks = tasks.map(task => {
                    if (task.id === id) {
                        return { ...task, completed: !task.completed };
                    }
                    return task;
                });
                
                saveTasks();
                renderTasks();
                updateStats();
                checkOverdueTasks();
            }
            
            function deleteTask(id) {
                const taskElement = document.querySelector(`[data-id="${id}"]`);
                
                // Animation de suppression
                taskElement.style.transform = 'translateX(100%)';
                taskElement.style.opacity = '0';
                
                setTimeout(() => {
                    tasks = tasks.filter(task => task.id !== id);
                    saveTasks();
                    renderTasks();
                    updateStats();
                    checkOverdueTasks();
                }, 300);
            }
            
            function editTask(id) {
                const task = tasks.find(t => t.id === id);
                if (!task) return;
                
                editingTaskId = id;
                
                // Populate edit form
                document.getElementById('edit-task-id').value = task.id;
                document.getElementById('edit-task-title').value = task.title;
                document.getElementById('edit-task-category').value = task.category;
                document.getElementById('edit-task-priority').value = task.priority;
                document.getElementById('edit-task-due-date').value = task.dueDate;
                document.getElementById('edit-task-description').value = task.description;
                
                // Show modal
                editTaskModal.show();
            }
            
            function saveTaskChanges() {
                if (!editingTaskId) return;
                
                tasks = tasks.map(task => {
                    if (task.id === editingTaskId) {
                        return {
                            ...task,
                            title: document.getElementById('edit-task-title').value,
                            category: document.getElementById('edit-task-category').value,
                            priority: document.getElementById('edit-task-priority').value,
                            dueDate: document.getElementById('edit-task-due-date').value,
                            description: document.getElementById('edit-task-description').value
                        };
                    }
                    return task;
                });
                
                saveTasks();
                renderTasks();
                updateStats();
                checkOverdueTasks();
                editTaskModal.hide();
                
                // Show success notification
                showNotification(translations[currentLanguage].saveChanges + '!', 'success');
            }
            
            // Overdue Tasks Management
            function checkOverdueTasks() {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const overdueTasks = tasks.filter(task => {
                    if (!task.dueDate || task.completed) return false;
                    
                    const dueDate = new Date(task.dueDate);
                    dueDate.setHours(0, 0, 0, 0);
                    
                    return dueDate < today;
                });
                
                // Update stats
                overdueTasksEl.textContent = overdueTasks.length;
                
                // Show notification if there are overdue tasks
                if (overdueTasks.length > 0) {
                    showOverdueNotification(overdueTasks);
                }
                
                // Update task list to highlight overdue tasks
                renderTasks();
            }
            
            function showOverdueNotification(overdueTasks) {
                // Check if notification already exists
                const existingNotification = document.getElementById('overdue-notification');
                if (existingNotification) {
                    existingNotification.remove();
                }
                
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.id = 'overdue-notification';
                
                const today = new Date();
                
                // Build notification content
                let tasksHtml = '';
                overdueTasks.slice(0, 3).forEach(task => {
                    const dueDate = new Date(task.dueDate);
                    const diffTime = Math.abs(today - dueDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    tasksHtml += `
                        <div class="notification-task">
                            <div class="notification-task-title">${task.title}</div>
                            <div class="notification-task-date">
                                ${translations[currentLanguage].daysOverdue.replace('{days}', diffDays)}
                            </div>
                        </div>
                    `;
                });
                
                if (overdueTasks.length > 3) {
                    tasksHtml += `<div class="text-center text-muted mt-2">+${overdueTasks.length - 3} ${translations[currentLanguage].overdueTasks.toLowerCase()}</div>`;
                }
                
                notification.innerHTML = `
                    <div class="notification-header">
                        <i class="bi bi-exclamation-triangle-fill notification-icon"></i>
                        <div class="notification-title">${translations[currentLanguage].overdueNotificationTitle}</div>
                    </div>
                    <div class="notification-body">
                        <div class="notification-message">
                            ${translations[currentLanguage].overdueNotificationMessage.replace('{count}', overdueTasks.length)}
                        </div>
                        ${tasksHtml}
                    </div>
                    <div class="notification-actions">
                        <button class="notification-btn notification-dismiss" data-action="dismiss">
                            ${translations[currentLanguage].dismiss}
                        </button>
                        <button class="notification-btn btn-primary" data-action="complete-all">
                            ${translations[currentLanguage].markAsCompleted}
                        </button>
                    </div>
                `;
                
                // Add event listeners
                const dismissBtn = notification.querySelector('[data-action="dismiss"]');
                dismissBtn.addEventListener('click', () => {
                    notification.style.animation = 'slideOutRight 0.5s ease';
                    setTimeout(() => notification.remove(), 500);
                });
                
                const completeAllBtn = notification.querySelector('[data-action="complete-all"]');
                completeAllBtn.addEventListener('click', () => {
                    // Mark all overdue tasks as completed
                    tasks = tasks.map(task => {
                        if (overdueTasks.some(t => t.id === task.id)) {
                            return { ...task, completed: true };
                        }
                        return task;
                    });
                    
                    saveTasks();
                    renderTasks();
                    updateStats();
                    checkOverdueTasks();
                    
                    notification.style.animation = 'slideOutRight 0.5s ease';
                    setTimeout(() => notification.remove(), 500);
                    
                    showNotification(`${overdueTasks.length} ${translations[currentLanguage].completedTasks.toLowerCase()}!`, 'success');
                });
                
                notificationContainer.appendChild(notification);
                
                // Auto dismiss after 10 seconds
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.style.animation = 'slideOutRight 0.5s ease';
                        setTimeout(() => notification.remove(), 500);
                    }
                }, 10000);
            }
            
            // Filtering
            function setFilter(filter) {
                currentFilter = filter;
                
                // Update active filter button
                filterButtons.forEach(button => {
                    button.classList.remove('active');
                    if (button.dataset.filter === filter) {
                        button.classList.add('active');
                    }
                });
                
                renderTasks();
            }
            
            function getFilteredTasks() {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                switch (currentFilter) {
                    case 'active':
                        return tasks.filter(task => !task.completed);
                    case 'completed':
                        return tasks.filter(task => task.completed);
                    case 'overdue':
                        return tasks.filter(task => {
                            if (!task.dueDate || task.completed) return false;
                            
                            const dueDate = new Date(task.dueDate);
                            dueDate.setHours(0, 0, 0, 0);
                            
                            return dueDate < today;
                        });
                    default:
                        return tasks;
                }
            }
            
            // Rendering
            function renderTasks() {
                taskList.innerHTML = '';
                
                const filteredTasks = getFilteredTasks();
                
                if (filteredTasks.length === 0) {
                    emptyState.style.display = 'block';
                    return;
                }
                
                emptyState.style.display = 'none';
                
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                filteredTasks.forEach(task => {
                    const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < today;
                    
                    const taskItem = document.createElement('li');
                    taskItem.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`;
                    taskItem.setAttribute('data-id', task.id);
                    
                    // Format due date
                    let dueDateFormatted = '';
                    if (task.dueDate) {
                        const dueDate = new Date(task.dueDate);
                        dueDateFormatted = dueDate.toLocaleDateString(currentLanguage);
                    }
                    
                    taskItem.innerHTML = `
                        <div class="task-content">
                            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                            <div class="task-details">
                                <div class="task-title">${task.title}</div>
                                <div class="task-meta">
                                    <div class="task-meta-item">
                                        <i class="bi bi-tag-fill"></i>
                                        <span data-i18n="${task.category}">${translations[currentLanguage][task.category]}</span>
                                    </div>
                                    <div class="task-meta-item">
                                        <i class="bi bi-flag-fill"></i>
                                        <span data-i18n="${task.priority}">${translations[currentLanguage][task.priority]}</span>
                                    </div>
                                    ${task.dueDate ? `
                                    <div class="task-meta-item">
                                        <i class="bi bi-calendar-event"></i>
                                        <span>${dueDateFormatted}</span>
                                    </div>
                                    ` : ''}
                                    ${isOverdue ? `
                                    <div class="task-meta-item text-danger">
                                        <i class="bi bi-exclamation-triangle-fill"></i>
                                        <span>${translations[currentLanguage].overdue}</span>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                        <div class="task-actions">
                            <button class="task-btn edit-btn" title="${translations[currentLanguage].editTask}">
                                <i class="bi bi-pencil-fill"></i>
                            </button>
                            <button class="task-btn delete-btn" title="${translations[currentLanguage].deleteTask || 'Delete'}">
                                <i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    `;
                    
                    // Add event listeners
                    const checkbox = taskItem.querySelector('.task-checkbox');
                    checkbox.addEventListener('change', () => toggleTask(task.id));
                    
                    const editBtn = taskItem.querySelector('.edit-btn');
                    editBtn.addEventListener('click', () => editTask(task.id));
                    
                    const deleteBtn = taskItem.querySelector('.delete-btn');
                    deleteBtn.addEventListener('click', () => deleteTask(task.id));
                    
                    taskList.appendChild(taskItem);
                });
                
                // Update language for dynamically added elements
                updateLanguage();
            }
            
            // Stats
            function updateStats() {
                const totalTasks = tasks.length;
                const pendingTasks = tasks.filter(task => !task.completed).length;
                const completedTasks = tasks.filter(task => task.completed).length;
                
                totalTasksEl.textContent = totalTasks;
                pendingTasksEl.textContent = pendingTasks;
                completedTasksEl.textContent = completedTasks;
                // Overdue tasks are updated in checkOverdueTasks function
            }
            
            // Language Management
            function setLanguage(language) {
                currentLanguage = language;
                localStorage.setItem('todolife_language', language);
                updateLanguage();
                renderTasks();
            }
            
            function updateLanguage() {
                // Update all elements with data-i18n attribute
                document.querySelectorAll('[data-i18n]').forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (translations[currentLanguage][key]) {
                        element.textContent = translations[currentLanguage][key];
                    }
                });
                
                // Update form placeholders
                document.getElementById('task-title').placeholder = translations[currentLanguage].taskTitle;
                document.getElementById('task-description').placeholder = translations[currentLanguage].description;
                
                // Update language selector
                languageSelector.value = currentLanguage;
            }
            
            // Theme Management
            function toggleTheme() {
                darkTheme = !darkTheme;
                localStorage.setItem('todolife_theme', darkTheme ? 'dark' : 'light');
                updateTheme();
            }
            
            function updateTheme() {
                if (darkTheme) {
                    document.body.classList.add('dark-theme');
                    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
                } else {
                    document.body.classList.remove('dark-theme');
                    themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
                }
            }
            
            // Local Storage
            function saveTasks() {
                localStorage.setItem('todolife_tasks', JSON.stringify(tasks));
            }
            
            function loadTasks() {
                const savedTasks = localStorage.getItem('todolife_tasks');
                if (savedTasks) {
                    tasks = JSON.parse(savedTasks);
                }
            }
            
            function loadSettings() {
                // Load language
                const savedLanguage = localStorage.getItem('todolife_language');
                if (savedLanguage && translations[savedLanguage]) {
                    currentLanguage = savedLanguage;
                }
                
                // Load theme
                const savedTheme = localStorage.getItem('todolife_theme');
                if (savedTheme === 'dark') {
                    darkTheme = true;
                }
            }
            
            // Notifications
            function showNotification(message, type = 'info') {
                // Create notification element
                const notification = document.createElement('div');
                notification.className = `alert alert-${type} position-fixed`;
                notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px; animation: slideInRight 0.5s ease;';
                notification.textContent = message;
                
                // Add close button
                const closeBtn = document.createElement('button');
                closeBtn.type = 'button';
                closeBtn.className = 'btn-close';
                closeBtn.setAttribute('data-bs-dismiss', 'alert');
                notification.appendChild(closeBtn);
                
                // Add to body
                document.body.appendChild(notification);
                
                // Auto remove after 3 seconds
                setTimeout(() => {
                    notification.style.animation = 'slideOutRight 0.5s ease';
                    setTimeout(() => {
                        notification.remove();
                    }, 500);
                }, 3000);
            }
            
            // Add CSS animations for notifications
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            // Initialize the app
            initApp();
        });