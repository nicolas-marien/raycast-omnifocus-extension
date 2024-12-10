export type CreateOmniFocusTaskOptions = {
  name: string;
  flagged?: boolean;
  note?: string;
  deferDate?: Date | null;
  dueDate?: Date | null;
  projectName?: string;
  tags: string[];
};
