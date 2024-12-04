import { OmniFocusTask } from "./domain/task";
import { executeScript } from "./executeScript";
import { CreateOmniFocusTaskOptions } from "./types";

function getCreateTaskAppleScript(projectName: string, options: CreateOmniFocusTaskOptions): string {
  return `
    const omnifocus = Application('OmniFocus');
    const doc = omnifocus.defaultDocument();
	
    const projects = doc.flattenedProjects()
	
	const project = projects.find(p => p.name() === '${projectName}')
    const task = omnifocus.Task({
      name: '${options.name}',
      flagged: ${options.flagged},
      ${options.deferDate ? "deferDate: new Date('" + options.deferDate.toISOString() + "')," : ""}
      ${options.dueDate ? "deferDate: new Date('" + options.dueDate + "')," : ""}
      note: '${options.note}'
    })
    project.tasks.push(task)

    return {
    id: task.id(),
    name: task.name()
    }
    `;
}

export async function addTaskToProject(
  projectName: string,
  options: CreateOmniFocusTaskOptions,
): Promise<OmniFocusTask> {
  const script = getCreateTaskAppleScript(projectName, options);
  console.log(script);
  const task = await executeScript(script);
  return task;
}
