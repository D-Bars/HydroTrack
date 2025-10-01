import cl from "./styles/Home.module.scss";
import CalendarWeek from "../components/home/CalendarWeek";
import Entries from "../components/home/Entries";
import QuestList from "../components/home/QuestList";
import TodayGoal from "../components/home/TodayGoal";
import clsx from "clsx";


const Home = () => {
  return (
    <div className={cl.home__block}>
      <div className={cl.additional__info__block}>
        {/* water */}
        <Entries />
        {/* calendar */}
        <CalendarWeek />
        {/* quest */}
        <QuestList />
        {/* coins  */}
        <div className={clsx(cl.additional__info__box, cl.wrapper__item)}>
          <div className={cl.additional__info__head__line}>
            <h3>Your coins</h3>
          </div>
          <div className={cl.coins__body}>
            <div className={cl.coins__img__wrapper}><img src="/Ico/coin.png" alt="Coin" /></div>
            <div className={cl.coins__value}>120</div>
          </div>
        </div>
      </div>
      <TodayGoal />
      <div className={cl.hydro__avatar__block}>
        <div className={cl.hydro__avatar__wrapper__img}>
          <img src="/Avatar/Male/avatarMale__default.png" alt="HydroAvatar" />
        </div>
      </div>
    </div>
  );
};
export default Home;