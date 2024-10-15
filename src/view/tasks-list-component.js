import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListTemplate() {
  return `<div class="task-list"></div>`; 
}

export default class TaskListComponent extends AbstractComponent {
  constructor() {
    super();
    this.tasks = []; 
  }

  get template() {
    return createTaskListTemplate();
  }

  addTask(task) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task-item';
    taskElement.textContent = task.title;
    this.element.appendChild(taskElement);
  }

  updateTasks(newTasks) {
    this.tasks = newTasks;
    this.clear(); // Очищаем список перед обновлением
    this.tasks.forEach(task => this.addTask(task)); 
  }

  clear() {
    this.element.innerHTML = '';
  }
}
