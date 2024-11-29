import { runAppleScript } from "run-applescript";
import { LaunchProps } from "@raycast/api";

function getCreateTodoCommand(todo: string) {
  return `
tell application "OmniFocus"
    tell default document
        make new inbox task with properties {name:"${todo}"}
    end tell
end tell
`;
}

export default async function AddTodoCommand(props: LaunchProps<{ arguments: Arguments.AddToInbox }>) {
  const { todo } = props.arguments;
  const result = await runAppleScript(getCreateTodoCommand(todo));
  console.log(result);
}
