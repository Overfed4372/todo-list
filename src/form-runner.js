import elements from "./required-dom-elements";
import Update from "./update";
import Forms from "./forms";
import CheckRunner from "./check-task-done-runner";
export default class FormRunner {
    // constructor () {
    //     this.currentViewingProject;
    // }
    static elements = {
        projectsTitle: elements.project.projectsTitle,
        projectsList: elements.project.projectsList,
        tasksList: elements.task.tasksList,
        projectsOuterForm: elements.projectForm.projectsOuterForm,
        projectsForm: elements.projectForm.projectsForm,
        projectsFormSubmit: elements.projectForm.projectsFormSubmit,
        tasksForm: elements.taskForm.tasksForm,
        tasksTitle: elements.task.tasksTitle,
        tasksDetails: elements.task.tasksDetails,
        tasksSubmit: elements.taskForm.tasksSubmit
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