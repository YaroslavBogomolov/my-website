import TaskBoardComponent from '../view/tasks-board-component.js';
import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import ClearTrashButtonComponent from '../view/clear-trash-button-component.js';
import { render } from '../framework/render.js';

export default class TasksBoardPresenter {
  tasksBoardComponent = new TaskBoardComponent();
  clearTrashButtonComponent = new ClearTrashButtonComponent();  // Добавлен компонент кнопки

  constructor({ boardContainer, tasksModel }) {
    this.boardContainer = boardContainer;
    this.tasksModel = tasksModel;
    this.boardTasks = [...this.tasksModel.getTasks()];  
  }

  init() {
    render(this.tasksBoardComponent, this.boardContainer);

   
    this.boardTasks.forEach((taskCategory) => {
      const taskListComponent = new TasksListComponent({ status: taskCategory.status });
      const columnElement = this.tasksBoardComponent.getElement().querySelector(`.${taskCategory.status}`);
      render(taskListComponent, columnElement);

      taskCategory.task.forEach((taskItem) => {
        const taskComponent = new TaskComponent({ task: taskItem });
        render(taskComponent, taskListComponent.getElement());
      });
    });

   
    const trashColumn = this.tasksBoardComponent.getElement().querySelector('.trash');
    render(this.clearTrashButtonComponent, trashColumn, 'beforeend');

    
  }

 
}
