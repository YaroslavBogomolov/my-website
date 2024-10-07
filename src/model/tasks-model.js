export default class TasksModel {
  #boardTasks = [];

  constructor(tasks) {
    this.#boardTasks = tasks; // Массив задач передается через конструктор
  }

  get tasks() {
    return this.#boardTasks;
  }
}
