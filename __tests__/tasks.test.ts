import { addTask, countOpen, toggleTask } from '../src/tasks';

describe('tasks', () => {
  it('adds a task with a trimmed title', () => {
    const tasks = addTask([], '  Buy milk  ');
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toMatchObject({ title: 'Buy milk', done: false });
  });

  it('ignores empty titles', () => {
    expect(addTask([], '   ')).toEqual([]);
  });

  it('toggles a task and counts open tasks', () => {
    const tasks = addTask(addTask([], 'One'), 'Two');
    const toggled = toggleTask(tasks, tasks[0].id);
    expect(toggled[0].done).toBe(true);
    expect(countOpen(toggled)).toBe(1);
  });
});
