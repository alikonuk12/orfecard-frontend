import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BurgerMenu } from '../../components';
import styles from './index.module.scss';

const Header = () => {
    const { mode, socialUtilityOffset, featuresOffset } = useSelector(state => state.view);

    const handleClickHome = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleClickEco = () => window.scrollTo({ top: socialUtilityOffset, behavior: 'smooth' });
    const handleClickCard = () => window.scrollTo({ top: featuresOffset, behavior: 'smooth' });

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
                    <NavLink to='/login' className={styles.navLink}>Giriş Yap</NavLink>
                    <NavLink to='/cart' className={styles.navLink}>Sepetim</NavLink>
                </div> :
                <BurgerMenu>
                    <NavLink to='/' onClick={handleClickHome} className={styles.navLink}>Anasayfa</NavLink>
                    <NavLink to='/#eco' onClick={handleClickEco} className={styles.navLink}>Çevre Dostu</NavLink>
                    <NavLink to='/#card' onClick={handleClickCard} className={styles.navLink}>Kart Özellikleri</NavLink>
                    <NavLink to='/#satin-al' className={styles.navLink}>Satın Al</NavLink>
                    <NavLink to='/#contact' className={styles.navLink}>İletişim</NavLink>
                    <NavLink to='/login' className={styles.navLink}>Giriş Yap</NavLink>
                    <NavLink to='/cart' className={styles.navLink}>Sepetim</NavLink>
                </BurgerMenu>
            }
        </header>
    );
}

export default Header;