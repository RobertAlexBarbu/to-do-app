import { getTime, getDate, getMonth } from "date-fns";
import Task from "./Task";

export default class Project {
  constructor(name, tasks = []) {
    this.name = name;
    this.tasks = tasks;
  }
  name;
  getName() {
    return this.name;
  }
  setName(value) {
    this.name = value;
  }
  tasks;
  addTask(task) {
    this.tasks.push(task);
  }
  deleteTask(taskDescription, taskDeadlineUnformatted) {
    localStorage.setItem("active", "true");
    let i = 0;
    for (const task of this.getTasks()) {
      if (
        task.getDescription() === taskDescription &&
        task.getDeadlineUnformatted() === taskDeadlineUnformatted
      ) {
        break;
      }
      i += 1;
    }
    this.getTasks().splice(i, 1);
    Project.storeLocal();
    Project.renderProjects();
  }
  getTasks() {
    return this.tasks;
  }
  sortTasks() {
    this.getTasks().sort((task1, task2) => {
      let deadline1 = getTime(task1.getDeadline());
      let deadline2 = getTime(task2.getDeadline());
      if (Number.isNaN(deadline1) === true) {
        deadline1 = Infinity;
      }
      if (Number.isNaN(deadline2) === true) {
        deadline2 = Infinity;
      }
      if (deadline1 > deadline2) {
        return 1;
      }
      if (deadline1 < deadline2) {
        return -1;
      }
      return 0;
    });
  }
  /* static projects array that stores
     all existing projects */
  static projects = [];
  static addProject(project) {
    Project.projects.push(project);
  }
  static deleteProject(currentIndex) {
    Project.projects.splice(currentIndex, 1);
    Project.currentProjectIndex = -1;
    Project.storeLocal();
  }
  /* the index of the currently selected
     project in the static projects array */
  static currentProjectIndex;
  /* stores the data of our projects into local storage */
  static storeLocal() {
    localStorage.setItem("projects", JSON.stringify(Project.projects));
    localStorage.setItem(
      "currentIndex",
      JSON.stringify(Project.currentProjectIndex)
    );
  }
  /* gets the data from local storage and creates new
     objects with it because we can't store logic into local
     storage, only data */
  static getLocal() {
    const aux = [...JSON.parse(localStorage.getItem("projects"))];
    for (const current of aux) {
      const project = new Project(current.name);
      for (const currentTask of current.tasks) {
        project.addTask(
          new Task(
            currentTask.taskDescription,
            currentTask.taskDeadlineUnformatted,
            currentTask.checked
          )
        );
      }
      Project.addProject(project);
    }
    Project.currentProjectIndex = JSON.parse(
      localStorage.getItem("currentIndex")
    );
  }
  /* renders projects and the tasks of
     the currently selected project */
  static renderProjects() {
    const tasksSection = document.querySelector(".tasks-section");
    const projectsSection = document.querySelector(".projects");
    projectsSection.textContent = "";
    // special case: no existing projects
    if (Project.projects.length === 0) {
      const noProjects = document.createElement("div");
      noProjects.classList.add("no-existing-projects");
      noProjects.textContent = "Empty...";
      projectsSection.appendChild(noProjects);

    }
    if(Project.currentProjectIndex === -1 ) {
      tasksSection.textContent = "";
      const noTasks = document.createElement("div");
      noTasks.classList.add("no-existing-tasks");
      noTasks.textContent = "Select a project";
      tasksSection.appendChild(noTasks);
    }
    // special case: selected/not selected project
    const currentBlock = document.querySelector("#current-block");
    const settingsIcon = document.querySelector(".settings-icon");
    if (Project.currentProjectIndex !== -1) {
      currentBlock.textContent =
        Project.projects[Project.currentProjectIndex].getName();
      currentBlock.classList.remove("no-project-selected");
      currentBlock.classList.add("current-project", "project");
      settingsIcon.style.visibility = "visible";
    } else {
      currentBlock.textContent = "No project selected";
      currentBlock.classList.remove("current-project", "project");
      currentBlock.classList.add("no-project-selected");
      settingsIcon.style.visibility = "hidden";
    }
    // we start rendering each project in the projects array
    for (const currentProject of Project.projects) {
      const project = document.createElement("div");
      project.classList.add("project");
      project.textContent = currentProject.getName();
      project.addEventListener("click", (event) => {
        localStorage.setItem("active", "true");
        let i = 0;
        for (const current of Project.projects) {
          if (current.getName() === event.target.textContent) {
            break;
          }
          i += 1;
        }
        Project.currentProjectIndex = i;
        Project.storeLocal();
        Project.renderProjects();
      });
      // we check if we have a project selected and if current project is selected
      // if we do, we highlight it and render it's tasks
      if (Project.currentProjectIndex !== -1) {
        if (
          currentProject.getName() ===
          Project.projects[Project.currentProjectIndex].getName()
        ) {
          // higlight selected project
          project.classList.add("current-project");
          // render the tasks of the selected project

          /* RENDER TASKS */
          if (currentProject.getTasks().length === 0) {
            const tasksSection = document.querySelector(".tasks-section");
            tasksSection.textContent = "";
            const noTasks = document.createElement("div");
            noTasks.classList.add("no-existing-tasks");
            noTasks.textContent = "Empty...";
            tasksSection.appendChild(noTasks);
          } else {
            currentProject.renderTasks();
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
    project.addTask(new Task("Create a new Project", ""));
    project.addTask(new Task("Create a new Task", ""));
    Project.currentProjectIndex = 0;
    project = new Project("Default Project 2");
    Project.addProject(project);
    project = new Project("Important Project");
    Project.addProject(project);
    Project.storeLocal();
  }

  renderTasks() {
    const tasksSection = document.querySelector(".tasks-section");
    tasksSection.textContent = "";
    this.sortTasks();
    const renderedDates = [];
    for (const currentTask of this.getTasks()) {

      const currentDeadline = Task.stringifyDate(
        getMonth(currentTask.getDeadline()),
        getDate(currentTask.getDeadline())
      );
      // render first day section
      if (renderedDates[0] === undefined) {
        renderedDates.push(currentDeadline);

        const daySection = document.createElement("div");
        daySection.classList.add("day-section");

        const day = document.createElement("div");
        day.classList.add("day");
        day.textContent = currentDeadline;
        daySection.appendChild(day);

        const tasks = document.createElement("div");
        tasks.classList.add("tasks");
        /* Render tasks with the same deadline */
        for (const taskNow of this.getTasks()) {
          const taskDate = Task.stringifyDate(
            getMonth(taskNow.getDeadline()),
            getDate(taskNow.getDeadline())
          );
          if (taskDate === currentDeadline) {
            tasks.appendChild(Project.renderTaskHelper(taskNow));
          }
        }
        daySection.appendChild(tasks);
        tasksSection.appendChild(daySection);
      } else if (
        /* Render next different Task section */
        renderedDates.findIndex((element) => {
          if (element === currentDeadline) {
            return true;
          }
          return false;
        }) < 0
      ) {
        renderedDates.push(currentDeadline);
        const daySection = document.createElement("div");
        daySection.classList.add("day-section");
        const day = document.createElement("div");
        day.classList.add("day");
        day.textContent = currentDeadline;
        daySection.appendChild(day);
        const tasks = document.createElement("div");
        tasks.classList.add("tasks");
        for (const taskNow of this.getTasks()) {
          const taskDate = Task.stringifyDate(
            getMonth(taskNow.getDeadline()),
            getDate(taskNow.getDeadline())
          );
          if (taskDate === currentDeadline) {
            tasks.appendChild(Project.renderTaskHelper(taskNow));
          }
        }
        daySection.appendChild(tasks);
        tasksSection.appendChild(daySection);
      }
    }
  }
  static renderTaskHelper(task) {
    const taskComponent = task.taskComponent();
    const checkbox = taskComponent.querySelector(".task-checkbox");
    if (checkbox.checked === true) {
      taskComponent.classList.add("checked-task");
    }
    checkbox.addEventListener("click", (event) => {
      if (event.target.checked === true) {
        task.setChecked(true);
        taskComponent.classList.add("checked-task");
      } else {
        task.setChecked(false);
        taskComponent.classList.remove("checked-task");
      }
      Project.storeLocal();
    });
    const deleteIcon = taskComponent.querySelector(".edit-task-icon");
    deleteIcon.addEventListener("click", () => {
      Project.projects[Project.currentProjectIndex].deleteTask(
        task.getDescription(),
        task.getDeadlineUnformatted()
      );
    });
    return taskComponent;
  }
}
