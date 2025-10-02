import { create } from "zustand";
import type { Gender } from "../types/Gender";

interface UserState {
    nickname: string;
    age?: number;
    weight?: number;
    gender: Gender;
    recommendedWaterMl?: number;
    isRegistered: boolean;

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

const loadUser = (): Omit<UserState, "setUser" | "resetUser" | "updateUser"> => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            return {
                nickname: "",
                age: undefined,
                weight: undefined,
                gender: '',
                recommendedWaterMl: undefined,
                isRegistered: false,
            };
        }
        return JSON.parse(data);
    } catch {
        return {
            nickname: "",
            age: undefined,
            weight: undefined,
            gender: '',
            recommendedWaterMl: undefined,
            isRegistered: false,
        };
    }
};

export const useUserStore = create<UserState>((set) => ({
    ...loadUser(),

    setUser: ({ nickname, gender, age, weight, recommendedWaterMl }) => {
        const newState = {
            nickname,
            gender,
            age,
            weight,
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
            const { nickname, age, weight, gender, recommendedWaterMl, isRegistered } = newState;
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    nickname,
                    age,
                    weight,
                    gender,
                    recommendedWaterMl,
                    isRegistered,
                }),
            );
            return newState;
        });
    },

    resetUser: () => {
        const resetState = {
            nickname: "",
            age: undefined,
            weight: undefined,
            gender: '' as Gender,
            recommendedWaterMl: undefined,
            isRegistered: false,
        };
        set(resetState);
        localStorage.removeItem(STORAGE_KEY);
    },
}));
export default useUserStore;