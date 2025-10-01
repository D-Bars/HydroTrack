import { create } from "zustand";
import type { Gender } from "../types/Gender";

interface UserState {
    nickname: string;
    age?: number;
    weight?: number;
    gender: Gender;
    isRegistered: boolean;

    setUser:
    (payload: {
        nickname: string;
        gender: Gender;
        age?: number;
        weight?: number;
    }) => void;
    resetUser: () => void;
}

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;

const loadUser = (): Omit<UserState, "setUser" | "resetUser"> => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            return {
                nickname: "",
                age: undefined,
                weight: undefined,
                gender: '',
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
            isRegistered: false,
        };
    }
};

export const useUserStore = create<UserState>((set) => ({
    ...loadUser(),

    setUser: ({ nickname, gender, age, weight }) => {
        const newState = {
            nickname,
            gender,
            age,
            weight,
            isRegistered: true,
        };
        set(newState);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    },

    resetUser: () => {
        const resetState = {
            nickname: "",
            age: undefined,
            weight: undefined,
            gender: '' as Gender,
            isRegistered: false,
        };
        set(resetState);
        localStorage.removeItem(STORAGE_KEY);
    },
}));
export default useUserStore;