import { useMemo } from "react";

import BottleProgres from "../BottleProgres/BottleProgres";
import cl from "./styles/TodayGoal.module.scss";
import { isSameDay } from "../../utils/date/date";
import { useWaterStore } from "../../store/waterStore";

const formatMlToLiters = (value: number) => {
    const liters = value / 1000;
    return `${Number.isInteger(liters) ? liters : liters.toFixed(1)}L`;
};

const TodayGoal = () => {
    const entries = useWaterStore((state) => state.entries);
    const dailyGoal = useWaterStore((state) => state.dailyGoalMl);
    const addEntry = useWaterStore((state) => state.addEntry);

    const todayIntake = useMemo(() => {
        const today = new Date();
        return entries
            .filter((entry) => isSameDay(new Date(entry.timestamp), today))
            .reduce((sum, entry) => sum + entry.amount, 0);
    }, [entries]);

    const progress = useMemo(() => {
        if (dailyGoal === 0) {
            return 0;
        }

        return Math.min(100, Math.round((todayIntake / dailyGoal) * 100));
    }, [dailyGoal, todayIntake]);

    const handleAddWater = () => {
        addEntry(200);
    };

    return (
        <div className={cl.today__goal__block}>
            <h3>Today Goal</h3>
            <BottleProgres progress={progress} />
            <div className={cl.today__goal__progres}>
                <div className={cl.goal__value__current}>{formatMlToLiters(todayIntake)}</div>
                <span>/</span>
                <div className={cl.goal__value__limit}>{formatMlToLiters(dailyGoal)}</div>
            </div>
            <button className={cl.add__water} type="button" onClick={handleAddWater}>
                add water
            </button>
        </div>
    );
};

export default TodayGoal;