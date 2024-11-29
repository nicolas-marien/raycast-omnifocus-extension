import { runAppleScript } from "@raycast/utils";

export async function executeScript(source: string) {
  const result = await runAppleScript(`(function(){${source}})()`, {
    humanReadableOutput: false,
    language: "JavaScript",
  });
  return JSON.parse(result);
}
