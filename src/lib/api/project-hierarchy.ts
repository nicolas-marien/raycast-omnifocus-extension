import { type Project } from "../types/project";
import { executeScript } from "../utils/executeScript";

export async function getProjectHierarchy(project: Project): Promise<string[]> {
  return await executeScript<string[]>(`
const omnifocus = Application("OmniFocus");
const document = omnifocus.defaultDocument();

const project = document.flattenedProjects.byId("${project.id}");

if (!project) {
    return [];
}

let container = project.container();
const hierarchy = [project.name()];

while(container && container.name() !== "OmniFocus") {
   hierarchy.unshift(container.name());
   container = container.container();
}

return hierarchy;
`);
}
