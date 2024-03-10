import elements from "./required-dom-elements";
export default class Forms {
    static projectElements = {
        formOuter: elements.projectForm.projectsOuterForm,
        form: elements.projectForm.projectsForm,
        inputError: elements.projectForm.projectsInputError,
        submit: elements.projectForm.projectsFormSubmit,
        title: elements.project.projectsTitle,
        displayButton: elements.project.projectsDisplayButton,
        input: elements.projectForm.projectsInput,
    }
    static taskElements = {
        addTask: elements.task.tasksAdd,
        // form : elements.taskForm.tasksForm,
        // submit: elements.taskForm.tasksSubmit,
        formOuter: elements.taskForm.tasksFormOuter,
        title: elements.task.tasksTitle,
        details: elements.task.tasksDetails
    }
    static setProjectsFormUI () {
        (function createForm () {
            Forms.projectElements.formOuter().innerHTML = "";
            Forms.projectElements.formOuter().innerHTML += `
                <form>
                    <label>
                        Name
                        <input type="text" required>
                    </label>
                    <span class="error"></span>
                    <button type="button">Add</button>
                </form>
            ` ;
            Forms.projectElements.formOuter().style.display = "none";
        }) (); 
        (function displayForm () {
            const add = document.createElement("svg");
            add.classList.value = "add-image";
            add.innerHTML = `
            <svg class="add-image" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" fill="none">
                <path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z" fill="#0F0F0F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="#0F0F0F"/>
            </svg>
            `;
            Forms.projectElements.title.removeChild(Forms.projectElements.title.lastElementChild);
            Forms.projectElements.title.append(add);
            Forms.projectElements.displayButton().addEventListener ("click" , (event) => {
                // console.log(ProjectsUI.#projectForm.display);
                if (Forms.projectElements.formOuter().style.display === "none") {
                    Forms.projectElements.formOuter().style.display = "block";
                } else {
                    Forms.projectElements.formOuter().style.display = "none";
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
            Forms.taskElements.addTask.innerHTML = "";
            Forms.taskElements.addTask.prepend(formOuter);
            formOuter.style.display = "none";
        }) ();
        (function displayForm () {
            const button = document.createElement("button");
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
        return Forms.projectElements.input().value;
    }
    static getNewTask () {
        return {
            title: Forms.taskElements.title().value,
            details: Forms.taskElements.details().value
        }
    }
}