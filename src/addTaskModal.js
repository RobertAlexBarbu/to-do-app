import {formatISO} from "date-fns";
import Task from "./Task";
import Project from "./Project";


export default function addTaskModal() {

    const addTasktModal = document.querySelector(".add-task-modal");

    /* the form controls */
    const inputTaskDescription = document.querySelector("#task-description");
    const inputDeadline = document.querySelector("#task-deadline");
    const date = formatISO(new Date());
    inputDeadline.setAttribute("min", date.slice(0, 10));
    const noDeadlineCheck = document.querySelector("#no-deadline");
    /* error box */
    const errorTaskDescription = document.querySelector('.error-add');

    // stop propagation
    const addTaskForm = document.querySelector(".add-task-form");
    addTaskForm.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  
    /* Open */
    const addTaskIcon = document.querySelector(".add-task");
    addTaskIcon.addEventListener("click", () => {
      addTasktModal.classList.add("visible");
      inputTaskDescription.value = "";
      addTaskForm.classList.add("active");
      noDeadlineCheck.checked = false;
      inputDeadline.value = "";
      errorTaskDescription.textContent = "";
      inputDeadline.removeAttribute("disabled");
    });

    /* Close */ 
  
    function closeAddTaskModal() {
      addTasktModal.classList.remove("visible");
      addTaskForm.classList.remove("active");
    }
  
    addTasktModal.addEventListener("click", closeAddTaskModal);
  
    const closeAddTaskIcon = document.querySelector(".close-add-task-icon");
    closeAddTaskIcon.addEventListener("click", closeAddTaskModal);
  
    const cancelAddTaskBtn = document.querySelector("#cancel-add-btn");
    cancelAddTaskBtn.addEventListener("click", closeAddTaskModal);

    /* No Deadline */
    noDeadlineCheck.addEventListener("input", (event)=>{
        if(event.target.checked === true) {
            inputDeadline.disabled = true;
            
        } else {
            inputDeadline.disabled = false;
        }
    })

    /* Add Task */
    let invalid = false;
    inputTaskDescription.addEventListener('input', (event)=>{
        invalid = false;
        errorTaskDescription.textContent = "";
        for(const current of Project.projects[Project.currentProjectIndex].getTasks()) {
            if(current.getDescription() === event.target.value) {
                errorTaskDescription.textContent = "Task already exists!";
                invalid = true;
                break;
            }
        }
        const regex = /^\s+$/;
        if(regex.test(event.target.value) === true) {
            errorTaskDescription.textContent = "Invalid task name!";
            invalid = true;
        }
      })
    const addTaskBtn = document.querySelector("#add-btn");
    addTaskBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        if(inputTaskDescription.reportValidity() === true &&
           inputDeadline.reportValidity() === true &&
           invalid === false) {
            localStorage.setItem("active", "true");
            const description = inputTaskDescription.value;
            const deadline = inputDeadline.value;
            Project.projects[Project.currentProjectIndex].addTask(new Task(description, deadline));
            Project.storeLocal();
            Project.renderProjects();
            closeAddTaskModal();
            
           }
    })
    
}