import type { WaterEntry } from "../../types/Water";
import { formatDateKey } from "../date/date";

export const calculateDailyIntake = (
  entries: WaterEntry[],
  date: Date
): number => {
  const dateKey = formatDateKey(date);
  return entries
    .filter((item) => formatDateKey(new Date(item.timestamp)) === dateKey)
    .reduce((sum, item) => sum + item.amount, 0);
};
