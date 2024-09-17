import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskboardComponent from './view/taskboard-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const taskboardContainer = document.querySelector('.taskboard');

// Отрисовка компонентов заголовка, формы и доски
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
render(new TaskboardComponent(), taskboardContainer);

// Задачи для каждой колонки
const taskColumns = [
  ['Выучить JS', 'Выучить React', 'Сделать домашку'],      // Для колонки "Бэклог"
  ['Выпить чая', 'Попить воды'],                            // Для колонки "В процессе"
  ['Позвонить маме', 'Погладить кота'],                     // Для колонки "Готово"
  ['Сходить погулять', 'Прочитать Войну и Мир']             // Для колонки "Корзина"
];

// Находим все колонки
const columns = document.querySelectorAll('.column');

// Отрисовка задач в каждой колонке
columns.forEach((column, index) => {
  const taskTitles = taskColumns[index];  // Задачи для текущей колонки
  taskTitles.forEach(title => {
    render(new TaskComponent(title), column);
  });
});
