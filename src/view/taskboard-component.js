import {createElement} from '../framework/render.js';

function createTaskboardComponentTemplate() {
  return (
    `<div class="container2">
      <div class="columns">
        <div class="column backlog">
          <h2>Бэклог</h2>
        </div>
        <div class="column in-progress">
          <h2>В процессе</h2>
        </div>
        <div class="column done">
          <h2>Готово</h2>
        </div>
        <div class="column trash">
          <h2>Корзина</h2>
        </div>
        <button class="clear-button">x Очистить</button>
      </div>
    </div>`
  );
}

export default class TaskboardComponent {
  getTemplate() {
    return createTaskboardComponentTemplate();
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
