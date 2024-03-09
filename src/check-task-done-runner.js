import Update from "./update";
export default class CheckRunner {
    constructor () {
        this.currentViewingProject;
    }
    static elements = {
        checkBoxes: () => document.querySelectorAll("div.done-check-box"),
        tasks: () => [...document.querySelectorAll(".tasks-list ul li")]
    }
    runCheckBoxes (currentProjectId, updater) {
        console.log(currentProjectId);
        if (CheckRunner.elements.checkBoxes().length !== 0) {
            CheckRunner.elements.checkBoxes().forEach( (checkBox) => {
                console.log(checkBox);
                checkBox.addEventListener ("click", ()=> {
                    const selectedTask = checkBox.parentNode;
                    let doneOrNot; 
                    let taskNumber; 
                    checkBox.classList.toggle("checked");
                    selectedTask.classList.toggle("done");
                    doneOrNot = selectedTask.classList.contains("done") ? true : false;
                    console.log(doneOrNot);
                    CheckRunner.elements.tasks().filter ( (task, index) =>{
                        if (selectedTask === task) {
                            taskNumber = index+1;
                            return;
                        }
                    });
                    console.log(...["updater", updater]);
                    updater.setTaskDoneOrUndone(currentProjectId, taskNumber, doneOrNot);
                    // return {taskNumber, doneOrNot}
                });
            })
        }
    }
}