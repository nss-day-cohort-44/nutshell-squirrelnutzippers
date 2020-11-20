/*
  Author: Bryan Nilsen
  Responsibility: This module handles all of the drag and drop functionality
    for the dashboard container elements.
    Gets references to all elements and adds appropriate attributes,
    styles, and event listeners.

    
*/

export const setDragDrop = () => {
  // GET ELEMENTS TO DRAG > all have class of "category__container"
  const containerElements = document.querySelectorAll(".category__container");

  // set draggable attribute and event listeners
  for (const container of containerElements) {
    container.setAttribute("draggable", true);
    container.addEventListener("dragstart", onDragStart);
  }

  // GET DROP ZONE ELEMENTS > all have class of "dropzone"
  const dropZoneElements = document.querySelectorAll(".dropzone");

  // set event listeners
  for (const element of dropZoneElements) {
    element.addEventListener("dragover", onDragOver);
    element.addEventListener("drop", onDrop);
  }
};

function onDragStart(event) {
  // get id of item being dragged
  event.dataTransfer.setData("text/plain", event.target.id);
  // adds style to element while being dragged
  event.currentTarget.classList.add("dragging");
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  console.log("DROP event: ", event);
  const id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  draggableElement.classList.remove("dragging");
  const dropzone = event.target;
  dropzone.appendChild(draggableElement);

  event.dataTransfer.clearData();
}
