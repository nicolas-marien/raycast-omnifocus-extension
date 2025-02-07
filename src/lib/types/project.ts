import { type Folder } from "./folder";

export type Project = {
  id: string;
  name: string;
  status: "active status" | "on hold status" | "done staus" | "dropped status";
  sequential: boolean;
  singletonActionHolder: boolean;
  flagged: boolean;
  nextReviewDate: Date | null;
  folder: Folder | null;
};
