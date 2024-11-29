import { executeScript } from "./executeScript";
export async function listTasks() {
  return await executeScript(`
 const omnifocus = Application('OmniFocus');
    const doc = omnifocus.defaultDocument;
    const tasks = doc.inboxTasks();
    
    return tasks.map(task => ({
        id: task.id(),
        name: task.name(),
        completed: task.completed(),
        flagged: task.flagged()
    }));
`);
}
