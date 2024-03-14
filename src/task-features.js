import elements from "./required-dom-elements";
export default class TaskFeatures {
    static elements = {
        tasks: elements.task.tasks,
        taskItems: elements.task.tasksInner,
        tasksList: elements.task.tasksList,
        tasksEdit: elements.task.tasksEdit, 
        tasksDelete: elements.task.tasksDelete,
        tasksCheckBoxes: elements.checkBox.checkBoxes,
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
    static editTasks (currentProject, updater) {
        TaskFeatures.elements.tasksEdit().forEach(taskEdit => {
            taskEdit.addEventListener("click", (event)=> {
                const selectedTaskElement = taskEdit.parentNode;
                const editIcon = event.target;
                const taskId = TaskFeatures.findElementIndex(selectedTaskElement, TaskFeatures.elements.tasksList());
                const task = updater.getCurrentProjectTasks(currentProject)[taskId-1];
                setTaskEditForm(selectedTaskElement, editIcon, task, taskId);
            })
        });
        function setTaskEditForm (selectedTaskElement, editIcon, task, taskId) {
            selectedTaskElement.querySelector(".list-details").remove();
            hideAllTaskFeatures();
            const taskItem = selectedTaskElement.querySelector(".task-item");
            const formOuter = document.createElement("div");
            const title = task.title; 
            const description = task.description;
            const date = task.dueDate;
            formOuter.classList.value = "task-edit-form";
            formOuter.innerHTML += `
                <form class="task-edit-field">
                    <ul>
                        <li class="task-edit-form-title">
                            <label>Title:</label>
                            <input class="task-edit-form-title-input" type="text" placeholder="What to do?">
                        </li>
                        <li class="task-edit-form-details">
                            <label>Details(optional):</label>
                            <textarea class="task-edit-form-details-input" placeholder="Write details!"></textarea>
                        </li>
                        <li class="task-edit-form-date">
                            <label>Date:</label>
                            <input class="task-edit-form-date-input" type="date">
                        </li>
                        <li class="task-edit-form-buttons">
                        <input class="task-edit-form-submit" type="submit" value="Add">
                        <input class="task-edit-form-cancel" type="button" value="cancel">
                    </li>
                    </ul>
                </form>
            `;
            taskItem.append(formOuter);
            const titleElement = formOuter.querySelector(".task-edit-form-title-input");
            const detailsElement = formOuter.querySelector(".task-edit-form-details-input");
            const dateElement = formOuter.querySelector(".task-edit-form-date-input");
            titleElement.defaultValue = title;
            detailsElement.defaultValue = description;
            dateElement.defaultValue = date;   
            // editIcon.replaceWith(editIcon.cloneNode(true));
            // editIcon.abort();
            taskItem.childNodes.forEach (child => child.style.display = "none"); 
            formOuter.style.display = "block";
            const submit = formOuter.querySelector(".task-edit-form-submit");
            const cancel = formOuter.querySelector(".task-edit-form-cancel");
            const form = formOuter.querySelector("form");
            form.addEventListener( "submit", (event) => {
                event.preventDefault();
                const title = titleElement.value;
                const description = detailsElement.value;
                const dueDate = dateElement.value;
                const modifiedTask = {title, description, dueDate, priority: task.priority};
                updater.editTask(currentProject, taskId, modifiedTask)
                updater.showCurrentProjectTasks(currentProject);
            })
            cancel.addEventListener( "click", ()=> {
                updater.showCurrentProjectTasks(currentProject);
            });
            editIcon.addEventListener( "click" , () => updater.showCurrentProjectTasks(currentProject) );
            function hideAllTaskFeatures () {
                TaskFeatures.elements.tasksEdit().forEach ((element) => element.style.display = "none");
                TaskFeatures.elements.tasksCheckBoxes().forEach ((element) => element.style.display = "none");
                TaskFeatures.elements.tasksDelete().forEach ((element) => element.style.display = "none");
            }
        }
    }
    static finishTasks (currentProjectId, updater) {
        if (TaskFeatures.elements.tasksCheckBoxes().length !== 0) {
            TaskFeatures.elements.tasksCheckBoxes().forEach( (checkBox) => {
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