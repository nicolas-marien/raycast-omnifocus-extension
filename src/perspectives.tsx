import { usePromise } from "@raycast/utils";
import { listPerspectiveTasks } from "./lib/api/list-perspectives-tasks";
import { TaskList } from "./lib/components/task-list";

export default function PerspectivesCommand() {
  const { isLoading, data, revalidate } = usePromise(() => listPerspectiveTasks("Could do"));
  return <TaskList isLoading={isLoading} tasks={data} title="Could do" onTaskUpdated={revalidate} />;
}
