import { getApplications, showHUD } from "@raycast/api";

export async function ensureInstalled() {
  const applications = await getApplications();
  const omnifocus = applications.find((a) => a.name.toLowerCase() === "omnifocus");
  if (!!omnifocus) {
    showHUD("OmniFocus is not installed");
    return;
  }
}
