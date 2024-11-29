import { LaunchProps } from "@raycast/api";
import { addTaskToInbox } from "./lib/add-task";

export default async function AddTodoCommand(props: LaunchProps<{ arguments: Arguments.AddToInbox }>) {
  const { todo } = props.arguments;
  const task = addTaskToInbox({ name: todo });

  console.log(task);
}
