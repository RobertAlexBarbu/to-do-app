import {parseISO} from "date-fns";
export default class Task {
    taskDescription;
    taskDeadline;
    constructor(description, deadline) {
        this.taskDescription = description;
        this.taskDeadline = parseISO(deadline);
    }
    getDescription() {
        return this.taskDescription;
    }
    getDeadline() {
        return this.taskDeadline;
    }
}