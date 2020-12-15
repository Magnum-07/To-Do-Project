// Selectors
const todoinput = document.querySelector('.todo-input')
const todobutton = document.querySelector('.todo-button')
const todolist = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event listeners
document.addEventListener('DOMContentLoaded', getTodo)
todobutton.addEventListener('click', addTodo);
todolist.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)
// Functions
function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();
    //Checking if the user has eneterd any value or not
    if (!todoinput.value) {
        alert("Enter a value")
    } else {
        // Div with class of todo
        const newDiv = document.createElement('div')
        newDiv.classList.add('todo')

        //creating li
        const newLi = document.createElement('li');
        newLi.innerText = todoinput.value;
        newLi.classList.add('todo-item');
        newDiv.appendChild(newLi)

        //Adding values to local Storage
        saveLocalTodos(todoinput.value)
        //Creating Edit button
        const newButton1 = document.createElement('button')
        newButton1.innerHTML = '<i class="fas fa-edit"></i>'
        newButton1.classList.add('edit-btn')
        newDiv.appendChild(newButton1)

        //creating save button
        const newButton2 = document.createElement('button')
        newButton2.innerHTML = '<i class="fas fa-save"></i>'
        newButton2.classList.add('save-btn')
        newDiv.appendChild(newButton2)
        //creating completed button
        const newButton3 = document.createElement('button')
        newButton3.innerHTML = '<i class="fas fa-check"></i>'
        newButton3.classList.add('complete-btn')
        newDiv.appendChild(newButton3)

        //Creating trash button
        const newButton4 = document.createElement('button')
        newButton4.innerHTML = '<i class="fas fa-trash"></i>'
        newButton4.classList.add('trash-btn')
        newDiv.appendChild(newButton4)


        //Appedning to lists
        todolist.appendChild(newDiv)

        //CLearing todoinput value
        todoinput.value = ""
    }

}

function deleteCheck(e) {
    const item = e.target;

    //Deleting Item
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo)
        //Animation Delete
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }

    //Check Mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }

    //Editing 

    if (item.classList[0] === "edit-btn") {
        // const todo_item = document.querySelector('.todo_item')
        // const previousValue = e.target.parentElement
        const todo = item.parentElement;
        todo.addEventListener('click', () => {
            todo.setAttribute("contentEditable", true)
        })
    }

    //Saving
    if (item.classList[0] === "save-btn") {
        const todo = item.parentElement;
        // console.log(previousValue)
        todo.addEventListener('click', () => {
            todo.setAttribute("contentEditable", false)
        })
        updatingLocalToDos(todo)
        // const value = todo.children[0].innerText
        // const value = todo.children[0].innerText
        // // updatingToDos
    }

}

function filterTodo(e) {
    const todos = todolist.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex'
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
        }
    })
}

// function checker() {
//     //Checking
//     let todos;
//     if (localStorage.getItem('todos') === null) {
//         todos = []
//     }
//     else {
//         todos = JSON.parse(localStorage.getItem("todos"))
//     }
// }

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodo() {
    //Checking
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function (todo) {
        // Div with class of todo
        const newDiv = document.createElement('div')
        newDiv.classList.add('todo')

        //creating li
        const newLi = document.createElement('li');
        newLi.innerText = todo;
        newLi.classList.add('todo-item');
        newDiv.appendChild(newLi)

        //Creating Edit button
        const newButton1 = document.createElement('button')
        newButton1.innerHTML = '<i class="fas fa-edit"></i>'
        newButton1.classList.add('edit-btn')
        newDiv.appendChild(newButton1)

        //creating save button
        const newButton2 = document.createElement('button')
        newButton2.innerHTML = '<i class="fas fa-save"></i>'
        newButton2.classList.add('save-btn')
        newDiv.appendChild(newButton2)
        //creating completed button
        const newButton3 = document.createElement('button')
        newButton3.innerHTML = '<i class="fas fa-check"></i>'
        newButton3.classList.add('complete-btn')
        newDiv.appendChild(newButton3)

        //Creating trash button
        const newButton4 = document.createElement('button')
        newButton4.innerHTML = '<i class="fas fa-trash"></i>'
        newButton4.classList.add('trash-btn')
        newDiv.appendChild(newButton4)


        //Appedning to lists
        todolist.appendChild(newDiv)

        //CLearing todoinput value
        todoinput.value = ""
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function updatingLocalToDos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;

    localStorage.setItem("todos", JSON.stringify(todo))
}