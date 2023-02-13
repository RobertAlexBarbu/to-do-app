export default class Project {

  name;
  tasks;
  current = false;
  constructor(name) {
    this.name = name;
    Project.projects.push(this);
  }

  static projects = [];
  static storeLocal() {
    localStorage.setItem("projects", JSON.stringify(Project.projects));
  }
  static #setCurrent(newCurrent) {
    localStorage.setItem("active", "true");
    const currentBlock = document.querySelector("#current-block");
    for (const current of Project.projects) {
      if (current.current === true) {
        current.current = false;
      }
    }
    Project.projects[newCurrent].current = true;
    currentBlock.textContent = Project.projects[newCurrent].name;
    Project.storeLocal();
  }
  static renderProjects() {
    const projectsSection = document.querySelector(".projects");
    projectsSection.textContent = "";
    for (const currentProject of Project.projects) {
      const project = document.createElement("div");
      project.classList.add("project");
      project.textContent = currentProject.name;
      project.addEventListener("click", (event) => {
        let i = 0;
        for (const current of Project.projects) {
          if (current.name === event.target.textContent) {
            break;
          }
          i += 1;
        }
        Project.#setCurrent(i);
        Project.renderProjects();
      });
      if (currentProject.current === true) {
        project.classList.add("current-project");
        const currentBlock = document.querySelector("#current-block");
        currentBlock.textContent = currentProject.name;
      }
      projectsSection.appendChild(project);
    }
  }
  static renderInitial() {
    if (localStorage.active === undefined) {
      Project.#initializeDefault();
      Project.renderProjects();
    } else {
      Project.projects = [...JSON.parse(localStorage.getItem("projects"))];
      Project.renderProjects();
    }
  }
  static #initializeDefault() {
    /* eslint-disable no-new */
    const first = new Project("Default Project");
    first.current = true;
    new Project("Default Project 2");
    new Project("Important Project");
    Project.storeLocal();
  }
}
