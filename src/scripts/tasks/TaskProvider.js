const eventHub = document.querySelector(".container");

let tasks = [];

const dispatchStateChangeEvent = () => {
  const taskStateChanged = new CustomEvent("tasksStateChanged");
  eventHub.dispatchEvent(taskStateChanged);
};

export const getTasks = () => {
  return fetch("http://localhost:8088/tasks")
    .then((response) => response.json())
    .then((tasksData) => {
      tasks = tasksData;
    });
};

export const saveTask = (taskObj) => {
  return fetch("http://localhost:8088/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  }).then(dispatchStateChangeEvent);
};

export const updateTask = (taskObj) => {
  return fetch(`http://localhost:8088/tasks/${taskObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  }).then(dispatchStateChangeEvent);
};

export const deleteTask = (id) => {
  return fetch(`http://localhost:8088/tasks/${id}`, {
    method: "DELETE",
  }).then(dispatchStateChangeEvent);
};

export const useTasks = () => {
  return tasks.slice();
};
