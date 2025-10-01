import { useState } from "react";
import cl from "./UserHeader.module.scss";

const ModalItems = [
    { id: 1, label: "Item 1" },
    { id: 2, label: "Item 2" },
    { id: 3, label: "Item 3" },
];


const UserHeader = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const handleToggle = () => {
        if (isAnimating) return;
        setIsOpen(!isOpen);
        setIsAnimating(true);
    };
    return (
        <div className={cl.userHeader}>
            <button
                type="button"
                className={cl.user__btn}
                onClick={handleToggle}
                aria-expanded={isOpen}
            >
                <div className={cl.avatar__wrapper__img}>
                    <img src="/User/anonymous.png" alt="UserAvatar" />
                </div>
                <span className={cl.user__name}>User Name</span>
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