  import { AbstractComponent } from '../framework/view/abstract-component.js';

  function createClearTrashButtonTemplate() {
    return (
      `<button class="clear-trash-button">Очистить корзину</button>`
    );
  }

  export default class ClearTrashButtonComponent extends AbstractComponent {
    get template() {
      return createClearTrashButtonTemplate();
    }
  }
