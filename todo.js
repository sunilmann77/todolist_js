let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// adding a task in the list
function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
    }
}

// deleting the task_id
function deleteTask(taskId) {
    const newTasks = tasks.filter(function(task) {
        return task.id !== taskId;
    });
    tasks = newTasks;
    renderList();
}

// add task to dom
function addTaskToDom(task) {
    const li = document.createElement('li');
    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <button style="height:30px; width:50px;" class="delete" data-id="${task.id}">del</button>`;
    taskList.append(li);
}

function renderList () {
    taskList.innerHTML = '';
    for (let i =0; i< tasks.length; i++){
        addTaskToDom(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function Toggletask(taskId) {
    const task = tasks.filter(function(task) {
        return task.id === taskId;
    });
    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification("Task toggled");
        return;
    }
}

function handleinputkeypress (event) {
    if(event.key ==='Enter'){
        const text = event.target.value;
        console.log(text);
        if(!text){

            return;
        }
        const task ={
            text,
            id:Date.now().toString(),
            done:false
        }
        event.target.value = '';
        addTask(task);
    }
}

function handleClickListener(event) {
    const target = event.target;
    if (target.className === 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.className === 'custom-checkbox') {
        const taskId = target.id;
        Toggletask(taskId);
        return;
    }
}

function initializeApp(){
    addTaskInput.addEventListener('keyup',handleinputkeypress);
    document.addEventListener('click',handleClickListener);
}

initializeApp();
