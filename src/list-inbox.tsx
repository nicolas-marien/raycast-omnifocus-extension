import { useEffect, useState } from "react";
import { OmniFocusTask } from "./lib/types/task";
import { Action, ActionPanel, Icon, List, showToast, Toast } from "@raycast/api";
import { listTasks } from "./lib/api/list-tasks";
import { open } from "@raycast/api";
import { deleteTask } from "./lib/api/delete-task";
import { completeTask } from "./lib/api/complete.task";

export default function ListInboxTasks() {
  const [tasks, setTasks] = useState<OmniFocusTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    setIsLoading(true);
    const newTasks = await listTasks();
    setTasks(newTasks);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <List isLoading={isLoading}>
      {tasks.length === 0 && <List.EmptyView title="No tasks in inbox" />}
      {tasks.length > 0 &&
        tasks.map((t) => {
          const accessories: List.Item.Accessory[] = [];
          if (t.flagged) {
            accessories.push({ icon: Icon.Flag });
          }
          return (
            <List.Item
              key={t.id}
              title={t.name}
              icon={!t.completed ? Icon.Circle : Icon.Checkmark}
              accessories={accessories}
              actions={
                <ActionPanel>
                  <Action title="Open" onAction={() => open(`omnifocus:///task/${t.id}`)} icon={Icon.Eye} />
                  <Action
                    title="Complete"
                    onAction={async () => {
                      await completeTask(t.id);
                      await showToast({
                        title: "Task completed!",
                        style: Toast.Style.Success,
                      });
                      await fetchTasks();
                    }}
                    icon={Icon.CheckCircle}
                  />
                  <Action
                    title="Delete"
                    onAction={async () => {
                      await deleteTask(t.id);
                      await showToast({
                        title: "Task deleted!",
                        style: Toast.Style.Success,
                      });
                      await fetchTasks();
                    }}
                    icon={Icon.Trash}
                  />
                </ActionPanel>
              }
            />
          );
        })}
    </List>
  );
}
