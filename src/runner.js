import FormRunner from "./form-runner";
import CheckRunner from "./check-task-done-runner";
import Update from "./update";
export default class Runner {
    constructor () {
        this.UpdaterUI = new Update ();
        // this.Forms = new FormRunner ();
        // this.CheckTasks = new CheckRunner ();
        this.UpdaterUI.updateUIStatus();
    }
    run () {
        FormRunner.runForms (this.UpdaterUI);
        // CheckRunner.runCheckBoxes (this.UpdaterUI);
    }
}