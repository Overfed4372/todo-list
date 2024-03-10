import elements from "./required-dom-elements";
export default class TaskFeatures {
    static elements = {
        tasks: elements.task.tasks,
        taskItems: elements.task.tasksInner,
        tasksList: elements.task.tasksList,
        tasksEdit: elements.task.tasksEdit, 
        tasksDelete: elements.task.tasksDelete,
        checkBoxes: elements.checkBox.checkBoxes,
    }
    static findElementIndex (element, parentElement) {
        let id; 
        [...parentElement.childNodes].filter ( (childElement, index) => {
            if (element === childElement) {
                id = index+1;
                return;
            }
        });
        return id;
    }
    static deleteTasks (currentProject, updater) {
        TaskFeatures.elements.tasksDelete().forEach(taskDelete => {
            taskDelete.addEventListener("click", ()=> {
                const selectedTask = taskDelete.parentNode;
                const taskId = TaskFeatures.findElementIndex(selectedTask, TaskFeatures.elements.tasksList());
                console.log(taskId);
                updater.removeTask(currentProject, taskId);
                updater.showCurrentProjectTasks(currentProject);
            })
        });
    }
    static editTasks () {
        TaskFeatures.elements.tasksEdit().forEach(taskEdit => {
            taskEdit.addEventListener("click", ()=> {
                
            })
        });
    }
    static finishTasks (currentProjectId, updater) {
        if (TaskFeatures.elements.checkBoxes().length !== 0) {
            TaskFeatures.elements.checkBoxes().forEach( (checkBox) => {
                checkBox.addEventListener ("click", ()=> {
                    const selectedTask = checkBox.parentNode;
                    let doneOrNot; 
                    let taskNumber; 
                    checkBox.classList.toggle("checked");
                    selectedTask.classList.toggle("done");
                    doneOrNot = selectedTask.classList.contains("done") ? true : false;
                    console.log(doneOrNot);
                    console.log(selectedTask);
                    TaskFeatures.elements.taskItems().filter ( (task, index) =>{
                        if (selectedTask === task) {
                            taskNumber = index+1;
                            return;
                        }
                    });
                    console.log(...["updater", updater]);
                    console.log(...["taskId", taskNumber]);
                    updater.finishTask(currentProjectId, taskNumber, doneOrNot);
                    // return {taskNumber, doneOrNot}
                });
            })
        }
    }  
}