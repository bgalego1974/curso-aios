/**
 * Task Manager — módulo principal de gestão de tarefas.
 * Usado como projecto-exemplo no Curso AIOS.
 */

let tasks = [];
let nextId = 1;

function createTask(title, description = '') {
  if (!title || typeof title !== 'string') {
    throw new Error('Title is required and must be a string');
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    description: description.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  };

  tasks.push(task);
  return task;
}

function listTasks(filter = 'all') {
  if (filter === 'completed') {
    return tasks.filter((t) => t.completed);
  }
  if (filter === 'pending') {
    return tasks.filter((t) => !t.completed);
  }
  return [...tasks];
}

function getTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }
  return task;
}

function completeTask(id) {
  const task = getTask(id);
  task.completed = true;
  task.completedAt = new Date().toISOString();
  return task;
}

function removeTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error(`Task with id ${id} not found`);
  }
  return tasks.splice(index, 1)[0];
}

function getStats() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  return { total, completed, pending };
}

function resetTasks() {
  tasks = [];
  nextId = 1;
}

module.exports = {
  createTask,
  listTasks,
  getTask,
  completeTask,
  removeTask,
  getStats,
  resetTasks,
};
