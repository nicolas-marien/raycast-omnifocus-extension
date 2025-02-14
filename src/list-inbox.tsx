import { Icon, List, showToast, Toast } from "@raycast/api";
import { useEffect, useState } from "react";
import { listTasks } from "./lib/api/list-tasks";
import { TaskList } from "./lib/components/task-list";
import { OmniFocusTask } from "./lib/types/task";
import { useValidateRequirements } from "./lib/utils/useValidateRequirements";

export default function ListInboxTasks() {
  const [tasks, setTasks] = useState<OmniFocusTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loading, check, error } = useValidateRequirements();
  const [requirementError, setRequirementError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const fetchTasks = async (initialFetch = false) => {
    setIsLoading(true);
    try {
      const newTasks = await listTasks();
      setTasks(newTasks);
    } catch {
      if (initialFetch) {
        setApiError("An error occurred while getting your inbox tasks.");
      } else {
        await showToast({
          title: "An error occurred while refreshing your inbox tasks.",
          style: Toast.Style.Failure,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (check) {
        fetchTasks(true);
      } else {
        setRequirementError(error);
      }
    }
  }, [loading, check, error]);

  if (requirementError) {
    return (
      <List>
        <List.EmptyView title={requirementError} icon={Icon.Plug} />
      </List>
    );
  }

  if (apiError) {
    return (
      <List>
        <List.EmptyView title={apiError} icon={Icon.SpeechBubbleImportant} />
      </List>
    );
  }

  return <TaskList isLoading={loading || isLoading} tasks={tasks} />;
}
