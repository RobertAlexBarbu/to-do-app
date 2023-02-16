/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Project.js":
/*!************************!*\
  !*** ./src/Project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\nclass Project {\n\n  name;\n  tasks;\n  constructor(name) {\n    this.name = name;\n    Project.projects.push(this);\n  }\n\n  static projects = [];\n  static currentProjectIndex;\n  static storeLocal() {\n    localStorage.setItem(\"projects\", JSON.stringify(Project.projects));\n    localStorage.setItem(\"currentIndex\", JSON.stringify(Project.currentProjectIndex));\n  }\n  static renderProjects() {\n\n    const projectsSection = document.querySelector(\".projects\");\n    projectsSection.textContent = \"\";\n    \n    if(Project.projects.length === 0) {\n      console.log(\"hey\");\n      const noProjects = document.createElement(\"div\");\n      noProjects.classList.add(\"no-existing-projects\")\n      noProjects.textContent = \"Empty...\"\n      projectsSection.appendChild(noProjects);\n    }\n\n    // modifies current container depending on whether we have or not \n    // a current project selected\n    const currentBlock = document.querySelector(\"#current-block\");\n    const settingsIcon = document.querySelector(\".settings-icon\");\n    if(Project.currentProjectIndex !== -1) {\n      currentBlock.textContent = Project.projects[Project.currentProjectIndex].name;\n      currentBlock.classList.remove(\"no-project-selected\");\n      currentBlock.classList.add(\"current-project\", \"project\");\n      settingsIcon.style.visibility = \"visible\";    \n    } else {\n      currentBlock.textContent = \"No project selected\";\n      currentBlock.classList.remove(\"current-project\", \"project\");\n      currentBlock.classList.add(\"no-project-selected\");\n      settingsIcon.style.visibility = \"hidden\";\n    }\n\n    for (const currentProject of Project.projects) {\n      const project = document.createElement(\"div\");\n      project.classList.add(\"project\");\n      project.textContent = currentProject.name;\n      project.addEventListener(\"click\", (event) => {\n        localStorage.setItem(\"active\", \"true\");\n        let i = 0;\n        for (const current of Project.projects) {\n          if (current.name === event.target.textContent) {\n            break;\n          }\n          i += 1;\n        }\n        Project.currentProjectIndex = i;\n        Project.storeLocal();\n        Project.renderProjects();\n      });\n      \n      // we check if we have a project selected\n      // if we do, we highlight it\n      if(Project.currentProjectIndex !== -1) {\n        if (currentProject.name === Project.projects[Project.currentProjectIndex].name) {\n          project.classList.add(\"current-project\");\n        } \n      }\n      projectsSection.appendChild(project);\n    }\n\n  }\n\n\n  static deleteProject(currentIndex) {\n    Project.projects.splice(currentIndex, 1);\n    Project.currentProjectIndex = -1;\n    Project.storeLocal();\n  }\n\n\n  static renderInitial() {\n    if (localStorage.active === undefined) {\n      Project.#initializeDefault();\n      Project.renderProjects();\n    } else {\n      Project.projects = [...JSON.parse(localStorage.getItem(\"projects\"))];\n      Project.currentProjectIndex = JSON.parse(localStorage.getItem(\"currentIndex\"));\n      Project.renderProjects();\n    }\n  }\n\n\n  static #initializeDefault() {\n    /* eslint-disable no-new */\n    new Project(\"Default Project\");\n    Project.currentProjectIndex = 0;\n    new Project(\"Default Project 2\");\n    new Project(\"Important Project\");\n    Project.storeLocal();\n  }\n}\n\n\n//# sourceURL=webpack://to-do-app/./src/Project.js?");

/***/ }),

/***/ "./src/addTaskModal.js":
/*!*****************************!*\
  !*** ./src/addTaskModal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ addTaskModal)\n/* harmony export */ });\n\nfunction addTaskModal() {\n\n    const addTasktModal = document.querySelector(\".add-task-modal\");\n  \n    /* the form control */\n    const inputTaskDescription = document.querySelector(\"#task-description\");\n\n    // stop propagation\n    const addTaskForm = document.querySelector(\".add-task-form\");\n    addTaskForm.addEventListener(\"click\", (event) => {\n      event.stopPropagation();\n    });\n  \n    /* Open */\n    const addTaskIcon = document.querySelector(\".add-task\");\n    addTaskIcon.addEventListener(\"click\", () => {\n      addTasktModal.classList.add(\"visible\");\n      inputTaskDescription.value = \"\";\n      addTaskForm.classList.add(\"active\");\n    });\n\n    /* Close */ \n  \n    function closeAddTaskModal() {\n      addTasktModal.classList.remove(\"visible\");\n      addTaskForm.classList.remove(\"active\");\n    }\n  \n    addTasktModal.addEventListener(\"click\", closeAddTaskModal);\n  \n    const closeAddTaskIcon = document.querySelector(\".close-add-task-icon\");\n    closeAddTaskIcon.addEventListener(\"click\", closeAddTaskModal);\n  \n    const cancelAddTaskBtn = document.querySelector(\"#cancel-add-btn\");\n    cancelAddTaskBtn.addEventListener(\"click\", closeAddTaskModal);\n    \n}\n\n//# sourceURL=webpack://to-do-app/./src/addTaskModal.js?");

/***/ }),

/***/ "./src/editProjectModal.js":
/*!*********************************!*\
  !*** ./src/editProjectModal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ editProjectModal)\n/* harmony export */ });\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ \"./src/Project.js\");\n\n\nfunction editProjectModal() {\n\n    const editProjectModal = document.querySelector(\".edit-project-modal\");\n  \n    /* the form control */\n    const inputEditProjectName = document.querySelector(\"#project-edit-input\");\n\n    // stop propagation\n    const editProjectForm = document.querySelector(\".edit-project-form\");\n    editProjectForm.addEventListener(\"click\", (event) => {\n      event.stopPropagation();\n    });\n  \n    /* Open */\n    const editProjectIcon = document.querySelector(\".settings-icon\");\n    editProjectIcon.addEventListener(\"click\", () => {\n      editProjectModal.classList.add(\"visible\");\n      inputEditProjectName.value = \"\";\n      inputEditProjectName.value = _Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].projects[_Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentProjectIndex].name;\n      editProjectForm.classList.add(\"active\");\n    });\n\n    /* Close */ \n  \n    function closeEditProjectModal() {\n      editProjectModal.classList.remove(\"visible\");\n      editProjectForm.classList.remove(\"active\");\n    }\n  \n    editProjectModal.addEventListener(\"click\", closeEditProjectModal);\n  \n    const closeEditProjectIcon = document.querySelector(\".close-edit-project-icon\");\n    closeEditProjectIcon.addEventListener(\"click\", closeEditProjectModal);\n  \n    const cancelEditProjectBtn = document.querySelector(\"#cancel-edit-btn\");\n    cancelEditProjectBtn.addEventListener(\"click\", closeEditProjectModal);\n    \n\n\n    /* EDIT CURRENT PROJECT FUNCTIONALITY */\n    let invalid = false;\n    const errorEditProject = document.querySelector('.error-edit');\n    inputEditProjectName.addEventListener('input', (event)=>{\n        invalid = false;\n        errorEditProject.textContent = \"\";\n        for(const current of _Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].projects) {\n            if(current.name === _Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].projects[_Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentProjectIndex].name) {\n                // eslint-disable-next-line no-continue\n                continue;\n            }\n            if(current.name === event.target.value) {\n                errorEditProject.textContent = \"Project already exists!\";\n                invalid = true;\n                break;\n            }\n        }\n        const regex = /^\\s+$/;\n        if(regex.test(event.target.value) === true) {\n            errorEditProject.textContent = \"Invalid project name!\";\n            invalid = true;\n        }\n      })\n    const saveEditBtn = document.querySelector(\"#save-edit-btn\");\n    saveEditBtn.addEventListener('click', (event) => {\n        event.preventDefault();\n        if(inputEditProjectName.reportValidity() === true && invalid === false) {\n            _Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].projects[_Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentProjectIndex].name = inputEditProjectName.value;\n            _Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].storeLocal();\n            _Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].renderProjects();\n            closeEditProjectModal();\n        }\n\n    })\n\n    /* DELETE CURRENT PROJECT FUNCTIONALITY */\n    \n    const deleteProjectBtn = document.querySelector(\"#delete-project-btn\");\n    deleteProjectBtn.addEventListener(\"click\", (event=> {\n        event.preventDefault();\n        _Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteProject(_Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentProjectIndex);\n        _Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].renderProjects();\n        closeEditProjectModal();\n    }))\n    \n}\n\n//# sourceURL=webpack://to-do-app/./src/editProjectModal.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ \"./src/Project.js\");\n/* harmony import */ var _newProjectModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./newProjectModal */ \"./src/newProjectModal.js\");\n/* harmony import */ var _editProjectModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editProjectModal */ \"./src/editProjectModal.js\");\n/* harmony import */ var _addTaskModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addTaskModal */ \"./src/addTaskModal.js\");\n\n\n\n\n\n\n_Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].renderInitial();\n(0,_newProjectModal__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n(0,_editProjectModal__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n(0,_addTaskModal__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n\n\n\n//# sourceURL=webpack://to-do-app/./src/index.js?");

/***/ }),

/***/ "./src/newProjectModal.js":
/*!********************************!*\
  !*** ./src/newProjectModal.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ newProjectModal)\n/* harmony export */ });\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ \"./src/Project.js\");\n\n\nfunction newProjectModal() {\n\n  /* CREATE NEW PROJECT FUNCTIONALITY */\n  const newProjectModal = document.querySelector(\".create-project-modal\");\n\n  /* the form control */\n  const inputNewProjectName = document.querySelector(\"#project-name-input\");\n\n  /* Open */\n  const createNewProjectIcon = document.querySelector(\".create-project\");\n  const newProjectForm = document.querySelector(\".create-project-form\");\n  createNewProjectIcon.addEventListener(\"click\", () => {\n    newProjectModal.classList.add(\"visible\");\n    inputNewProjectName.value = \"\";\n    newProjectForm.classList.add(\"active\");\n  });\n\n  // stop propagation\n  newProjectForm.addEventListener(\"click\", (event) => {\n    event.stopPropagation();\n  });\n\n  /* Close */\n  let invalid = false;\n  const errorNewProject = document.querySelector('.error');\n\n  function closeNewProjectModal() {\n    newProjectModal.classList.remove(\"visible\");\n    newProjectForm.classList.remove(\"active\");\n    invalid = false;\n    errorNewProject.textContent = \"\";\n\n  }\n\n  newProjectModal.addEventListener(\"click\", closeNewProjectModal);\n\n  const closeNewProjectIcon = document.querySelector(\".close-new-project-icon\");\n  closeNewProjectIcon.addEventListener(\"click\", closeNewProjectModal);\n\n  const cancelNewProjectBtn = document.querySelector(\"#cancel-new-btn\");\n  cancelNewProjectBtn.addEventListener(\"click\", closeNewProjectModal);\n\n\n\n  /* Create */\n  \n  \n  inputNewProjectName.addEventListener('input', (event)=>{\n    invalid = false;\n    errorNewProject.textContent = \"\";\n    for(const current of _Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].projects) {\n        if(current.name === event.target.value) {\n            errorNewProject.textContent = \"Project already exists!\";\n            invalid = true;\n            break;\n        }\n    }\n    const regex = /^\\s+$/;\n    if(regex.test(event.target.value) === true) {\n        errorNewProject.textContent = \"Invalid project name!\";\n        invalid = true;\n    }\n  })\n  const createNewProjectBtn = document.querySelector(\"#create-new-btn\");\n  createNewProjectBtn.addEventListener(\"click\", (event) => {\n    event.preventDefault();\n    if (inputNewProjectName.reportValidity() === true && invalid === false) {\n      /* eslint-disable no-new */\n      new _Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"](inputNewProjectName.value);\n      _Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].storeLocal();\n      localStorage.setItem(\"active\", \"true\");\n      _Project__WEBPACK_IMPORTED_MODULE_0__[\"default\"].renderProjects();\n      closeNewProjectModal();\n    }\n  });\n}\n\n\n//# sourceURL=webpack://to-do-app/./src/newProjectModal.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;