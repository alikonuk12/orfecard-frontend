import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BurgerMenu } from '../../components';
import { logout } from '../../api/account';
import styles from './index.module.scss';

const Header = () => {
    const { mode, socialUtilityOffset, featuresOffset } = useSelector(state => state.view);
    const email = localStorage.getItem('email');

    const [isOpen, setIsOpen] = useState(false);
    const handleClickOpen = () => setIsOpen(true);
    const handleClickClose = () => setIsOpen(false);

    const handleClickMenuItem = (top) => {
        top && window.scrollTo({ top, behavior: 'smooth' });
        setIsOpen(false);
    }

    const handleLogout = async () => {
        handleClickMenuItem();
        const isSuccess = await logout();
        if (isSuccess) {
            localStorage.removeItem('email');
            localStorage.removeItem('role');
            window.location.reload();
        }
    };

    const items = [
        {
            to: '/',
            onClick: () => handleClickMenuItem(0),
            text: 'Anasayfa'
        },
        {
            to: '/#eco',
            onClick: () => handleClickMenuItem(socialUtilityOffset),
            text: 'Çevre Dostu'
        },
        {
            to: '/#card',
            onClick: () => handleClickMenuItem(featuresOffset),
            text: 'Kart Özellikleri'
        },
        {
            to: '/satin-al',
            onClick: handleClickMenuItem,
            text: 'Satın Al'
        },
        {
            to: '/iletisim',
            onClick: handleClickMenuItem,
            text: 'İletişim'
        },
        {
            to: email ? '/' : '/login',
            onClick: email && handleLogout,
            text: email ? 'Çıkış Yap' : 'Giriş Yap'
        },
        {
            to: '/sepetim',
            onClick: handleClickMenuItem,
            text: 'Sepetim'
        }
    ];

    return (
        <header className={styles.container}>
            <Link to="/" className={styles.logo}>
                <img src='images/logo.svg' alt='logo' />
            </Link>
            {mode === 'DESKTOP' ?
                <div className={styles.navbars}>
                    {items.map(({ to, onClick, text }) => <NavLink to={to} onClick={onClick} className={styles.navLink}>{text}</NavLink>)}
                </div> :
                <BurgerMenu
                    isOpen={isOpen}
                    handleClickOpen={handleClickOpen}
                    handleClickClose={handleClickClose}
                >
                    {items.map(({ to, onClick, text }) => <NavLink to={to} onClick={onClick} className={styles.navLink}>{text}</NavLink>)}
                </BurgerMenu>
            }
        </header>
    );
}

export default Header;