import { Project } from "./project";

export type OmniFocusTask = {
  id: string;
  name: string;
  completed: boolean;
  flagged: boolean;
  project?: Project;
  note?: string;
};
