import { OmniFocusTask } from "./domain/task";
import { executeScript } from "./executeScript";
import { CreateOmniFocusTaskOptions } from "./types";

export function getCreateTaskAppleScript(options: CreateOmniFocusTaskOptions) {
  return `
  const omnifocus = Application('OmniFocus');
  const doc = omnifocus.defaultDocument();

  const task = omnifocus.InboxTask(${JSON.stringify(options)})
  doc.inboxTasks.push(task)
  return {
      id: task.id(),
      name: task.name()
  };
`;
}

export async function addTaskToInbox(options: CreateOmniFocusTaskOptions): Promise<OmniFocusTask> {
  const task = await executeScript(getCreateTaskAppleScript(options));
  return task;
}
