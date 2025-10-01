import { useMemo } from "react";

import cl from "../../pages/styles/Home.module.scss";
import { formatEntryDayLabel, formatTimeLabel } from "../../utils/date/date";
import { useWaterStore } from "../../store/waterStore";
import clsx from "clsx";


const Entries = () => {
  const entries = useWaterStore((state) => state.entries);

  const latestEntries = useMemo(
    () => entries.slice(0, 3).map((entry) => ({ ...entry })),
    [entries],
  );

  const renderContent = () => {
    if (latestEntries.length === 0) {
      return (
        <li className={cl.water__progress__item}>
          <span className={cl.item__day}>—</span>
          <div className={cl.water__progress__item__wrapper}>
            <span className={cl.item__value}>No entries yet</span>
          </div>
        </li>
      );
    }

    return latestEntries.map((entry) => {
      const entryDate = new Date(entry.timestamp);

      return (
        <li key={entry.id} className={cl.water__progress__item}>
          <span className={cl.item__day}>{formatEntryDayLabel(entryDate)}</span>
          <div className={cl.water__progress__item__wrapper}>
            <span className={cl.item__value}>{`${entry.amount} ml`}</span>
            <span className={cl.item__time}>{formatTimeLabel(entryDate)}</span>
          </div>
        </li>
      );
    });
  };

  return (
    <div className={clsx(cl.additional__info__box, cl.wrapper__item)}>
      <div className={cl.additional__info__head__line}>
        <h3>Entries</h3>
        <a href="#">All entries</a>
      </div>
      <ul className={cl.water__progress__body}>{renderContent()}</ul>
    </div>
  );
};

export default Entries;