import React, { useState } from "react";
import { slide as Menu } from 'react-burger-menu';
import styles from './index.module.scss';

const BurgerMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClickOpen = () => setIsOpen(true);
    const handleClickClose = () => setIsOpen(false);

    return (
        <Menu
            right
            isOpen={isOpen}
            onOpen={handleClickOpen}
            onClose={handleClickClose}
            className={styles.menu}
            itemClassName={styles.item}
            itemListClassName={styles.itemList}
            customBurgerIcon={
                <img
                    src={
                        !isOpen ?
                            '/images/burger_menu_button.svg' :
                            '/images/cross_button.svg'
                    }
                    alt='menu_icon'
                />
            }
            burgerButtonClassName={styles.burgerMenuButton}
            children={children}
        />
    );
}

export default BurgerMenu;