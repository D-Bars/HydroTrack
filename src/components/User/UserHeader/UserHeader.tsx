import cl from "./UserHeader.module.scss";

const UserHeader = () => {
    return (
            <button className={cl.user__btn}>
                <div className={cl.avatar__wrapper__img}><img src="/User/anonymous.png" alt="UserAvatar" /></div>
                <span className={cl.user__name}>User Name</span>
                <div className={cl.arrow__wrapper__img}><img src="/Ico/arrow.png" alt="ArrowDown" /></div>
            </button>
    );
};
export default UserHeader;