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

import elements from "./required-dom-elements";
// import CheckRunner from "./check-task-done-runner";
export default class ProjectsUI {
    // constructor () {
    //     this.currentProject;
    // }
    static elements = {
        //  navbar: document.querySelector(".content .navbar"),
        //  projectsTitle: elements.project.projectsTitle,
         projectsList: elements.project.projectsList,
         tasksList: elements.task.tasksListOuter,
         allProjects: elements.project.projects
        //  projectForm: document.querySelector(".projects-form"),
        //  projectInput: ProjectsUI.#projectForm.querySelector("form label input"),
        //  projectInputError: ProjectsUI.#projectForm.querySelector("form span"),
        //  projectSubmit: ProjectsUI.#projectForm.querySelector("form button")
    }
    static styleSelectedProject (selectedProject) {
        for (const project of ProjectsUI.elements.allProjects()) {
            project.classList.remove("selected");
        }
        selectedProject.classList.add("selected");
    }
    static makeTask (task) {
        const ui = document.createElement("ui");
        const li = document.createElement("li");
        const check = document.createElement("div");
        const taskItem = document.createElement("div");
        const taskEdit = document.createElement("div");
        const taskDelete = document.createElement("div");
        const taskDiv = document.createElement("div");
        const taskTitle = document.createElement("div");
        const taskDetails = document.createElement("div");
        li.setAttribute("id", task.id);
        taskItem.setAttribute("class", "task-item");
        check.setAttribute("class", "done-check-box");
        if (task.isDone) {
            taskItem.classList.toggle("done");
            check.classList.toggle("checked");
        }
        taskEdit.setAttribute("class", "task-edit");
        taskDelete.setAttribute("class", "task-delete");
        taskDiv.setAttribute("class", "list-details");
        taskTitle.setAttribute("class", "task-title");
        taskDetails.setAttribute("class", "task-details");
        taskTitle.textContent = task.title;
        taskDetails.textContent = task.description;
        taskEdit.innerHTML="";
        taskEdit.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"/></svg>';
        taskDelete.innerHTML ="";
        taskDelete.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/></svg>';
        taskDiv.append(taskTitle);
        taskDiv.append(taskDetails);
        taskItem.append(check);
        taskItem.append(taskDiv);
        // li.append(check);
        li.append(taskEdit);
        li.append(taskItem);
        li.append(taskDelete);
        return li;
    }
    static linkTasks (projectLink, tasks, id) {
        projectLink.addEventListener("click", () => {
            this.currentProject = id;
            // const ul = document.createElement("ul");
            // ProjectsUI.elements.tasksList.innerHTML = "";
            // tasks.forEach ((task) => {
            //     ul.append(ProjectsUI.makeTask(task));
            //     ProjectsUI.elements.tasksList.append(ul);
            // });
            this.showProjectTasks(tasks);
            // ProjectsUI.styleSelectedProject(projectLink);
        });
    }
    static updateProjectsAndTasks (projects) {
        ProjectsUI.elements.projectsList.innerHTML = "";
        projects.forEach ( (project) => {
            const projectLink = document.createElement("li");
            const tasks = project.tasks;
            const id = project.id;
            console.log(this.currentProject);
            projectLink.textContent = project.name;
            ProjectsUI.elements.projectsList.append(projectLink);
            this.linkTasks(projectLink, tasks, id);
        } );
        if (this.currentProject) {
            const selectedProject = ProjectsUI.elements.allProjects()[this.currentProject - 1];
            ProjectsUI.styleSelectedProject(selectedProject);
        }
    }
    static showProjectTasks (tasks) {
        const ul = document.createElement("ul");
        ProjectsUI.elements.tasksList.innerHTML = "";
        tasks.forEach ((task) => {
            ul.append(ProjectsUI.makeTask(task));
            ProjectsUI.elements.tasksList.append(ul);
        })
        if (this.currentProject) {
            const selectedProject = ProjectsUI.elements.allProjects()[this.currentProject - 1];
            ProjectsUI.styleSelectedProject(selectedProject);
        }
    }
}