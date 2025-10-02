export const calculateDailyWaterNorm = (weightKg?: number): number | undefined => {
    if (!weightKg || !Number.isFinite(weightKg) || weightKg <= 0) {
        return undefined;
    }

    return Math.round(weightKg * 30);
};

export default calculateDailyWaterNorm;