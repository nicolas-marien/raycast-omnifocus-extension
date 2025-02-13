import { showToast, Toast } from "@raycast/api";
import { useState, useEffect } from "react";
import { type ListTaskOptions, listTasks } from "../api/list-tasks";
import { OmniFocusTask } from "../types/task";
import { useValidateRequirements } from "../utils/useValidateRequirements";

export function useTasks(options: ListTaskOptions) {
  const [tasks, setTasks] = useState<OmniFocusTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loading: requirementsLoading, check, error: requirementsError } = useValidateRequirements();
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async (initialFetch = false) => {
    setIsLoading(true);
    try {
      const newTasks = await listTasks(options);
      setTasks(newTasks);
      setError(null);
    } catch {
      if (initialFetch) {
        setError("An error occurred while getting your tasks.");
      } else {
        await showToast({
          title: "An error occurred while refreshing your tasks.",
          style: Toast.Style.Failure,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!requirementsLoading) {
      if (check) {
        fetchTasks(true);
      } else {
        setError(requirementsError);
      }
    }
  }, [requirementsLoading, check, requirementsError]);

  return {
    tasks,
    isLoading: requirementsLoading || isLoading,
    error,
    fetchTasks,
    requirementsOK: check,
    requirementsError,
  };
}
