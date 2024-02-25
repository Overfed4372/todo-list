export default class UIHandler {
    constructor (projects) {
        this.projects = projects;
    }
    static #navbar = document.querySelector(".content .navbar");
    static #projectList = UIHandler.#navbar.querySelector("ul");
    static #tasksList = document.querySelector(".tasks-list");
    static linkProjects (project) {
        const projectLi = document.createElement("li");
        const tasks = project.tasks;
        projectLi.textContent = project.name;
        UIHandler.#projectList.append(projectLi);
        projectLi.addEventListener("click", () => {
            // UIHandler.#tasksList.append(taskLi);
            UIHandler.#tasksList.innerHTML = "";
            tasks.forEach ((task) => {
                UIHandler.#tasksList.append(makeTask(task));
            });
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
    update () {
        UIHandler.#projectList.innerHTML = "";
        this.projects.forEach(project => {
            UIHandler.linkProjects(project);
        });
    }
}