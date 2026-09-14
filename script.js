const taskCount = document.getElementById("taskCount");
const taskInput = document.getElementById("taskInput");
const add = document.getElementById("add");
const taskList = document.getElementById("taskList");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");
const totalStat = document.getElementById("totalStat");
const activeStat = document.getElementById("activeStat");
const completedStat = document.getElementById("completedStat");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateStats() {
    totalStat.textContent = tasks.length;
    activeStat.textContent = tasks.filter(function(task) {
        return task.completed === false;
    }).length;
    completedStat.textContent = tasks.filter(function(task) {
        return task.completed === true;
    }).length;
}
  
function createTask(task) {

    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed === true) {
    taskText.style.textDecoration = "line-through";
}
    li.appendChild(taskText);

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    li.prepend(completeBtn);

    completeBtn.addEventListener("click", function() {
              task.completed = !task.completed;
              localStorage.setItem("tasks", JSON.stringify(tasks));
              updateStats();

        if (taskText.style.textDecoration === "line-through") {
            taskText.style.textDecoration = "none";
        } else {
            taskText.style.textDecoration = "line-through";
        }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    li.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", function() {
    li.remove();

    tasks = tasks.filter(function(item) {
        return item !== task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateStats();

    taskCount.textContent = "Tasks: " + taskList.children.length;
});
    

    taskList.appendChild(li);
}
   
tasks.forEach(function(task) {
    createTask(task);
});

taskCount.textContent = "Tasks: " + taskList.children.length;
updateStats();

add.addEventListener("click", function() {
      if (taskInput.value.trim() === "") {
    return;
}
  const newTask = {
    text: taskInput.value.trim(),
    completed: false
};

tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
  updateStats();
  createTask(newTask);
taskCount.textContent = "Tasks: " + taskList.children.length;
taskInput.value = "";
});
  taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        add.click();
    }
});
allBtn.addEventListener("click", function() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        createTask(task);
    });
});
    activeBtn.addEventListener("click", function() {
    taskList.innerHTML = "";

    const activeTasks = tasks.filter(function(task) {
        return task.completed === false;
    });

    activeTasks.forEach(function(task) {
        createTask(task);
    });
});


completedBtn.addEventListener("click", function() {
    taskList.innerHTML = "";

    const completedTasks = tasks.filter(function(task) {
        return task.completed === true;
    });

    completedTasks.forEach(function(task) {
        createTask(task);
    });
});
   function updateDateTime() {
    const now = new Date();

    const date = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    document.getElementById("currentDate").textContent = date;
    document.getElementById("currentTime").textContent = time;
}

updateDateTime();
setInterval(updateDateTime, 1000);
