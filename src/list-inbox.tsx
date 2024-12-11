import { useEffect, useState } from "react";
import { OmniFocusTask } from "./lib/types/task";
import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { listTasks } from "./lib/api/list-tasks";
import { open } from "@raycast/api";
import { deleteTask } from "./lib/api/delete-task";
import { completeTask } from "./lib/api/complete.task";

export default function ListInboxTasks() {
  const [tasks, setTasks] = useState<OmniFocusTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    listTasks().then((tasks) => {
      setTasks(tasks);
      setIsLoading(false);
    });
  }, []);

  return (
    <List isLoading={isLoading}>
      {tasks.map((t) => (
        <List.Item
          key={t.id}
          title={t.name}
          icon={t.flagged ? Icon.Flag : undefined}
          actions={
            <ActionPanel>
              <Action title="Open" onAction={() => open(`omnifocus:///task/${t.id}`)} icon={Icon.Eye} />
              <Action title="Complete" onAction={() => completeTask(t.id)} icon={Icon.CheckCircle} />
              <Action title="Delete" onAction={() => deleteTask(t.id)} icon={Icon.Trash} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
