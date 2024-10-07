import TaskBoardComponent from '../view/tasks-board-component.js';
import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import NoTasksComponent from '../view/no-tasks-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskBoardComponent();
  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    // Преобразуем задачи, чтобы каждая задача знала свой статус
    this.#boardTasks = this.#tasksModel.tasks.map((statusGroup) => {
      return statusGroup.task.map((task) => ({
        ...task,
        status: statusGroup.status
      }));
    }).flat();

    this.#renderBoard();
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task); // Убираем деструктуризацию, она здесь не нужна
    render(taskComponent, container);
  }

  #renderBoard() {
    // Рендерим основную доску с колонками
    render(this.#tasksBoardComponent, this.#boardContainer);

    // Проходим по каждому статусу и создаем колонку задач один раз
    Object.values(Status).forEach((status) => {
      // Ищем задачи для этого статуса
      const tasksForStatus = this.getTasksByStatus(this.#boardTasks, status);

      // Находим колонку для данного статуса
      const columnElement = this.#tasksBoardComponent.element.querySelector(`.column.${status}`);

      // Если колонка найдена и задачи есть, рендерим их
      if (tasksForStatus.length > 0) {
        tasksForStatus.forEach((task) => {
          this.#renderTask(task, columnElement);
        });
      } else {
        // Если задач нет, рендерим компонент "NoTasksComponent" в колонку
        const noTasksComponent = new NoTasksComponent();
        render(noTasksComponent, columnElement);
      }

      // Если это корзина, добавляем кнопку очистки
      if (status === Status.BASKET) {
        this.#addClearButton(columnElement);
      }
    });
  }

  #addClearButton(columnElement) {
    // Проверяем, существует ли кнопка уже
    if (!columnElement.querySelector('.clear-button')) {
      const clearButton = document.createElement('button');
      clearButton.className = 'clear-button';
      clearButton.textContent = 'Очистить корзину';
      columnElement.appendChild(clearButton); // Добавляем кнопку под последними задачами в корзине
    }
  }

  getTasksByStatus(tasks, status) {
    // Фильтруем задачи по статусу
    return tasks.filter(task => task.status === status);
  }
}
