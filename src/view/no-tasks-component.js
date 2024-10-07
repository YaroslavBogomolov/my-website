import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class NoTasksComponent extends AbstractComponent {
  get template() {
    return `<p class="no-tasks">No tasks available.</p>`;
  }
}
