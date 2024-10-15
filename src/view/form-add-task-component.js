import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return  `
  <div class="new-task">
    <h3>Новая задача</h3>
    <form class="new-task-content"> 
      <input type="text" id="add-task" name="new-text" placeholder="Название задачи" autocomplete="off">
      <button type="submit">+ Добавить</button>
    </form>
  </div>`;
}

export default class FormAddTaskComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.querySelector('.new-task-content').addEventListener('submit', this.#clickHandler); 
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();  
    this.#handleClick();
  };
}
