import { questTemplates } from "../../templatesArray/questTemplates";
import type { WaterEntry } from "../../types/Water";
import type { Quest } from "../../types/Quest";
import { formatDateKey } from "../date/date";

export const getDailyQuests = (entries: WaterEntry[]): Quest[] => {
  const todayKey = formatDateKey(new Date());
  const todaysIntake = entries
    .filter((e) => formatDateKey(new Date(e.timestamp)) === todayKey)
    .reduce((sum, e) => sum + e.amount, 0);

  return questTemplates.map((quest) => {
    if (quest.id === "drink-200" && todaysIntake >= 200) {
      return { ...quest, completedOn: todayKey };
    }
    if (quest.id === "no-skip" && todaysIntake > 0) {
      return { ...quest, completedOn: todayKey };
    }
    if (quest.id === "on-fire" && todaysIntake >= 400) {
      return { ...quest, completedOn: todayKey };
    }
    return { ...quest };
  });
};