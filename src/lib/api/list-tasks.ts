import { OmniFocusTask } from "../types/task";
import { executeScript } from "../utils/executeScript";
export async function listTasks() {
  return await executeScript<OmniFocusTask[]>(`
const omnifocus = Application("OmniFocus");
const doc = omnifocus.defaultDocument;

const tasks = doc.inboxTasks();

return tasks.reduce((ts, t) => {
  const completed = t.completed();
  if (!completed) {
    ts.push({
      id: t.id(),
      name: t.name(),
      flagged: t.flagged(),
    });
  }
  return ts;
}, []);
`);
}
