import {createElement} from '../framework/render.js';

function createFormAddTaskComponentTemplate() {
  return (
    `<div class="new-task">
      <h3>Новая задача</h3>
      <div class="new-task-content">
        <input type="text" placeholder="Название задачи...">
        <button>+ Добавить</button>
      </div>
    </div>`
  );
}

export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskComponentTemplate();
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
