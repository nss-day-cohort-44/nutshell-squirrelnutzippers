import { useActiveUser } from "../users/UserProvider.js";
import { saveTask, useTasks, updateTask } from "./TaskProvider.js";

const eventHub = document.querySelector(".container");

export const TaskForm = (taskId) => {
  // logic to determine if this is add new or edit
  const isEdit = () => taskId !== undefined;

  let taskToEdit;

  if (isEdit()) {
    taskToEdit = useTasks().find((task) => task.id === taskId);

    return `
    <div class="form">
    <input type="hidden" id="task--id" value="${taskToEdit.id}">
      <input id="task--description" type="text" placeholder="description" value="${taskToEdit.description}"/>
      <input id="task--completeByDate" type="date" placeholder="completeByDate" value="${taskToEdit.completeByDate}"/>
      <button id="taskForm--submit">submit</button>
    </div>
      `;
  }

  return `
    <div class="form">
      <input id="task--description" type="text" placeholder="description"/>
      <input id="task--completeByDate" type="date" placeholder="completeByDate"/>
      <button id="taskForm--submit">submit</button>
    </div>
      `;
};

eventHub.addEventListener("taskAddClicked", (event) => {
  const contentTarget = document.querySelector("#taskForm__container");
  contentTarget.innerHTML = TaskForm();
});

eventHub.addEventListener("taskEditClicked", (event) => {
  const taskId = event.detail.taskId;
  const contentTarget = document.querySelector("#taskForm__container");
  contentTarget.innerHTML = TaskForm(taskId);
});
eventHub.addEventListener("closeTaskFormClicked", (event) => {
  const contentTarget = document.querySelector("#taskForm__container");
  contentTarget.innerHTML = "";
});

eventHub.addEventListener("click", (event) => {
  // Check task submit button was clicked
  if (event.target.id === "taskForm--submit") {
    // get form input values
    const descriptionInput = document.querySelector("#task--description").value;
    const completeByDateInput = document.querySelector("#task--completeByDate")
      .value;
    const hiddenId = document.querySelector("#task--id");

    if (descriptionInput === "" || completeByDateInput === "") {
      alert("Please Fill out all Fields in the Tasks Form");
    } else {
      const user = useActiveUser();

      // CHECK IF EDITING OR CREATING NEW
      if (hiddenId) {
        const editedTask = {
          id: parseInt(hiddenId.value),
          description: descriptionInput,
          completeByDate: completeByDateInput,
          isComplete: false,
          userId: user.id,
        };
        updateTask(editedTask);
      } else {
        const newTask = {
          description: descriptionInput,
          completeByDate: completeByDateInput,
          isComplete: false,
          userId: user.id,
        };
        saveTask(newTask);
      }
    }
  }
});
