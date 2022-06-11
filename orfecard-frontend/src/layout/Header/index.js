import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BurgerMenu } from '../../components';
import styles from './index.module.scss';

const Header = () => {
    const isDesktopView = useSelector(state => state.view) === 'DESKTOP';

    return (
        <header className={styles.container} style={{ alignItems: !isDesktopView && 'flex-end' }} >
            <Link to="/" className={styles.logo}>
                <img src='images/logo.svg' alt='logo' />
            </Link>
            {isDesktopView ?
                <div className={styles.navbars}>
                    <NavLink to='/' className={styles.navLink}>Anasayfa</NavLink>
                    <NavLink to='/#eco' className={styles.navLink}>Çevre Dostu</NavLink>
                    <NavLink to='/#card' className={styles.navLink}>Kart Özellikleri</NavLink>
                    <NavLink to='/#product' className={styles.navLink}>Ürünlerimiz</NavLink>
                    <NavLink to='/#contact' className={styles.navLink}>İletişim</NavLink>
                    <NavLink to='/login' className={styles.navLink}>Giriş Yap</NavLink>
                    <NavLink to='/cart' className={styles.navLink}>Sepetim</NavLink>
                </div> :
                <BurgerMenu>
                    <NavLink to='/' className={styles.navLink}>Anasayfa</NavLink>
                    <NavLink to='/#eco' className={styles.navLink}>Çevre Dostu</NavLink>
                    <NavLink to='/#card' className={styles.navLink}>Kart Özellikleri</NavLink>
                    <NavLink to='/#product' className={styles.navLink}>Ürünlerimiz</NavLink>
                    <NavLink to='/#contact' className={styles.navLink}>İletişim</NavLink>
                    <NavLink to='/login' className={styles.navLink}>Giriş Yap</NavLink>
                    <NavLink to='/cart' className={styles.navLink}>Sepetim</NavLink>
                </BurgerMenu>}
        </header>
    );
}

export default Header;