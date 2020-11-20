export const setDragDrop = () => {
  // ELEMENTS TO DRAG
  const weatherContainer = document.getElementById("weather");
  weatherContainer.setAttribute("draggable", true);
  weatherContainer.addEventListener("dragstart", onDragStart);
  const tasksContainer = document.getElementById("tasks");
  tasksContainer.setAttribute("draggable", true);
  tasksContainer.addEventListener("dragstart", onDragStart);
  const friendsContainer = document.getElementById("friends");
  friendsContainer.setAttribute("draggable", true);
  friendsContainer.addEventListener("dragstart", onDragStart);

  // LOCATION TO DROP
  const dropzone1 = document.getElementById("dropzone-1");
  dropzone1.addEventListener("dragover", onDragOver);
  dropzone1.addEventListener("drop", onDrop);

  const dropzone2 = document.getElementById("dropzone-2");
  dropzone2.addEventListener("dragover", onDragOver);
  dropzone2.addEventListener("drop", onDrop);
};

function onDragStart(event) {
  console.log(event);
  event.dataTransfer.setData("text/plain", event.target.id);
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  console.log("event: ", event);
  const id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  dropzone.appendChild(draggableElement);

  event.dataTransfer.clearData();
}
