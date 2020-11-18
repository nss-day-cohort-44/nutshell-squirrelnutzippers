import { TaskCard } from "./TaskCard.js";
import { getTasks, useTasks } from "./TaskProvider.js";
import { useActiveUser } from "../users/UserProvider.js";
import "./TaskForm.js";

let tasksArray = [];

export const TaskList = () => {
  getTasks().then(() => {
    const taskData = useTasks();
    const activeUser = useActiveUser();

    // get all articles from active user
    const filteredTasks = taskData.filter(
      (task) => task.userId === activeUser.id
    );
    tasksArray = filteredTasks;

    render();
  });
};

const render = () => {
  // location on DOM to Render ?? SHOULD THIS BE DECIDED BY COMPONENT or PARENT???
  const contentTarget = document.querySelector("#tasks");
  let tasksAsHTML = "";

  // CHECK IF USER HAS ANY EVENTS
  if (tasksArray.length === 0) {
    tasksAsHTML = "No tasks saved";
  } else {
    tasksAsHTML = tasksArray.map((task) => TaskCard(task)).join("");
  }
  // RENDER taskSHTML TO DOM
  contentTarget.innerHTML = `
    <h1 class='section--header'>
        Tasks
        <button id="task--add-edit">+ New Task</button>
    </h1>
    <div id="taskForm__container"></div>
    <div class='task--list'>
        ${tasksAsHTML}
    </div>`;
};

const eventHub = document.querySelector(".container");
eventHub.addEventListener("click", (event) => {
  if (event.target.id === "task--add-edit") {
    const taskAddEvent = new CustomEvent("taskAddClicked");
    eventHub.dispatchEvent(taskAddEvent);
  }
});

eventHub.addEventListener("tasksStateChanged", TaskList);
