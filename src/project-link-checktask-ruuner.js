import CheckRunner from "./check-task-done-runner";
export default class projectLinkAndCheckboxRunner extends CheckRunner {
    constructor () {
        super();
        this.currentProjectId;
    }
    static projectElements = {
        projects: () => [...document.querySelectorAll(".projects-list li")]
    }
    runProjectLinksForCheckboxes (updater) {
        projectLinkAndCheckboxRunner.projectElements.projects().forEach(element => {
            element.addEventListener ("click" , ()=> {
                projectLinkAndCheckboxRunner.projectElements.projects().filter( (project, index) =>{
                    if (element === project) {
                        this.currentProjectId = index += 1
                        return;
                    }
                });
                this.runCheckBoxes(this.currentProjectId, updater);
            });
        });
    }
    run (updater) {
        this.runCheckBoxes(this.currentProjectId, updater);
        this.runProjectLinksForCheckboxes(this.currentProjectId, updater);
    }
    currentViewingProjectId () {
        return this.currentProjectId;
    }
}