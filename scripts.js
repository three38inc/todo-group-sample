import savedTasks from "./data/tasks.json" assert { type: 'json' };


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

function handleCheckIconClick (event) {
    // identify the task
    const taskId = event.target.parentNode.parentNode.id
    // change the status of the task
    const task = tasks.find(t => t.id == taskId)
    if (task) {
        if(task.status == 'completed') {
            task.status = '' // 'pending'
        } else {
            task.status = 'completed'
        }
    } else {
        console.log('Task not found for ', taskId)
    }
    // render tasks again
    renderTasks()
}

const addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', () => {
  const title = document.getElementById("inputText");
  if (!title.value) {
    alert("please enter title");
    return;
  }

  tasks.push({
      id: tasks.length+1,
    title: title.value,
    date: new Date(),
    status: "pending",
  });

  title.value = "";
  renderTasks();
})


const tasksList = document.getElementById("tasks");

function renderTasks() {
    let htmlString = "";
    // for each task create HTML String
    tasks.forEach((task) => {
        htmlString += `
            <div class="task ${task.status}" id="${task.id}">
                <div class="task-title">${task.title}</div>
                <div class="check-icon">
                <i class="fa fa-check" aria-hidden="true"></i>
                </div>
            </div>
        `;
    });
    // replace the content
    tasksList.innerHTML = htmlString;

    // attach event listeners to buttons
    const checkIcons = document.querySelectorAll('.check-icon')
    checkIcons.forEach(icon => icon.addEventListener('click', handleCheckIconClick))
}

// initial data load
renderTasks();



