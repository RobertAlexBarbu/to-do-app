import Project from "./Project";

export default function editProjectModular() {

    const editProjectModular = document.querySelector(".edit-project-modular");
  
    /* the form control */
    const inputEditProjectName = document.querySelector("#project-edit-input");
  
    /* Open */
    const editProjectIcon = document.querySelector(".settings-icon");
    editProjectIcon.addEventListener("click", () => {
      editProjectModular.classList.add("visible");
      inputEditProjectName.value = "";
      inputEditProjectName.value = Project.projects[Project.currentProjectIndex].name;
    });

    /* Close */ 
  
    function closeEditProjectModular() {
      editProjectModular.classList.remove("visible");
    }
  
    editProjectModular.addEventListener("click", closeEditProjectModular);
  
    const closeEditProjectIcon = document.querySelector(".close-edit-project-icon");
    closeEditProjectIcon.addEventListener("click", closeEditProjectModular);
  
    const cancelEditProjectBtn = document.querySelector("#cancel-edit-btn");
    cancelEditProjectBtn.addEventListener("click", closeEditProjectModular);
    
    // stop propagation
    const editProjectForm = document.querySelector(".edit-project-form");
    editProjectForm.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    /* EDIT CURRENT PROJECT FUNCTIONALITY */
    let invalid = false;
    const errorEditProject = document.querySelector('.error-edit');
    inputEditProjectName.addEventListener('input', (event)=>{
        invalid = false;
        errorEditProject.textContent = "";
        for(const current of Project.projects) {
            if(current.name === Project.projects[Project.currentProjectIndex].name) {
                // eslint-disable-next-line no-continue
                continue;
            }
            if(current.name === event.target.value) {
                errorEditProject.textContent = "Project already exists!";
                invalid = true;
                break;
            }
        }
        const regex = /^\s+$/;
        if(regex.test(event.target.value) === true) {
            errorEditProject.textContent = "Invalid project name!";
            invalid = true;
        }
      })
    const saveEditBtn = document.querySelector("#save-edit-btn");
    saveEditBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if(inputEditProjectName.reportValidity() === true && invalid === false) {
            Project.projects[Project.currentProjectIndex].name = inputEditProjectName.value;
            Project.storeLocal();
            Project.renderProjects();
            closeEditProjectModular();
        }

    })

    /* DELETE CURRENT PROJECT FUNCTIONALITY */
}