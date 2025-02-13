import { Action, ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { useEffect, useState } from "react";
import { getProjects } from "./lib/api/list-projects";
import { getProjectHierarchy } from "./lib/api/project-hierarchy";
import { Project } from "./lib/types/project";
import { useValidateRequirements } from "./lib/utils/useValidateRequirements";
import ListInboxTasks from "./list-inbox";
import { TaskList } from "./lib/components/tasks-list";

type ProjectWithHerarchy = Project & { hierarchy: string[] };

export default function Command() {
  const { push } = useNavigation();
  const { loading, check, error } = useValidateRequirements();
  const [projects, setProjects] = useState<ProjectWithHerarchy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requirementError, setRequirementError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const pjs = await getProjects();
      // TODO: this could be cached to improve performance
      const hierarchies = await Promise.all(pjs.map((p) => getProjectHierarchy(p)));
      setProjects(
        pjs.map((p, i) => ({
          ...p,
          hierarchy: hierarchies[i],
        })),
      );
    } catch (e) {
      console.log(e);
      setApiError("An error occurred while fetching your projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (check) {
        fetchProjects();
      } else {
        setRequirementError(error);
      }
    }
  }, [loading, check, error]);

  if (requirementError || apiError) {
    return (
      <List>
        <List.EmptyView title={requirementError || apiError!} icon={Icon.Plug} />
      </List>
    );
  }

  return (
    <List isLoading={loading || isLoading}>
      {projects.map((p) => {
        return (
          <List.Item
            title={p.hierarchy.length > 1 ? p.hierarchy.join(" > ") : p.name}
            key={p.id}
            actions={
              <ActionPanel>
                <Action title="Select" onAction={() => push(<TaskList tasks={} />)} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
