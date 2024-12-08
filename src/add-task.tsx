import { Action, ActionPanel, Form, Icon, showToast, Toast } from "@raycast/api";
import { CreateOmniFocusTaskOptions } from "./lib/types";
import { FormValidation, useForm } from "@raycast/utils";
import { useEffect, useRef, useState } from "react";
import { Project } from "./lib/domain/project";
import { getProjects } from "./lib/list-projects";
import { addTask } from "./lib/add-task";
import { listTags } from "./lib/list-tags";

interface FormValues extends CreateOmniFocusTaskOptions {
  projectName?: string;
  tags: string[];
}
export default function Command() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const { handleSubmit, itemProps } = useForm<FormValues>({
    initialValues: {
      deferDate: undefined,
      dueDate: undefined,
      projectName: undefined,
      tags: [],
    },
    async onSubmit(values) {
      await addTask(values);
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
    Promise.all([getProjects(), listTags()]).then(([p, t]) => {
      setProjects(p);
      setTags(t);
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
      <Form.TextField title="Name" placeholder="Walk the cat" {...itemProps.name} autoFocus />
      <Form.Checkbox title="Flagged" label="Flagged" {...itemProps.flagged} />
      <Form.Separator />
      <Form.DatePicker title="Defer Date" {...itemProps.deferDate} id="deferDate" type={Form.DatePicker.Type.Date} />
      <Form.DatePicker title="Due Date" {...itemProps.dueDate} id="dueDate" type={Form.DatePicker.Type.Date} />
      <Form.Separator />
      <Form.TagPicker title="Tags" {...itemProps.tags}>
        {tags.map((tag) => (
          <Form.TagPicker.Item key={tag} value={tag} title={tag} icon={{ source: Icon.Tag }} />
        ))}
      </Form.TagPicker>
      <Form.Dropdown title="Projects" {...itemProps.projectName} id="projectName">
        <Form.Dropdown.Item value="" title="No Project (Inbox)" />
        {projects.map((p) => (
          <Form.Dropdown.Item key={p.id} value={p.name} title={p.name} />
        ))}
      </Form.Dropdown>
      <Form.Separator />
      <Form.TextArea title="Note" {...itemProps.note} />
    </Form>
  );
}
