const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
let newId;
let li;
let delBtn;
let span;

function createToDo(text) {
    paintToDo(text);
    saveToDo(text);
}
function paintToDo(text) {
    paintDelBtn();
    paintLi(text);
}
function paintLi(text) {
    li = document.createElement("li");
    span = document.createElement("span");
    newId = toDos.length;
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
}
function paintDelBtn() {
    delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
}
function deleteToDo(event) {
    li = event.target.parentNode;
    toDoList.removeChild(li);
    cleanToDos = toDos.filter(function(toDo) {
        return parseInt(li.id) !== toDo.id;
    });
    toDos = cleanToDos;
    saveToDos();
    // debugger;
    toDoList.innerHTML = "";
    loadToDos();
}
function saveToDo(text) {
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
}
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    createToDo(currentValue);
    saveToDos();
    toDoInput.value = "";
}
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        toDos = [];
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            createToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();