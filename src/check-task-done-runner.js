import elements from "./required-dom-elements";
import Update from "./update";
export default class CheckRunner {
    static elements = {
        checkBoxes: elements.checkBox.checkBoxes,
        tasks: elements.task.tasksInner
    }
    static runCheckBoxes (currentProjectId, updater) {
        console.log(currentProjectId);
        if (CheckRunner.elements.checkBoxes().length !== 0) {
            CheckRunner.elements.checkBoxes().forEach( (checkBox) => {
                checkBox.addEventListener ("click", ()=> {
                    const selectedTask = checkBox.parentNode;
                    let doneOrNot; 
                    let taskNumber; 
                    checkBox.classList.toggle("checked");
                    selectedTask.classList.toggle("done");
                    doneOrNot = selectedTask.classList.contains("done") ? true : false;
                    console.log(doneOrNot);
                    console.log(selectedTask);
                    CheckRunner.elements.tasks().filter ( (task, index) =>{
                        if (selectedTask === task) {
                            taskNumber = index+1;
                            return;
                        }
                    });
                    console.log(...["updater", updater]);
                    console.log(...["taskId", taskNumber]);
                    updater.setTaskDoneOrUndone(currentProjectId, taskNumber, doneOrNot);
                    // return {taskNumber, doneOrNot}
                });
            })
        }
    }
}