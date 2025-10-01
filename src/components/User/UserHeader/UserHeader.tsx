import { useState } from "react";
import cl from "./UserHeader.module.scss";
import useUserStore from "../../../store/userStore";
import { getAvatarIcon } from "../../../utils/avatar/getAvatarIco";

const ModalItems = [
    { id: 1, label: "Profile" },
    { id: 2, label: "Settings" },
    { id: 3, label: "Logout" },
];


const UserHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const nickname = useUserStore((state) => state.nickname);
    const gender = useUserStore((state) => state.gender);
    const isRegistered = useUserStore((state) => state.isRegistered);

    const handleToggle = () => {
        if (isAnimating) return;
        setIsOpen((prev) => !prev);
        setIsAnimating(true);
    };

    const avatarSrc = getAvatarIcon(gender);
    const greeting = isRegistered && nickname ? `Hi, ${nickname}` : "Hi there";

    return (
        <div className={cl.userHeader}>
            <button
                type="button"
                className={cl.user__btn}
                onClick={handleToggle}
                aria-expanded={isOpen}
            >
                <div className={cl.avatar__wrapper__img}>
                    <img src={avatarSrc} alt="UserAvatar" />
                </div>
                <span className={cl.user__name}>{greeting}</span>
                <div
                    className={`${cl.arrow__wrapper__img} ${isOpen ? cl.arrow__wrapper__img_open : ""}`}
                >
                    <img src="/Ico/arrow.png" alt="ArrowDown" />
                </div>
            </button>

            <div
                className={`${cl.user__modal} ${isOpen ? cl.user__modal_open : ""}`}
                onTransitionEnd={() => setIsAnimating(false)}
            >
                <ul className={cl.user__actions__list}>
                    {ModalItems.map((item) => (
                        <li key={item.id} className={cl.user__actions__item}>
                            <span className={cl.user__actions__icon} aria-hidden={!isOpen} />
                            <span className={cl.user__actions__label}>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default UserHeader;
