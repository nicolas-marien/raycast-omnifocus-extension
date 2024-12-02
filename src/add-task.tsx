import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { CreateOmniFocusTaskOptions } from "./lib/types";
import { FormValidation, useForm } from "@raycast/utils";
import { addTaskToInbox } from "./lib/add-task";
import { useEffect, useState } from "react";
import { Project } from "./lib/domain/project";
import { getProjects } from "./lib/list-projects";

export default function Command() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { handleSubmit, itemProps } = useForm<CreateOmniFocusTaskOptions>({
    async onSubmit(values) {
      await addTaskToInbox(values);
      await showToast({
        style: Toast.Style.Success,
        title: "Task added!",
      });
    },
    validation: {
      name: FormValidation.Required,
    },
  });

  useEffect(() => {
    getProjects().then((p) => {
      console.log(p);
      setProjects(p);
    });
  }, []);
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField title="Name" placeholder="Walk the cat" {...itemProps.name} />
      <Form.Checkbox title="Flagged" label="Flagged" {...itemProps.flagged} />
      <Form.TextArea title="Note" {...itemProps.note} />
      <Form.Dropdown title="Projects" id="projects">
        {projects.map((p) => (
          <Form.Dropdown.Item key={p.id} value={p.name} title={p.name} />
        ))}
      </Form.Dropdown>
    </Form>
  );
}
