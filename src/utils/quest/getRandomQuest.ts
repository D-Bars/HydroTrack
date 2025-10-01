import { questTemplates } from "../../templatesArray/questTemplates";

export const getRandomQuest = (count: number): string[] => {
  const ids = questTemplates.map((q) => q.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.slice(0, Math.min(count, ids.length));
};