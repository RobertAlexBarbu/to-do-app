import {parseISO, getTime, getDate, getMonth} from "date-fns";
import Task from "./Task";


export default class Project {
  name;
  tasks;
  addTask(task) {
    this.tasks.push(task);
  }
  getTasks() {
    return this.tasks;
  }
  constructor(name, tasks = []) {
    this.name = name;
    this.tasks = tasks;
  }
  static projects = [];
  static addProject(project) {
    Project.projects.push(project);
  }
  static deleteProject(currentIndex) {
    Project.projects.splice(currentIndex, 1);
    Project.currentProjectIndex = -1;
    Project.storeLocal();
  }
  static currentProjectIndex;
  static storeLocal() {
    localStorage.setItem("projects", JSON.stringify(Project.projects));
    localStorage.setItem(
      "currentIndex",
      JSON.stringify(Project.currentProjectIndex)
    );
  }
  static getLocal() {
    const aux = [...JSON.parse(localStorage.getItem("projects"))];
    for (const current of aux) {
      const project = new Project(current.name);
      for (const currentTask of current.tasks) {
        project.addTask(
          new Task(currentTask.taskDescription, currentTask.taskDeadline)
        );
      }
      Project.addProject(project);
    }
    Project.currentProjectIndex = JSON.parse(
      localStorage.getItem("currentIndex")
    );
  }
  static renderProjects() {
    const projectsSection = document.querySelector(".projects");
    projectsSection.textContent = "";

    if (Project.projects.length === 0) {
      console.log("hey");
      const noProjects = document.createElement("div");
      noProjects.classList.add("no-existing-projects");
      noProjects.textContent = "Empty...";
      projectsSection.appendChild(noProjects);
    }
    // modifies current container depending on whether we have or not
    // a current project selected
    const currentBlock = document.querySelector("#current-block");
    const settingsIcon = document.querySelector(".settings-icon");
    if (Project.currentProjectIndex !== -1) {
      currentBlock.textContent =
        Project.projects[Project.currentProjectIndex].name;
      currentBlock.classList.remove("no-project-selected");
      currentBlock.classList.add("current-project", "project");
      settingsIcon.style.visibility = "visible";
    } else {
      currentBlock.textContent = "No project selected";
      currentBlock.classList.remove("current-project", "project");
      currentBlock.classList.add("no-project-selected");
      settingsIcon.style.visibility = "hidden";
    }

    for (const currentProject of Project.projects) {
      const project = document.createElement("div");
      project.classList.add("project");
      project.textContent = currentProject.name;
      project.addEventListener("click", (event) => {
        localStorage.setItem("active", "true");
        let i = 0;
        for (const current of Project.projects) {
          if (current.name === event.target.textContent) {
            break;
          }
          i += 1;
        }
        Project.currentProjectIndex = i;
        Project.storeLocal();
        Project.renderProjects();
      });
      // we check if we have a project selected
      // if we do, we highlight it
      if (Project.currentProjectIndex !== -1) {
        if (
          currentProject.name ===
          Project.projects[Project.currentProjectIndex].name
        ) {
          // mark current project
          project.classList.add("current-project");
          // generate the tasks of the current project
          const TEST = document.querySelector(".tasks");
          TEST.textContent = "";
          // SORT TASKS BY DEADLINE
          console.log(currentProject.getTasks());
          currentProject.getTasks().sort((task1, task2)=>{
            let deadline1 = task1.getDeadline().getTime();
            let deadline2 = task2.getDeadline().getTime();
            if(isNaN(deadline1) === true) {
              deadline1 = Infinity;
            }
            if(isNaN(deadline2) === true) {
              deadline2 = Infinity;
            }
            if(deadline1 > deadline2) {
              return 1;
            } else if(deadline1 < deadline2) {
              return -1;
            } else {
              return 0;
            }
          });
          console.log(currentProject.getTasks());
          for (const currentTask of currentProject.getTasks()) {
            console.log(currentTask.getDeadline().getMonth(), currentTask.getDeadline().getDate());
            const task = document.createElement("div");
            task.classList.add("task");

            const taskDetails = document.createElement("div");
            taskDetails.classList.add("task-details");

            const taskCheckbox = document.createElement("input");
            taskCheckbox.setAttribute("type", "checkbox");
            taskCheckbox.classList.add("task-checkbox");

            const taskName = document.createElement("div");
            taskName.classList.add("task-name");
            taskName.textContent = currentTask.getDescription();

            const editTaskIcon = document.createElement("div");
            editTaskIcon.classList.add("edit-task-icon");
            editTaskIcon.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>file-edit-outline</title><path d="M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3L18.8 14.2L19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9L14.1 23H12V20.9L18.1 14.8L20.2 16.9Z" /></svg>';

            taskDetails.appendChild(taskCheckbox);
            taskDetails.appendChild(taskName);
            taskDetails.appendChild(editTaskIcon);

            task.appendChild(taskDetails);

            TEST.appendChild(task);
          }
        }
      }

      projectsSection.appendChild(project);
    }
  }

  static renderInitial() {
    if (localStorage.active === undefined) {
      Project.#initializeDefault();
      Project.renderProjects();
    } else {
      Project.getLocal();
      Project.renderProjects();
    }
  }

  static #initializeDefault() {
    let project = new Project("Default Project");
    Project.addProject(project);
    Project.currentProjectIndex = 0;
    project = new Project("Default Project 2");
    Project.addProject(project);
    project = new Project("Important Project");
    Project.addProject(project);
    Project.storeLocal();
  }
}
