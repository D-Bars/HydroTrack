import { create } from "zustand";
import type { Gender } from "../types/Gender";

interface UserState {
    nickname: string;
    age?: number;
    weight?: number;
    gender: Gender;
    coins: number;
    recommendedWaterMl?: number;
    isRegistered: boolean;

    addCoins: (amount: number) => void;
    setUser:
    (payload: {
        nickname: string;
        gender: Gender;
        age?: number;
        weight?: number;
        recommendedWaterMl?: number;
    }) => void;
    updateUser: (
        payload: Partial<
            Pick<UserState, "nickname" | "age" | "weight" | "gender" | "recommendedWaterMl">
        >,
    ) => void;
    resetUser: () => void;
}

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;

const defaultUserState: Omit<UserState, "setUser" | "resetUser" | "updateUser" | "addCoins"> = {
    nickname: "",
    age: undefined,
    weight: undefined,
    gender: '' as Gender,
    recommendedWaterMl: undefined,
    isRegistered: false,
    coins: 0,
};

const loadUser = (): Omit<UserState, "setUser" | "resetUser" | "updateUser" | "addCoins"> => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            return { ...defaultUserState };
        }
        const parsed = JSON.parse(data);
        return { ...defaultUserState, ...parsed };
    } catch {
        return { ...defaultUserState };
    }
};

export const useUserStore = create<UserState>((set) => ({
    ...loadUser(),

    addCoins: (amount) => {
        if (amount <= 0) {
            return;
        }

        set((state) => {
            const coins = state.coins + amount;
            const nextState = { ...state, coins };
            const { nickname, age, weight, gender, recommendedWaterMl, isRegistered } = nextState;

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    nickname,
                    age,
                    weight,
                    gender,
                    recommendedWaterMl,
                    isRegistered,
                    coins,
                }),
            );

            return nextState;
        });
    },

    setUser: ({ nickname, gender, age, weight, recommendedWaterMl }) => {
        const newState = {
            nickname,
            gender,
            age,
            weight,
            coins: 0,
            recommendedWaterMl,
            isRegistered: true,
        };
        set(newState);
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                ...newState,
            }),
        );
    },

    updateUser: (payload) => {
        set((state) => {
            const newState = { ...state, ...payload };
            const { nickname, age, weight, gender, recommendedWaterMl, isRegistered, coins } =
                newState;
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    nickname,
                    age,
                    weight,
                    gender,
                    coins,
                    recommendedWaterMl,
                    isRegistered,
                }),
            );
            return newState;
        });
    },

    resetUser: () => {
        const resetState = { ...defaultUserState };
        set(resetState);
        localStorage.removeItem(STORAGE_KEY);
    },
}));
export default useUserStore;