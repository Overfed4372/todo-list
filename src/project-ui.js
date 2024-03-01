/*
export class ProjectsUI {
    constructor (projects) {
        this.projects = projects;
    }
    static #navbar = document.querySelector(".content .navbar");
    static #projectsTitle = document.querySelector(".projects-title");
    static #projectList = ProjectsUI.#navbar.querySelector("ul");
    static #tasksList = document.querySelector(".tasks-list");
    static #projectForm = document.querySelector(".projects-form");
    static #projectInput = ProjectsUI.#projectForm.querySelector("form label input");
    static #projectInputError = ProjectsUI.#projectForm.querySelector("form span");
    static #projectSubmit = ProjectsUI.#projectForm.querySelector("form button");
    static #currentProjectId;
    linkProjects (project) {
        const projectLi = document.createElement("li");
        const tasks = project.tasks;
        projectLi.textContent = project.name;
        ProjectsUI.#projectList.append(projectLi);
        projectLi.addEventListener("click", () => {
            // UIHandler.#tasksList.append(taskLi);
            ProjectsUI.#tasksList.innerHTML = "";
            tasks.forEach ((task) => {
                ProjectsUI.#tasksList.append(makeTask(task));
            });
            this.setTaskAddButton();
            ProjectsUI.#currentProjectId = project.id;
            console.log(ProjectsUI.#currentProjectId);
        });
        function makeTask(task) {
            const li = document.createElement("li");
            const check = document.createElement("div");
            const taskDiv = document.createElement("div");
            const taskTitle = document.createElement("div");
            const taskDetails = document.createElement("div");
            li.setAttribute("id", task.id);
            check.setAttribute("class", "unchecked");
            taskDiv.setAttribute("class", "list-details");
            taskTitle.setAttribute("class", "task-title");
            taskDetails.setAttribute("class", "task-details");
            taskTitle.textContent = task.title;
            taskDetails.textContent = task.description;
            taskDiv.append(taskTitle);
            taskDiv.append(taskDetails);
            li.append(check);
            li.append(taskDiv);
            return li;
        }
    }
    static setProjectToggleButton () {
        const toggleProject = ProjectsUI.#projectsTitle.querySelector(".add-image");
        toggleProject.addEventListener("click" , (event) => {
            console.log(ProjectsUI.#projectForm.display);
            if (ProjectsUI.#projectForm.style.display === "none") {
                ProjectsUI.#projectForm.style.display = "block";
            } else {
                ProjectsUI.#projectForm.style.display = "none";
            }
            
        })
    }
    setTaskAddButton () {
        const button = document.createElement("button");
        const form = taskAddForm();
        button.classList.value = "add-task";
        button.innerHTML =
        `
        Add Task
        <svg class="add-task-image" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
            <path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44771 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z" fill="#0F0F0F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill="#0F0F0F"/>
        </svg>
        `;
        ProjectsUI.#tasksList.append(button,form);
        button.addEventListener("click", (event) => {
            if (form.style.display === "block") {
                form.style.display = "none";
            } else {
                form.style.display = "block";
                this.runTaskForm();
                this.update();
            }
        });
        function taskAddForm () {
            const form = document.createElement("div");
            form.classList.value = "task-form";
            form.innerHTML = 
            `
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
            form.style.display = "none";
            return form;
        }
    }
    runProjectForm () {
        let validInput;
        ProjectsUI.setProjectToggleButton();
        ProjectsUI.#projectInput.addEventListener("input" , (event) => {
            if (ProjectsUI.#projectInput.validity.valid) {
                hideError();
                event.preventDefault();
            } else {
                showError();
            }
        });
        ProjectsUI.#projectSubmit.addEventListener("click" , (event) => {
            if (validInput) {
                let projectName = ProjectsUI.#projectInput.value;
                this.addProject(projectName);
                this.update(); 
            } else {
                showError();
            }
        });
        function showError () {
            validInput = false;
            ProjectsUI.#projectInputError.classList.value="error active";
            ProjectsUI.#projectInputError.textContent = "Bad Input";
        }
        function hideError () {
            validInput = true;
            ProjectsUI.#projectInputError.classList.value="error";
            ProjectsUI.#projectInputError.textContent = "";
        }
    }
    runTaskForm () {
        const taskForm = ProjectsUI.#tasksList.querySelector('.task-form .task-field');
        const submit = taskForm.querySelector(".task-form-submit");
        const titleInput = taskForm.querySelector(".task-title");
        const descriptionInput = taskForm.querySelector(".task-details");
        const currentTasks = this.projects.currentProjects
            .filter((project) => {
                project.id = ProjectsUI.#currentProjectId;
            })[0].tasks;
        submit.addEventListener("click" , (event) => {
            const title = titleInput.value;
            const description = descriptionInput.value;
            event.preventDefault();
            this.projects.addTask(ProjectsUI.#currentProjectId
                , { title, description, dueDate: 0, priority: 0 }); 
        });
    }
    addProject (projectName) {
        this.projects.addProject(projectName);
        // UIHandler.projectForm();
    }
    update () {
        ProjectsUI.#projectList.innerHTML = "";
        console.log(this.projects.currentProjects);
        this.projects.currentProjects.forEach(project => {
            this.linkProjects(project);
        });
    }
    initate () {
        this.runProjectForm();
        // this.runTaskForm();
    }
}
*/


export default class ProjectsUI {
    constructor () {
        this.currentProject;
    }
    static elements = {
        //  navbar: document.querySelector(".content .navbar"),
         projectsTitle: document.querySelector(".projects-title"),
         projectsList: document.querySelector(".projects-list"),
         tasksList: document.querySelector(".tasks-list"),
        //  projectForm: document.querySelector(".projects-form"),
        //  projectInput: ProjectsUI.#projectForm.querySelector("form label input"),
        //  projectInputError: ProjectsUI.#projectForm.querySelector("form span"),
        //  projectSubmit: ProjectsUI.#projectForm.querySelector("form button")
    }
    static makeTask (task) {
        const ui = document.createElement("ui");
        const li = document.createElement("li");
        const check = document.createElement("div");
        const taskDiv = document.createElement("div");
        const taskTitle = document.createElement("div");
        const taskDetails = document.createElement("div");
        li.setAttribute("id", task.id);
        check.setAttribute("class", "unchecked");
        taskDiv.setAttribute("class", "list-details");
        taskTitle.setAttribute("class", "task-title");
        taskDetails.setAttribute("class", "task-details");
        taskTitle.textContent = task.title;
        taskDetails.textContent = task.description;
        taskDiv.append(taskTitle);
        taskDiv.append(taskDetails);
        li.append(check);
        li.append(taskDiv);
        return li;
    }
    linkTasks (projectLink, tasks, id) {
        projectLink.addEventListener("click", () => {
            this.currentProject = id;
            // const ul = document.createElement("ul");
            // ProjectsUI.elements.tasksList.innerHTML = "";
            // tasks.forEach ((task) => {
            //     ul.append(ProjectsUI.makeTask(task));
            //     ProjectsUI.elements.tasksList.append(ul);
            // });
            this.showProjectTasks(tasks);
        });
    }
    updateProjectsAndTasks (projects) {
        ProjectsUI.elements.projectsList.innerHTML = "";
        projects.forEach ( (project) => {
            const projectLink = document.createElement("li");
            const tasks = project.tasks;
            const id = project.id;
            projectLink.textContent = project.name;
            ProjectsUI.elements.projectsList.append(projectLink);
            this.linkTasks(projectLink, tasks, id);
        } );
    }
    showProjectTasks (tasks) {
        const ul = document.createElement("ul");
        ProjectsUI.elements.tasksList.innerHTML = "";
        tasks.forEach ((task) => {
            ul.append(ProjectsUI.makeTask(task));
            ProjectsUI.elements.tasksList.append(ul);
        })
    }
    get currentViewingProjectId () {
        return this.currentProject;
    }
}