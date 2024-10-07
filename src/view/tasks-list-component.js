import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListTemplate() {
  return `<div class="task-list"></div>`;  // Больше не создаем новую колонку
}

export default class TaskListComponent extends AbstractComponent {
  get template() {
    return createTaskListTemplate();
  }

  addTask(task) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task-item';
    taskElement.textContent = task.title;
    this.element.appendChild(taskElement);
  }
}
