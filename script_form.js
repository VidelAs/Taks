window.onload = function () {
  //fetchTasks();
  getTaskList();
  getUserName();
};

async function addTasks() {
  let task = {
    task_id: 3,
    title: "New task 3",
    start_date: null,
    due_date: null,
    status: 1,
    priority: 1,
    description: "New Task Description 3.",
    created_at: null,
    user: 1,
  };
}

async function getUserName() {
  const config = {
    method: "get",
    url: "http://localhost:4000/api/users/get-names",
  };

  let res = await axios(config);
  let users = res.data.results;
  console.log(users.length);

  let select = document.getElementById("created");
  let option = document.createElement("option");
  option.text = "";
  option.value = 0;
  select.add(option);
  for (let i = 0; i < users.length; i++) {
    let option = document.createElement("option");
    option.text = users[i].user_first_name + " " + users[i].user_last_name;
    option.value = i + 1;
    select.add(option);
  }
}

async function getTaskList() {
  const config = {
    method: "get",
    url: "http://localhost:4000/api/tasks",
  };

  let res = await axios(config);
  let tasks = res.data.results;

  console.log(tasks);
  let table = document.getElementById("tasks");
  let row = table.insertRow(0);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = "Titulo";
  cell2.innerHTML = "Descripcion";
  for (let i = 0; i < tasks.length; i++) {
    let row = table.insertRow(i + 1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = tasks[i].title;
    cell2.innerHTML = tasks[i].description;
  }
}

//dom
// Info date
const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");
let tbody = "";
let t_body = document.getElementById("tbody");

// Tasks Container
const tasksContainer = document.getElementById("tasksContainer");

const setDate = () => {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString("en", { day: "numeric" });
  dateText.textContent = date.toLocaleString("en", { weekday: "long" });
  dateMonth.textContent = date.toLocaleString("en", { month: "short" });
  dateYear.textContent = date.toLocaleString("en", { year: "numeric" });
};

const addNewTask = (event) => {
  event.preventDefault();
  const title = event.target.title.value;
  const des = event.target.description.value;
  const priority = event.target.color.value;
  //const sel = event.target.select.value;
  const select = document.getElementById("select");
  const sel = select.options[select.selectedIndex].text;
  if (!title) return;
  if (!des) return;
  if (!priority) return;
  if (!sel) return;
  tbody =
    tbody +
    "<tr><td>" +
    title +
    "</td><td>" +
    des +
    "</td><td>" +
    priority +
    "</td><td>" +
    sel +
    "</td></tr>";
  t_body.innerHTML = tbody;
  const task = document.createElement("form");
  task.classList.add("task", "roundBorder");
  task.addEventListener("click", changeTaskState);
  task.tbody = tbody;
  tbody.prepend(task);
  event.target.reset();
};

const changeTaskState = (event) => {
  event.target.classList.toggle("done");
};

const order = () => {
  const done = [];
  const toDo = [];
  tasksContainer.childNodes.forEach((el) => {
    el.classList.contains("done") ? done.push(el) : toDo.push(el);
  });
  return [...toDo, ...done];
};

const renderOrderedTasks = () => {
  order().forEach((el) => tasksContainer.appendChild(el));
};

setDate();
