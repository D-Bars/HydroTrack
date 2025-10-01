import Logo from "../UI/Logo/Logo";
import UserHeader from "../User/UserHeader/UserHeader";
import cl from "./Header.module.scss";

const Header = () => {
  return (
    <header className={cl.header}>
      <Logo />
      <div className={cl.nav__user__box}>
        <UserHeader />
      </div >
    </header>
  );
};
export default Header;