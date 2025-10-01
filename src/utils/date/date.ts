const MILLISECONDS_IN_DAY = 86_400_000;

export const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const isSameDay = (left: Date, right: Date) =>
    formatDateKey(left) === formatDateKey(right);

export const isYesterday = (date: Date, base: Date = new Date()) => {
    const yesterday = new Date(base.getTime() - MILLISECONDS_IN_DAY);
    return isSameDay(date, yesterday);
};

export const formatEntryDayLabel = (date: Date, base: Date = new Date()) => {
    if (isSameDay(date, base)) {
        return "Today";
    }

    if (isYesterday(date, base)) {
        return "Yesterday";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    }).format(date);
};

export const formatTimeLabel = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date);

export const getCurrentWeek = (base: Date = new Date()) => {
    const start = new Date(base);
    const day = start.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    start.setDate(start.getDate() + diff);
    start.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, index) => {
        const current = new Date(start);
        current.setDate(start.getDate() + index);

        return {
            date: current,
            dayLabel: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
                current,
            ),
            dayNumber: current.getDate(),
            isToday: isSameDay(current, base),
        };
    });
};