import { type Project } from "../types/project";
import { executeScript } from "../utils/executeScript";

export async function getProjects(): Promise<Project[]> {
  const projects = await executeScript<Project[]>(`
const omnifocus = Application('OmniFocus');
const doc = omnifocus.defaultDocument();

    const projects = doc.flattenedProjects()
        .filter(p => !p.effectivelyDropped())
        .map(project => ({
            id: project.id(),
            name: project.name(),
            status: project.status(),
            sequential: project.sequential(),
            singletonActionHolder: project.singletonActionHolder(),
            flagged: project.flagged(),
            nextReviewDate: project.nextReviewDate ? project.nextReviewDate().toString() : null
        }));

    return projects;
`);

  return projects.filter((p) => p.status === "active status").sort((p1, p2) => p1.name.localeCompare(p2.name));
}
