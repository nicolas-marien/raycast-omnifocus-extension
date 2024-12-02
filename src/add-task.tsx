import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { CreateOmniFocusTaskOptions } from "./lib/types";
import { FormValidation, useForm } from "@raycast/utils";
import { addTaskToInbox } from "./lib/add-task";

export default function Command() {
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
    </Form>
  );
}
