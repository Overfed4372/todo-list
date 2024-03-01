import Update from "./update";
import Forms from "./forms";
export default class Runner {
    constructor () {
        this.UpdaterUI = new Update ();
        this.currentViewingProject;
        this.UpdaterUI.updateUIStatus();
    }
    static elements = {
        projectsTitle: document.querySelector(".projects-title"),
        projectsList: document.querySelector(".projects-list"),
        tasksList: document.querySelector(".tasks-list ul"),
        projectsOuterForm: () => document.querySelector(".projects-form"),
        projectsForm: () => document.querySelector(".projects-form form"),
        projectsFormSubmit: () => document.querySelector(".projects-form form button"),
        tasksForm: () => document.querySelector(".task-field"),
        tasksTitle: () => document.querySelector(".task-title"),
        tasksDetails: () => document.querySelector(".task-details"),
        tasksSubmit: () => document.querySelector(".task-form-submit")
    }
    runProjectsForm () {
        Runner.elements.projectsFormSubmit().addEventListener("click" , () => {
            const newProject = Forms.getNewProject();
            this.UpdaterUI.addProject(newProject);
            this.UpdaterUI.updateUIStatus();
        });
    }
    runTasksForm () {
        Runner.elements.tasksSubmit().addEventListener("click", (event) => {
            event.preventDefault();
            const newTask = Forms.getNewTask();
            console.log(newTask);
            const projectId = this.UpdaterUI.currentViewingProjectId();
            this.UpdaterUI.addTask(projectId, {title: newTask.title, description: newTask.details, dueDate: 0, priority: 0});
            this.UpdaterUI.updateUIStatus();
            this.UpdaterUI.showCurrentProject(projectId);
        })
    }
    runForms () {
        this.runProjectsForm();
        this.runTasksForm();
    }
}