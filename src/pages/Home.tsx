import cl from "./styles/Home.module.scss";
import CalendarWeek from "../components/home/CalendarWeek";
import Entries from "../components/home/Entries";
import QuestList from "../components/home/QuestList";
import TodayGoal from "../components/home/TodayGoal";
import clsx from "clsx";
import useUserStore from "../store/userStore";
import { getMainAvatarArray } from "../utils/avatar/getMainAvatarArray";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const Home = () => {
  const gender = useUserStore((state) => state.gender);
  const avatarSet = useMemo(() => getMainAvatarArray(gender), [gender]);
  const [currentAvatar, setCurrentAvatar] = useState(avatarSet?.default ?? "");
  const [isAvatarAnimating, setIsAvatarAnimating] = useState(false);
  const animationTimeouts = useRef<number[]>([]);

  useEffect(() => {
    animationTimeouts.current.forEach((timeoutId) => clearTimeout(timeoutId));
    animationTimeouts.current = [];
    setIsAvatarAnimating(false);
    setCurrentAvatar(avatarSet?.default ?? "");
  }, [avatarSet]);

  useEffect(() => () => {
    animationTimeouts.current.forEach((timeoutId) => clearTimeout(timeoutId));
    animationTimeouts.current = [];
  }, []);

  const handleWaterIntakeAnimation = useCallback(() => {
    if (!avatarSet) {
      return;
    }

    animationTimeouts.current.forEach((timeoutId) => clearTimeout(timeoutId));
    animationTimeouts.current = [];

    setIsAvatarAnimating(true);
    setCurrentAvatar(avatarSet.drinking);

    const happyTimeout = window.setTimeout(() => {
      setCurrentAvatar(avatarSet.happy);

      const resetTimeout = window.setTimeout(() => {
        setCurrentAvatar(avatarSet.default);
        setIsAvatarAnimating(false);
      }, 600);

      animationTimeouts.current.push(resetTimeout);
    }, 600);

    animationTimeouts.current.push(happyTimeout);
  }, [avatarSet]);

  return (
    <div className={cl.home__block}>
      <div className={cl.additional__info__block}>
        <Entries />
        <CalendarWeek />
        <QuestList />
        {/* coins  */}
        <div className={clsx(cl.additional__info__box, cl.wrapper__item)}>
          <div className={cl.additional__info__head__line}>
            <h3>Your coins</h3>
          </div>
          <div className={cl.coins__body}>
            <div className={cl.coins__img__wrapper}><img src="/Ico/coin.png" alt="Coin" /></div>
            <div className={cl.coins__value}>0</div>
          </div>
        </div>
      </div>
      <TodayGoal
        onWaterIntake={handleWaterIntakeAnimation}
        isAnimating={isAvatarAnimating}
      />
      <div className={cl.hydro__avatar__block}>
        <div className={cl.hydro__avatar__wrapper__img}>
          <img src={currentAvatar} alt="HydroAvatar" />
        </div>
      </div>
    </div>
  );
};
export default Home;