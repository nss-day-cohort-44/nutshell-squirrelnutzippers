import { deleteTask, completeTask } from "./TaskProvider.js";

export const TaskCard = (taskObj) => {
  const options = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  };
  const date = new Date(taskObj.completeByDate).toLocaleDateString(
    "en-US",
    options
  );

  const taskAsHTML = `
    <div class="task--card">
        <div><input id="complete-task--${taskObj.id}" type="checkbox" value="${taskObj.isComplete}"></div>
        <div>${date}</div>
        <div>${taskObj.description}</div>
        <div class="icons__container">
            <i id="delete-task--${taskObj.id}" class="far fa-trash-alt"></i>
            <i id="edit-task--${taskObj.id}" class="far fa-edit"></i>
        </div>
    </div>
    `;
  return taskAsHTML;
};

const eventHub = document.querySelector(".container");
eventHub.addEventListener("click", (event) => {
  if (event.target.id.startsWith("delete-task--")) {
    const [prefix, taskId] = event.target.id.split("--");
    deleteTask(parseInt(taskId));
  }
  if (event.target.id.startsWith("edit-task--")) {
    const [prefix, taskId] = event.target.id.split("--");
    const taskEditEvent = new CustomEvent("taskEditClicked", {
      detail: {
        taskId: parseInt(taskId),
      },
    });
    eventHub.dispatchEvent(taskEditEvent);
  }
  if (event.target.id.startsWith("complete-task--")) {
    const [prefix, taskId] = event.target.id.split("--");
    completeTask(taskId);
  }
});
