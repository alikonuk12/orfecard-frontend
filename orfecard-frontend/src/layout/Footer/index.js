import React from 'react';
import { useSelector } from 'react-redux';
import Column from './components/Column';
import { FIRST_COLUMN, SECOND_COLUMN, THIRD_COLUMN } from './const';
import styles from './index.module.scss';

const Footer = () => {
    const { mode } = useSelector(state => state.view);

    return (
        <footer className={mode === 'DESKTOP' ? styles.container : styles.mobileContainer}>
            <Column data={FIRST_COLUMN} />
            <Column data={SECOND_COLUMN} />
            <div className={styles.subContainer}>
                <Column data={THIRD_COLUMN} />
                <img width={250} src='/images/icons/footer_iyzico.svg' alt='footer_iyzico' />
            </div>
        </footer>
    );
}

export default Footer;