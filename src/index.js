import _ from 'lodash';
import './style.css';
// import Project from './projects';
import './initial-ui';
import UIHandler from './project-ui';
import Update from './update';
import FormRunner from './form-runner';
import Runner  from './runner';
const Run = new Runner ();
// const Ahmad = new Project ({
//     title: "Khar" ,
//     description: "Khari dar mazrae", 
//     dueDate: "farda", 
//     priority: "ziad"
// });
// const Ahmad = new Project ();
// const projectUI = new Update();
// Ahmad.addProject("Khar");
// Ahmad.addProject("Gav");
// Ahmad.addProject("Olagh");
// Ahmad.addProject("Goosfand");
// // Ahmad.addTask({title: "khar", description: "khar", dueDate: "khar", priority: 1});
// // Ahmad.addTask({title: "khar2", description: "khar2", dueDate: "khar2", priority: 2});
// // Ahmad.addTask({title: "khar3", description: "khar3", dueDate: "khar3", priority: 3});
// // Ahmad.removeTask(2);
// // Ahmad.removeTask(1);
// // Ahmad.setDone(3);
// Ahmad.addTask(1,{title: "khar", description: "khar", dueDate: "khar", priority: 1});
// Ahmad.addTask(2,{title: "khar2", description: "khar2", dueDate: "khar2", priority: 2});
// Ahmad.addTask(1,{title: "khar1-2", description: "khar1-2", dueDate: "khar12", priority: 12});
// Ahmad.removeProject(1);
// Ahmad.removeTask(1,1);
// projectUI.initate();
// console.log(Ahmad.currentProjects);
// projectUI.updateUIStatus();
Run.run();