let itemEl = document.getElementById('item');
let addEl = document.getElementById('add');

addEl.addEventListener('click', (e) => {     //create event listener for add button
    e.preventDefault();

    let task = itemEl.value;

    let localItems = localStorage.getItem('localItem');

    if(localItems === null) {     //check if there any items are already in localstorage
        taskList = [];
    }
    else {
        taskList = JSON.parse(localItems);
    }

    if(!task.trim()) {     //handle the space or tab before entering data
        return;
    }

    taskList.push(task);
    localStorage.setItem('localItem', JSON.stringify(taskList));     //convert JSON data into object
     
    itemEl.value = '';
    itemEl.focus();
    showList();
})

function showList() {     //create a function to show the list
    let localItems = localStorage.getItem('localItem');

    if(localItems === null) {
        taskList = [];
    }
    else {
        taskList = JSON.parse(localItems);
    }

    let output = '';
    let tasksEl = document.getElementById('tasks');
    
    taskList.forEach((data, index) => {     //add tasks one after another
        output += `
            <div class="task">
                <div class="content">
                    <input type="text" name="text" class="text" value="${data}" readonly>
                </div>
                <div class="actions">
                    <button type="button" onclick="updateItem(${index})">Update</button>
                    <button type="button" onclick="deleteItem(${index})">Delete</button>
                </div>
            </div>
        `
    });
    tasksEl.innerHTML = output;
}
showList();

function updateItem(index) {     //update a specific item using index value
    let localItems = localStorage.getItem('localItem');
    let taskList = JSON.parse(localItems);
    itemEl.value = taskList[index];

    itemEl.focus();

    let saveEl = document.getElementById('save');
    let addEl = document.getElementById('add');
    let saveIndexEl = document.getElementById('saveindex');
    saveIndexEl.value = index;

    saveEl.style.display = 'block';
    addEl.style.display = 'none';
}

let saveEl = document.getElementById('save');     //after update save the data
saveEl.addEventListener('click', ()=> {
    let localItems = localStorage.getItem('localItem');
    let taskList = JSON.parse(localItems);

    let addEl = document.getElementById('add');
    let saveIndexEl = document.getElementById('saveindex').value;
    taskList[saveIndexEl] = item.value;
    localStorage.setItem('localItem', JSON.stringify(taskList));

    saveEl.style.display = 'none';
    addEl.style.display = 'block';

    itemEl.value = '';
    showList();
})

function deleteItem(index) {     //delete a specific item or data
    let localItems = localStorage.getItem('localItem');
    let taskList = JSON.parse(localItems);
    
    taskList.splice(index, 1);

    let saveEl = document.getElementById('save');
    let addEl = document.getElementById('add');

    saveEl.style.display = 'none';
    addEl.style.display = 'block';

    localStorage.setItem('localItem', JSON.stringify(taskList));
    showList();
}