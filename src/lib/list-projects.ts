import { Project } from "./domain/project";
import { executeScript } from "./executeScript";

export async function getProjects(): Promise<Project[]> {
  const projects: Project[] = await executeScript(`
 const omnifocus = Application('OmniFocus');
    const doc = omnifocus.defaultDocument();
    
    // Get all projects and filter for not completed ones
    const projects = doc.flattenedProjects()
        .map(project => ({
            id: project.id(),
            name: project.name(),
            status: project.status(),
        }));
    
    return projects;
`);

  return projects.filter((p) => p.status === "active status").sort((p1, p2) => p1.name.localeCompare(p2.name));
}
