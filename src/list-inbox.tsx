import { Icon, List } from "@raycast/api";
import { TaskList } from "./lib/components/tasks-list";
import { useTasks } from "./lib/hooks/useTaskFetching";

export default function ListInboxTasks() {
  const { tasks, error, isLoading: loading, requirementsError, fetchTasks } = useTasks({ inbox: true });

  if (requirementsError) {
    return (
      <List>
        <List.EmptyView title={requirementsError} icon={Icon.Plug} />
      </List>
    );
  }

  if (error) {
    return (
      <List>
        <List.EmptyView title={error} icon={Icon.SpeechBubbleImportant} />
      </List>
    );
  }

  return <TaskList loading={loading} tasks={tasks} fetchTasks={fetchTasks} />;
}
