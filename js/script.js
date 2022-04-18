"use strict";

let index = 0;

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const toDoData = [];

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach((item) => {
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = `<span class="text-todo">${item.text}</span>
                        <div class="todo-buttons">
                            <button class="todo-remove"></button>
                            <button class="todo-complete"></button>
                        </div>`;
        
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            localStorage.setItem('key', JSON.stringify(toDoData));
            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', () => {
            toDoData.splice(toDoData[item.id], 1);
            render();
        });

    });
};

todoControl.addEventListener('submit',  (event) => {
    event.preventDefault();

    const newToDo = {
        id: index,
        text: headerInput.value,
        completed: false
    };

    if (headerInput.value !== '') {
        toDoData.push(newToDo);
    }

    headerInput.value = '';
    index++;
    localStorage.setItem('key', JSON.stringify(toDoData));
    render();
});

window.onload = () => {

    let loadLocal = JSON.parse(localStorage.getItem('key'));

    if (loadLocal === null) {
        return false;
    }

    loadLocal.forEach((item) => {
        const newToDo = {
            id: item.id,
            text: item.text,
            completed: item.completed
        };
        toDoData.push(newToDo);
    });
    render();
};




