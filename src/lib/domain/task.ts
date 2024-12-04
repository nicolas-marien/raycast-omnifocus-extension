export type OmniFocusTask = {
  id: string;
  name: string;
  completed: boolean;
  flagged: boolean;
  note?: string;
  deferDate?: Date;
  dueDate?: Date;
};
