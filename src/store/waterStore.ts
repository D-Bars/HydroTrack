import { create } from "zustand";
import type { WaterEntry, WaterState } from "../types/Water";
import {getRandomQuest} from "../utils/quest/getRandomQuest";
import { getDailyQuests } from "../utils/quest/getDaileQuests";

const initialEntries: WaterEntry[] = [];
const initialQuests = getDailyQuests(initialEntries);

export const useWaterStore = create<WaterState>()((set) => ({
  entries: initialEntries,
  dailyGoalMl: 3000,
  quests: initialQuests,
  visibleQuestIds: getRandomQuest(2),

  addEntry: (amount: number, date = new Date()) => {
    const timestamp = date.toISOString();
    const entry: WaterEntry = {
      id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      amount,
      timestamp,
    };

    set((state) => {
      const entries = [entry, ...state.entries].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      const quests = getDailyQuests(entries);

      return { entries, quests };
    });
  },
}));
