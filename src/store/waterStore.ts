import { create } from "zustand";
import type { WaterEntry } from "../types/Water";
import { getRandomQuest } from "../utils/quest/getRandomQuest";
import { getDailyQuests } from "../utils/quest/getDaileQuests";
import { formatDateKey } from "../utils/date/date";
import type { Quest } from "../types/Quest";
import useUserStore from "./userStore";

interface WaterState {
  entries: WaterEntry[];
  dailyGoalMl: number;
  quests: Quest[];
  visibleQuestIds: string[];
  questsGeneratedOn: string;

  addEntry: (amount: number, date?: Date) => void;
  setDailyGoal: (amount: number) => void;
  syncDailyQuests: () => void;
  clearGameData: () => void;
}

const userGameDataStorageKey = import.meta.env.VITE_USER_GAME_DATA;

const sortByTimeDesc = (list: WaterEntry[]) =>
  [...list].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

const syncDaily = (
  entries: WaterEntry[],
  visibleQuestIds: string[],
  questsGeneratedOn: string
) => {
  const today = formatDateKey(new Date());
  const needNew = questsGeneratedOn !== today;

  return {
    quests: getDailyQuests(entries),
    visibleQuestIds: needNew ? getRandomQuest(2) : visibleQuestIds,
    questsGeneratedOn: needNew ? today : questsGeneratedOn,
  };
};

const calculateQuestRewards = (
  previousQuests: Quest[],
  nextQuests: Quest[],
  todayKey: string,
  activeQuestIds: string[],
) => {
  return nextQuests.reduce((total, quest) => {
    if (!activeQuestIds.includes(quest.id)) {
      return total;
    }

    if (quest.completedOn !== todayKey) {
      return total;
    }

    const wasCompleted = previousQuests.some(
      (prevQuest) => prevQuest.id === quest.id && prevQuest.completedOn === todayKey,
    );

    if (wasCompleted) {
      return total;
    }

    const rewardValue = Number.parseInt(quest.reward, 10);
    return Number.isFinite(rewardValue) ? total + rewardValue : total;
  }, 0);
};

const loadStateToLocalStore = () => {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(userGameDataStorageKey);
    return raw ? (JSON.parse(raw) as Partial<WaterState>) : undefined;
  } catch {
    return undefined;
  }
};

const saveStateToLocalStore = (state: Pick<WaterState,
  "entries" | "dailyGoalMl" | "visibleQuestIds" | "questsGeneratedOn">) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(userGameDataStorageKey, JSON.stringify(state));
  } catch {
    console.error("Failed to write state to localStorage");
  }
};

const deleteStateToLocalStore = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(userGameDataStorageKey);
  } catch {
    console.error("Failed to clear state from localStorage");
  }
};

const persisted = loadStateToLocalStore();

const initialEntries: WaterEntry[] = sortByTimeDesc(persisted?.entries ?? []);
const initialDailyGoal = persisted?.dailyGoalMl ?? 3000;
const initialVisible = persisted?.visibleQuestIds ?? getRandomQuest(2);
const initialGeneratedOn = persisted?.questsGeneratedOn ?? formatDateKey(new Date());
const initialQuests = getDailyQuests(initialEntries);

export const useWaterStore = create<WaterState>()((set, get) => ({
  entries: initialEntries,
  dailyGoalMl: initialDailyGoal,

  quests: initialQuests,
  visibleQuestIds: initialVisible,
  questsGeneratedOn: initialGeneratedOn,

  addEntry: (amount: number, date = new Date()) => {
    const entry: WaterEntry = {
      id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      amount,
      timestamp: date.toISOString(),
    };

    const todayKey = formatDateKey(new Date());
    let coinsEarned = 0;
    set((state) => {
      const entries = sortByTimeDesc([entry, ...state.entries]);
      const synced = syncDaily(entries, state.visibleQuestIds, state.questsGeneratedOn);
      coinsEarned = calculateQuestRewards(
        state.quests,
        synced.quests,
        todayKey,
        synced.visibleQuestIds,
      );
      return { entries, ...synced };
    });

    if (coinsEarned > 0) {
      useUserStore.getState().addCoins(coinsEarned);
    }
    saveStateToLocalStore({
      entries: get().entries,
      dailyGoalMl: get().dailyGoalMl,
      visibleQuestIds: get().visibleQuestIds,
      questsGeneratedOn: get().questsGeneratedOn,
    });
  },

  setDailyGoal: (amount: number) => {
    set({ dailyGoalMl: amount });
    saveStateToLocalStore({
      entries: get().entries,
      dailyGoalMl: amount,
      visibleQuestIds: get().visibleQuestIds,
      questsGeneratedOn: get().questsGeneratedOn,
    });
  },

  syncDailyQuests: () => {
    const todayKey = formatDateKey(new Date());
    let coinsEarned = 0;
    set((state) => ({
      ...(() => {
        const synced = syncDaily(state.entries, state.visibleQuestIds, state.questsGeneratedOn);
        coinsEarned = calculateQuestRewards(
          state.quests,
          synced.quests,
          todayKey,
          synced.visibleQuestIds,
        );
        return synced;
      })(),
    }));
    if (coinsEarned > 0) {
      useUserStore.getState().addCoins(coinsEarned);
    }
    saveStateToLocalStore({
      entries: get().entries,
      dailyGoalMl: get().dailyGoalMl,
      visibleQuestIds: get().visibleQuestIds,
      questsGeneratedOn: get().questsGeneratedOn,
    });
  },

  clearGameData: () => {
    deleteStateToLocalStore();
    set({
      entries: [],
      dailyGoalMl: 3000,
      quests: getDailyQuests([]),
      visibleQuestIds: getRandomQuest(2),
      questsGeneratedOn: formatDateKey(new Date()),
    });
  },
}));

(() => {
  const today = formatDateKey(new Date());
  if (useWaterStore.getState().questsGeneratedOn !== today) {
    useWaterStore.getState().syncDailyQuests();
  } else {
    const { entries, dailyGoalMl, visibleQuestIds, questsGeneratedOn } = useWaterStore.getState();
    saveStateToLocalStore({ entries, dailyGoalMl, visibleQuestIds, questsGeneratedOn });
  }
})();

