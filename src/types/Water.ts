import type { Quest } from "./Quest";

export interface WaterEntry {
  id: string;
  amount: number;
  timestamp: string;
}

export interface WaterState {
  entries: WaterEntry[];
  dailyGoalMl: number;
  quests: Quest[];
  visibleQuestIds: string[];
  addEntry: (amount: number, date?: Date) => void;
}