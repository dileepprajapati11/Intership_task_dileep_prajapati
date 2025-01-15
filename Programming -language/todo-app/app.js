// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Retrieve tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks when page loads
displayTasks();

// Add new task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push(taskText);
    saveTasks();
    displayTasks();
    taskInput.value = ''; // Clear input field
  }
});

// Function to display tasks
function displayTasks() {
  taskList.innerHTML = '';
  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="list-group-item text-center text-muted">No tasks here</li>';
    return;
  }
  tasks.forEach((task, index) => {
    taskList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${task}</span>
        <div>
          <button class="btn btn-sm btn-warning me-2" onclick="editTask(${index})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
        </div>
      </li>
    `;
  });
}


// Edit task
function editTask(index) {
  const newTask = prompt('Edit your task:', tasks[index]);
  if (newTask !== null && newTask.trim() !== '') {
    tasks[index] = newTask.trim();
    saveTasks();
    displayTasks();
  }
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

// Save tasks to LocalStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTaskBtn.click();
  }
});

const clearAllBtn = document.getElementById('clearAllBtn');

clearAllBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all tasks?')) {
    tasks = [];
    saveTasks();
    displayTasks();
  }
});



// Select the search bar
const searchBar = document.getElementById('searchBar');

// Event listener for search bar input
searchBar.addEventListener('input', filterTasks);

// Function to filter and display tasks based on search query
function filterTasks() {
  const query = searchBar.value.toLowerCase();
  const filteredTasks = tasks.filter(task => task.toLowerCase().includes(query));
  displayFilteredTasks(filteredTasks);
}

// Function to display filtered tasks
function displayFilteredTasks(filteredTasks) {
  taskList.innerHTML = '';
  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<li class="list-group-item text-center text-muted">No tasks found</li>';
    return;
  }
  filteredTasks.forEach((task, index) => {
    taskList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${task}</span>
        <div>
          <button class="btn btn-sm btn-warning me-2" onclick="editTask(${index})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
        </div>
      </li>
    `;
  });
}

