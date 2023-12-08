// to use persistent storage, localStorage needs to set
// check if localStorage is already set with key `tasks`
let tasks = localStorage.getItem('tasks')

if (!tasks) {
  // initialize the value
  tasks = []
  // save it in localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks))
} else {
  tasks = JSON.parse(tasks)
  tasks = tasks.map(tObj => {
    return new Task(tObj)
  })
}

// fn for handling the check icon click
function handleCheckIconClick(event) {
  // identify the task
  const taskId = event.target.parentNode.parentNode.id;
  // change the status of the task
  const task = tasks.find((t) => t.id == taskId);
  if (task) {
    console.log('toggle', task)
    task.toggleStatus()
  } else {
    console.log("Task not found for ", taskId);
  }

  saveTasksToLocalStorage()

  // render tasks again
  renderTasks();
}

// fn for handling the delete icon click
function handleDeleteIconClick(event) {
  // identify the task
  const taskId = event.target.parentNode.parentNode.parentNode.id;
  // change the status of the task
  // const taskIndex = tasks.findIndex((t) => t.id == taskId);
  // tasks.splice(taskIndex, 1)
  const task = tasks.find((t) => t.id == taskId);
  if (task) {
    task.toggleDelete()
  } else {
    console.log("Task not found for ", taskId);
  }

  saveTasksToLocalStorage()

  // render tasks again
  renderTasks();
}

// fn to return the HTML structure of a task
function taskHTML(data) {

  const month = new Intl.DateTimeFormat("en-GB", {
    month: 'short'
  }).format(new Date(data.date));
  const date = new Intl.DateTimeFormat("en-GB", {
    day: '2-digit'
  }).format(new Date(data.date));

  return `
    <div class="task ${data.status} ${data.deleted ? 'deleted' : ''}" id="${data.id}">
        <div class="task-title">
          <div class="task-date">
            <div class="month">${month}</div>
            <div class="date">${date}</div>
          </div>
          <div class="title">${data.title}</div>
          <div class="delete-icon">
            <i class="fa fa-${data.deleted ? 'rotate-left' : 'trash'}" aria-hidden="true"></i>
          </div>
        </div>
        <div class="check-icon">
          <i class="fa fa-check" aria-hidden="true"></i>
        </div>
    </div>
  `;
}

// set a handler for the addBtn click
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  const title = document.getElementById("inputText");
  if (!title.value) {
    alert("please enter title");
    return;
  }
  const newTask = new Task({ title: title.value })
  tasks.push(newTask);

  saveTasksToLocalStorage ();

  title.value = "";
  renderTasks();
});

// get the reference to the tasks list ui in HTML
const tasksList = document.getElementById("tasks");

// fn to render the tasks in array to tasks-list UI
function renderTasks() {
  let htmlString = "";

  tasks.sort(function(a, b){
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    return aDate - bDate
  });

  // filter tasks based on completion
  const pendingTasks = tasks.filter((task) => task.status !== "completed" && task.deleted === false);
  const completedTasks = tasks.filter((task) => task.status === "completed" && task.deleted === false);
  const deletedTasks = tasks.filter((task) =>  task.deleted === true);

  // for each task create HTML String
  pendingTasks.forEach((task) => {
    htmlString += taskHTML(task);
  });
  completedTasks.forEach((task) => {
    htmlString += taskHTML(task);
  });
  deletedTasks.forEach((task) => {
    htmlString += taskHTML(task);
  });
  // replace the content
  tasksList.innerHTML = htmlString;

  // attach event listeners to buttons
  const checkIcons = document.querySelectorAll(".check-icon");
  checkIcons.forEach((icon) =>
    icon.addEventListener("click", handleCheckIconClick)
  );

  const deleteIcons = document.querySelectorAll(".delete-icon");
  deleteIcons.forEach((icon) =>
    icon.addEventListener("click", handleDeleteIconClick)
  );
}

// fn to save the tasks value to localStorage
function saveTasksToLocalStorage () {
  // save to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// initial data load
renderTasks();