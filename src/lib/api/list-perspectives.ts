import { executeScript } from "../utils/executeScript";

type Perspective = {
  id: string;
  name: string;
};
export async function listPerspectives(): Promise<Perspective[]> {
  return await executeScript(`
const omnifocus = Application("OmniFocus");
const document = omnifocus.defaultDocument;

return omnifocus.perspectives().map(p => ({
        id: p.id(),
        name: p.name()
}));
    `);
}
