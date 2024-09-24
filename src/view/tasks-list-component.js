import { createElement } from '../framework/render.js';

function createTaskListTemplate(status) {
  return (
    `<div class="taskboard__column ${status}">
    </div>`
  );
}

export default class TaskListComponent {
  constructor({ status }) {
    this.status = status;
    this.element = null;
  }

  getTemplate() {
    return createTaskListTemplate(this.status);  
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
