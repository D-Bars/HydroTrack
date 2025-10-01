import { useMemo } from "react";

import cl from "./styles/CalendarWeek.module.scss";
import { getCurrentWeek } from "../../utils/date/date";
import clsx from "clsx";

const CalendarWeek = () => {
  const week = useMemo(() => getCurrentWeek(), []);

  return (
    <div className={clsx(cl.additional__info__box, cl.wrapper__item)}>
      <div className={cl.additional__info__head__line}>
        <h3>Calendar</h3>
        <a href="#">View calendar</a>
      </div>
      <ul className={cl.calendar__body}>
        {week.map((day) => (
          <li
            key={day.date.toISOString()}
            className={clsx(cl.calendar__item, day.isToday && cl.calendar__item__active)}
          >
            <span className={cl.item__day__week}>{day.dayLabel}</span>
            <span className={cl.item__day__month}>{day.dayNumber}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarWeek;