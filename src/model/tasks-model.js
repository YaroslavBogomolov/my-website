import { tasks } from '../mock/task.js';
import { generateUniqueId } from '../utils.js'; 

export default class TasksModel {
  #boardtasks = tasks;
  #observers = [];

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter(task => task.status === status);
  }

  addTask(title) {
    const newTask = {
      id: generateUniqueId(),
      title: title,
      status: 'backlog',
    };
    
    this.#boardtasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  removeTask(id) {
    const index = this.#boardtasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.#boardtasks.splice(index, 1);
      this._notifyObservers();
    }
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }

  updateTaskStatus(taskId,newStatus){
    const task = this.#boardtasks.find(task =>task.id === taskId);
    if (task){
      task.status = newStatus;
      this._notifyObservers();
    }
  }
}
