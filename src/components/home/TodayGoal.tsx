import { useMemo, useState } from "react";

import BottleProgres from "../BottleProgres/BottleProgres";
import cl from "./styles/TodayGoal.module.scss";
import { isSameDay } from "../../utils/date/date";
import { useWaterStore } from "../../store/waterStore";

const formatMlToLiters = (value: number) => {
  const liters = value / 1000;
  return `${Number.isInteger(liters) ? liters : Number(liters.toFixed(2))}L`;
};

type TodayGoalProps = {
    onWaterIntake?: () => void;
    isAnimating?: boolean;
};

const standardAmounts = [150, 200, 250, 300, 350, 400];

const TodayGoal = ({ onWaterIntake, isAnimating = false }: TodayGoalProps) => {
    const entries = useWaterStore((state) => state.entries);
    const dailyGoal = useWaterStore((state) => state.dailyGoalMl);
    const addEntry = useWaterStore((state) => state.addEntry);

    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState<number>(standardAmounts[1]);
    const [customAmount, setCustomAmount] = useState("");

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

    const isAmountValid = useMemo(() => {
        if (customAmount.trim()) {
            const parsed = Number(customAmount);
            return Number.isFinite(parsed) && parsed > 0;
        }

        return Number.isFinite(selectedAmount) && selectedAmount > 0;
    }, [customAmount, selectedAmount]);

    const handleAddWater = () => {
        setIsSelectorOpen((prev) => !prev);
    };

    const handleConfirm = () => {
        const amount = customAmount.trim() ? Number(customAmount) : selectedAmount;

        if (!Number.isFinite(amount) || amount <= 0) {
            return;
        }

        addEntry(amount);
        onWaterIntake?.();
        setIsSelectorOpen(false);
        setCustomAmount("");
        if (!customAmount.trim() && standardAmounts.includes(amount)) {
            setSelectedAmount(amount);
        } else {
            setSelectedAmount(standardAmounts[1]);
        }
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
            <div className={cl.add__water__wrapper}>
                <button
                    className={cl.add__water}
                    type="button"
                    onClick={handleAddWater}
                >
                    add water
                </button>
                {isSelectorOpen && (
                    <div className={cl.add__water__panel}>
                        <span className={cl.add__water__panelTitle}>Select amount</span>
                        <div className={cl.add__water__options}>
                            {standardAmounts.map((amount) => (
                                <button
                                    key={amount}
                                    type="button"
                                    className={
                                        amount === selectedAmount && !customAmount
                                            ? cl.add__water__option_selected
                                            : cl.add__water__option
                                    }
                                    onClick={() => {
                                        setSelectedAmount(amount);
                                        setCustomAmount("");
                                    }}
                                >
                                    {amount} ml
                                </button>
                            ))}
                        </div>
                        <label className={cl.add__water__custom}>
                            <span>Your amount (ml)</span>
                            <input
                                type="text"
                                value={customAmount}
                                name="qty__water"
                                onChange={(event) =>
                                    setCustomAmount(event.target.value.replace(/[^0-9]/g, ""))
                                }
                                placeholder="Enter value"
                            />
                        </label>
                        <button
                            type="button"
                            className={cl.add__water__confirm}
                            onClick={handleConfirm}
                            disabled={!isAmountValid || isAnimating}
                        >
                            Add
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodayGoal;