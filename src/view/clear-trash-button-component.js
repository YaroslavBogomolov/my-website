import { createElement } from '../framework/render.js';

function createClearTrashButtonTemplate() {
  return (
    `<button class="clear-trash-button">Очистить корзину</button>`
  );
}

export default class ClearTrashButtonComponent {
  getTemplate() {
    return createClearTrashButtonTemplate();
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
