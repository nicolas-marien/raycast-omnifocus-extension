import { usePromise } from "@raycast/utils";
import { listPerspectiveTasks } from "./lib/api/list-perspectives-tasks";
import { TaskList } from "./lib/components/task-list";
import { List } from "@raycast/api";
import { useState } from "react";
import { listPerspectives } from "./lib/api/list-perspectives";

export default function PerspectivesCommand() {
  const [perspective, setPerspective] = useState<string>();
  const { isLoading: perspectiveLoading, data: perspectives } = usePromise(() => listPerspectives());
  const { isLoading, data, revalidate } = usePromise((name) => listPerspectiveTasks(name), [perspective]);

  if (perspectiveLoading) {
    return <List isLoading />;
  }

  const { customPerspectives, names } = perspectives!;

  const customNames = customPerspectives.map((p) => p.name);
  const builtInNames = names.filter((name) => !customNames.includes(name));

  return (
    <TaskList
      isLoading={isLoading}
      tasks={data}
      title={perspective}
      onTaskUpdated={revalidate}
      isShowingDetail
      searchBarAccessory={
        <List.Dropdown tooltip="Name of the perspective" onChange={setPerspective}>
          <List.Dropdown.Section title="Built-in perspectives">
            {builtInNames.map((n) => (
              <List.Dropdown.Item key={n} title={n} value={n} />
            ))}
          </List.Dropdown.Section>

          <List.Dropdown.Section title="Custom perspectives">
            {perspectives?.customPerspectives.map((p) => (
              <List.Dropdown.Item key={p.id} title={p.name} value={p.name} />
            ))}
          </List.Dropdown.Section>
        </List.Dropdown>
      }
    />
  );
}
