import Project from "./Project";

export default function createNewProjectDOM() {

  /* CREATE NEW PROJECT FUNCTIONALITY */
  const newProjectModular = document.querySelector(".create-project-modular");

  /* the form control */
  const inputNewProjectName = document.querySelector("#project-name-input");

  /* Open */
  const createNewProjectIcon = document.querySelector(".create-project");
  createNewProjectIcon.addEventListener("click", () => {
    newProjectModular.classList.add("visible");
    inputNewProjectName.value = "";
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
  const errorNewProject = document.querySelector('.error');
  let invalid = false;
  inputNewProjectName.addEventListener('input', (event)=>{
    invalid = false;
    errorNewProject.textContent = "";
    for(const current of Project.projects) {
        if(current.name === event.target.value) {
            errorNewProject.textContent = "Project already exists!";
            invalid = true;
            break;
        }
    }
    const regex = /^\s+$/;
    if(regex.test(event.target.value) === true) {
        errorNewProject.textContent = "Invalid project name!";
        invalid = true;
    }
  })
  const createNewProjectBtn = document.querySelector("#create-new-btn");
  createNewProjectBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (inputNewProjectName.reportValidity() === true && invalid === false) {
      /* eslint-disable no-new */
      new Project(inputNewProjectName.value);
      Project.storeLocal();
      localStorage.setItem("active", "true");
      Project.render();
      newProjectModular.classList.remove("visible");
      console.log(inputNewProjectName);
    }
  });
}
