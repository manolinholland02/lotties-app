// Task list logic, kept separate from the screens so it can be unit tested.

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

let nextId = 1;

export function addTask(tasks: Task[], title: string): Task[] {
  const trimmed = title.trim();
  if (trimmed === '') {
    return tasks; // ignore empty input
  }
  return [...tasks, { id: String(nextId++), title: trimmed, done: false }];
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
}

export function countOpen(tasks: Task[]): number {
  return tasks.filter((task) => !task.done).length;
}
