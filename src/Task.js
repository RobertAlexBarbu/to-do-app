import { parseISO } from "date-fns";

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
  constructor(description, deadline, checked = false) {
    this.taskDescription = description;
    this.taskDeadlineUnformatted = deadline;
    this.taskDeadline = parseISO(deadline);
    this.checked = checked;
  }
  getDescription() {
    return this.taskDescription;
  }
  setDescription(value) {
    this.taskDescription = value;
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
    if (this.getChecked() === true) {
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
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path fill="red" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>';
    taskDetails.appendChild(taskCheckbox);
    taskDetails.appendChild(taskName);
    taskDetails.appendChild(editTaskIcon);

    newTask.appendChild(taskDetails);
    return newTask;
  }
}
