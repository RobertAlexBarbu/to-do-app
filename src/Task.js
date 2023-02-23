import { parseISO } from "date-fns";
import editTaskModalF from "./editTaskModal";

export default class Task {
  taskDescription;
  taskDeadline;
  taskDeadlineUnformatted;
  checked;
  getChecked() {
    return this.checked;
  }
  setChecked(value) {
    this.checked = value;
  }
  constructor(description, deadline, checked=false) {
    this.taskDescription = description;
    this.taskDeadlineUnformatted = deadline;
    this.taskDeadline = parseISO(deadline);
    this.checked = checked;
  }
  getDescription() {
    return this.taskDescription;
  }
  getDeadline() {
    return this.taskDeadline;
  }
  getDeadlineUnformatted() {
    return this.taskDeadlineUnformatted;
  }
  static stringifyDate(month, day) {
    let stringDate = "";
    switch (month) {
      case 0:
        stringDate += "January ";
        break;
      case 1:
        stringDate += "February ";
        break;
      case 2:
        stringDate += "March ";
        break;
      case 3:
        stringDate += "April ";
        break;
      case 4:
        stringDate += "May ";
        break;
      case 5:
        stringDate += "June ";
        break;
      case 6:
        stringDate += "July ";
        break;
      case 7:
        stringDate += "Augsut ";
        break;
      case 8:
        stringDate += "September ";
        break;
      case 9:
        stringDate += "October ";
        break;
      case 10:
        stringDate += "November ";
        break;
      case 11:
        stringDate += "December ";
        break;
      default:
        stringDate += "";
    }
    if (Number.isNaN(month) === true) {
      stringDate += "No Deadline";
    }
    if (Number.isNaN(day) === false) {
      stringDate += day;
    }
    return stringDate;
  }
  taskComponent() {
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.classList.add("task-checkbox");
     if(this.getChecked() === true) {
      taskCheckbox.checked = true;
    } else {
      taskCheckbox.checked = false;

    } 
    const taskName = document.createElement("div");
    taskName.classList.add("task-name");
    taskName.textContent = this.getDescription();

    const editTaskIcon = document.createElement("div");
    editTaskIcon.classList.add("edit-task-icon");
    editTaskIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>file-edit-outline</title><path d="M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3L18.8 14.2L19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9L14.1 23H12V20.9L18.1 14.8L20.2 16.9Z" /></svg>';
    /* OPEN MODAL */
    const editTaskModal = document.querySelector(".edit-task-modal");
    const editTaskForm = document.querySelector(".edit-task-form");
    
    editTaskIcon.addEventListener("click", ()=>{
      editTaskModal.classList.add("visible");
      editTaskForm.classList.add("active"); 
      editTaskModalF(this.getDescription(), this.getDeadlineUnformatted());

    })
    taskDetails.appendChild(taskCheckbox);
    taskDetails.appendChild(taskName);
    taskDetails.appendChild(editTaskIcon);

    newTask.appendChild(taskDetails);
    return newTask;
  }
}
