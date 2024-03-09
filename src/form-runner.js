import Update from "./update";
import Forms from "./forms";
import CheckRunner from "./check-task-done-runner";
export default class FormRunner {
    // constructor () {
    //     this.currentViewingProject;
    // }
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
    static runProjectsForm (UpdaterUI) {
        FormRunner.elements.projectsFormSubmit().addEventListener("click" , () => {
            const newProject = Forms.getNewProject();
            UpdaterUI.addProject(newProject);
            UpdaterUI.updateUIStatus();
        });
    }
    static runTasksForm (UpdaterUI) {
        FormRunner.elements.tasksSubmit().addEventListener("click", (event) => {
            event.preventDefault();
            const newTask = Forms.getNewTask();
            // console.log(newTask);
            const projectId = UpdaterUI.currentViewingProjectId();
            console.log(projectId);
            UpdaterUI.addTask(projectId, {title: newTask.title, description: newTask.details, dueDate: 0, priority: 0});
            UpdaterUI.updateUIStatus();
            UpdaterUI.showCurrentProject(projectId);
            // CheckRunner.runCheckBoxes(projectId, UpdaterUI);
        })
    }
    static runForms (UpdaterUI) {
        this.runProjectsForm(UpdaterUI);
        this.runTasksForm(UpdaterUI);
    }
}