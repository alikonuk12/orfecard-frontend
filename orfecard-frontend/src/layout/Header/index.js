import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BurgerMenu } from '../../components';
import { logout } from '../../api/account';
import styles from './index.module.scss';

const Header = () => {
    const { mode, socialUtilityOffset, featuresOffset } = useSelector(state => state.view);
    const email = localStorage.getItem('email');

    const handleClickHome = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleClickEco = () => window.scrollTo({ top: socialUtilityOffset, behavior: 'smooth' });
    const handleClickCard = () => window.scrollTo({ top: featuresOffset, behavior: 'smooth' });

    const handleLogout = async () => {
        const isSuccess = await logout();
        if (isSuccess) {
            localStorage.removeItem('email');
            localStorage.removeItem('role');
            window.location.reload();
        }
    };

    const status = {
        login: {
            to: '/login',
            text: 'Giriş Yap'
        },
        logout: {
            to: '/',
            onClick: () => handleLogout(),
            text: 'Çıkış Yap'
        }
    };

    return (
        <header className={styles.container}>
            <Link to="/" className={styles.logo}>
                <img src='images/logo.svg' alt='logo' />
            </Link>
            {mode === 'DESKTOP' ?
                <div className={styles.navbars}>
                    <NavLink to='/' onClick={handleClickHome} className={styles.navLink}>Anasayfa</NavLink>
                    <NavLink to='/#eco' onClick={handleClickEco} className={styles.navLink}>Çevre Dostu</NavLink>
                    <NavLink to='/#card' onClick={handleClickCard} className={styles.navLink}>Kart Özellikleri</NavLink>
                    <NavLink to='/satin-al' className={styles.navLink}>Satın Al</NavLink>
                    <NavLink to='/iletisim' className={styles.navLink}>İletişim</NavLink>
                    {email ?
                        <NavLink
                            to={status['logout'].to}
                            onClick={status['logout'].onClick}
                            className={styles.navLink}>
                            {status['logout'].text}
                        </NavLink> :
                        <NavLink
                            to={status['login'].to}
                            onClick={status['login'].onClick}
                            className={styles.navLink}>
                            {status['login'].text}
                        </NavLink>
                    }
                    <NavLink to='/sepetim' className={styles.navLink}>Sepetim</NavLink>
                </div> :
                <BurgerMenu>
                    <NavLink to='/' onClick={handleClickHome} className={styles.navLink}>Anasayfa</NavLink>
                    <NavLink to='/#eco' onClick={handleClickEco} className={styles.navLink}>Çevre Dostu</NavLink>
                    <NavLink to='/#card' onClick={handleClickCard} className={styles.navLink}>Kart Özellikleri</NavLink>
                    <NavLink to='/satin-al' className={styles.navLink}>Satın Al</NavLink>
                    <NavLink to='/iletisim' className={styles.navLink}>İletişim</NavLink>
                    {email ?
                        <NavLink
                            to={status['logout'].to}
                            onClick={status['logout'].onClick}
                            className={styles.navLink}>
                            {status['logout'].text}
                        </NavLink> :
                        <NavLink
                            to={status['login'].to}
                            onClick={status['login'].onClick}
                            className={styles.navLink}>
                            {status['login'].text}
                        </NavLink>
                    }
                    <NavLink to='/sepetim' className={styles.navLink}>Sepetim</NavLink>
                </BurgerMenu>
            }
        </header>
    );
}

export default Header;