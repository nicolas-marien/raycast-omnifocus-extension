import { OmniFocusTask } from "./domain/task";
import { executeScript } from "./utils/executeScript";
import { CreateOmniFocusTaskOptions } from "./types";

function getCreateTaskAppleScript(options: CreateOmniFocusTaskOptions, projectName?: string): string {
  const taskProperties = `
    name: '${options.name}',
    ${options.deferDate ? "deferDate: new Date('" + options.deferDate.toISOString() + "')," : ""}
    ${options.dueDate ? "deferDate: new Date('" + options.dueDate + "')," : ""}
    ${options.note ? "note: '${options.note}'," : ""}
    ${options.flagged ? "flagged: true," : ""}
    `;

  if (!projectName) {
    return `
      const omnifocus = Application('OmniFocus');
      const doc = omnifocus.defaultDocument();
      
      const task = omnifocus.InboxTask({
        ${taskProperties}
      })
      doc.inboxTasks.push(task)

      return {
        id: task.id(),
        name: task.name()
      }
    `;
  }

  // Add to specific project
  return `
    const omnifocus = Application('OmniFocus');
    const doc = omnifocus.defaultDocument();
  
    const projects = doc.flattenedProjects()
  
    const project = projects.find(p => p.name() === '${projectName}')
    const task = omnifocus.Task({
      ${taskProperties}
    })
    project.tasks.push(task)

    return {
      id: task.id(),
      name: task.name()
    }
  `;
}

export async function addTask(options: CreateOmniFocusTaskOptions, projectName?: string): Promise<OmniFocusTask> {
  const script = getCreateTaskAppleScript(options, projectName);

  console.log(script);
  const task = await executeScript(script);
  return task;
}
