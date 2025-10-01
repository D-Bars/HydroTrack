import clsx from "clsx";
import cl from "./styles/Home.module.scss";
import BottleProgres from "../components/BottleProgres/BottleProgres";

const Home = () => {
  return (
    <div className={cl.home__block}>
      <div className={cl.additional__info__block}>
        {/* water */}
        <div className={clsx(cl.additional__info__box, cl.wrapper__item)}>
          <div className={cl.additional__info__head__line}>
            <h3>Entries</h3>
            <a href="#">All entries</a>
          </div>
          <ul className={cl.water__progress__body}>
            <li className={cl.water__progress__item}>
              <span className={cl.item__day}>Today</span>
              <div className={cl.water__progress__item__wrapper}>
                <span className={cl.item__value}>200 ml</span>
                <span className={cl.item__time}>10:32</span>
              </div>
            </li>
            <li className={cl.water__progress__item}>
              <span className={cl.item__day}>Tomorrow</span>
              <div className={cl.water__progress__item__wrapper}>
                <span className={cl.item__value}>200 ml</span>
                <span className={cl.item__time}>10:32</span>
              </div>
            </li>
            <li className={cl.water__progress__item}>
              <span className={cl.item__day}>Yesterday</span>
              <div className={cl.water__progress__item__wrapper}>
                <span className={cl.item__value}>200 ml</span>
                <span className={cl.item__time}>10:32</span>
              </div>
            </li>
          </ul>
        </div>
        {/* calendar */}
        <div className={clsx(cl.additional__info__box, cl.wrapper__item)}>
          <div className={cl.additional__info__head__line}>
            <h3>Calendar</h3>
            <a href="#">View calendar</a>
          </div>
          <ul className={cl.calendar__body}>
            <li className={cl.calendar__item}>
              <span className={cl.item__day__week}>Mon</span>
              <span className={cl.item__day__month}>16</span>
            </li>
            <li className={cl.calendar__item}>
              <span className={cl.item__day__week}>Tue</span>
              <span className={cl.item__day__month}>17</span>
            </li>
            <li className={clsx(cl.calendar__item, cl.calendar__item__active)}>
              <span className={cl.item__day__week}>Wed</span>
              <span className={cl.item__day__month}>18</span>
            </li>
            <li className={cl.calendar__item}>
              <span className={cl.item__day__week}>Thu</span>
              <span className={cl.item__day__month}>19</span>
            </li>
            <li className={cl.calendar__item}>
              <span className={cl.item__day__week}>Fri</span>
              <span className={cl.item__day__month}>20</span>
            </li>
            <li className={cl.calendar__item}>
              <span className={cl.item__day__week}>Sat</span>
              <span className={cl.item__day__month}>21</span>
            </li>
            <li className={cl.calendar__item}>
              <span className={cl.item__day__week}>Sun</span>
              <span className={cl.item__day__month}>22</span>
            </li>
          </ul>
        </div>
        {/* quest */}
        <div className={clsx(cl.additional__info__box, cl.wrapper__item)}>
          <div className={cl.additional__info__head__line}>
            <h3>Quest</h3>
            <a href="#">All quests</a>
          </div>
          <ul className={cl.quest__body}>
            <li className={cl.quest__item}>
              <span className={cl.item__quest__text}>Drink 200 ml water</span>
              <div className={cl.quest__status}></div>
            </li>
            <li className={cl.quest__item}>
              <span className={cl.item__quest__text}>Drink 200 ml water</span>
              <div className={clsx(cl.quest__status, cl.quest__completed)}></div>
            </li>
          </ul>
        </div>
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
      <div className={cl.today__goal__block}>
        <h3>Today Goal</h3>
        <BottleProgres></BottleProgres>
        <div className={cl.today__goal__progres}>
          <div className={cl.goal__value__current}>1.5L</div>
          <span>/</span>
          <div className={cl.goal__value__limit}>3L</div>
        </div>
        <button className={cl.add__water}>add water</button>
      </div>
      <div className={cl.hydro__avatar__block}>
        <div className={cl.hydro__avatar__wrapper__img}>
          <img src="/Avatar/Male/avatarMale__default.png" alt="HydroAvatar" />
        </div>
      </div>
    </div>
  );
};
export default Home;