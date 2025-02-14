import { Action, ActionPanel, Color, Icon, Keyboard, List, showToast, Toast } from "@raycast/api";
import { OmniFocusTask } from "../types/task";
import { completeTask } from "../api/complete.task";
import { deleteTask } from "../api/delete-task";

export type TaskListProps = {
  isLoading: boolean;
  tasks?: OmniFocusTask[];
  title?: string;
  onTaskUpdated?: () => unknown;
  accessories?: List.Props["searchBarAccessory"];
};

function getAccessories(task: OmniFocusTask): List.Item.Accessory[] {
  const accessories: List.Item.Accessory[] = [];
  if (task.flagged) {
    accessories.push({ icon: Icon.Flag });
  }

  if (task.deferDate) {
    accessories.push({ tag: { value: new Date(task.deferDate), color: Color.SecondaryText }, tooltip: "Defer until" });
  }

  if (task.dueDate) {
    accessories.push({ tag: { value: new Date(task.dueDate), color: Color.Orange }, tooltip: "Due" });
  }

  if (task.tags.length) {
    const tagsToShow = task.tags.slice(0, 3);
    const hasMoreTags = task.tags.length > 3;

    accessories.push(
      ...tagsToShow.map((t) => ({
        tag: t,
      })),
    );

    if (hasMoreTags) {
      accessories.push({
        tag: "...",
        tooltip: "More tags are associated with this task.",
      });
    }
  }

  return accessories;
}

export const TaskList: React.FunctionComponent<TaskListProps> = ({
  isLoading,
  tasks,
  title,
  onTaskUpdated,
  accessories,
}) => {
  async function actionDelete(id: string) {
    try {
      await deleteTask(id);
      await showToast({
        title: "Task deleted!",
        style: Toast.Style.Success,
      });
      await onTaskUpdated?.();
    } catch {
      await showToast({
        title: "An error occurred while deleting the task.",
        style: Toast.Style.Failure,
      });
    }
  }

  async function actionComplete(id: string) {
    try {
      await completeTask(id);
      await showToast({
        title: "Task completed!",
        style: Toast.Style.Success,
      });
      await onTaskUpdated?.();
    } catch {
      await showToast({
        title: "An error occurred while completing the task.",
        style: Toast.Style.Failure,
      });
    }
  }
  return (
    <List isLoading={isLoading} navigationTitle={title} searchBarAccessory={accessories}>
      {tasks?.length === 0 && <List.EmptyView title="No tasks in inbox" />}
      {tasks?.length &&
        tasks?.map((t) => {
          return (
            <List.Item
              key={t.id}
              title={t.name}
              icon={!t.completed ? Icon.Circle : Icon.Checkmark}
              accessories={getAccessories(t)}
              actions={
                <ActionPanel>
                  <Action title="Open" onAction={() => open(`omnifocus:///task/${t.id}`)} icon={Icon.Eye} />
                  <Action
                    title="Complete"
                    onAction={async () => {
                      await actionComplete(t.id);
                    }}
                    icon={Icon.CheckCircle}
                  />
                  <Action
                    title="Delete"
                    style={Action.Style.Destructive}
                    onAction={async () => {
                      await actionDelete(t.id);
                    }}
                    icon={Icon.Trash}
                    shortcut={Keyboard.Shortcut.Common.Remove}
                  />
                </ActionPanel>
              }
            />
          );
        })}
    </List>
  );
};
