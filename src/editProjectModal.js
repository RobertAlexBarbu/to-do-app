import Project from "./Project";

export default function editProjectModal() {
  const editProjectModal = document.querySelector(".edit-project-modal");

  /* the form control */
  const inputEditProjectName = document.querySelector("#project-edit-input");

  // stop propagation
  const editProjectForm = document.querySelector(".edit-project-form");
  editProjectForm.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  /* Open */
  const editProjectIcon = document.querySelector(".settings-icon");
  editProjectIcon.addEventListener("click", () => {
    if(Project.currentProjectIndex !== -1) {
    editProjectModal.classList.add("visible");
    inputEditProjectName.value = "";
    inputEditProjectName.value =
      Project.projects[Project.currentProjectIndex].getName();
    editProjectForm.classList.add("active");
    } 
  });

  /* Close */

  function closeEditProjectModal() {
    editProjectModal.classList.remove("visible");
    editProjectForm.classList.remove("active");
  }

  editProjectModal.addEventListener("click", closeEditProjectModal);

  const closeEditProjectIcon = document.querySelector(
    ".close-edit-project-icon"
  );
  closeEditProjectIcon.addEventListener("click", closeEditProjectModal);

  const cancelEditProjectBtn = document.querySelector("#cancel-edit-btn");
  cancelEditProjectBtn.addEventListener("click", closeEditProjectModal);

  /* EDIT CURRENT PROJECT FUNCTIONALITY */
  let invalid = false;
  const errorEditProject = document.querySelector(".error-edit");
  inputEditProjectName.addEventListener("input", (event) => {
    invalid = false;
    errorEditProject.textContent = "";
    for (const current of Project.projects) {
      if (
        current.getName() ===
        Project.projects[Project.currentProjectIndex].getName()
      ) {
        // eslint-disable-next-line no-continue
        continue;
      }
      if (current.getName() === event.target.value) {
        errorEditProject.textContent = "Project already exists!";
        invalid = true;
        break;
      }
    }
    const regex = /^\s+$/;
    if (regex.test(event.target.value) === true) {
      errorEditProject.textContent = "Invalid project name!";
      invalid = true;
    }
  });
  const saveEditBtn = document.querySelector("#save-edit-btn");
  saveEditBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (inputEditProjectName.reportValidity() === true && invalid === false) {
      Project.projects[Project.currentProjectIndex].setName(
        inputEditProjectName.value
      );
      Project.storeLocal();
      Project.renderProjects();
      closeEditProjectModal();
    }
  });

  /* DELETE CURRENT PROJECT FUNCTIONALITY */

  const deleteProjectBtn = document.querySelector("#delete-project-btn");
  deleteProjectBtn.addEventListener("click", (event) => {
    event.preventDefault();
    Project.deleteProject(Project.currentProjectIndex);
    const tasksSection = document.querySelector(".tasks-section");
    tasksSection.textContent = "";

    Project.renderProjects();
    closeEditProjectModal();
  });
}
