import savedTasks from "./data/tasks.json" assert { type: "json" };

const dateFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const timeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

const timeFormat = new Intl.DateTimeFormat("en-GB", timeFormatOptions);
const dateFormat = new Intl.DateTimeFormat("en-GB", dateFormatOptions);

setInterval(() => {
  const today = new Date();
  // print date
  document.getElementById("date").innerHTML = dateFormat.format(today);
  // print time
  document.getElementById("time").innerHTML = timeFormat.format(today);
}, 1000);

// Todo: saved Tasks to file
// tasks is having data from data/tasks.json
let tasks = savedTasks;

function handleCheckIconClick(event) {
  // identify the task
  const taskId = event.target.parentNode.parentNode.id;
  // change the status of the task
  const task = tasks.find((t) => t.id == taskId);
  if (task) {
    if (task.status == "completed") {
      task.status = ""; // 'pending'
    } else {
      task.status = "completed";
    }
  } else {
    console.log("Task not found for ", taskId);
  }
  // render tasks again
  renderTasks();
}

function taskHTML(data) {

  const month = new Intl.DateTimeFormat("en-GB", {
    month: 'short'
  }).format(new Date(data.date));
  const date = new Intl.DateTimeFormat("en-GB", {
    day: '2-digit'
  }).format(new Date(data.date));

  return `
    <div class="task ${data.status}" id="${data.id}">
        <div class="task-title">
          <div class="task-date">
            <div class="month">${month}</div>
            <div class="date">${date}</div>
          </div>
          <div class="title">${data.title}</div>
        </div>
        <div class="check-icon">
          <i class="fa fa-check" aria-hidden="true"></i>
        </div>
    </div>
  `;
}

const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  const title = document.getElementById("inputText");
  if (!title.value) {
    alert("please enter title");
    return;
  }

  tasks.push({
    id: tasks.length + 1,
    title: title.value,
    date: new Date(),
    status: "pending",
  });

  title.value = "";
  renderTasks();
});

const tasksList = document.getElementById("tasks");

function renderTasks() {
  let htmlString = "";

  tasks.sort(function(a, b){
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    return aDate - bDate
  });

  // filter tasks based on completion
  const pendingTasks = tasks.filter((task) => task.status !== "completed");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  // for each task create HTML String
  pendingTasks.forEach((task) => {
    htmlString += taskHTML(task);
  });
  completedTasks.forEach((task) => {
    htmlString += taskHTML(task);
  });
  // replace the content
  tasksList.innerHTML = htmlString;

  // attach event listeners to buttons
  const checkIcons = document.querySelectorAll(".check-icon");
  checkIcons.forEach((icon) =>
    icon.addEventListener("click", handleCheckIconClick)
  );
}

// initial data load
renderTasks();
