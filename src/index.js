import "./styles.css";
import Project from "./Project";

if(localStorage.active === undefined) {
    Project.initializeDefault();
    Project.render();   
} else {
    Project.projects = [...JSON.parse(localStorage.getItem('projects'))]
    Project.render();   
}
   

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
    /* eslint-disable no-new */
    new Project(inputNewProjectName.value);
    Project.storeLocal();
    localStorage.setItem('active', 'true');
    Project.render();
    newProjectModular.classList.remove("visible");
  }
});


