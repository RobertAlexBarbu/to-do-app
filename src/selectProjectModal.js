export default function selectProjectModal() {
  const selectProjModal = document.querySelector(".select-project-modal");
  const selectProjBox = document.querySelector(".select-project");
  const closeErrorIcon = document.querySelector(".close-err-icon");
  const closeErrorBtn = document.querySelector("#close-error");

  function closeSelectProjModal() {
    selectProjModal.classList.remove('visible');
    selectProjBox.classList.remove('active');
  }
  selectProjModal.addEventListener("click", closeSelectProjModal);
  closeErrorBtn.addEventListener("click", closeSelectProjModal);
  closeErrorIcon.addEventListener("click", closeSelectProjModal);
  // stop progagation
  selectProjBox.addEventListener("click", (event)=>{
    event.stopPropagation();
  })
}