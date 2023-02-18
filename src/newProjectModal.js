import Project from "./Project";

export default function newProjectModal() {

  /* CREATE NEW PROJECT FUNCTIONALITY */
  /* the modal */
  const newProjectModal = document.querySelector(".create-project-modal");

  /* the form control */
  const inputNewProjectName = document.querySelector("#project-name-input");

  /* Open */
  const createNewProjectIcon = document.querySelector(".create-project");
  const newProjectForm = document.querySelector(".create-project-form");
  createNewProjectIcon.addEventListener("click", () => {
    newProjectModal.classList.add("visible");
    inputNewProjectName.value = "";
    newProjectForm.classList.add("active");
  });

  // stop propagation
  newProjectForm.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  /* Close */
  let invalid = false;
  const errorNewProject = document.querySelector('.error');

  function closeNewProjectModal() {
    newProjectModal.classList.remove("visible");
    newProjectForm.classList.remove("active");
    invalid = false;
    errorNewProject.textContent = "";

  }

  newProjectModal.addEventListener("click", closeNewProjectModal);

  const closeNewProjectIcon = document.querySelector(".close-new-project-icon");
  closeNewProjectIcon.addEventListener("click", closeNewProjectModal);

  const cancelNewProjectBtn = document.querySelector("#cancel-new-btn");
  cancelNewProjectBtn.addEventListener("click", closeNewProjectModal);



  /* Create */
  
  
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
      const project = new Project(inputNewProjectName.value);
      Project.addProject(project);
      Project.storeLocal();
      localStorage.setItem("active", "true");
      Project.renderProjects();
      closeNewProjectModal();
    }
  });
}
