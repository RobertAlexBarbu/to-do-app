export default class Project {

  name;
  tasks;
  constructor(name) {
    this.name = name;
    Project.projects.push(this);
  }

  static projects = [];
  static currentProjectIndex;
  static storeLocal() {
    localStorage.setItem("projects", JSON.stringify(Project.projects));
    localStorage.setItem("currentIndex", JSON.stringify(Project.currentProjectIndex));
  }
  static renderProjects() {

    const projectsSection = document.querySelector(".projects");
    projectsSection.textContent = "";
    
    if(Project.projects.length === 0) {
      console.log("hey");
      const noProjects = document.createElement("div");
      noProjects.classList.add("no-existing-projects")
      noProjects.textContent = "Empty..."
      projectsSection.appendChild(noProjects);
    }

    // modifies current container depending on whether we have or not 
    // a current project selected
    const currentBlock = document.querySelector("#current-block");
    const settingsIcon = document.querySelector(".settings-icon");
    if(Project.currentProjectIndex !== -1) {
      currentBlock.textContent = Project.projects[Project.currentProjectIndex].name;
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
      if(Project.currentProjectIndex !== -1) {
        if (currentProject.name === Project.projects[Project.currentProjectIndex].name) {
          project.classList.add("current-project");
        } 
      }
      projectsSection.appendChild(project);
    }

  }


  static deleteProject(currentIndex) {
    Project.projects.splice(currentIndex, 1);
    Project.currentProjectIndex = -1;
    Project.storeLocal();
  }


  static renderInitial() {
    if (localStorage.active === undefined) {
      Project.#initializeDefault();
      Project.renderProjects();
    } else {
      Project.projects = [...JSON.parse(localStorage.getItem("projects"))];
      Project.currentProjectIndex = JSON.parse(localStorage.getItem("currentIndex"));
      Project.renderProjects();
    }
  }


  static #initializeDefault() {
    /* eslint-disable no-new */
    new Project("Default Project");
    Project.currentProjectIndex = 0;
    new Project("Default Project 2");
    new Project("Important Project");
    Project.storeLocal();
  }
}
