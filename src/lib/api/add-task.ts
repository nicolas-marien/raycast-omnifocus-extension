import { open } from "@raycast/api";
import { type CreateOmniFocusTaskOptions } from "../types/task";

type OmniFocusAddQueryParams = {
  /** The name of the task (required) */
  name: string;

  /** Optional note for the task */
  note?: string;

  /** Base64 encoded file attachment */
  attachment?: string;

  /** Whether the task is parallel (true) or sequential (false) */
  parallel?: "true" | "false";

  /** Whether the task is flagged */
  flag?: "true" | "false";

  /** Defer date and time (e.g., "jun 25 8am") */
  defer?: string;

  /** Due date and time (e.g., "jun 25 8am") */
  due?: string;

  /** Project name (case-insensitive match) */
  project?: string;

  /** Context/tag name (case-insensitive match) */
  context?: string;

  /** Whether children mark project as complete */
  autocomplete?: "true" | "false";

  /** Estimated duration (e.g., "30m" for 30 minutes) */
  estimate?: string;

  /** Whether to reveal the new item after creation */
  "reveal-new-item"?: "true" | "false";

  /** Repeat rule format */
  "repeat-rule"?: string;

  /** Repeat method: "fixed", "start-after-completion", or "due-after-completion" */
  "repeat-method"?: "fixed" | "start-after-completion" | "due-after-completion";

  /** Completion date and time (e.g., "jun 25 6pm") */
  completed?: string;

  /** Whether to create the task silently without showing the quick entry panel */
  autosave?: "true" | "false";
};

const BASE_URL = "omnifocus://x-callback-url/add?";
export async function addTask(options: CreateOmniFocusTaskOptions) {
  const construct: OmniFocusAddQueryParams = {
    name: encodeURIComponent(options.name),
    autosave: "true",
    "reveal-new-item": "false",
  };

  if (options.note) {
    construct.note = encodeURIComponent(options.note);
  }
  if (options.flagged) {
    construct.flag = "true";
  }

  if (options.deferDate) {
    construct.defer = encodeURIComponent(options.deferDate.toISOString());
  }

  if (options.dueDate) {
    construct.due = encodeURIComponent(options.dueDate.toISOString());
  }

  if (options.projectName) {
    construct.project = encodeURIComponent(options.projectName);
  }

  if (options.tags) {
    construct.context = options.tags.join(",");
  }

  const params = Object.entries(construct).reduce((acc, current) => {
    return `${acc}&${current.join("=")}`;
  }, "");

  const url = BASE_URL + params;

  await open(url);
}
