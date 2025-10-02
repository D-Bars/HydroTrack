import { useState } from "react";
import cl from "./UserHeader.module.scss";
import useUserStore from "../../../store/userStore";
import { getAvatarIcon } from "../../../utils/avatar/getAvatarIco";
import { Link, useNavigate } from "react-router-dom";
import { useWaterStore } from "../../../store/waterStore";

type ModalItem =
    | {
        id: string;
        label: string;
        src_ico: string;
        to: string;
    }
    | {
        id: string;
        label: string;
        src_ico: string;
        action: () => void;
    };

const UserHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const nickname = useUserStore((state) => state.nickname);
    const gender = useUserStore((state) => state.gender);
    const isRegistered = useUserStore((state) => state.isRegistered);
    const resetUser = useUserStore((state) => state.resetUser);
    const {clearGameData} = useWaterStore()
    const navigate = useNavigate();

    const handleToggle = () => {
        if (isAnimating) return;
        setIsOpen((prev) => !prev);
        setIsAnimating(true);
    };

    const handleLogout = () => {
        const registrationStorageKey = import.meta.env
            .VITE_STORAGE_KEY;
        const userGameDataStorageKey = import.meta.env
            .VITE_USER_GAME_DATA;

        if (registrationStorageKey) {
            localStorage.removeItem(registrationStorageKey);
        }
        if (userGameDataStorageKey) {
            localStorage.removeItem(userGameDataStorageKey);
        }

        resetUser();
        clearGameData();
        setIsOpen(false);
        navigate("/register");
    };

    const modalItems: ModalItem[] = [
        { id: "profile", label: "Profile", src_ico: '/Ico/user.png', to: "/profile" },
        { id: "logout", label: "Logout", src_ico: '/Ico/logout.png', action: handleLogout },
    ];

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
                    {modalItems.map((item) => (
                        <li key={item.id} className={cl.user__actions__item}>
                            <div className={cl.user__actions__icon}>
                                <div className={cl.background__ico}></div>
                                <img src={item.src_ico} />
                            </div>
                            {"to" in item ? (
                                <Link
                                    to={item.to}
                                    className={cl.user__actions__label}
                                    onClick={() => {
                                        setIsOpen(false);
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    className={cl.user__actions__label}
                                    onClick={item.action}
                                >
                                    {item.label}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default UserHeader;
