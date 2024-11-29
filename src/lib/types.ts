import { OmniFocusTask } from "./domain/task";

export type CreateOmniFocusTaskOptions = Required<Pick<OmniFocusTask, "name">> &
  Partial<Omit<OmniFocusTask, "id" | "name">>;
