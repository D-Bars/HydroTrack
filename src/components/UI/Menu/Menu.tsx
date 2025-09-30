import { Link } from "react-router-dom"
import cl from "./Menu.module.scss";

const Menu = () => {
    return (
        <>
            <nav className={cl.menu}>
                <Link to="/">Home</Link>
                <Link to="/calendar">Calendar</Link>
                <Link to="/settings">Settings</Link>
            </nav>
        </>
    );
};
export default Menu;