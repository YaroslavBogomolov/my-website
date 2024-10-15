import TaskBoardComponent from '../view/tasks-board-component.js';
import NoTasksComponent from '../view/no-tasks-component.js';
import TaskListComponent from '../view/tasks-list-component.js';
import ClearTrashButtonComponent from '../view/clear-trash-button-component.js';
import { render } from '../framework/render.js';
import TaskPresenter from './task-presenter.js'; 
import { Status } from '../const.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskBoardComponent();
  #taskLists = {};
  #clearTrashButtonComponent = null;

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    this.#initializeBoard();
    this.#initClearTrashButton();
  }

  #initClearTrashButton() {
    this.#clearTrashButtonComponent = new ClearTrashButtonComponent({
      onClick: this.clearTrash.bind(this)
    });
    const trashContainer = this.#tasksBoardComponent.element.querySelector('.column.trash');
    if (trashContainer) {
      render(this.#clearTrashButtonComponent, trashContainer);
    } else {
      console.error('Контейнер для кнопки очистки не найден');
    }
  }

  clearTrash() {
    const tasksToRemove = this.#tasksModel.tasks.filter(task => task.status === 'trash');
    tasksToRemove.forEach(task => {
      this.#tasksModel.removeTask(task.id);
    });
    this.#handleModelChange();
  }

  #initializeBoard() {
    Object.values(Status).forEach((status) => {
      const columnElement = this.#tasksBoardComponent.element.querySelector(`.column.${status}`);

      if (!columnElement) {
        throw new Error(`Container for status ${status} doesn't exist`);
      }

      const taskList = new TaskListComponent();
      this.#taskLists[status] = taskList;

      render(taskList, columnElement);
      this.#addDropListener(columnElement); 
    });

    this.#renderBoard();
  }

  #addDropListener(columnElement) {
    columnElement.addEventListener('dragover', (event) => {
      event.preventDefault(); 
    });

    columnElement.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      const task = this.#tasksModel.tasks.find(task => task.id === taskId);

      if (task) {
        const newStatus = columnElement.classList[1]; 
        task.status = newStatus; 
        this.#handleModelChange(); 
      }
    });
  }

  #renderBoard() {
    Object.values(Status).forEach((status) => {
      const tasksForStatus = this.getTasksByStatus(status);
      const taskList = this.#taskLists[status];

      taskList.clear();

      if (tasksForStatus.length > 0) {
        tasksForStatus.forEach((task) => {
          this.#renderTask(task, taskList);
        });
      } else {
        const noTasksComponent = new NoTasksComponent();
        render(noTasksComponent, taskList.element);
      }
    });
  }

  getTasksByStatus(status) {
    return this.#tasksModel.tasks.filter(task => task.status === status);
  }

  createTask() {
    const taskTitle = document.querySelector('#add-task').value.trim();
    if (!taskTitle) {
      return;
    }

    const newTask = this.#tasksModel.addTask(taskTitle);
    document.querySelector('#add-task').value = '';
    this.#handleModelChange();
  }

  #handleModelChange() {
    this.#renderBoard();
  }

  #renderTask(task, taskList) {
    const taskPresenter = new TaskPresenter({
      taskContainer: taskList.element,
      task
    });
    taskPresenter.init();
  }
}
