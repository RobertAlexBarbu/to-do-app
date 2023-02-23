import Project from "./Project"; // dependency

export default function editTaskModal(selectedTaskName = "", selectedTaskDeadline="") {

  const inputEditTaskForm = document.querySelector("#task-description-edit");
  inputEditTaskForm.value = selectedTaskName;

  const noDeadlineCheckEdit = document.querySelector("#no-deadline-edit");
  const inputEditTaskDeadline = document.querySelector("#task-deadline-edit");
  console.log(selectedTaskDeadline);
  if(selectedTaskDeadline === "") {
    inputEditTaskDeadline.value = "";
    noDeadlineCheckEdit.checked = true;
    inputEditTaskDeadline.setAttribute("disabled", "");
  } else {
    noDeadlineCheckEdit.checked = false;
    inputEditTaskDeadline.removeAttribute("disabled");
    inputEditTaskDeadline.value = selectedTaskDeadline.slice(0, 10);
  }
  
  /* CLOSE */
  const editTaskModal = document.querySelector(".edit-task-modal");
  const editTaskForm = document.querySelector(".edit-task-form");
  function closeEditTaskModal() {
    editTaskModal.classList.remove('visible');
    editTaskForm.classList.remove('active');
  }

  editTaskModal.addEventListener("click", closeEditTaskModal);

  const closeEditTaskIcon = document.querySelector(".close-edit-task-icon");
  closeEditTaskIcon.addEventListener("click", closeEditTaskModal);

  const cancelEditTaskBtn = document.querySelector("#cancel-edit-task-btn");
  cancelEditTaskBtn.addEventListener("click", closeEditTaskModal);

  // stop propagation
  editTaskForm.addEventListener("click", (event)=>{
    event.stopPropagation();
  })

  // DELETE TASK
  const deleteTaskBtn = document.querySelector("#delete-task-btn");
  deleteTaskBtn.addEventListener("click", ()=>{
    Project.projects[Project.currentProjectIndex].deleteTask(selectedTaskName, selectedTaskDeadline);
  })

}
