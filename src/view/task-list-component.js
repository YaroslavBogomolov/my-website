import { createElement } from '../framework/render.js';

function createTaskListTemplate() {
  return (
    `<div class="taskboard__column">
      <h2>Задачи</h2>
    </div>`
  );
}

export default class TaskListComponent {
  getTemplate() {
    return createTaskListTemplate();
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
