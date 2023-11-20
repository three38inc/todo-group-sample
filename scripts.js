const today = new Date();

const dateFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const dateFormat = new Intl.DateTimeFormat('en-GB', dateFormatOptions);

document.getElementById("date").innerHTML = dateFormat.format(today);


let tasks = []

tasks.push({
    title: "Morning Task 1",
    date: new Date(),
    status: 'pending'
})

tasks.push({
    title: "Morning Task 2",
    date: new Date(),
    status: 'completed'
})

tasks.push({
    title: "Morning Task 3",
    date: new Date(),
    status: ''
})

tasks.push({
    title: "Morning Task 4",
    date: new Date(),
    status: 'pending'
})

const tasksList = document.getElementById('tasks')

function renderTasks () {
    let htmlString = ''
    // for each task create HTML String
    tasks.forEach(task => {
        htmlString += `
        <div class="task ${task.status}">
            <div class="task-title">${task.title}</div>
            <div class="check-icon">
            <i class="fa fa-check" aria-hidden="true"></i>
            </div>
        </div>
        `
    })
    // replace the content
    tasksList.innerHTML = htmlString
}

// initial data load
renderTasks()


const addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', () => {
    const title = document.getElementById('inputText')
    if (!title.value) {
        alert('please enter title')
        return
    }

    tasks.push({
        title: title.value,
        date: new Date(),
        status: 'pending'
    })

    title.value = ''

    renderTasks()
})

