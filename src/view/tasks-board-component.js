import { AbstractComponent } from '../framework/view/abstract-component.js';
import { Status, StatusLabel } from '../const.js';

function createTaskboardComponentTemplate() {
  return (
    `<div class="container2">
      <div class="columns">
        <div class="column backlog">
          <h2>${StatusLabel[Status.BACKLOG]}</h2>
        </div>
        <div class="column in-progress">
          <h2>${StatusLabel[Status.PROCESSING]}</h2>
        </div>
        <div class="column done">
          <h2>${StatusLabel[Status.DONE]}</h2>
        </div>
        <div class="column trash">
          <h2>${StatusLabel[Status.BASKET]}</h2>
        </div>
      </div>
    </div>`
  );
}

export default class TaskboardComponent extends AbstractComponent {
  get template() {
    return createTaskboardComponentTemplate();
  }
}
