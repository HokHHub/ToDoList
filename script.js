let form = document.querySelector(".form");
let input = document.querySelector(".form__input");
let taskList = document.querySelector(".list");
let deleteCompletedButton = document.querySelector(".button__gray");
let deleteAllButton = document.querySelector(".button__red");

function createTask(text) {
    let task = document.createElement("div");
    task.className = "tasks__task task";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task__checkbox";

    let taskText = document.createElement("p");
    taskText.className = "task__text";
    taskText.textContent = text;

    let deleteButton = document.createElement("p");
    deleteButton.className = "task__delete";
    deleteButton.textContent = "❌";

    task.appendChild(checkbox);
    task.appendChild(taskText);
    task.appendChild(deleteButton);
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


let flag = true
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

