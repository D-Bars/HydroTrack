import cl from './Logo.module.scss';

const Logo = () => {
    return (
        <a href="/" className={cl.wrapper__img}><img src="/Logo/Logo.png" alt="HeaderLogo" /></a>
    );
};
export default Logo;