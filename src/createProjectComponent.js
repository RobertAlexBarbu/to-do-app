export default function createProjectComponent(project) {
    const projectComponent = document.createElement("div");
    projectComponent.classList.add("project");
    projectComponent.textContent = project.name;
    return projectComponent;
}