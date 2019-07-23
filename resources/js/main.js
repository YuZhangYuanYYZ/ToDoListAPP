0723

var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  todo: [],
  completed: []
};
// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

renderTodoList();
// User clicked on the add button, If there is any text inside the item field, add that text to the todo list
document.getElementById('add').addEventListener('click', function () {
  var itemContents = document.getElementById('item').value;
  if (itemContents) {
    addTodoItem(itemContents);
  }
});

document.getElementById('item').addEventListener('keydown', function (e) {
  var itemContents = document.getElementById('item').value;
  if ((e.code === 'Enter' || e.code === 'NumpadEnter') && itemContents) {
    addTodoItem(itemContents);
  }
});

function addTodoItem(contents) {
  addItemToDOM(contents);
  document.getElementById('item').value = '';
  data.todo.push(contents);
  dataObjectUpdated();
}
// This fuction ensure that the data stored in the localStorage could be loaded on opeing the browser
function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;
  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItemToDOM(value);
  }
  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItemToDOM(value, true); //此处有 第二个参数　true
  }
}

function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}


function getcurrentProcessElement(event) {
  var item = event.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;
  return {
    item,
    parent,
    id,
    value
  }
}

function updateDomAfterClicRemoveButton(parent, item) {
  parent.removeChild(item);

}

function updateGlobalDateAfterClicRemoveButton(id, value, data) {
  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
}

function updateLocalStorage(data) {
  localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
  let currentProcessElement = getcurrentProcessElement(this);
  updateDomAfterClicRemoveButton(currentProcessElement.parent, currentProcessElement.item);
  updateGlobalDateAfterClicRemoveButton(currentProcessElement.id, currentProcessElement.value, data);
  updateLocalStorage(data);
}


function updateDomAfterClickCompleteButton(parent, item) {
  var target = (parent.id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

function updateGlobalDateAfterClicRemoveButton(id, value, data) {
  if (id == "todo") {
    data.completed.push(value);
    data.todo.splice(data.todo.indexOf(value), 1);
  }
  else {
    data.todo.push(value);
    data.completed.splice(data.completed.indexOf(value), 1);
  }
}

function completeItem() {
  let currentProcessElement = getcurrentProcessElement(this);
  updateDomAfterClickCompleteButton(currentProcessElement.parent, currentProcessElement.item);
  updateGlobalDateAfterClicRemoveButton(currentProcessElement.id, currentProcessElement.value, data);
  updateLocalStorage(data);
}

function createAButton(buttonName, className, buttonSVG) {
  buttonName = document.createElement('button');
  buttonName.classList.add(className);
  buttonName.innerHTML = buttonSVG;
  return buttonName;
}

function createLiWithButtons(text) {
  var item = document.createElement('li');
  item.innerText = text;
  var buttonElements = document.createElement('div');
  buttonElements.classList.add('buttons');
  return {
    item,
    buttonElements
  }
}

function addEventListenerToButton() {
  // Add click event for removing the item
  let aRemoveButton;
  let removeButton = createAButton(aRemoveButton, "remove", removeSVG);
  removeButton.addEventListener('click', removeItem);
  // Add click event for completing the item
  let aCompleteButton;
  let completeButton = createAButton(aCompleteButton, "complete", completeSVG);
  completeButton.addEventListener('click', completeItem);
  return {
    removeButton,
    completeButton
  }
}
// Adds a new item to the todo list
function addItemToDOM(text, completed) {

  var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');
  let liWithButtonsElement = createLiWithButtons(text);
  // let buttonElement = liWithButtonsElement.buttonElements;
  let eventButton = addEventListenerToButton();

  liWithButtonsElement.buttonElements.appendChild(eventButton.removeButton);
  liWithButtonsElement.buttonElements.appendChild(eventButton.completeButton);
  liWithButtonsElement.item.appendChild(liWithButtonsElement.buttonElements);

  list.insertBefore(liWithButtonsElement.item, list.childNodes[0]);
}

