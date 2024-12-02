import { LaunchProps, showToast, Toast } from "@raycast/api";
import { addTaskToInbox } from "./lib/add-task";

export default async function AddTodoCommand(props: LaunchProps<{ arguments: Arguments.QuickAddToInbox }>) {
  const { todo } = props.arguments;
  await addTaskToInbox({ name: todo });
  await showToast({
    title: "Task created!",
    style: Toast.Style.Success,
  });
}
