let form = document.querySelector(".form");
let input = document.querySelector(".form__input");
let taskList = document.querySelector(".list");
let deleteCompletedButton = document.querySelector(".button__gray");
let deleteAllButton = document.querySelector(".button__red");
let deleteCross = document.querySelector('.task__delete')

function attachDeleteEvent(deleteButton) {
    deleteButton.addEventListener('click', () => {
        deleteButton.closest('.task').remove()
        checklist()
    })
}

function attachEditEvent(editButton) {
    editButton.addEventListener('click', () => {
        let taskElement = editButton.closest('.task');
        let taskTextElement = taskElement.querySelector('p.task__text');

        if (editButton.textContent === '✏️') {
            // Начало редактирования
            let input = document.createElement('input');
            input.className = 'menu__input';
            input.value = taskTextElement.textContent;
            taskTextElement.replaceWith(input);
            editButton.textContent = '✅';
        } else {
            // Завершение редактирования
            let input = taskElement.querySelector('input.menu__input');
            if (input) {
                let newText = document.createElement('p');
                newText.className = 'task__text';
                newText.textContent = input.value;
                input.replaceWith(newText);
                editButton.textContent = '✏️';
            }
        }
    });
}



function createTask(text) {
    let task = document.createElement("div");
    task.className = "tasks__task task";

    task.innerHTML = `
        <input type="checkbox" class="task__checkbox">
        <p class="task__text">${text}</p>
        <p class="task__edit">✏️</p>
        <p class="task__delete">🗑</p>
    `;
    
    let editButton = task.querySelector(".task__edit");
    let deleteButton = task.querySelector(".task__delete");
    attachDeleteEvent(deleteButton)
    attachEditEvent(editButton)

    taskList.appendChild(task);
    checklist()
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let taskText = input.value.trim();
    if (taskText) {
        createTask(taskText);
        input.value = "";
    }
    checklist()
});

deleteCompletedButton.addEventListener("click", () => {
    let completedTasks = document.querySelectorAll(".task__checkbox:checked");
    completedTasks.forEach((checkbox) => {
        checkbox.closest(".task").remove();
    });
    checklist()
});

deleteAllButton.addEventListener("click", () => {
    taskList.innerHTML = "";
    checklist()
});


let flag = false
function checklist() {
    let checklist = document.querySelector('.task')
    let menu = document.querySelector('.menu')
    let hr = document.querySelector('.menu__hr')
    let footer = document.querySelector('.footer')

    if (!checklist) {
        footer.classList.add('dnone')
        menu.classList.add('addradius')
        hr.classList.add('dnone')
        flag = false
    }

    if (checklist && flag == false) {
        footer.classList.remove('dnone')
        menu.classList.remove('addradius')
        hr.classList.remove('dnone')
        flag = true
    }

}