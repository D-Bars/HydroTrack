import useUserStore from "../store/userStore";
import cl from "./styles/Profile.module.scss";

const Profile = () => {
    const { nickname, age, weight, gender } = useUserStore();

    return (
        <section className={cl.profile}>
            <div className={cl.profile__card}>
                <a href="/" className={cl.profile__back__home}>Back to home</a>
                <div className={cl.profile__head}>
                    <h2 className={cl.profile__title}>Profile</h2>
                    <p className={cl.profile__subtitle}>Your personal hydration details</p>
                </div>

                <div className={cl.profile__details}>
                    <div className={cl.profile__infoRow}>
                        <h3>Nickname</h3>
                        <div>{nickname}</div>
                    </div>
                    <div className={cl.profile__infoRow}>
                        <h3>Age</h3>
                        <div>{age}</div>
                    </div>
                    <div className={cl.profile__infoRow}>
                        <h3>Weight</h3>
                        <div>{weight}</div>
                    </div>
                    <div className={cl.profile__infoRow}>
                        <h3>Gender</h3>
                        <div>{gender}</div>
                    </div>
                    <div className={cl.profile__infoRow}>
                        <h3>Recommended water intake</h3>
                        <div>
                            
                        </div>
                    </div>
                    <div className={cl.profile__infoRow}>
                        <h3>Coins balance</h3>
                        <div>0</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;