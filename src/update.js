import Projects from "./projects";
import ProjectsUI from "./project-ui";
import Forms from "./forms";
export default class Update {
    constructor () {
        this.projects = new Projects();
        this.projects.addProject("khar");
        // projectID,{title, description, dueDate, priority}
        this.projects.addTask (1, {title: "khare-ziba"
        , description: "yek khar"
        , dueDate: 0
        , priority: 0});
        this.projects.addProject("Gav");
        // projectID,{title, description, dueDate, priority}
        this.projects.addTask (2, {title: "Gave-ziba"
        , description: "yek Gave"
        , dueDate: 0
        , priority: 0});
    }
    updateUIStatus () {
        const currentProjects = this.projects.currentProjects;
        ProjectsUI.updateProjectsAndTasks(currentProjects);
        Forms.setFormsUI();
    }
}