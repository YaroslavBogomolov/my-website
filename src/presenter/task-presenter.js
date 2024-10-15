import TaskComponent from '../view/task-component.js';
import { render } from '../framework/render.js';

export default class TaskPresenter {
  #taskContainer = null;
  #task = null;

  constructor({ taskContainer, task }) {
    this.#taskContainer = taskContainer; 
    this.#task = task; 
  }

  init() {
    this.#renderTask(); 
  }

  #renderTask() {
    const taskComponent = new TaskComponent(this.#task); 
    render(taskComponent, this.#taskContainer); 
  }

 
}
