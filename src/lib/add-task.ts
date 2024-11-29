import { OmniFocusTask } from "./domain/task";
import { CreateOmniFocusTaskOptions } from "./types";
import { runAppleScript } from "@raycast/utils";

export function getCreateTaskAppleScript(name: string) {
  return `
tell application "OmniFocus"
    tell default document
        make new inbox task with properties {name:"${name}"}
    end tell
end tell
`;
}

function extractIdFromAppleScriptResponse(response: string): string {
  const extractor = /task id ([^\s]+)/;
  const match = response.match(extractor);

  if (!match) {
    throw new Error("cannot extract id from AppleScript response");
  }

  const [, id] = match;
  return id;
}
export async function addTaskToInbox(options: CreateOmniFocusTaskOptions): Promise<OmniFocusTask> {
  const { name } = options;
  const result = await runAppleScript(getCreateTaskAppleScript(name));
  const id = extractIdFromAppleScriptResponse(result);
  return new OmniFocusTask(id, name, false, false);
}
