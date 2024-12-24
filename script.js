let form = document.querySelector(".form");
let input = document.querySelector(".form__input");
let taskList = document.querySelector(".list");
let deleteCompletedButton = document.querySelector(".button__gray");
let deleteAllButton = document.querySelector(".button__red");
let deleteCross = document.querySelector('.task__delete')
let localStorage = window.localStorage
let save = []
let checkbox = document.querySelectorAll('.task__checkbox')


if (localStorage.getItem('item') != undefined) {
    let items = JSON.parse(localStorage.getItem('item'))
    for (let index = 0; index < items.length; index++) {
        createTask(items[index]['text'], items[index]['checkbox'])
    }


}
checklist()


function attachDeleteEvent(deleteButton) {
    deleteButton.addEventListener('click', () => {
        let taskElement = deleteButton.closest('.task');
        let taskIndex = Array.from(taskList.children).indexOf(taskElement);
        deleteButton.closest('.task').remove()
        checklist()
        save.splice(taskIndex, 1);
        localStorage.setItem('item', JSON.stringify(save));
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
                let taskIndex = Array.from(taskList.children).indexOf(taskElement);
                save[taskIndex].text = input.value;
                localStorage.setItem('item', JSON.stringify(save));
                input.replaceWith(newText);
                editButton.textContent = '✏️';
            }
        }
    });
}



function createTask(text, checkbox = false) {
    let task = document.createElement("div");
    task.className = "tasks__task task";

    if (!checkbox) {
        task.innerHTML = `
        <input type="checkbox" class="task__checkbox">
        <p class="task__text">${text}</p>
        <p class="task__edit">✏️</p>
        <p class="task__delete">🗑</p>
    `;
    } else {
        task.innerHTML = `
        <input type="checkbox" class="task__checkbox" checked>
        <p class="task__text">${text}</p>
        <p class="task__edit">✏️</p>
        <p class="task__delete">🗑</p>
    `;
    }

    let editButton = task.querySelector(".task__edit");
    let deleteButton = task.querySelector(".task__delete");
    attachDeleteEvent(deleteButton)
    attachEditEvent(editButton)

    taskList.appendChild(task);

    save.push({ 'text': text, 'checkbox': checkbox })
    localStorage.setItem('item', JSON.stringify(save))
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

    for (let index = 0; index < save.length; index++) {
        if (Boolean(save[index].checkbox)) {
            save.splice(index, 1)
            localStorage.setItem('item', JSON.stringify(save))
        }

    }

    checklist()

});

deleteAllButton.addEventListener("click", () => {
    taskList.innerHTML = "";
    checklist()
    save = []
    localStorage.removeItem('item')
});


function checklist() {
    let checklist = document.querySelectorAll('.task')
    let menu = document.querySelector('.menu')
    let hr = document.querySelector('.menu__hr')
    let footer = document.querySelector('.footer')

    if (!checklist.length) {
        footer.classList.add('dnone')
        menu.classList.add('addradius')
        hr.classList.add('dnone')
    } else {
        footer.classList.remove('dnone')
        menu.classList.remove('addradius')
        hr.classList.remove('dnone')
    }

    checklist.forEach((task, index) => {
        let checkbox = task.querySelector('.task__checkbox')
        checkbox.addEventListener('change', () => {
            save[index].checkbox = checkbox.checked
            localStorage.setItem('item', JSON.stringify(save))
        })
    })
}