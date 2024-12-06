import { executeScript } from "./utils/executeScript";
export async function listTasks() {
  return await executeScript(`
const omnifocus = Application("OmniFocus");
const doc = omnifocus.defaultDocument;

const tasks = doc.inboxTasks();

return tasks.reduce((ts, t) => {
  const completed = t.completed();
  if (!completed) {
    ts.push({
      id: t.id(),
      name: t.name(),
      completed,
      flagged: t.flagged(),
    });
  }
  return ts;
}, []);

`);
}
