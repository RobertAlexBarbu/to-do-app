
export default function addTaskModal() {

    const addTasktModal = document.querySelector(".add-task-modal");
  
    /* the form control */
    const inputTaskDescription = document.querySelector("#task-description");

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
    
}