import Projects from "./projects";
import ProjectsUI from "./project-ui";
import Forms from "./forms";
export default class Update {
    constructor () {
        this.projects = new Projects();
        this.UIUpdater = new ProjectsUI();
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
        this.UIUpdater.updateProjectsAndTasks(this.projects.currentProjects);
    }
    currentViewingProjectId () {
        // console.log(this.UIUpdater.currentViewingProjectId);
        return this.UIUpdater.currentViewingProjectId;
    }
    showCurrentProject (projectID) {
        const tasks = this.projects.getProject(projectID).tasks;
        this.UIUpdater.showProjectTasks(tasks);
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
    setTaskDone (projectID, taskId) {
        this.projects.setDone(projectID, taskId);
    }
}