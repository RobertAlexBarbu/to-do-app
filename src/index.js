import "./styles.css";
import Project from "./Project";

function createProjectComponent(project) {
  const projectComponent = document.createElement("div");
  projectComponent.classList.add("project");
  projectComponent.textContent = project.name;
  projectComponent.addEventListener("click", () => {
    const selectedName = project.name;
    let i = 0;
    for (const currentProject of projectsArray) {
      if (currentProject.name === selectedName) {
        break;
      }
      i++;
    }
    setCurrentProject(i);
    renderProjects(projectsArray);
  });
  return projectComponent;
}
const projectsSection = document.querySelector(".projects");
/* Projects Array */
const projectsArray = [
  new Project("Default Project"),
  new Project("Default Project 2"),
  new Project("Important Project"),
];
/* RENDER PROJECTS */
function renderProjects(projectsArray) {
  projectsSection.textContent = "";
  for (const currentProject of projectsArray) {
    const project = createProjectComponent(currentProject);
    if (currentProject.current === true) {
      project.classList.add("current-project");
    }
    projectsSection.appendChild(project);
  }
}
renderProjects(projectsArray);
/* CURRENT FUNCTIONALITY */
let currentProject = 0;
const currentProjectElement = document.querySelector("#current-block");
function setCurrentProject(newCurrent) {
  currentProjectElement.textContent = projectsArray[newCurrent].name;
  projectsArray[currentProject].current = false;
  projectsArray[newCurrent].current = true;
  currentProject = newCurrent;
}
setCurrentProject(0);
renderProjects(projectsArray);
setCurrentProject(1);
renderProjects(projectsArray);
/* CREATE NEW PROJECT FUNCTIONALITY */
const newProjectModular = document.querySelector(".create-project-modular");

/* Open */
const createNewProjectIcon = document.querySelector(".create-project");
createNewProjectIcon.addEventListener("click", () => {
  newProjectModular.classList.add("visible");
});

/* Close */
function closeNewProjectModular() {
  newProjectModular.classList.remove("visible");
}

newProjectModular.addEventListener("click", closeNewProjectModular);

const closeNewProjectIcon = document.querySelector("#close-new-project-icon");
closeNewProjectIcon.addEventListener("click", closeNewProjectModular);

const cancelNewProjectBtn = document.querySelector("#cancel-new-btn");
cancelNewProjectBtn.addEventListener("click", closeNewProjectModular);

// stop propagation
const newProjectForm = document.querySelector(".create-project-form");
newProjectForm.addEventListener("click", (event) => {
  event.stopPropagation();
});

/* Create */
const inputNewProjectName = document.querySelector("#project-name-input");
const createNewProjectBtn = document.querySelector("#create-new-btn");
createNewProjectBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (inputNewProjectName.reportValidity() === true) {
    projectsArray.push(new Project(inputNewProjectName.value));
    renderProjects(projectsArray);
    newProjectModular.classList.remove("visible");
  }
});
