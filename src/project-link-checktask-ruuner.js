import CheckRunner from "./check-task-done-runner";
export default class projectLinkAndCheckboxRunner extends CheckRunner {
    static projectElements = {
        projects: () => document.querySelectorAll(".projects-list li")
    }
    static runProjectLinksForCheckboxes (currentProjectId, updater) {
        projectLinkAndCheckboxRunner.projectElements.projects().forEach(element => {
            element.addEventListener ("click" , ()=> {
                projectLinkAndCheckboxRunner.runCheckBoxes(currentProjectId, updater);
            });
        });
    }
    static run (currentProjectId, updater) {
        projectLinkAndCheckboxRunner.runCheckBoxes(currentProjectId, updater);
        projectLinkAndCheckboxRunner.runProjectLinksForCheckboxes(currentProjectId, updater);
    }
}