import { OmniFocusTask } from "./domain/task";
import { executeScript } from "./executeScript";
import { CreateOmniFocusTaskOptions } from "./types";
function getCreateTaskAppleScript(projectName: string, options: CreateOmniFocusTaskOptions): string {
  return `
    const omnifocus = Application('OmniFocus');
    const doc = omnifocus.defaultDocument();
	
    const projects = doc.flattenedProjects()
	
	const project = projects.find(p => p.name() === '${projectName}')
    const task = omnifocus.Task(${JSON.stringify(options)})
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
