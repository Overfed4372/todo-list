// import Tasks from "./tasks";
export default class Projects{
    constructor () {
        this.projects = [];
    }
    #setProjectId () {
        this.projects.forEach ( (item, index) => {
            item.id = index += 1;
        } )
    }
    #setTaskId (projectID) {
        this.projects.filter ((project) => {
            if(project.id === projectID) {return project};
        })[0].tasks.forEach ((item, index) => {
            item.id = index += 1;
        });
    }
    get currentProjects () {
        return this.projects;
    }
    getProject (projcetId) {
        return this.projects.filter ((project) => {
            if(project.id === projcetId) {return project};
        })[0];
    }
    getTask (projetId, taskId) {
        return this.projects.filter ((project) => {
            if(project.id === projectID) {return project};
        })[0].tasks.filter ((task) => {
            if(task.id === taskId) {return task};
        })[0];
    }
    addProject (name) {
        this.projects.push ({name, tasks: []});
        this.#setProjectId();
    }
    addTask (projectID,{title, description, dueDate, priority}) {
        this.projects.filter ((project) => {
            if(project.id === projectID) {return project};
        })[0].tasks.push ({title, description, dueDate, priority, isDone: false});
        this.#setTaskId(projectID);
        // this.#setTaskId();
    }
    removeProject (projectID) {
        this.projects.splice (projectID-1, 1);
        this.#setProjectId();
    }
    removeTask (projectID, taskId) {
        this.projects.filter ((project) => {
            if(project.id === projectID) {return project};
        })[0].tasks.splice(taskId-1, 1);
        this.#setTaskId(projectID);
    }
    editTask (projectID, taskId, modifiedTask) {
        this.projects.filter ((project) => {
            if(project.id === projectID) {return project};
        })[0].tasks[taskId-1] = modifiedTask;
        this.#setTaskId(projectID);
    }
    setDoneOrUndone (projectID, taskId, doneOrNot) {
        this.projects.filter ((project) => {
            if(project.id === projectID) {return project};
        })[0].tasks[taskId-1].isDone = doneOrNot;
        console.log(this.projects);
    } 
}