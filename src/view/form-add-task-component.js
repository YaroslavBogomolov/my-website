import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return `
    <div class="new-task">
      <h3>Новая задача</h3>
      <div class="new-task-content">
        <input type="text" id="user-name" name="user-name" placeholder="Название задачи" autocomplete="off">
        <button>+ Добавить</button>
      </div>
    </div>`;
}

export default class FormAddTaskComponent extends AbstractComponent {
  get template() {
    return createFormAddTaskComponentTemplate();
  }
}
