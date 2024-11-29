import { useEffect, useState } from "react";
import { OmniFocusTask } from "./lib/domain/task";
import { List } from "@raycast/api";
import { listTasks } from "./lib/list-tasks";

export default function ListInboxTasks() {
  const [tasks, setTasks] = useState<OmniFocusTask[]>([]);

  useEffect(() => {
    listTasks().then((tasks) => setTasks(tasks));
  });
  return (
    <List>
      {tasks.map((t) => (
        <List.Item key={t.id} title={t.name} />
      ))}
    </List>
  );
}
