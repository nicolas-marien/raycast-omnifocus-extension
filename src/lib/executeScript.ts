import { runAppleScript } from "@raycast/utils";

export async function executeScript<Return = any>(source: string) {
  const result = await runAppleScript<Return>(`(function(){${source}})()`, {
    humanReadableOutput: false,
    language: "JavaScript",
  });
  return JSON.parse(result);
}
