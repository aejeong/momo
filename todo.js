const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
 const btn = event.target;
 const li = btn.parentNode;
 toDoList.removeChild(li);
 const cleanToDos = toDos.filter(function(toDo){
     return toDo.id !== parseInt(li.id);
 });
 toDos =  cleanToDos
saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
const li = document.createElement("li");
const span = document.createElement("span");
const createIcon = document.createElement("i");
createIcon.className = "fas fa-times";
createIcon.addEventListener("click", deleteToDo);
const newId = toDos.length +1;
span.innerText = text;
li.appendChild(span);
li.appendChild(createIcon);
li.id = newId;
toDoList.appendChild(li);
 const toDoObj = {
     text: text,
     id: newId,
     createIcon:createIcon
 };
 
 toDos.push(toDoObj);
 saveToDos();
}

function handleSubmit(event){
event.preventDefault();
const currentValue = toDoInput.value;
paintToDo(currentValue);
toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
        paintToDo(toDo.text);    
        });
    }  
  }

    

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
 }

 init();