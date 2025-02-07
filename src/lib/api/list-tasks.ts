import { OmniFocusTask } from "../types/task";
import { executeScript } from "../utils/executeScript";

type ListTaskOptions =
  | {
      inbox: true;
    }
  | {
      inbox?: false;
      projectId: string;
    };

export async function listTasks(options: ListTaskOptions) {
  return await executeScript<OmniFocusTask[]>(`
const omnifocus = Application("OmniFocus");
const doc = omnifocus.defaultDocument;

const tasks = doc.flattenedTasks();

return tasks.filter(t => {
    return ${options.inbox ? "t.inInbox()" : `t.container().id() === "${options.projectId}"`}
}).reduce((ts, t) => {
  const completed = t.completed();
  const dropped =  t.dropped();
  if (!completed && !dropped) {
    ts.push({
      id: t.id(),
      name: t.name(),
      flagged: t.flagged(),
      deferDate: t.deferDate() ? t.deferDate().toString() : null,
      dueDate: t.dueDate() ? t.dueDate().toString() : null,
      dropped: t.dropped(),
      completed,
      tags: t.tags ? t.tags().map(tt => tt.name()) : []
    });
  }
  return ts;
}, []);
`);
}
