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
            <Column data={THIRD_COLUMN} />
        </footer>
    );
}

export default Footer;