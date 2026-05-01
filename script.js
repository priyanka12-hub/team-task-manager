let totalTasks = 0;
let completedTasks = 0;

function createProject() {
  let input = document.getElementById("projectName");
  let name = input.value.trim();

  if (name === "") {
    alert("Enter project name!");
    return;
  }

  let li = document.createElement("li");
  li.innerText = "Project: " + name;

  document.getElementById("projectList").appendChild(li);

  let option = document.createElement("option");
  option.value = name;
  option.innerText = name;
  document.getElementById("projectSelect").appendChild(option);

  input.value = "";
}

function createTask() {
  let task = document.getElementById("taskBox").value.trim();
  let date = document.getElementById("dueDate").value;
  let status = document.getElementById("status").value;
  let project = document.getElementById("projectSelect").value;

  if (project === "") {
    alert("Select project!");
    return;
  }

  if (task === "") {
    alert("Enter task!");
    return;
  }

  let li = document.createElement("li");

  li.innerText =
    "[" +
    project +
    "] " +
    task +
    (date ? " (Due: " + date + ")" : "") +
    " [" +
    status +
    "]";

  li.addEventListener("click", function () {
    if (!li.classList.contains("done")) {
      li.classList.add("done");
      li.style.textDecoration = "line-through";
      li.style.color = "gray";
      completedTasks++;
    } else {
      li.classList.remove("done");
      li.style.textDecoration = "none";
      li.style.color = "black";
      completedTasks--;
    }
    updateDashboard();
  });

  let delBtn = document.createElement("button");
  delBtn.innerText = "Delete";

  delBtn.onclick = function (e) {
    e.stopPropagation(); // IMPORTANT
    if (li.classList.contains("done")) completedTasks--;
    li.remove();
    totalTasks--;
    updateDashboard();
  };

  li.appendChild(delBtn);

  document.getElementById("taskList").appendChild(li);

  totalTasks++;
  updateDashboard();

  document.getElementById("taskBox").value = "";
  document.getElementById("dueDate").value = "";
}

function updateDashboard() {
  let pending = totalTasks - completedTasks;

  document.getElementById("dashboard").innerText =
    "Total Tasks: " +
    totalTasks +
    " | Completed: " +
    completedTasks +
    " | Pending: " +
    pending;
}


