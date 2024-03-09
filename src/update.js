import Projects from "./projects";
import ProjectsUI from "./project-ui";
import Forms from "./forms";
// import CheckRunner from "./check-task-done-runner";
import projectLinkAndCheckboxRunner from "./project-link-checktask-ruuner";
export default class Update {
    constructor () {
        this.projects = new Projects();
        // this.UIUpdater = new ProjectsUI();
        this.checkBoxes = new projectLinkAndCheckboxRunner ();
        Forms.setFormsUI();
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
    updateUIStatus () {
        const currentProject = this.currentViewingProjectId();
        // CheckRunner.runCheckBoxes(currentProject, this);
        ProjectsUI.updateProjectsAndTasks(this.projects.currentProjects);
        this.checkBoxes.runProjectLinksForCheckboxes(this);
        console.log(this.checkBoxes.currentViewingProjectId());
    }
    currentViewingProjectId () {
        // console.log(this.UIUpdater.currentViewingProjectId);
        return this.checkBoxes.currentViewingProjectId();
    }
    showCurrentProject (projectID) {
        const currentProject = this.currentViewingProjectId();
        const tasks = this.projects.getProject(projectID).tasks;
        ProjectsUI.showProjectTasks(tasks);
        this.checkBoxes.runCheckBoxes(currentProject, this);
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
    setTaskDoneOrUndone (projectID, taskId, doneOrNot) {
        this.projects.setDoneOrUndone(projectID, taskId, doneOrNot);
    }
}