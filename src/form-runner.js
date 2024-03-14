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
        Forms.projectElements.input().addEventListener ("input" , (event) => {
            showIfThereIsError();
        });
        FormRunner.elements.projectsForm().addEventListener("submit" , (event) => {
            //Project form name input control
            event.preventDefault();
            if (showIfThereIsError()) return;
            const newProject = Forms.getNewProject();
            Forms.cleanForms.project();
            UpdaterUI.addProject(newProject);
            UpdaterUI.updateUIStatus();
        });
        function showIfThereIsError () {
            // if (Forms.projectElements.input().value === "") {
            //     Forms.projectElements.inputError().textContent = "At least give the poor project a name!";
            //     Forms.projectElements.inputError().className = "error active";
            //     console.log("hey value missing!");
            // } else {
            //     Forms.projectElements.inputError().textContent = "";
            //     Forms.projectElements.inputError().className = "error";
            //     console.log("hey value not missing!")
            // }
            let errorResult;
            if (Forms.projectElements.input().value === "") {
                Forms.projectElements.input().setCustomValidity("Hey! give it a name!");
                errorResult = true;
            } else {
                Forms.projectElements.input().setCustomValidity("");
                errorResult = false;
            }
            Forms.projectElements.input().reportValidity();
            return errorResult;
        }
    }
    static runTasksForm (UpdaterUI) {
        if (!FormRunner.elements.tasksSubmit()) return;
        Forms.taskElements.title().addEventListener ("input" , (event) => {
            showIfThereIsError();  
        })
        FormRunner.elements.tasksForm().addEventListener("submit", (event) => {
            event.preventDefault();
            if (showIfThereIsError()) return;
            const newTask = Forms.getNewTask();
            // console.log(newTask);
            const projectId = UpdaterUI.currentViewingProjectId();
            Forms.cleanForms.task();
            UpdaterUI.addTask(projectId, {title: newTask.title, description: newTask.details, dueDate: newTask.date, priority: 0});
            UpdaterUI.updateUIStatus();
            UpdaterUI.showCurrentProjectTasks(projectId);
            // CheckRunner.runCheckBoxes(projectId, UpdaterUI);
        })
        function showIfThereIsError () {
            // if (Forms.projectElements.input().value === "") {
            //     Forms.projectElements.inputError().textContent = "At least give the poor project a name!";
            //     Forms.projectElements.inputError().className = "error active";
            //     console.log("hey value missing!");
            // } else {
            //     Forms.projectElements.inputError().textContent = "";
            //     Forms.projectElements.inputError().className = "error";
            //     console.log("hey value not missing!")
            // }
            const taskTitle = Forms.taskElements.title();
            let errorResult;
            if (taskTitle.value === "") {
                taskTitle.setCustomValidity("Hey! At least give the task a name!");
                errorResult = true;
            } else {
                taskTitle.setCustomValidity("");
                errorResult = false;
            }
            taskTitle.reportValidity();
            return errorResult;
        }
        
    }
    static runForms (UpdaterUI) {
        this.runProjectsForm(UpdaterUI);
        this.runTasksForm(UpdaterUI);
    }
}