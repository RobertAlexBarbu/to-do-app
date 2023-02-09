export default class Project {
    name;
    tasks;
    current=false;
    constructor(name) {
        this.name = name;
        Project.projects.push(this);
    }
    static projects = [];
    static currentProject = 0;
    static setCurrent(newCurrent) {
        const currentProject = document.querySelector("#current-block");
        currentProject.textContent = Project.projects[newCurrent].name;
        Project.projects[Project.currentProject].current = false;
        Project.projects[newCurrent].current = true;
        Project.currentProject = newCurrent;
    }
    static render() {
        const projectsSection = document.querySelector(".projects");
        projectsSection.textContent = "";
        for (const currentProject of Project.projects) {
          const project = document.createElement("div");
          project.classList.add("project");
          project.textContent = currentProject.name;
          project.addEventListener("click", (event)=>{
            let i=0;
            for(const current of Project.projects) {
              if(current.name === event.target.textContent) {
                  break;
              }
              i += 1;
            }
            Project.setCurrent(i);
            Project.render();
          })
          if (currentProject.current === true) {
            project.classList.add("current-project");
          }
          projectsSection.appendChild(project);
        }
    }
    static initializeDefault() {
        /* eslint-disable no-new */
        new Project("Default Project");
        new Project("Default Project 2");
        new Project("Important Project");
    }
};