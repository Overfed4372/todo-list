export default class Forms {
    static projectElements = {
        formOuter: document.querySelector (".projects-form"),
        form: document.querySelector (".projects-form form"),
        input: document.querySelector (".projects-form form label input"),
        inputError: document.querySelector (".projects-form form span"),
        submit: document.querySelector (".projects-form form button"),
        displayButton: document.querySelector (".projects-title .add-image")
    }
    static taskElements = {
        addTask: document.querySelector(".add-tasks"),
        list: document.querySelector(".tasks-list"),
        formOuter: () => document.querySelector(".task-form"),
        form : document.querySelector(".task-field"),
        title: document.querySelector(".task-title"),
        details: document.querySelector(".task-details"),
        submit: document.querySelector("task-form-submit")
    }
    static setProjectsFormUI () {
        (function createForm () {
            Forms.projectElements.formOuter.innerHTML = "";
            Forms.projectElements.formOuter.innerHTML += `
                <form>
                    <label>
                        Name
                        <input type="text" required>
                    </label>
                    <span class="error"></span>
                    <button type="button">Add</button>
                </form>
            ` ;
            Forms.projectElements.formOuter.style.display = "none";
        }) (); 
        (function displayForm () {
            Forms.projectElements.displayButton.addEventListener ("click" , (event) => {
                // console.log(ProjectsUI.#projectForm.display);
                if (Forms.projectElements.formOuter.style.display === "none") {
                    Forms.projectElements.formOuter.style.display = "block";
                } else {
                    Forms.projectElements.formOuter.style.display = "none";
                }
            });
        }) ();
    }
    static setTasksFormUI () {
        (function createForm () {
            const formOuter = document.createElement("div");
            formOuter.classList.value = "task-form";
            formOuter.innerHTML = `
            <form class="task-field">
                <label>Title:</label>
                <input class="task-title" type="text" placeholder="What to do?">
                <label>Details(optional):</label>
                <textarea class="task-details" placeholder="Write details!"></textarea>
                <div class="task-form-buttons">
                    <input class="task-form-submit" type="submit" value="Add">
                    <input class="task-form-cancel" type="button" value="cancel">
                </div>
            </form>
            `;
            Forms.taskElements.addTask.prepend(formOuter);
            formOuter.style.display = "none";
        }) ();
        (function displayForm () {
            const button = document.createElement("button");
            console.log(Forms.taskElements.formOuter());
            button.classList.value = "add-task-button";
            button.innerHTML = `
            Add Task
            <svg class="add-task-image" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                <path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z" fill="#0F0F0F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="#0F0F0F"/>
            </svg>
            `;
            Forms.taskElements.addTask.prepend(button);
            button.addEventListener("click", (event) => {
                if (Forms.taskElements.formOuter().style.display === "block") {
                    Forms.taskElements.formOuter().style.display = "none";
                } else {
                    Forms.taskElements.formOuter().style.display = "block";
                }
            });
        }) ();
    }
    static setFormsUI () {
        Forms.setProjectsFormUI();
        Forms.setTasksFormUI();
    }
    static getNewProject () {
        return Forms.projectElements.input.value;
    }
    static getNewTask () {
        return {
            title: Forms.taskElements.title.value,
            details: Forms.taskElements.details.value
        }
    }
    static setTasksFormFunctionality (UpdaterUI) {
        Forms.taskElements.submit.addEventListener( "click" , () => {
            
        });
    }
}