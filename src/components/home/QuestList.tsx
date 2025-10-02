import { useEffect, useMemo } from "react";

import cl from "./styles/QuestList.module.scss";
import { formatDateKey } from "../../utils/date/date";
import { useWaterStore } from "../../store/waterStore";
import clsx from "clsx";

const QuestList = () => {
  const quests = useWaterStore((state) => state.quests);
  const visibleIds = useWaterStore((state) => state.visibleQuestIds);
  const syncDailyQuests = useWaterStore((state) => state.syncDailyQuests);

  useEffect(() => {
    syncDailyQuests();
  }, [syncDailyQuests]);

  const todayKey = useMemo(() => formatDateKey(new Date()), []);

  const visibleQuests = useMemo(
    () =>
      visibleIds
        .map((questId) => quests.find((quest) => quest.id === questId))
        .filter((quest): quest is NonNullable<typeof quest> => Boolean(quest)),
    [quests, visibleIds],
  );

  return (
    <div className={clsx(cl.additional__info__box, cl.wrapper__item)}>
      <div className={cl.additional__info__head__line}>
        <h3>Quest</h3>
        <a href="#">All quests</a>
      </div>
      <ul className={cl.quest__body}>
        {visibleQuests.map((quest) => (
          <li key={quest.id} className={cl.quest__item}>
            <span className={cl.item__quest__text}>{quest.title}</span>
            <div
              className={clsx(
                cl.quest__status,
                quest.completedOn === todayKey && cl.quest__completed,
              )}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestList;