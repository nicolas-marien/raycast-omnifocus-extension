export type CreateOmniFocusTaskOptions = {
  name: string;
  flagged?: boolean;
  note?: string;
  deferDate?: Date;
  dueDate?: Date;
  projectName?: string;
  tags: string[];
};
