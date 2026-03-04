const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert');
const {
  createTask,
  listTasks,
  getTask,
  completeTask,
  removeTask,
  getStats,
  resetTasks,
} = require('../src/tasks');

beforeEach(() => {
  resetTasks();
});

describe('createTask', () => {
  it('should create a task with title', () => {
    const task = createTask('Test task');
    assert.strictEqual(task.title, 'Test task');
    assert.strictEqual(task.completed, false);
    assert.strictEqual(task.id, 1);
  });

  it('should create a task with title and description', () => {
    const task = createTask('Test', 'Description');
    assert.strictEqual(task.description, 'Description');
  });

  it('should throw if title is empty', () => {
    assert.throws(() => createTask(''), /Title is required/);
  });

  it('should throw if title is not a string', () => {
    assert.throws(() => createTask(123), /Title is required/);
  });

  it('should auto-increment ids', () => {
    const t1 = createTask('First');
    const t2 = createTask('Second');
    assert.strictEqual(t2.id, t1.id + 1);
  });
});

describe('listTasks', () => {
  it('should return all tasks', () => {
    createTask('A');
    createTask('B');
    assert.strictEqual(listTasks().length, 2);
  });

  it('should filter completed tasks', () => {
    createTask('A');
    const t2 = createTask('B');
    completeTask(t2.id);
    assert.strictEqual(listTasks('completed').length, 1);
    assert.strictEqual(listTasks('pending').length, 1);
  });

  it('should return empty array when no tasks', () => {
    assert.deepStrictEqual(listTasks(), []);
  });
});

describe('getTask', () => {
  it('should return task by id', () => {
    const created = createTask('Find me');
    const found = getTask(created.id);
    assert.strictEqual(found.title, 'Find me');
  });

  it('should throw if task not found', () => {
    assert.throws(() => getTask(999), /not found/);
  });
});

describe('completeTask', () => {
  it('should mark task as completed', () => {
    const task = createTask('Complete me');
    const completed = completeTask(task.id);
    assert.strictEqual(completed.completed, true);
    assert.ok(completed.completedAt);
  });
});

describe('removeTask', () => {
  it('should remove task and return it', () => {
    const task = createTask('Remove me');
    const removed = removeTask(task.id);
    assert.strictEqual(removed.id, task.id);
    assert.strictEqual(listTasks().length, 0);
  });

  it('should throw if task not found', () => {
    assert.throws(() => removeTask(999), /not found/);
  });
});

describe('getStats', () => {
  it('should return correct stats', () => {
    createTask('A');
    createTask('B');
    createTask('C');
    completeTask(1);
    const stats = getStats();
    assert.strictEqual(stats.total, 3);
    assert.strictEqual(stats.completed, 1);
    assert.strictEqual(stats.pending, 2);
  });
});
