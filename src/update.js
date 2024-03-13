import Projects from "./projects";
import ProjectsUI from "./project-ui";
import Forms from "./forms";
import FormRunner from "./form-runner";
// import CheckRunner from "./check-task-done-runner";
import TaskFeatures from "./task-features";
// import projectLinkAndCheckboxRunner from "./project-link-checktask-ruuner";
import elements from "./required-dom-elements";
export default class Update {
    constructor () {
        this.projects = new Projects();
        // this.UIUpdater = new ProjectsUI();
        // this.checkBoxes = new projectLinkAndCheckboxRunner ();
        this.currentProjectId;
        Forms.setProjectsFormUI();
        // this.projects.addProject("khar");
        // // projectID,{title, description, dueDate, priority}
        // this.projects.addTask (1, {title: "khare-ziba"
        // , description: "yek khar"
        // , dueDate: 0
        // , priority: 0});
        // this.projects.addProject("Gav");
        // // projectID,{title, description, dueDate, priority}
        // this.projects.addTask (2, {title: "Gave-ziba"
        // , description: "yek Gave"
        // , dueDate: 0
        // , priority: 0});
    }
    static elements = {
        projects: elements.project.projects
    }
    updateUIStatus () {
        // CheckRunner.runCheckBoxes(currentProject, this);
        ProjectsUI.updateProjectsAndTasks(this.projects.currentProjects);
        this.setFeaturesOnProjectClick();
        // this.checkBoxes.runProjectLinksForCheckboxes(this);
    }
    currentViewingProjectId () {
        // console.log(this.UIUpdater.currentViewingProjectId);
        return this.currentProjectId;
    }
    showCurrentProjectTasks (projectID) {
        const currentProject = this.currentViewingProjectId();
        const tasks = this.projects.getProject(projectID).tasks;
        ProjectsUI.showProjectTasks(tasks);
        this.setFeatures();
    }
    getCurrentProjectTasks (projectID) {
        return this.projects.getProject(projectID).tasks;
    }
    setFeatures () {
        TaskFeatures.finishTasks(this.currentProjectId, this);
        TaskFeatures.editTasks(this.currentProjectId, this);
        TaskFeatures.deleteTasks(this.currentProjectId, this);
    }
    setFeaturesOnProjectClick () {
        Update.elements.projects().forEach(element => {
            element.addEventListener ("click" , ()=> {
                Update.elements.projects().filter( (project, index) =>{
                    if (element === project) {
                        this.currentProjectId = index + 1;
                        return;
                    }
                });
                Forms.setTasksFormUI();
                FormRunner.runTasksForm(this);
                this.setFeatures();
            });
        });
    }
    addProject (name) {
        this.projects.addProject(name);
    }
    addTask (projectID,{title, description, dueDate, priority}) {
        this.projects.addTask(projectID,{title, description, dueDate, priority});
    }
    removeProject (projectID) {
        this.projects.removeProject(projectID);
    }
    removeTask (projectID, taskId) {
        this.projects.removeTask(projectID, taskId);
    }
    editTask (projectID, taskId, {title, description, dueDate, priority}) {
        this.projects.editTask(projectID, taskId, {title, description, dueDate, priority});
    }
    finishTask (projectID, taskId, doneOrNot) {
        this.projects.setDoneOrUndone(projectID, taskId, doneOrNot);
    }
}